# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hexo 8.1.1 static site blog (site: 51allai.com) hosted on **Cloudflare Pages**, focused on AI news and technology coverage, written in Chinese (zh-CN). It uses the **Vivia** theme with custom extensions.

## Common Commands

- `npx hexo server` — start local dev server (default: http://localhost:4000)
- `npx hexo generate` — build static files to `public/`
- `npx hexo clean` — clear cache and generated files
- `npx hexo new "Post Title"` — create a new post from scaffold
- `npm run publish` — full publish pipeline: clean → generate → algolia index → IndexNow submit → Baidu submit → git commit & push (requires `.env` with `HEXO_ALGOLIA_INDEXING_KEY`)

## Architecture

### Content

- **Posts** live in `source/_posts/` as Markdown files. The default scaffold (`scaffolds/post.md`) sets category to `AI资讯` and expects `tags` in frontmatter. The scaffold also includes an embedded SEO prompt template — authors paste their article content into it and let an AI generate optimized `permalink`, `categories`, `tags`, and `description` values.
- **Drafts**: `scaffolds/draft.md` is a minimal scaffold for draft posts (no permalink, no SEO prompt). Use `npx hexo new draft "Title"` or manually create drafts in `source/_drafts/`.
- **Static assets** (avatar, social icons, QR codes) are in `source/`.
- **Permalink pattern**: `posts/:year/:month/:slug/` (configured in `_config.yml`). However, Hexo 8's `:slug` is overridden by the filename, so each post **must** set an explicit `permalink` field in its frontmatter to get the desired short English slug.
- **Pretty URLs**: `trailing_index: false` and `trailing_html: false` are set to remove `index.html` and `.html` suffixes, preventing GSC "Duplicate without canonical" issues.
- **Robots**: `source/robots.txt` allows all crawlers, blocks pagination/search/query pages to save crawl budget, and points to sitemap + atom feed.

### Theme & Configuration

- Theme: `vivia` (installed via npm). Theme-specific config is in `_config.vivia.yml` (sidebar widgets, social links, analytics, appearance hue).
- Main site config is in `_config.yml`.
- **Local theme overrides** in `themes/vivia/` take priority over the npm package. The custom `themes/vivia/layout/_partial/head.ejs` handles comprehensive SEO: canonical URL, meta description/keywords/robots, Open Graph (with og:image fallback chain: cover → photos → body first image → avatar), Twitter Card, JSON-LD structured data (WebSite for homepage with SearchAction, NewsArticle for posts with publisher/author/breadcrumbs). If you need to add new meta tags, edit this file or use a `head_end` injector.

### Custom Scripts (`scripts/`)

Six Hexo plugins extend the theme:

1. **`algolia-search.js`** — Injects an Algolia InstantSearch modal (search box + results) into every page via `body_end` injector. Uses Algolia config from `_config.yml`.
2. **`image-icon.js`** — Converts image filenames in `<i class="...">` tags to `<img>` tags, enabling custom PNG icons for social links (the theme only supports Font Awesome by default).
3. **`link-qrcode.js`** — Adds hover-triggered QR code popups to social link buttons configured with a `qrcode` field in `_config.vivia.yml`.
4. **`check-duplicate-permalinks.js`** — Fails the build (`before_generate`) if two posts resolve to the same path, preventing silent overwrites.
5. **`related-posts.js`** — Registers a `related_posts` helper that scores other posts by shared tag count, sorts by score then date, returns Top N. Only uses tags (not categories) since all posts belong to the single "AI资讯" category. Also injects CSS for the related posts card and a `body_end` injector that renders the related posts HTML at the bottom of each post page.
6. **`seo-enhance.js`** — Two features: (a) `first_content_image` helper extracts the first `<img>` URL from post content for og:image fallback; (b) `after_post_render` filter injects `fetchpriority="high"` on the first image (LCP candidate) and `loading="lazy"` + `decoding="async"` on subsequent images.

### Hosting & Redirects

- Hosted on **Cloudflare Pages**. The `source/_redirects` file uses Cloudflare's redirect syntax.
- Note: `_redirects` must be explicitly listed in `_config.yml` under `include:` because Hexo ignores underscore-prefixed files by default.
- The site migrated from long Chinese-title URLs (`/posts/YYYY/MM/DD/<中文标题>/`) to short English slugs (`/posts/YYYY/MM/<slug>/`). Old URLs are 301-redirected in `_redirects`. When renaming a post's permalink, add the old → new mapping there.
- **WordPress legacy paths**: Old tag/category URLs (`/archives/tag/...`, `/archives/category/...`) are 301-redirected to matching new tag pages or fallback to `/archives/`. Year archive paths (`/archives/2024/`, etc.) are preserved as static pages via 200 rewrites.
- Old WordPress archive URLs (`/archives/<id>`) are handled by `functions/archives/[id].js` — a Cloudflare Pages Function that returns HTTP 410 Gone for old WordPress post IDs (1-3 digit numbers, max 904), fixing Google Search Console "soft 404" issues. Non-numeric paths fall through to static asset handling.

### Search & SEO

- **Algolia search**: `hexo-algoliasearch` plugin syncs content to Algolia index `51allai`. The admin API key must be set via env var `HEXO_ALGOLIA_INDEXING_KEY` (never in config files). The local search also generates `search.xml` via `hexo-generator-search`.
- **Sitemap**: generated at `/sitemap.xml` via `hexo-generator-sitemap`. `updated_option: date` is set so that `lastmod` uses the post's `date` field, not file mtime.
- **RSS**: Atom feed at `/atom.xml` via `hexo-generator-feed`.
- **IndexNow**: `hexo-indexnow` plugin generates a key file and URL list during build. The publish pipeline submits URLs to `indexnow.org` via `.tools/submit-indexnow.js` for instant indexing by Bing/Yandex/Google.
- **Baidu**: Baidu does not support IndexNow, so `.tools/submit-baidu.js` reads URLs from `sitemap.xml` and submits them to Baidu's push API (`data.zz.baidu.com`). The token is configured in `_config.yml` under `baidu_url_submit`.
- **Analytics**: Google Analytics (`G-47C29C0P6D`) and Baidu Analytics are configured in `_config.vivia.yml`.

### Environment Variables (`.env`)

The `.env` file (gitignored) provides:
- `HEXO_ALGOLIA_INDEXING_KEY` — Required for `hexo algolia` to write to the Algolia index (read by hexo-algoliasearch 2.x). Set this to your Algolia admin API key.
- `ALGOLIA_APP_ID` / `ALGOLIA_INDEX_NAME` — Optional, can override `_config.yml` values

Copy `.env.example` to `.env` and fill in real values before running `npm run publish`.

### Deployment & SEO Tools (`.tools/`)

- **`submit-indexnow.js`** — Reads the latest post URLs from `public/sitemap.xml` and submits them to `indexnow.org` for instant indexing by Bing/Yandex/Google. Called by the publish pipeline.
- **`submit-baidu.js`** — Reads the latest post URLs from `public/sitemap.xml` and submits them to Baidu's active push API (`data.zz.baidu.com`). Baidu does not support IndexNow, so this is a separate script. The token and count are configured in `_config.yml` under `baidu_url_submit`.
- **`upload-r2.sh`** — Uploads images to Cloudflare R2 (bucket: `51allai-images`, domain: `https://images.51allai.com`) via `rclone`, renames with timestamps, and copies the resulting Markdown image URL to clipboard. Usage: `image <path-to-image>`.

## Writing Posts

Posts use this frontmatter structure:
```yaml
---
title: Post Title
permalink: posts/YYYY/MM/SLUG/
date: 2026-04-19 12:00:00
categories: 
tags: [tag1, tag2]
description: # 推荐：1-2 句话摘要，120-155 字符，用作 SERP snippet 与 og:description
cover: # 可选：封面图绝对 URL（1200x630 最佳），留空则自动取正文第一张图
---
```

The `permalink` field is **required** — set `YYYY/MM` to the publish year/month and `SLUG` to a lowercase, hyphen-separated English slug (3–6 words, e.g. `anthropic-claude-opus-4-7`). Without it, Hexo falls back to the Chinese filename, producing unwieldy encoded URLs.

The `description` field is recommended — a 1–2 sentence summary (120-155 characters) used as the SERP snippet and `og:description`. If left empty, it falls back to truncating the first 160 characters of the post content, which may cut off mid-sentence.

The post scaffold (`scaffolds/post.md`) includes an embedded SEO prompt template — paste article content into it and let an AI generate optimized `permalink`, `categories`, `tags`, and `description` values. Available categories: 多模态、大模型、行业观察、智能体.

### Image Workflow

Use `.tools/upload-r2.sh` to upload images to Cloudflare R2. Usage: `bash .tools/upload-r2.sh <path-to-image>`. The script renames with a timestamp, uploads to `https://images.51allai.com/blog/`, and copies the Markdown image URL to clipboard.

## Deployment Model

Deployment is triggered by git push to the remote, which auto-builds on Cloudflare Pages:

1. Run `npm run publish` locally (sources `.env`, cleans, generates, syncs Algolia index, submits to IndexNow + Baidu, commits with message "更新博客", pushes)
2. Cloudflare Pages detects the push and rebuilds the static site (build command configured in Cloudflare Pages dashboard, typically `npm run build`)
3. The `_redirects` file and `functions/` directory are processed by Cloudflare Pages at deploy time

There is **no testing framework** configured. The primary quality gate is `check-duplicate-permalinks.js` which fails the build on path conflicts.
