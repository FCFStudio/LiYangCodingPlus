// 励洋辅助站 - 全站公共导航栏
// 用法：在页面原导航栏位置放置：
//   <div id="siteNav"></div>
//   <script src="nav.js" data-root=""></script>          ← 根目录页面
//   <script src="../nav.js" data-root="../"></script>    ← 子目录页面
// data-root 填本页面到站点根目录的相对路径，用于拼接站内链接。
// 导航栏样式在 common.css 中；修改导航栏内容只改本文件即可。

(function () {
  var s = document.currentScript;
  var root = (s && s.getAttribute("data-root")) || "";

  var html = [
    '<nav class="navbar">',
    '  <a class="logo" href="__ROOT__index.html">',
    '    <img src="https://www.liyangoj.com/tu2.png" alt="励洋">',
    '    <span>励洋辅助站</span>',
    '  </a>',
    '',
    '  <div class="nav-menus">',
    '    <!-- 下拉框一：FCF工作室 -->',
    '    <div class="dropdown">',
    '      <button class="dropdown-btn">FCF工作室 <span class="arrow">▼</span></button>',
    '      <div class="dropdown-menu">',
    '        <a href="https://fcfstudio.pages.dev" target="_blank" rel="noopener">FCF官网</a>',
    '        <a href="__ROOT__about/index.html">关于</a>',
    '      </div>',
    '    </div>',
    '',
    '    <!-- 下拉框二：站内导航 -->',
    '    <div class="dropdown">',
    '      <button class="dropdown-btn">站内导航 <span class="arrow">▼</span></button>',
    '      <div class="dropdown-menu">',
    '        <a href="__ROOT__index.html">首页</a>',
    '        <a href="__ROOT__lesson.html">课程</a>',
    '        <a href="__ROOT__problem.html">题目</a>',
    '        <a href="https://www.luogu.com.cn/team/127528" target="_blank" rel="noopener">我们的洛谷团队</a>',
    '      </div>',
    '    </div>',
    '',
    '    <!-- 下拉框三：官方站点 -->',
    '    <div class="dropdown">',
    '      <button class="dropdown-btn">官方站点 <span class="arrow">▼</span></button>',
    '      <div class="dropdown-menu">',
    '        <a href="https://liyangcode.com/" target="_blank" rel="noopener">励洋官网</a>',
    '        <a href="https://www.liyangoj.com/" target="_blank" rel="noopener">励洋OJ</a>',
    '        <a href="https://s.5aqima.com/" target="_blank" rel="noopener">励洋学习平台</a>',
    '        <a href="https://www.luogu.com.cn/team/59785" target="_blank" rel="noopener">励洋编程洛谷</a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</nav>'
  ].join("\n").replace(/__ROOT__/g, root);

  var holder = document.getElementById("siteNav");
  if (holder) {
    holder.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML("afterbegin", html);
  }
})();
