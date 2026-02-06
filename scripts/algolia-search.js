'use strict';

// 在页面底部注入 Algolia 搜索弹窗
hexo.extend.injector.register('body_end', function () {
  const algolia = hexo.config.algolia;
  if (!algolia || (!algolia.appId && !algolia.applicationID)) return '';
  const appId = algolia.appId || algolia.applicationID;

  return `
<!-- 搜索弹窗 HTML -->
<div id="search-modal" class="search-modal hidden">
  <div class="search-modal-overlay"></div>
  <div class="search-modal-content">
    <div class="search-modal-header">
      <h3>搜索文章</h3>
      <button id="search-close-btn" class="search-close-btn">&times;</button>
    </div>
    <div id="searchbox"></div>
    <div id="hits"></div>
  </div>
</div>

<!-- Algolia 搜索脚本 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css">
<script src="https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4"></script>

<style>
  .search-modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 80px;
  }
  .search-modal.hidden { display: none; }
  .search-modal-overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }
  .search-modal-content {
    position: relative;
    background: var(--card-bg, #fff);
    border-radius: 16px;
    width: 90%;
    max-width: 600px;
    max-height: 70vh;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
  }
  .search-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color, #eee);
  }
  .search-modal-header h3 { margin: 0; font-size: 18px; color: var(--text-color, #333); }
  .search-close-btn {
    background: none; border: none;
    font-size: 28px; cursor: pointer;
    color: var(--text-color, #666); line-height: 1;
  }
  .search-close-btn:hover { color: var(--color-primary, #007bff); }
  #searchbox { padding: 16px 20px; }
  .ais-SearchBox-input {
    width: 100%;
    padding: 14px 18px;
    font-size: 16px;
    border: 2px solid var(--color-primary, #007bff);
    border-radius: 10px;
    outline: none;
    background: var(--card-bg, #fff);
    color: var(--text-color, #333);
  }
  .ais-SearchBox-input:focus { box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2); }
  #hits { padding: 0 20px 20px; overflow-y: auto; max-height: 50vh; }
  .ais-Hits-list {
    display: flex !important;
    flex-direction: column !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .ais-Hits-item {
    width: 100% !important;
    padding: 12px 16px !important;
    margin: 0 0 8px 0 !important;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 8px;
    list-style: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08) !important;
    background: var(--card-bg, #fff) !important;
  }
  .ais-Hits-item:hover { 
    border-color: var(--color-primary, #007bff);
    box-shadow: 0 2px 6px rgba(0,0,0,0.12) !important;
  }
  .ais-Hits-item:last-child { margin-bottom: 0 !important; }
  .hit-title { display: flex; align-items: center; justify-content: space-between; }
  .ais-Hits-item a {
    color: var(--text-color, #333);
    text-decoration: none;
    font-size: 15px;
    flex: 1;
  }
  .ais-Hits-item a:hover { color: var(--color-primary, #007bff); }
  .hit-date { color: #888; font-size: 12px; margin-left: 10px; white-space: nowrap; }
  .hit-snippet { 
    color: #666; 
    font-size: 13px; 
    margin-top: 6px; 
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .hit-snippet em { 
    background: #fff3cd; 
    color: #333; 
    font-style: normal;
    padding: 0 2px;
    border-radius: 2px;
  }
  #nav-search-btn { cursor: pointer; }
  #nav-search-btn i { font-size: 16px; }
</style>

<script>
(function() {
  // 动态添加搜索按钮到导航栏
  var subNav = document.querySelector('#sub-nav');
  if (subNav) {
    var searchBtn = document.createElement('a');
    searchBtn.id = 'nav-search-btn';
    searchBtn.className = 'nav-icon';
    searchBtn.title = '搜索';
    searchBtn.innerHTML = '<i class="fa fa-search"></i>';
    subNav.insertBefore(searchBtn, subNav.firstChild);
  }

  var searchModal = document.getElementById('search-modal');
  var searchCloseBtn = document.getElementById('search-close-btn');
  var searchOverlay = document.querySelector('.search-modal-overlay');

  function openSearch() {
    searchModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
      var input = document.querySelector('.ais-SearchBox-input');
      if (input) input.focus();
    }, 100);
  }

  function closeSearch() {
    searchModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.getElementById('nav-search-btn').addEventListener('click', openSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
      closeSearch();
    }
  });

  // Algolia InstantSearch
  var searchClient = algoliasearch('${appId}', '${algolia.apiKey}');
  var search = instantsearch({
    indexName: '${algolia.indexName}',
    searchClient: searchClient,
  });

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#searchbox',
      placeholder: '搜索文章...',
      autofocus: true,
      showReset: false,
      showSubmit: false,
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: function(hit) {
          var url = hit.path || hit.permalink || '#';
          var date = hit.date ? new Date(hit.date).toLocaleDateString('zh-CN') : '';
          var snippet = '';
          if (hit._snippetResult && hit._snippetResult.content) {
            snippet = hit._snippetResult.content.value;
          } else if (hit.content) {
            snippet = hit.content.substring(0, 100) + '...';
          }
          return '<div class="hit-item"><div class="hit-title"><a href="/' + url + '">' + instantsearch.highlight({ attribute: 'title', hit: hit }) + '</a><span class="hit-date">' + date + '</span></div>' + (snippet ? '<div class="hit-snippet">' + snippet + '</div>' : '') + '</div>';
        },
        empty: '<div style="text-align:center;padding:20px;color:#888;">没有找到相关文章</div>',
      },
      attributesToSnippet: ['content:50'],
    }),
  ]);

  search.start();
})();
</script>
`;
}, 'default');
