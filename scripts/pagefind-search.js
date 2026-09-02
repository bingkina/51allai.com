'use strict';

// 在页面底部注入 Pagefind 搜索弹窗。索引由 npm run build 在 public/pagefind/ 生成。
hexo.extend.injector.register('body_end', function () {
  return `
<div id="search-modal" class="search-modal hidden" role="dialog" aria-modal="true" aria-labelledby="search-modal-title" aria-hidden="true">
  <div class="search-modal-overlay"></div>
  <div class="search-modal-content">
    <div class="search-modal-header">
      <h3 id="search-modal-title">搜索文章</h3>
      <button id="search-close-btn" class="search-close-btn" type="button" aria-label="关闭搜索">&times;</button>
    </div>
    <div id="searchbox">
      <label class="search-label" for="pagefind-search-input">搜索文章</label>
      <input id="pagefind-search-input" class="pagefind-search-input" type="search" inputmode="search" autocomplete="off" placeholder="搜索文章...">
    </div>
    <div id="search-status" class="search-status" role="status" aria-live="polite">输入关键词开始搜索</div>
    <div id="hits"></div>
  </div>
</div>

<style>
  .search-modal { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: flex-start; justify-content: center; padding-top: 80px; }
  .search-modal.hidden { display: none; }
  .search-modal-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); }
  .search-modal-content { position: relative; display: flex; flex-direction: column; width: 90%; max-width: 600px; max-height: 70vh; overflow: hidden; background: var(--card-bg, #fff); border-radius: 16px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
  .search-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border-color, #eee); }
  .search-modal-header h3 { margin: 0; color: var(--text-color, #333); font-size: 18px; }
  .search-close-btn { padding: 0; color: var(--text-color, #666); font-size: 28px; line-height: 1; cursor: pointer; background: none; border: 0; }
  .search-close-btn:hover { color: var(--color-primary, #007bff); }
  .search-close-btn:focus-visible,
  .pagefind-search-input:focus-visible { outline: 3px solid color-mix(in srgb, var(--color-primary, #007bff) 35%, transparent); outline-offset: 2px; }
  #searchbox { padding: 16px 20px 8px; }
  .search-label { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  .pagefind-search-input { box-sizing: border-box; width: 100%; padding: 14px 18px; color: var(--text-color, #333); font-size: 16px; background: var(--card-bg, #fff); border: 2px solid var(--color-primary, #007bff); border-radius: 10px; }
  .search-status { min-height: 20px; padding: 0 20px 8px; color: var(--text-color, #666); font-size: 13px; }
  #hits { max-height: 50vh; padding: 0 20px 20px; overflow-y: auto; }
  .pagefind-hits { padding: 0; margin: 0; }
  .pagefind-hit { padding: 12px 16px; margin: 0 0 8px; list-style: none; background: var(--card-bg, #fff); border: 1px solid var(--border-color, #ddd); border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); }
  .pagefind-hit:hover { border-color: var(--color-primary, #007bff); box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12); }
  .pagefind-hit-title { display: flex; align-items: center; justify-content: space-between; }
  .pagefind-hit-title a { flex: 1; color: var(--text-color, #333); font-size: 15px; text-decoration: none; }
  .pagefind-hit-title a:hover { color: var(--color-primary, #007bff); }
  .pagefind-hit-date { margin-left: 10px; color: var(--text-color, #888); font-size: 12px; white-space: nowrap; }
  .pagefind-hit-excerpt { display: -webkit-box; margin-top: 6px; overflow: hidden; color: var(--text-color, #666); font-size: 13px; line-height: 1.5; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  .pagefind-hit-excerpt mark { padding: 0 2px; color: #333; background: #fff3cd; border-radius: 2px; }
  #nav-search-btn { cursor: pointer; }
  #nav-search-btn i { font-size: 16px; }
  .back-to-top-wrapper { pointer-events: none !important; }
  .back-to-top-wrapper button,
  .back-to-top-wrapper a { pointer-events: auto !important; }
  @media (max-width: 767px) {
    .search-modal { padding-top: 48px; }
    .search-modal-content { width: calc(100% - 24px); max-height: calc(100vh - 72px); }
  }
</style>

<script>
(function() {
  var subNav = document.querySelector('#sub-nav');
  var searchBtn = document.getElementById('nav-search-btn');
  if (subNav && !searchBtn) {
    searchBtn = document.createElement('a');
    searchBtn.id = 'nav-search-btn';
    searchBtn.className = 'nav-icon';
    searchBtn.href = '/search/';
    searchBtn.title = '搜索';
    searchBtn.setAttribute('aria-label', '搜索文章');
    searchBtn.setAttribute('aria-controls', 'search-modal');
    searchBtn.setAttribute('aria-expanded', 'false');
    searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>';
    subNav.insertBefore(searchBtn, subNav.firstChild);
  }

  var searchModal = document.getElementById('search-modal');
  var searchCloseBtn = document.getElementById('search-close-btn');
  var searchOverlay = document.querySelector('.search-modal-overlay');
  var searchInput = document.getElementById('pagefind-search-input');
  var searchStatus = document.getElementById('search-status');
  var hits = document.getElementById('hits');
  var pagefindPromise;
  var searchTimer;
  var searchSequence = 0;

  function loadPagefind() {
    if (!pagefindPromise) {
      pagefindPromise = import('/pagefind/pagefind.js').then(function(pagefind) {
        return pagefind.init().then(function() { return pagefind; });
      });
    }
    return pagefindPromise;
  }

  function openSearch(event) {
    if (event) event.preventDefault();
    searchModal.classList.remove('hidden');
    searchModal.setAttribute('aria-hidden', 'false');
    if (searchBtn) searchBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    window.setTimeout(function() { searchInput.focus(); }, 50);
    loadPagefind().catch(function() { searchStatus.textContent = '搜索索引加载失败，请刷新页面后重试'; });
  }

  function closeSearch() {
    searchModal.classList.add('hidden');
    searchModal.setAttribute('aria-hidden', 'true');
    if (searchBtn) {
      searchBtn.setAttribute('aria-expanded', 'false');
      searchBtn.focus();
    }
    document.body.style.overflow = '';
  }

  function appendSafeExcerpt(container, excerpt) {
    var parsed = new DOMParser().parseFromString(excerpt || '', 'text/html');
    Array.prototype.forEach.call(parsed.body.childNodes, function(node) {
      if (node.nodeType === 1 && node.nodeName === 'MARK') {
        var mark = document.createElement('mark');
        mark.textContent = node.textContent;
        container.appendChild(mark);
      } else {
        container.appendChild(document.createTextNode(node.textContent || ''));
      }
    });
  }

  function renderResults(results) {
    hits.replaceChildren();
    if (!results.length) {
      searchStatus.textContent = '没有找到相关文章';
      return;
    }
    searchStatus.textContent = '找到 ' + results.length + ' 条结果';
    var list = document.createElement('ol');
    list.className = 'pagefind-hits';
    results.forEach(function(result) {
      var item = document.createElement('li');
      item.className = 'pagefind-hit';
      var titleRow = document.createElement('div');
      titleRow.className = 'pagefind-hit-title';
      var link = document.createElement('a');
      link.href = result.url;
      link.textContent = (result.meta && result.meta.title) || result.url;
      titleRow.appendChild(link);
      if (result.meta && result.meta.date) {
        var date = document.createElement('span');
        date.className = 'pagefind-hit-date';
        date.textContent = result.meta.date;
        titleRow.appendChild(date);
      }
      item.appendChild(titleRow);
      if (result.excerpt) {
        var excerpt = document.createElement('div');
        excerpt.className = 'pagefind-hit-excerpt';
        appendSafeExcerpt(excerpt, result.excerpt);
        item.appendChild(excerpt);
      }
      list.appendChild(item);
    });
    hits.appendChild(list);
  }

  function runSearch() {
    var query = searchInput.value.trim();
    var sequence = ++searchSequence;
    window.clearTimeout(searchTimer);
    if (!query) {
      hits.replaceChildren();
      searchStatus.textContent = '输入关键词开始搜索';
      return;
    }
    searchStatus.textContent = '正在搜索…';
    searchTimer = window.setTimeout(function() {
      loadPagefind()
        .then(function(pagefind) { return pagefind.search(query); })
        .then(function(search) {
          return Promise.all(search.results.slice(0, 10).map(function(result) { return result.data(); }));
        })
        .then(function(results) { if (sequence === searchSequence) renderResults(results); })
        .catch(function() { if (sequence === searchSequence) searchStatus.textContent = '搜索暂时不可用，请稍后重试'; });
    }, 160);
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);
  if (searchInput) searchInput.addEventListener('input', runSearch);
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !searchModal.classList.contains('hidden')) closeSearch();
  });
})();
</script>
`;
}, 'default');
