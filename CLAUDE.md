# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hexo-based blog (site: 51allai.com) focused on AI news and technology coverage, written in Chinese (zh-CN). It uses the **Vivia** theme with custom extensions.

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
- **Permalink pattern**: `posts/:year/:month/:day/:title/`

### Theme & Configuration

- Theme: `vivia` (installed via npm). Theme-specific config is in `_config.vivia.yml` (sidebar widgets, social links, analytics, appearance hue).
- Main site config is in `_config.yml`.

### Custom Scripts (`scripts/`)

Three Hexo plugins extend the theme:

1. **`algolia-search.js`** — Injects an Algolia InstantSearch modal (search box + results) into every page via `body_end` injector. Uses Algolia config from `_config.yml`.
2. **`image-icon.js`** — Converts image filenames in `<i class="...">` tags to `<img>` tags, enabling custom PNG icons for social links (the theme only supports Font Awesome by default).
3. **`link-qrcode.js`** — Adds hover-triggered QR code popups to social link buttons configured with a `qrcode` field in `_config.vivia.yml`.

### Search & SEO

- **Algolia search**: `hexo-algoliasearch` plugin syncs content to Algolia index `51allai`. The admin API key must be set via env var `HEXO_ALGOLIA_INDEXING_KEY` (never in config files).
- **Sitemap**: generated at `/sitemap.xml` via `hexo-generator-sitemap`.
- **RSS**: Atom feed at `/atom.xml` via `hexo-generator-feed`.
- **Analytics**: Google Analytics (`G-47C29C0P6D`) and Baidu Analytics are configured in `_config.vivia.yml`.

## Writing Posts

Posts use this frontmatter structure:
```yaml
---
title: Post Title
date: 2026-04-19 12:00:00
categories: AI资讯
tags: [tag1, tag2]
---
```
