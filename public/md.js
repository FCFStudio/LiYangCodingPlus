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
// 波浪号配对用回溯解析：每个 ~ 作为开层或闭层，要求全部消耗、
// 结尾无未闭合层、每层内容非空；无解时原样保留（孤立 ~ 不误伤）。
// 优先闭层 → 相邻下标（a~1~,b~2~）各自独立不跨界；闭层走不通再回溯开层 →
// 嵌套写法（t~i,m~i~~）也能正确解析为 t<sub>i,m<sub>i</sub></sub>。
function renderSubs(s) {
  var pos = [];
  for (var i = 0; i < s.length; i++) if (s.charAt(i) === "~") pos.push(i);
  // 波浪太多时回溯代价过高，直接不处理（正常题面到不了这个量级）
  if (pos.length === 0 || pos.length > 30) return s;

  var acts = [];       // 每个波浪的分工：1=开层 0=闭层
  var actions = null;  // 第一个可行解
  function solve(idx, stack) {
    if (actions) return;
    if (idx === pos.length) {
      if (stack.length === 0) actions = acts.slice();
      return;
    }
    // 优先闭层：内容（去掉内部波浪后）非空才允许
    if (stack.length > 0) {
      var inner = s.slice(stack[stack.length - 1] + 1, pos[idx]).replace(/~/g, "");
      if (inner.length > 0) {
        acts.push(0);
        solve(idx + 1, stack.slice(0, stack.length - 1));
        acts.pop();
        if (actions) return;
      }
    }
    // 闭层走不通 → 作为新的开层
    acts.push(1);
    solve(idx + 1, stack.concat([pos[idx]]));
    acts.pop();
  }
  solve(0, []);
  if (!actions) return s;

  // 按解析结果重建：文本与 <sub>/</sub> 交替输出，天然形成嵌套
  var out = "";
  var last = 0;
  for (var k = 0; k < pos.length; k++) {
    out += s.slice(last, pos[k]);
    out += actions[k] === 1 ? "<sub>" : "</sub>";
    last = pos[k] + 1;
  }
  return out + s.slice(last);
}
