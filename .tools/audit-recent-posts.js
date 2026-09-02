#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const POSTS_DIR = path.join(process.cwd(), 'source', '_posts');
const DEFAULT_DAYS = 30;
const INTERNAL_HOSTS = new Set(['51allai.com', 'www.51allai.com', 'images.51allai.com']);

function readFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return { attributes: {}, body: source };

  const attributes = {};
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (!field) continue;
    attributes[field[1]] = field[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }

  return { attributes, body: source.slice(match[0].length) };
}

function getExternalReferences(body) {
  const withoutImages = body.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const urls = withoutImages.match(/https?:\/\/[^\s)>"']+/g) || [];

  return [...new Set(urls.filter((value) => {
    try {
      return !INTERNAL_HOSTS.has(new URL(value).hostname.toLowerCase());
    } catch {
      return false;
    }
  }))];
}

function auditPost(filePath, now, days) {
  const source = fs.readFileSync(filePath, 'utf8');
  const { attributes, body } = readFrontmatter(source);
  const publishedAt = new Date(attributes.date);
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  if (!attributes.date || Number.isNaN(publishedAt.getTime())) return null;
  if (publishedAt < cutoff || publishedAt > now) return null;

  // 将 frontmatter 的 sources 一并纳入检查；封面域名仍会被 INTERNAL_HOSTS 排除。
  const externalReferences = getExternalReferences(source);
  const internalPostLinks = body.match(/\]\(\/posts\/[^)]+\)/g) || [];
  const hasImpactOrComparison = /^##+\s+.*(?:影响|相比|对比|变化|意味着|怎么选|如何选择|用户|开发者|从.+(?:升级|转|延伸)|重心|注意|适合|调用前)/m.test(body);

  return {
    date: attributes.date.slice(0, 10),
    title: attributes.title || path.basename(filePath, '.md'),
    permalink: attributes.permalink || '',
    externalReferences,
    internalPostLinks: internalPostLinks.length,
    hasImpactOrComparison
  };
}

function main() {
  const days = Number.parseInt(process.argv[2] || DEFAULT_DAYS, 10);
  if (!Number.isInteger(days) || days <= 0) {
    throw new Error('天数必须是正整数，例如：npm run audit:recent-posts -- 30');
  }

  const now = new Date();
  const posts = fs.readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => auditPost(path.join(POSTS_DIR, name), now, days))
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date));

  const missingReference = posts.filter((post) => post.externalReferences.length === 0);
  const missingImpact = posts.filter((post) => !post.hasImpactOrComparison);
  const missingInternalLink = posts.filter((post) => post.internalPostLinks === 0);

  console.log(`近 ${days} 天正式文章：${posts.length} 篇`);
  console.log(`无外部参考链接候选：${missingReference.length} 篇`);
  console.log(`无影响/对比类二级标题：${missingImpact.length} 篇`);
  console.log(`无正文站内文章链接：${missingInternalLink.length} 篇`);
  console.log('');
  console.log('说明：外部链接仅用于筛出待人工核验项，仍需确认它是否为官方或第一方来源。');

  if (missingReference.length > 0) {
    console.log('');
    console.log('需要补充或核验外部来源的文章：');
    for (const post of missingReference) {
      console.log(`- ${post.date} ${post.title} (${post.permalink})`);
    }
  }

  if (missingImpact.length > 0) {
    console.log('');
    console.log('需要人工检查影响/版本差异表达的文章：');
    for (const post of missingImpact) {
      console.log(`- ${post.date} ${post.title} (${post.permalink})`);
    }
  }
}

if (require.main === module) main();

module.exports = { auditPost, getExternalReferences, readFrontmatter };
