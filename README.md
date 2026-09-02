# 51AllAI

51AllAI 是一个基于 Hexo 的中文 AI 科技媒体站点，关注人工智能前沿动态、技术产品和行业应用，覆盖大语言模型、多模态、AI 智能体等方向。

线上站点：[51allai.com](https://51allai.com)

## 项目特性

- 基于 [Hexo](https://hexo.io/) 8 和 [Vivia](https://github.com/saicaca/hexo-theme-vivia) 主题构建。
- 使用 `themes/vivia/` 保存主题本地覆盖，便于维护站点专属布局、样式和交互。
- 支持文章、分类、标签、归档、Atom Feed、站点地图、Pagefind 站内搜索和机器可读的 `search.xml`。
- 集成 Pagefind 静态搜索索引、IndexNow 和百度主动推送脚本。
- 通过 Cloudflare Pages Functions 提供 HTML/Markdown 内容协商、旧归档地址处理和 Agent 发现能力。
- 提供 WebMCP、API catalog、OpenAPI 和 `.well-known` 发现文件，方便工具和 Agent 读取站点能力。
- 站点使用中文（`zh-CN`）和 Asia/Shanghai 时区，URL 采用无 `.html` 的固定 permalink。

## 环境要求

- Node.js 20.19.0 或更高版本
- npm

项目依赖已经记录在 `package-lock.json` 中。首次安装：

```bash
npm install
```

## 常用命令

```bash
# 生成静态文件及 Pagefind 索引到 public/
npm run build

# 清理 Hexo 缓存和生成文件
npm run clean

# 启动本地预览服务器，默认 http://localhost:4000
npm run server

# 运行仓库测试
node --test test/*.test.mjs

# 创建正式文章或草稿
npx hexo new "文章标题"
npx hexo new draft "草稿标题"
```

普通 `npm run build` 不会生成 `source/_drafts/` 中的草稿。需要预览草稿时使用：

```bash
npx hexo generate --draft
```

`public/` 和 `db.json` 是构建生成物或缓存，不应手工维护，也不应提交到 Git。

## 目录说明

```text
.
├── _config.yml              # Hexo 主配置
├── _config.vivia.yml        # Vivia 主题配置
├── scaffolds/                # 文章、草稿和页面模板
├── source/_posts/            # 已发布文章源码
├── source/_drafts/           # 未发布草稿
├── source/api/               # 公开 API 文档和 OpenAPI 描述
├── source/.well-known/       # Agent、MCP、OAuth、DNS-AID 等发现文件
├── themes/vivia/             # 主题本地覆盖
├── scripts/                  # Hexo 插件和构建增强脚本
├── functions/                # Cloudflare Pages Functions
├── test/                     # Node.js 内置测试
└── .tools/                   # 索引推送和图片上传辅助脚本
```

## 内容开发约定

文章放在 `source/_posts/`，草稿放在 `source/_drafts/`。文章 frontmatter 应显式设置 permalink，例如：

```yaml
---
title: 文章标题
permalink: posts/2026/08/example-title/
date: 2026-08-08 12:00:00
categories:
  - 大模型
tags:
  - AI
description: 面向搜索摘要的中文文章简介。
cover:
---
```

修改既有文章的 permalink 时，应在 `source/_redirects` 中补充旧地址到新地址的 301 规则。新增文章后建议至少执行 `npm run build`，确认 permalink 不冲突、页面可以生成、SEO 元数据正常。

文章图片优先使用 Cloudflare R2。上传脚本会返回可用于文章 frontmatter 或正文的 URL：

```bash
bash .tools/upload-r2.sh path/to/image.png
```

上传脚本需要本地环境变量或 `.env` 中配置对应凭据；不要把密钥写入仓库。

## 配置和发布

站点配置位于 `_config.yml` 和 `_config.vivia.yml`。URL 推送使用的密钥应通过环境变量提供，不能写入配置文件或提交到 Git。Pagefind 索引在 `npm run build` 中根据生成后的文章 HTML 自动创建，不需要外部搜索服务或密钥；机器和 Agent 仍可通过 `search.xml` 读取文章目录。发布前应先完成本地构建和测试，并确认所有需要发布的文章位于 `source/_posts/`。

`npm run publish` 是完整发布流水线，会清理并生成站点及 Pagefind 索引、执行 URL 推送，然后提交并推送 Git。它会产生外部服务和 Git 状态变更，仅应在明确确认发布范围后执行。

常规代码或内容修改只需构建验证：

```bash
npm run build
node --test test/*.test.mjs
```

推送到 Git 后，Cloudflare Pages 负责构建和部署；Pages 项目的构建命令应为 `npm run build`，输出目录为 `public`。

## 许可与第三方内容

除另有说明外，本仓库中由 51ALLAI 编写的源码、配置、构建脚本和文档以 [MIT License](./LICENSE) 发布。

`themes/vivia/` 包含基于 Vivia 的本地主题文件，其上游许可和版权声明见 [`themes/vivia/LICENSE`](./themes/vivia/LICENSE)。npm 依赖、字体、图标、文章、图片、Logo、社交账号素材和其他品牌内容可能受各自权利人的许可或使用条款约束，不因本仓库采用 MIT License 而自动获得再发布或商用授权。

## 贡献

提交修改前，请先检查工作区状态，避免覆盖已有改动；完成后运行与改动范围相符的测试和构建。涉及发布、部署、索引推送或 Git 提交的操作，请单独确认后再执行。
