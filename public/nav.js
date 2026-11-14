// 励洋辅助站 - 全站公共导航栏
// 用法：在页面原导航栏位置放置：
//   <div id="siteNav"></div>
//   <script src="/nav.js"></script>
// 站内链接全部使用绝对路径（站点部署在域名根目录），任何页面都能正确跳转。
// 导航栏样式在 common.css 中；修改导航栏内容只改本文件即可。

(function () {
  var html = [
    '<nav class="navbar">',
    '  <a class="logo" href="/">',
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
    '        <a href="/about/">关于</a>',
    '        <a href="https://www.luogu.com.cn/team/127528" target="_blank" rel="noopener">我们的洛谷团队</a>',
    '      </div>',
    '    </div>',
    '',
    '    <!-- 下拉框二：站内导航 -->',
    '    <div class="dropdown">',
    '      <button class="dropdown-btn">站内导航 <span class="arrow">▼</span></button>',
    '      <div class="dropdown-menu">',
    '        <a href="/">首页</a>',
    '        <a href="/lesson">课程</a>',
    '        <a href="/problem">题目</a>',
    '        <a href="/user/">查询励洋用户</a>',
    '        <a href="/status/">查询提交记录</a>',
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
  ].join("\n");

  var holder = document.getElementById("siteNav");
  if (holder) {
    holder.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML("afterbegin", html);
  }
})();
