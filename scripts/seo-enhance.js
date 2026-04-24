// SEO / Core Web Vitals 增强：
// 1) first_content_image helper：正文第一张图 URL，供 head.ejs 做 og:image fallback。
// 2) after_post_render filter：给文章正文的 <img> 注入懒加载与解码属性。
//    - 首图视为 LCP 候选，加 fetchpriority="high"，不加 loading="lazy"，避免延迟首屏。
//    - 其余图加 loading="lazy"，全部统一加 decoding="async"。
//    - 已存在对应属性则保留原值，不覆盖。

hexo.extend.helper.register('first_content_image', function (content) {
  if (!content) return '';
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
});

hexo.extend.filter.register('after_post_render', function (data) {
  if (!data.content) return data;
  let seen = false;
  data.content = data.content.replace(/<img\b([^>]*)>/gi, function (_full, attrs) {
    const hasLoading = /\bloading\s*=/i.test(attrs);
    const hasDecoding = /\bdecoding\s*=/i.test(attrs);
    const hasFetchPriority = /\bfetchpriority\s*=/i.test(attrs);
    let extra = '';
    if (!seen) {
      seen = true;
      if (!hasFetchPriority) extra += ' fetchpriority="high"';
      if (!hasDecoding) extra += ' decoding="async"';
    } else {
      if (!hasLoading) extra += ' loading="lazy"';
      if (!hasDecoding) extra += ' decoding="async"';
    }
    return '<img' + attrs + extra + '>';
  });
  return data;
});
