/* =========================================================
   RAINROOM · 雨的小屋 —— Hero 注入 + 雨屋公告
   用法：在 frontend-dist/index.html 的 </body> 前引入
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 首页 Hero ---------- */
  function mountHero() {
    if (location.pathname !== '/' && location.pathname !== '/index.html') return;
    var app = document.getElementById('app');
    if (!app) return;

    var hero = document.createElement('div');
    hero.className = 'rr-hero';
    hero.innerHTML =
      '<span class="rr-deco rr-d1">☂</span>' +
      '<span class="rr-deco rr-d2">☁</span>' +
      '<span class="rr-deco rr-d3">♡</span>' +
      '<div class="rr-tag">♡ WELCOME TO MY RAINY ROOM ♡</div>' +
      '<h1>IT\'S RAINING,<br>COME IN.</h1>' +
      '<p class="rr-cn">外面下雨，屋里收藏。<br>把喜欢的图，好好放进房间。</p>' +
      '<div class="rr-chips">' +
      '<span class="rr-chip m">✿ 永久保存</span>' +
      '<span class="rr-chip p">✦ 原图上传</span>' +
      '<span class="rr-chip y">♡ 专属相册</span>' +
      '</div>';

    // 插到 #app 的第一个子元素之前，保持在页面最顶部
    var first = app.firstElementChild;
    if (first && first.parentNode) {
      first.parentNode.insertBefore(hero, first);
    } else {
      app.appendChild(hero);
    }
  }

  /* ---------- 雨屋公告（每天第一次打开时弹出） ---------- */
  var NEWS_KEY = 'rainroom_news_seen';
  var NEWS_TITLE = 'RAINY NEWS ✉';
  var NEWS_BODY =
    '人！欢迎来到 <em>雨的小屋</em>。<br><br>' +
    '这里存图不看天气：下雨天存，晴天也能存。图放在屋里，雨下在窗外。<br><br>' +
    '小屋规则只有一条：<em>别传见不得雨的图</em>。其余的，随便坐。☂';

  function today() { return new Date().toISOString().slice(0, 10); }

  function showNews() {
    if (location.pathname !== '/' && location.pathname !== '/index.html') return;
    try {
      if (localStorage.getItem(NEWS_KEY) === today()) return;
    } catch (e) { /* 忽略 */ }

    var mask = document.createElement('div');
    mask.style.cssText =
      'position:fixed;inset:0;background:rgba(60,56,86,.45);z-index:9998;';

    var box = document.createElement('div');
    box.style.cssText =
      'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);' +
      'width:min(420px,88vw);max-height:76vh;overflow:auto;' +
      'background:var(--rr-card,#fdf8ef);border:3px solid #55506b;' +
      'box-shadow:8px 8px 0 rgba(85,80,107,.28);padding:22px;z-index:9999;' +
      'color:#55506b;text-align:left;';

    var close = document.createElement('button');
    close.textContent = '✕';
    close.style.cssText =
      'position:absolute;top:10px;right:10px;width:34px;height:34px;' +
      'background:#fdf8ef;border:2.5px solid #55506b;color:#55506b;' +
      'box-shadow:3px 3px 0 rgba(85,80,107,.3);cursor:pointer;' +
      'font-family:VT323,monospace;font-size:18px;line-height:1;padding:0;';

    var title = document.createElement('div');
    title.className = 'rr-news-title';
    title.style.cssText =
      'font-family:VT323,monospace;font-size:24px;letter-spacing:2px;' +
      'margin-bottom:4px;text-shadow:2px 2px 0 #f5dfae;';
    title.textContent = NEWS_TITLE;

    var sub = document.createElement('div');
    sub.style.cssText =
      'font-family:VT323,monospace;font-size:13px;letter-spacing:6px;' +
      'color:#8a84a3;margin-bottom:14px;';
    sub.textContent = '屋 主 的 话';

    var body = document.createElement('div');
    body.className = 'rr-modal-body';
    body.style.fontSize = '15px';
    body.innerHTML = NEWS_BODY;

    function dismiss() {
      try { localStorage.setItem(NEWS_KEY, today()); } catch (e) { /* 忽略 */ }
      mask.remove();
      box.remove();
    }

    close.addEventListener('click', dismiss);
    mask.addEventListener('click', dismiss);

    box.appendChild(close);
    box.appendChild(title);
    box.appendChild(sub);
    box.appendChild(body);
    document.body.appendChild(mask);
    document.body.appendChild(box);
  }

  /* ---------- 启动 ---------- */
  function start() {
    mountHero();
    // 等 Vue 把页面渲染出来再弹公告
    setTimeout(showNews, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
