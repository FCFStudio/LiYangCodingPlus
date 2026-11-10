// 全站 Markdown 渲染工具
// 用法：页面里依次引入
//   <script src="/vendor/marked.min.js"></script>
//   <script src="/md.js"></script>
// 然后把容器 innerHTML 设为 renderMD(文本) 即可。
// 兼容旧内容：若文本本身已是 HTML 片段（含标签），则原样返回，不做转换；
// 这样无论数据库里存的是旧 HTML 还是新 Markdown 都能正确显示。
function renderMD(text) {
  var t = String(text == null ? "" : text);
  // 已包含 HTML 标签 → 按旧内容处理
  if (/<[a-z][^>]*>/i.test(t)) return t;
  // 纯 Markdown → 交给 marked 渲染
  if (window.marked && marked.parse) {
    try { return marked.parse(t); } catch (e) { return t; }
  }
  // 渲染器还没加载好时保底：按纯文本显示
  return t;
}
