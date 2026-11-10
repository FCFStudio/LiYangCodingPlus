// API 公共工具（文件名以下划线开头，Cloudflare Pages 不会把它当成路由）

export function json(data, status = 200, cache = "public, max-age=60") {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cache,
    },
  });
}

export function badRequest(msg) {
  return json({ error: msg }, 400, "no-store");
}

export function notFound(msg) {
  return json({ error: msg }, 404, "no-store");
}

export function serverError(err) {
  console.error(err);
  return json({ error: "服务器内部错误" }, 500, "no-store");
}

// 漂亮的错误页：读取 public/Error/ 下的静态页面并按指定状态码返回
// （页面本体在 public/Error/，根目录 404.html 是它的副本，供 Pages 自动 404 使用）
async function errorPage(env, request, path, status) {
  try {
    const res = await env.ASSETS.fetch(new URL(path, new URL(request.url).origin));
    return new Response(res.body, {
      status,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
    });
  } catch (e) {
    return new Response("Error", {
      status,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
}

// 404 页（题号/课程不存在时使用，页面来自 public/Error/404.html）
export function notFoundPage(env, request) {
  return errorPage(env, request, "/Error/404.html", 404);
}

// 500 页（页面路由抛异常时使用，页面来自 public/Error/500.html）
export function serverErrorPage(env, request, err) {
  if (err) console.error(err);
  return errorPage(env, request, "/Error/500.html", 500);
}

// 取查询参数并做基本清洗
export function query(request, key) {
  const v = new URL(request.url).searchParams.get(key);
  return v ? v.trim() : "";
}
