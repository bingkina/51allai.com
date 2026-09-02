// 精选专题按显式标签聚合，保持页面清单与正文中的最新报道一致。
hexo.extend.helper.register('topic_posts', function (tags, limit) {
  const selectedTags = new Set((Array.isArray(tags) ? tags : []).map(String));
  if (selectedTags.size === 0) return [];

  return this.site.posts.toArray()
    .filter(function (post) {
      return post.published !== false && post.tags && post.tags.toArray().some(function (tag) {
        return selectedTags.has(tag.name);
      });
    })
    .sort(function (a, b) { return new Date(b.date) - new Date(a.date); })
    .slice(0, limit || 20);
});
