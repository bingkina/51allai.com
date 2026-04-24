# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hexo-based blog (site: 51allai.com) hosted on **Cloudflare Pages**, focused on AI news and technology coverage, written in Chinese (zh-CN). It uses the **Vivia** theme with custom extensions.

## Common Commands

- `npx hexo server` — start local dev server (default: http://localhost:4000)
- `npx hexo generate` — build static files to `public/`
- `npx hexo clean` — clear cache and generated files
- `npx hexo new "Post Title"` — create a new post from scaffold
- `npm run publish` — full publish pipeline: clean → generate → algolia index → git commit & push (requires `.env` with `HEXO_ALGOLIA_INDEXING_KEY`)

## Architecture

### Content

- **Posts** live in `source/_posts/` as Markdown files. The default scaffold (`scaffolds/post.md`) sets category to `AI资讯` and expects `tags` in frontmatter.
- **Static assets** (avatar, social icons, QR codes) are in `source/`.
- **Permalink pattern**: `posts/:year/:month/:slug/` (configured in `_config.yml`). However, Hexo 8's `:slug` is overridden by the filename, so each post **must** set an explicit `permalink` field in its frontmatter to get the desired short English slug.

### Theme & Configuration

- Theme: `vivia` (installed via npm). Theme-specific config is in `_config.vivia.yml` (sidebar widgets, social links, analytics, appearance hue).
- Main site config is in `_config.yml`.

### Custom Scripts (`scripts/`)

Four Hexo plugins extend the theme:

1. **`algolia-search.js`** — Injects an Algolia InstantSearch modal (search box + results) into every page via `body_end` injector. Uses Algolia config from `_config.yml`.
2. **`image-icon.js`** — Converts image filenames in `<i class="...">` tags to `<img>` tags, enabling custom PNG icons for social links (the theme only supports Font Awesome by default).
3. **`link-qrcode.js`** — Adds hover-triggered QR code popups to social link buttons configured with a `qrcode` field in `_config.vivia.yml`.
4. **`check-duplicate-permalinks.js`** — Fails the build (`before_generate`) if two posts resolve to the same path, preventing silent overwrites.

### Hosting & Redirects

- Hosted on **Cloudflare Pages**. The `source/_redirects` file uses Cloudflare's redirect syntax.
- The site migrated from long Chinese-title URLs (`/posts/YYYY/MM/DD/<中文标题>/`) to short English slugs (`/posts/YYYY/MM/<slug>/`). Old URLs are 301-redirected in `_redirects`. When renaming a post's permalink, add the old → new mapping there.
- Old WordPress archive URLs (`/archives/<id>`) are 301-redirected to the homepage, with explicit 200 rewrites to preserve Hexo's actual `/archives/YYYY/` pages.

### Search & SEO

- **Algolia search**: `hexo-algoliasearch` plugin syncs content to Algolia index `51allai`. The admin API key must be set via env var `HEXO_ALGOLIA_INDEXING_KEY` (never in config files).
- **Sitemap**: generated at `/sitemap.xml` via `hexo-generator-sitemap`. `updated_option: date` is set so that `lastmod` uses the post's `date` field, not file mtime.
- **RSS**: Atom feed at `/atom.xml` via `hexo-generator-feed`.
- **Analytics**: Google Analytics (`G-47C29C0P6D`) and Baidu Analytics are configured in `_config.vivia.yml`.

## Writing Posts

Posts use this frontmatter structure:
```yaml
---
title: Post Title
permalink: posts/YYYY/MM/SLUG/
date: 2026-04-19 12:00:00
categories: AI资讯
tags: [tag1, tag2]
---
```

The `permalink` field is **required** — set `YYYY/MM` to the publish year/month and `SLUG` to a lowercase, hyphen-separated English slug (3–6 words, e.g. `anthropic-claude-opus-4-7`). Without it, Hexo falls back to the Chinese filename, producing unwieldy encoded URLs.
