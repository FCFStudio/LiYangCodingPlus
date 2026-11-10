// GET /lesson/1 —— 洛谷式课程地址
// 课程存在：返回课程壳页（前端 JS 从地址栏取课程号并调 /api/lesson 渲染）
// 课程不存在：返回真正的 404 页面（public/Error/404.html）
// 注意：
//   - 请求带 .html 结尾（旧版链接）→ 301 到无扩展名的洛谷式地址
//   - 请求是静态文件（如 /lesson/style.css、/lesson/files/1.pdf）→ 原样交给静态资产服务
import { serverError, notFoundPage, serverErrorPage } from "../api/_lib.js";

export async function onRequestGet({ request, env, params }) {
  try {
    const url = new URL(request.url);
    const seg = decodeURIComponent(params.id || "");

    // 旧版一课一页链接：/lesson/1.html → 301 /lesson/1
    if (/\.html$/i.test(seg)) {
      const target = new URL(url.pathname.replace(/\.html$/i, "") + url.search, url.origin);
      return Response.redirect(target.toString(), 301);
    }

    // 静态文件直接透传给静态资产
    if (/\.[a-z0-9]+$/i.test(seg)) {
      return env.ASSETS.fetch(request);
    }

    const row = await env.DB.prepare("SELECT id FROM lessons WHERE id = ?").bind(seg).first();
    if (!row) return notFoundPage(env, request);
    return env.ASSETS.fetch(new URL("/lesson.html", url.origin));
  } catch (err) {
    return serverErrorPage(env, request, err);
  }
}
