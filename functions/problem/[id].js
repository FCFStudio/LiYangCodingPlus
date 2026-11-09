// GET /problem/1000 —— 洛谷式题号地址
// 题号存在：返回题面壳页（前端 JS 从地址栏取题号并调 /api/problem 渲染）
// 题号不存在：返回真正的 404 页面
// 注意：
//   - 请求带 .html 结尾（旧版链接）→ 301 到无扩展名的洛谷式地址
//   - 请求是静态文件（如 /problem/style.css）→ 原样交给静态资产服务
import { serverError, notFoundPage } from "../api/_lib.js";

export async function onRequestGet({ request, env, params }) {
  try {
    const url = new URL(request.url);
    const seg = decodeURIComponent(params.id || "");

    // 旧版一题一页链接：/problem/1000.html → 301 /problem/1000
    if (/\.html$/i.test(seg)) {
      const target = new URL(url.pathname.replace(/\.html$/i, "") + url.search, url.origin);
      return Response.redirect(target.toString(), 301);
    }

    // 静态文件（style.css / highlight.js 等）直接透传给静态资产
    if (/\.[a-z0-9]+$/i.test(seg)) {
      return env.ASSETS.fetch(request);
    }

    const row = await env.DB.prepare("SELECT id FROM problems WHERE id = ?").bind(seg).first();
    if (!row) return notFoundPage("题目", seg);
    return env.ASSETS.fetch(new URL("/problem.html", url.origin));
  } catch (err) {
    return serverError(err);
  }
}
