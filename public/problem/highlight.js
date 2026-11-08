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

function renderSolution() {
  var src = document.getElementById("solutionSource").textContent.replace(/\s+$/, "\n");
  document.getElementById("solutionCode").innerHTML = highlightCpp(src);
  var count = src.replace(/\n$/, "").split("\n").length;
  var nums = [];
  for (var i = 1; i <= count; i++) nums.push(i);
  document.getElementById("solutionGutter").textContent = nums.join("\n");
}

document.addEventListener("DOMContentLoaded", renderSolution);
