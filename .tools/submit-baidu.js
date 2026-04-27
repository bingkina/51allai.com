#!/usr/bin/env node
'use strict';
/**
 * Submit latest post URLs to Baidu Webmaster via active push API.
 * Reads URLs from the generated sitemap.xml and submits the latest N pages.
 */
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const CONFIG_PATH = path.join(__dirname, '../_config.yml');

// Read config
const config = fs.readFileSync(CONFIG_PATH, 'utf8');

// Parse baidu_url_submit section
const sectionMatch = config.match(/baidu_url_submit:\s*\n((?:[ ]+.+\n)*)/);
if (!sectionMatch) {
  console.log('Baidu Push: baidu_url_submit section not found in _config.yml, skipping');
  process.exit(0);
}

const sectionLines = sectionMatch[1].split('\n').filter(Boolean);
const getValue = (key) => {
  const line = sectionLines.find(l => l.trim().startsWith(key + ':'));
  if (!line) return null;
  const value = line.split(':').slice(1).join(':');
  // 去除 YAML 注释
  return value.split('#')[0].trim();
};

const TOKEN = getValue('token');
const COUNT = parseInt(getValue('count') || '10', 10);

if (!TOKEN || TOKEN === 'YOUR_BAIDU_PUSH_TOKEN') {
  console.log('Baidu Push: Please set a real token in _config.yml (baidu_url_submit section)');
  console.log('  Get it from: https://ziyuan.baidu.com/linksubmit/index');
  process.exit(0);
}

const SITE = 'https://51allai.com';
const PUSH_URL = `http://data.zz.baidu.com/urls?site=${SITE}&token=${TOKEN}`;

// Read sitemap and extract URLs
const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('Baidu Push: sitemap.xml not found in public/');
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Extract URLs from sitemap, sorted by lastmod descending (latest first)
const urlEntries = sitemap.match(/<url>[\s\S]*?<\/url>/g) || [];
const urls = urlEntries.map(entry => {
  const locMatch = entry.match(/<loc>(.*?)<\/loc>/);
  const lastmodMatch = entry.match(/<lastmod>(.*?)<\/lastmod>/);
  return {
    url: locMatch ? locMatch[1] : '',
    lastmod: lastmodMatch ? lastmodMatch[1] : ''
  };
}).filter(e => {
  // 只推送文章页（排除首页、标签、分类、分页、搜索等）
  if (!e.url) return false;
  const u = new URL(e.url, 'https://dummy');
  return u.pathname.startsWith('/posts/');
});

// Sort by date descending and take top N
urls.sort((a, b) => b.lastmod.localeCompare(a.lastmod));
const urlsToSubmit = urls.slice(0, COUNT).map(e => e.url);

if (urlsToSubmit.length === 0) {
  console.log('Baidu Push: No URLs to submit');
  process.exit(0);
}

console.log(`Baidu Push: Submitting ${urlsToSubmit.length} URL(s) to Baidu`);
urlsToSubmit.forEach(u => console.log(`  - ${u}`));

// Baidu expects newline-separated URLs in the request body
const body = urlsToSubmit.join('\n');

fetch(PUSH_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: body
}).then(res => res.json()).then(data => {
  if (data.success !== undefined) {
    console.log(`Baidu Push: Success — ${data.success} submitted, ${data.remain} remaining today`);
    if (data.not_same) console.log(`  not_same: ${data.not_same}`);
    if (data.error) console.error(`  error: ${data.error} — message: ${data.message}`);
  } else if (data.error) {
    console.error(`Baidu Push: Error — ${data.error}: ${data.message}`);
    process.exit(0);
  } else {
    console.log('Baidu Push: Response:', JSON.stringify(data));
  }
}).catch(err => {
  console.error('Baidu Push: Request failed:', err.message);
  process.exit(0);
});
