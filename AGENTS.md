# AGENTS.md

本文件面向 Codex 等代码代理，说明在本仓库中工作时需要优先遵守的项目约定、命令和注意事项。

## 项目概览

这是 `51allai.com` 的 Hexo 静态博客项目，主要发布中文 AI 新闻与技术观察文章。站点使用 Hexo `8.1.1`，主题为 `vivia`，部署在 Cloudflare Pages。

核心特征：

- 内容语言：中文，站点语言为 `zh-CN`，时区为 `Asia/Shanghai`。
- 主题：`hexo-theme-vivia`，同时在 `themes/vivia/` 中保留本地覆盖版本。
- 部署：推送到 Git 后由 Cloudflare Pages 构建发布。
- SEO：依赖 sitemap、Atom feed、IndexNow、百度主动推送、结构化数据、canonical URL、Open Graph 和 Twitter Card。
- 搜索：Algolia 远程索引 + `hexo-generator-search` 本地 `search.xml`。

## 项目结构

```text
.
├── _config.yml                  # Hexo 主配置：站点信息、URL、permalink、搜索、sitemap、IndexNow、百度推送
├── _config.vivia.yml            # Vivia 主题配置：导航、头像、社交链接、侧栏、统计
├── package.json                 # npm 脚本与依赖
├── package-lock.json            # 锁定依赖版本
├── scaffolds/                   # Hexo 新建内容模板
│   ├── post.md                  # 正式文章模板
│   ├── draft.md                 # 草稿模板
│   └── page.md                  # 页面模板
├── scripts/                     # 本站自定义 Hexo 插件
│   ├── algolia-search.js        # 注入 Algolia 搜索弹窗
│   ├── check-duplicate-permalinks.js
│   ├── image-icon.js            # 社交图标图片转换
│   ├── link-qrcode.js           # 社交链接二维码悬浮层
│   ├── related-posts.js         # 相关文章 helper 与注入
│   └── seo-enhance.js           # 首图/懒加载/og:image 辅助
├── source/                      # Hexo 源内容与静态资源
│   ├── _posts/                  # 已发布文章 Markdown
│   ├── _redirects               # Cloudflare Pages 重定向规则
│   ├── robots.txt
│   ├── search/index.md
│   ├── about/index.md
│   └── *.png, *.txt, *.html     # 头像、社交图标、验证文件、404 等静态文件
├── themes/vivia/                # 本地主题覆盖，优先于 npm 包主题
│   ├── layout/                  # EJS 模板
│   ├── source/css/              # Stylus 样式
│   └── scripts/                 # 主题自身脚本
├── functions/                   # Cloudflare Pages Functions
│   └── archives/[id].js         # 旧 WordPress 数字归档 URL 返回 410
├── .tools/                      # 发布辅助脚本
│   ├── submit-indexnow.js
│   ├── submit-baidu.js
│   └── upload-r2.sh
└── patches/                     # patch-package 补丁
    └── hexo-algoliasearch+2.0.1.patch
```

生成物与缓存：

- `public/` 是 `hexo generate` 的输出目录，不要手工维护。
- `db.json` 是 Hexo 缓存文件，通常不需要编辑。
- `node_modules/` 不应提交。

## 常用开发命令

```bash
npm install
```

安装依赖，并通过 `postinstall` 自动执行 `patch-package`。当前补丁用于提高 `hexo-algoliasearch` 请求超时时间。

```bash
npm run server
```

启动本地开发服务器，默认地址为 `http://localhost:4000`。

```bash
npm run build
```

生成静态文件到 `public/`。这是最重要的本地质量检查命令。

```bash
npm run clean
```

清理 Hexo 缓存与生成文件。

```bash
npx hexo new "文章标题"
npx hexo new draft "草稿标题"
```

分别创建正式文章与草稿。正式文章会使用 `scaffolds/post.md`，草稿会使用 `scaffolds/draft.md`。

```bash
npm run publish
```

完整发布流水线：加载 `.env`、清理、生成、同步 Algolia、提交 IndexNow、提交百度、`git add .`、提交并推送。只有在用户明确要求发布时才运行，因为它会联网、提交并推送。

## 测试与验证

本仓库没有独立测试框架。主要验证方式是 Hexo 构建：

```bash
npm run build
```

构建过程中会触发 `scripts/check-duplicate-permalinks.js`，若文章或页面最终路径冲突，构建会失败。

按改动类型选择额外验证：

- 修改 Hexo 配置、主题模板、脚本、文章 frontmatter 后，至少运行 `npm run build`。
- 修改页面交互或样式后，运行 `npm run server`，在浏览器检查首页、文章页、归档页、标签页和移动端布局。
- 修改 `functions/archives/[id].js` 后，应按 Cloudflare Pages Functions 语义检查 `/archives/<数字>` 返回 410，非数字归档路径继续交给静态资源或 `_redirects`。
- 修改 `_redirects` 后，应确认旧 URL 到新 URL 的 301/200 规则顺序没有被更宽泛的规则提前吞掉。
- 修改 `.tools/submit-*.js` 只在需要验证发布推送时运行；这些脚本会访问外部服务。

