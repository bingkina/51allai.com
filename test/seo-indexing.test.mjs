import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const {
  NEWS_WINDOW_MS,
  formatPublicationDate,
  generateNewsSitemap,
  selectRecentPosts,
} = require('../scripts/news-sitemap.js');

const now = new Date('2026-08-25T08:00:00.000Z');
const posts = [
  {
    title: '模型 A & B <正式发布>',
    path: 'posts/2026/08/model-a-b/',
    date: new Date(now.getTime() - 60 * 60 * 1000),
  },
  {
    title: '时间窗边界文章',
    path: 'posts/2026/08/window-boundary/',
    date: new Date(now.getTime() - NEWS_WINDOW_MS),
  },
  {
    title: '超过时间窗的文章',
    path: 'posts/2026/08/too-old/',
    date: new Date(now.getTime() - NEWS_WINDOW_MS - 1),
  },
  {
    title: '未来文章',
    path: 'posts/2026/08/future/',
    date: new Date(now.getTime() + 1),
  },
  {
    title: '未发布文章',
    path: 'posts/2026/08/unpublished/',
    date: new Date(now.getTime() - 1000),
    published: false,
  },
  {
    title: '草稿',
    path: 'posts/2026/08/draft/',
    date: new Date(now.getTime() - 1000),
    layout: 'draft',
  },
];

const selected = selectRecentPosts(posts, now);
assert.deepEqual(
  selected.map((post) => post.path),
  [
    'posts/2026/08/model-a-b/',
    'posts/2026/08/window-boundary/',
  ],
  'News sitemap must contain only published posts from the inclusive 48-hour window',
);

const newsSitemap = generateNewsSitemap(posts, {
  siteUrl: 'https://51allai.com/',
  now,
});

assert.match(newsSitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
assert.match(newsSitemap, /xmlns:news="http:\/\/www\.google\.com\/schemas\/sitemap-news\/0\.9"/);
assert.match(newsSitemap, /<news:name>51AllAI<\/news:name>/);
assert.match(newsSitemap, /<news:language>zh-cn<\/news:language>/);
assert.match(newsSitemap, /<loc>https:\/\/51allai\.com\/posts\/2026\/08\/model-a-b\/<\/loc>/);
assert.match(newsSitemap, /<news:title>模型 A &amp; B &lt;正式发布&gt;<\/news:title>/);
assert.doesNotMatch(newsSitemap, /too-old|future|unpublished|draft/);
assert.equal(
  formatPublicationDate({ format: () => '2026-08-25T14:14:00+08:00' }),
  '2026-08-25T14:14:00+08:00',
  'Hexo moment dates must retain the configured publication timezone',
);

const headTemplate = await readFile(
  new URL('../themes/vivia/layout/_partial/head.ejs', import.meta.url),
  'utf8',
);
assert.match(headTemplate, /var shouldNoindex = is_tag\(\) \|\| isTagIndexPage/);
assert.match(headTemplate, /content="noindex, follow"/);
assert.match(headTemplate, /content="index, follow, max-image-preview:large/);

const tagIndex = await readFile(new URL('../source/tags/index.md', import.meta.url), 'utf8');
assert.match(tagIndex, /^sitemap: false$/m);

const hexoConfig = await readFile(new URL('../_config.yml', import.meta.url), 'utf8');
assert.match(hexoConfig, /sitemap:\n(?:.*\n)*?\s+tags: false/);

const themeConfig = await readFile(new URL('../_config.vivia.yml', import.meta.url), 'utf8');
assert.match(themeConfig, /^recent_posts_limits: 10$/m);

const robots = await readFile(new URL('../source/robots.txt', import.meta.url), 'utf8');
assert.match(robots, /^Sitemap: https:\/\/51allai\.com\/news-sitemap\.xml$/m);
assert.doesNotMatch(robots, /^Disallow: \/tags\//m);
