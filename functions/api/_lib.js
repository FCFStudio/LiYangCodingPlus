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

// 漂亮的 404 页（用于 /problem/xxx、/lesson/xxx 这类路径路由）
export function notFoundPage(kind, id) {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${kind}不存在 - 励洋辅助站</title>
<link rel="stylesheet" href="/common.css">
<style>
  .notfound-card {
    background: var(--white);
    border: 1px solid #fed7aa;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(249, 115, 22, 0.05);
    padding: 40px 32px;
    text-align: center;
  }
  .notfound-card h1 { font-size: 40px; color: var(--primary-dark); margin-bottom: 8px; }
  .notfound-card p { color: var(--text-light); font-size: 15px; margin-bottom: 20px; }
  .notfound-card a {
    display: inline-block;
    padding: 10px 24px;
    background: var(--primary);
    color: var(--white);
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
  }
  .notfound-card a:hover { background: var(--primary-dark); }
</style>
</head>
<body>
<div id="siteNav"></div>
<script src="/nav.js" data-root=""></script>
<main class="main">
  <div class="notfound-card">
    <h1>404</h1>
    <p>${kind === "题目" ? `题号 <b>${id}</b> 还没有收录` : `课程 <b>${id}</b> 不存在`}，或地址写错了。</p>
    <a href="/problem">去题目列表看看</a>
  </div>
</main>
</body>
</html>`;
  return new Response(html, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

// 取查询参数并做基本清洗
export function query(request, key) {
  const v = new URL(request.url).searchParams.get(key);
  return v ? v.trim() : "";
}
