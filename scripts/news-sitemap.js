'use strict';

const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000;
const PUBLICATION_NAME = '51AllAI';
const PUBLICATION_LANGUAGE = 'zh-cn';

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeSiteUrl(siteUrl) {
  return String(siteUrl || '').replace(/\/$/, '');
}

function buildPostUrl(siteUrl, postPath) {
  return normalizeSiteUrl(siteUrl) + '/' + String(postPath || '').replace(/^\/+/, '');
}

function formatPublicationDate(date) {
  if (date && typeof date.format === 'function') {
    return date.format('YYYY-MM-DDTHH:mm:ssZ');
  }

  return new Date(date).toISOString();
}

function selectRecentPosts(posts, now) {
  const currentTime = new Date(now).getTime();
  const cutoff = currentTime - NEWS_WINDOW_MS;

  return posts
    .filter(function (post) {
      if (!post || !post.date || !post.path || !post.title) return false;
      if (post.published === false || post.layout === 'draft') return false;

      const publishedAt = new Date(post.date).getTime();
      return Number.isFinite(publishedAt) && publishedAt <= currentTime && publishedAt >= cutoff;
    })
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 1000);
}

function generateNewsSitemap(posts, options) {
  const siteUrl = options.siteUrl;
  const now = options.now || new Date();
  const recentPosts = selectRecentPosts(posts, now);

  const entries = recentPosts.map(function (post) {
    return [
      '  <url>',
      '    <loc>' + escapeXml(buildPostUrl(siteUrl, post.path)) + '</loc>',
      '    <news:news>',
      '      <news:publication>',
      '        <news:name>' + escapeXml(PUBLICATION_NAME) + '</news:name>',
      '        <news:language>' + PUBLICATION_LANGUAGE + '</news:language>',
      '      </news:publication>',
      '      <news:publication_date>' + formatPublicationDate(post.date) + '</news:publication_date>',
      '      <news:title>' + escapeXml(post.title) + '</news:title>',
      '    </news:news>',
      '  </url>'
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">',
    entries.join('\n'),
    '</urlset>',
    ''
  ].join('\n');
}

if (typeof hexo !== 'undefined') {
  hexo.extend.generator.register('news-sitemap', function (locals) {
    return {
      path: 'news-sitemap.xml',
      data: generateNewsSitemap(locals.posts.toArray(), {
        siteUrl: this.config.url,
        now: new Date()
      })
    };
  });
}

module.exports = {
  NEWS_WINDOW_MS,
  escapeXml,
  formatPublicationDate,
  generateNewsSitemap,
  selectRecentPosts
};