## 内容写作约定

正式文章位于 `source/_posts/`。推荐 frontmatter：

```yaml
---
title: Post Title
permalink: posts/YYYY/MM/slug/
date: 2026-04-19 12:00:00
categories:
tags: [tag1, tag2]
description:
cover:
---
```

关键要求：

- `permalink` 必须显式设置，格式为 `posts/YYYY/MM/slug/`。
- slug 使用小写英文、数字和连字符，建议 3-6 个词。
- 不要依赖 Hexo 默认 `:slug`，否则中文文件名会变成很长的编码 URL。
- `description` 建议写 120-155 个中文字符左右，用作 SERP snippet 和 `og:description`。
- `cover` 可为空；为空时 SEO 模板会按正文首图、头像等链路回退。
- 分类建议使用当前内容体系中的大类，例如 `多模态`、`大模型`、`行业观察`、`智能体`。
- 文章正文以中文为主，面向 AI 资讯与技术情报读者，标题与摘要应具体、可检索。

如果修改文章的既有 `permalink`，必须在 `source/_redirects` 添加旧 URL 到新 URL 的 301 映射，避免搜索流量和外链断裂。

## 图片与静态资源

- 普通静态资源放在 `source/`。
- 文章图片优先上传到 Cloudflare R2，使用：

```bash
bash .tools/upload-r2.sh <path-to-image>
```

脚本会上传到 `https://images.51allai.com/blog/` 并复制 Markdown 图片地址到剪贴板。

## 代码风格

JavaScript：

- 使用 CommonJS 风格的脚本保持现状，除 Cloudflare Pages Functions 使用 ESM `export`。
- 缩进为两个空格。
- 变量优先使用 `const`，需要重新赋值时使用 `let`。
- 现有 Hexo 插件通常通过 `hexo.extend.helper/filter/injector.register` 扩展，不额外引入框架。
- 字符串拼接、正则解析等应保持简单清晰；若逻辑变复杂，优先拆出小函数。
- 面向构建失败的校验应给出可操作的中文错误信息。

模板与样式：

- 主题模板位于 `themes/vivia/layout/`，使用 EJS。
- 样式位于 `themes/vivia/source/css/`，使用 Stylus。
- 本地 `themes/vivia/` 覆盖优先于 npm 包主题；修改主题行为时优先改本地覆盖文件。
- SEO meta、canonical、Open Graph、Twitter Card、JSON-LD 主要集中在 `themes/vivia/layout/_partial/head.ejs`。

Markdown：

- 保持 frontmatter 字段稳定，避免无意义重排。
- 中文正文可以使用中文标点；代码、URL、产品型号保持原文。
- 不要在文章中写入密钥、私有 token 或未确认来源的敏感信息。

## SEO 与搜索注意事项

- `_config.yml` 中 `pretty_urls.trailing_index: false` 和 `trailing_html: false` 用于减少重复 URL，不要随意改动。
- `_config.yml` 的 `updated_option: date` 让 sitemap `lastmod` 使用文章发布日期，避免批量改文件导致搜索引擎误判全部更新。
- `source/_redirects` 必须列在 `_config.yml` 的 `include:` 中，因为 Hexo 默认忽略下划线开头文件。
- Algolia 写入密钥应来自 `.env` 的 `HEXO_ALGOLIA_INDEXING_KEY`，不要把管理密钥写入仓库配置。
- `scripts/seo-enhance.js` 会给正文图片注入首图优先级和懒加载属性，修改图片 HTML 处理时要避免破坏 LCP 优化。
- `scripts/related-posts.js` 只按共享标签计算相关文章，因为本站分类维度区分度较低。

## 部署与发布注意事项

- 常规改动不要直接运行 `npm run publish`，除非用户明确要求发布。
- `npm run publish` 会执行 `git add .`、提交信息 `更新博客`、并推送远端。
- Cloudflare Pages 会在远端推送后自动构建。`functions/` 与 `_redirects` 在 Cloudflare Pages 部署阶段生效。
- `.env` 被 git 忽略，用于本地发布密钥；不要提交真实密钥。
- `.tools/submit-indexnow.js` 读取 `public/` 中 Hexo 生成的 IndexNow 文件。
- `.tools/submit-baidu.js` 从 `public/sitemap.xml` 提取最新文章 URL 并推送到百度。

## Codex 工作守则

- 开始修改前先检查 `git status --short`，不要覆盖用户未提交的改动。
- 查找文件优先使用 `rg` / `rg --files`。
- 修改内容、配置、脚本后优先运行 `npm run build` 验证。
- 不要手工编辑 `public/` 生成物，除非任务明确要求检查构建输出。
- 不要提交、推送或发布，除非用户明确要求。
- 对 SEO、URL、重定向、发布脚本的改动要保守，优先保持现有行为。
- 添加新文章时必须确认 `permalink` 唯一，并为必要的旧地址补充 `_redirects`。
- 遇到需要联网的命令，如安装依赖、Algolia、IndexNow、百度推送、R2 上传，应先确认当前任务确实需要。
