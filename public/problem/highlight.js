// 题解代码自动高亮 + 行号生成（所有题目页共用）
// 页面需要包含：
//   1. <script type="text/plain" id="solutionSource">纯文本C++代码</script>
//   2. <pre class="gutter" id="solutionGutter"></pre> 与 <pre id="solutionCode"></pre>
//   3. 页面底部引入 <script src="highlight.js"></script>

var CPP_KEYWORDS = "int|long|double|float|char|bool|void|return|if|else|for|while|do|break|continue|const|struct|class|using|namespace|new|delete|true|false|sizeof|switch|case|default|signed|unsigned|typedef";

function highlightCpp(code) {
  // 先转义 HTML，再做分词上色
  var esc = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var re = new RegExp(
    "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)" +             // 注释
    "|(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*')" +   // 字符串/字符
    "|(^[ \\t]*#[^\\n]*)" +                                 // 预处理行
    "|\\b(" + CPP_KEYWORDS + ")\\b" +                       // 关键字
    "|\\b(\\d+(?:\\.\\d+)?[uUlLfF]*)\\b",                   // 数字
    "gm");
  return esc.replace(re, function (m, com, str, pre, kw, num) {
    if (com) return '<span class="c">' + com + '</span>';
    if (str) return '<span class="n">' + str + '</span>';
    if (pre) return '<span class="p">' + pre + '</span>';
    if (kw) return '<span class="k">' + kw + '</span>';
    if (num) return '<span class="n">' + num + '</span>';
    return m;
  });
}

// 只还原 HTML 实体（不解析标签）：数据库里存成 &lt; 的代码显示时转回 <
// &amp; 放最后，保证 "&amp;lt;" 还原为字面 "&lt;" 而不是 "<"
var HTML_ENTITIES = [
  [/&lt;/g, "<"],
  [/&gt;/g, ">"],
  [/&quot;/g, '"'],
  [/&#39;/g, "'"],
  [/&nbsp;/g, " "],
  [/&amp;/g, "&"]
];

function unescapeEntities(s) {
  HTML_ENTITIES.forEach(function (p) { s = s.replace(p[0], p[1]); });
  return s;
}

function renderSolution() {
  var src = document.getElementById("solutionSource").textContent.replace(/\s+$/, "\n");
  // 实体还原后仍走 highlightCpp 内部的转义，浏览器最终显示原始字符
  document.getElementById("solutionCode").innerHTML = highlightCpp(unescapeEntities(src));
  var count = src.replace(/\n$/, "").split("\n").length;
  var nums = [];
  for (var i = 1; i <= count; i++) nums.push(i);
  document.getElementById("solutionGutter").textContent = nums.join("\n");
}

document.addEventListener("DOMContentLoaded", renderSolution);
