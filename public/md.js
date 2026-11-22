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
  // 乘法星号保护：紧跟在数字/小数点后面的 * 是数学符号不是 Markdown 标记，
  // 转成 HTML 实体，防止被误解析成斜体（如 1*2*3*...*n、**1*2*3*...*n**）
  t = t.replace(/([\d.])\*(?=[\d.a-z])/gi, "$1&#42;");
  // 粗斜体保护：***x*** 直接转 <strong><em>x</em></strong>，
  // 绕过 CommonMark 对标点边界的限制（如 为***(L,R)*** 中文后接括号时 marked 无法开启）
  t = t.replace(/\*\*\*([^*]+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  // 下标保护：先把 ~x~ 转成 <sub>x</sub>（支持嵌套，如 t~i,m~i~~），
  // 避免连续的 ~ 被 marked 误判成 GFM 删除线（~~…~~）
  t = renderSubs(t);
  // 纯 Markdown → 交给 marked 渲染
  if (window.marked && marked.parse) {
    try { return marked.parse(t); } catch (e) { return t; }
  }
  // 渲染器还没加载好时保底：按纯文本显示
  return t;
}

// MediaWiki 风格下标：~x~ → <sub>x</sub>
// 内层先渲染，天然支持嵌套（t~i,m~i~~ → t<sub>i,m<sub>i</sub></sub>）
function renderSubs(s) {
  var re = /~((?:[^~]|~[^~]+~)+)~/g;
  var out = "";
  var last = 0;
  var m;
  while ((m = re.exec(s)) !== null) {
    out += s.slice(last, m.index) + "<sub>" + renderSubs(m[1]) + "</sub>";
    last = m.index + m[0].length;
    re.lastIndex = last;
  }
  return out + s.slice(last);
}
