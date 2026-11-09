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

// 取查询参数并做基本清洗
export function query(request, key) {
  const v = new URL(request.url).searchParams.get(key);
  return v ? v.trim() : "";
}
