// 相关文章 helper：按共享标签数给其他文章打分，同分按发布日期倒序，返回 Top N。
// 设计选择：只基于 tag 匹配，不做全文相似度——
//   - 本站全部归属 "AI资讯" 单一 category，category 维度无区分度；
//   - 标签是作者手工挑选的主题信号，比 TF-IDF 更稳更可解释；
//   - 无匹配标签时返回空数组，模板侧判空不渲染，避免出现弱关联的"凑数链接"。

const RELATED_LIMIT_DEFAULT = 5;

hexo.extend.helper.register('related_posts', function (currentPost, limit) {
  limit = limit || RELATED_LIMIT_DEFAULT;
  if (!currentPost || !currentPost.tags || !currentPost.tags.length) return [];

  const currentTags = new Set(currentPost.tags.map(function (t) { return t.name; }));
  const currentPath = currentPost.path;

  const scored = [];
  const posts = this.site.posts.toArray();
  for (const p of posts) {
    if (p.path === currentPath) continue;
    if (!p.tags || !p.tags.length) continue;
    let score = 0;
    p.tags.forEach(function (t) { if (currentTags.has(t.name)) score++; });
    if (score === 0) continue;
    scored.push({ post: p, score: score });
  }
  scored.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date) - new Date(a.post.date);
  });
  return scored.slice(0, limit).map(function (x) { return x.post; });
});

// 相关文章区块样式：复用主题 card-background / primary 等 CSS 变量，保证深浅色主题一致。
hexo.extend.injector.register('head_end', `<style>
.related-posts { margin-top: 1.5rem; padding: 1rem 1.25rem 1.1rem; background: var(--card-background); border-radius: 12px; }
.related-posts .main-title-bar { margin-bottom: 0.6rem; }
.related-posts .main-title { font-size: 1rem; font-weight: 600; color: var(--main-title); }
.related-posts-list { list-style: none; margin: 0; padding: 0; }
.related-post-item { margin: 0; }
.related-post-item + .related-post-item { border-top: 1px solid var(--card-btn-bg); }
.related-post-link { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; padding: 0.55rem 0; text-decoration: none; color: var(--btn-content); transition: color 0.15s; }
.related-post-link:hover .related-post-title { color: var(--primary); }
.related-post-title { flex: 1; font-size: 0.95em; line-height: 1.45; }
.related-post-date { flex-shrink: 0; font-size: 0.8em; opacity: 0.6; white-space: nowrap; font-variant-numeric: tabular-nums; }
@media (max-width: 520px) {
  .related-post-link { flex-direction: column; gap: 0.15rem; padding: 0.5rem 0; }
  .related-post-date { font-size: 0.78em; }
}
</style>`);
