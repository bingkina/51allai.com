import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { normalizeArticleSources } = require('../scripts/article-sources.js');

test('normalizes valid article sources', () => {
  assert.deepEqual(normalizeArticleSources([{
    name: ' 官方公告 ',
    url: 'https://example.com/news',
    note: ' 一手资料 '
  }]), [{
    name: '官方公告',
    url: 'https://example.com/news',
    note: '一手资料'
  }]);
});

test('rejects unsafe or incomplete article sources', () => {
  assert.throws(() => normalizeArticleSources([{ name: '错误链接', url: 'javascript:alert(1)' }]));
  assert.throws(() => normalizeArticleSources([{ name: '', url: 'https://example.com/' }]));
  assert.throws(() => normalizeArticleSources([{ name: '带凭据', url: 'https://user:pass@example.com/' }]));
});

test('templates expose sources and topic collections to users and crawlers', async () => {
  const [article, head, topic, scaffold] = await Promise.all([
    readFile(new URL('../themes/vivia/layout/_partial/article.ejs', import.meta.url), 'utf8'),
    readFile(new URL('../themes/vivia/layout/_partial/head.ejs', import.meta.url), 'utf8'),
    readFile(new URL('../themes/vivia/layout/topic.ejs', import.meta.url), 'utf8'),
    readFile(new URL('../scaffolds/post.md', import.meta.url), 'utf8'),
  ]);

  assert.match(article, /partial\('post\/sources'/);
  assert.match(head, /articleSchema\.citation = citations/);
  assert.match(head, /page\.layout === 'topic'/);
  assert.match(topic, /data-pagefind-body/);
  assert.match(scaffold, /^sources: \[\]$/m);
});
