---
title: DeepSeek API 开放网页搜索与抓取，每千次成功请求 5 元
permalink: posts/2026/10/deepseek-api-search-fetch/
tags: [deepseek, ai-search, web-search, pricing, product-update]
sources:
  - name: DeepSeek 网页搜索与抓取指南
    url: https://api-docs.deepseek.com/zh-cn/guides/search/
    note: 鉴权、搜索语法、成功请求计费条件、限速与错误处理
  - name: DeepSeek Search API Reference
    url: https://api-docs.deepseek.com/zh-cn/api/search
    note: 搜索接口路径、请求参数及结构化响应
  - name: DeepSeek Fetch API Reference
    url: https://api-docs.deepseek.com/zh-cn/api/fetch
    note: 抓取接口路径、URL 要求及 Markdown 返回格式
  - name: DeepSeek API 模型与价格
    url: https://api-docs.deepseek.com/zh-cn/quick_start/pricing/
    note: 两项接口单价、模型费用与服务端工具调用计费生效时间
  - name: DeepSeek API 更新日志（2026 年 10 月 17 日）
    url: https://api-docs.deepseek.com/zh-cn/updates/
    note: 开放自研搜索 API
date: 2026-10-18 22:07:13
categories:
  - 智能体
description: DeepSeek API 开放 Search 网页搜索与 Fetch 网页抓取，两者均按每千次成功请求 5 元计费。本文梳理 API Key 接入、Markdown 正文获取、每秒请求限制，以及 Harness、Claude Code、Codex 服务端工具调用从 11 月 1 日起收费的范围。
cover: https://images.51allai.com/blog/deepseek-api-search-fetch-cover_20261018_221059.png
---
> DeepSeek API 已开放 Search 网页搜索和 Fetch 网页抓取，开发者可用现有 API Key 获取搜索结果或 Markdown 正文。两项接口单价均为每千次成功请求 5 元；Harness、Claude Code、Codex 经服务端工具调用产生的这部分费用，将从北京时间 11 月 1 日起收取。
![DeepSeek API Search 网页搜索与 Fetch Markdown 抓取流程封面](https://images.51allai.com/blog/deepseek-api-search-fetch-cover_20261018_221059.png)

## Search 找网页，Fetch 读取指定页面

DeepSeek 在 10 月 17 日开放自研搜索 API，为智能体和 RAG 应用提供实时网页内容。智能体可以调用工具完成任务；RAG 则是先检索资料，再把资料交给模型生成回答。

这次开放的是两个可以单独调用的接口：

| 接口 | 输入 | 返回内容 |
| --- | --- | --- |
| Search 网页搜索 | 搜索词 `query` | 网页标题、链接、摘要等结构化结果，可选返回正文 |
| Fetch 网页抓取 | 一个网页 URL | 页面标题和 Markdown 格式的正文 |

例如，开发者可以用 Search 查找某个软件的更新说明，再用 Fetch 读取选定页面，把正文交给模型整理。这适合接入新闻检索、技术资料问答或资料整理工具。已经拿到链接时，也可以直接调用 Fetch。

Search 返回的短摘要 `snippet` 适合展示在搜索列表里，长摘要 `summary` 适合交给模型阅读。设置 `need_content: true` 后，还可以在 `content` 字段中获取网页正文；正文缺失时，该字段仍可能为空。

## 现有 API Key 可直接调用两个接口

两个接口的基础地址都是 `https://api.deepseek.com`，沿用 DeepSeek API Key，通过 `Authorization: Bearer` 请求头鉴权。它们接收和返回 JSON，即程序可以直接读取的结构化数据。

把自己的密钥设置为环境变量 `DEEPSEEK_API_KEY` 后，可以用下面的请求搜索 DeepSeek 更新说明，并返回最多 5 条结果及可用正文：

```bash
curl https://api.deepseek.com/v1/tools/search \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "DeepSeek 更新 site:api-docs.deepseek.com",
    "count": 5,
    "need_content": true
  }'
```

`query` 长度为 1—128 个 Unicode 字符，不能全为空白；`count` 默认为 10，范围为 1—50。搜索词支持 `site:` 限定网站、`-site:` 排除网站、引号精确匹配，以及 `after:`、`before:` 限定网页发布日期等语法。具体组合方式可查看[搜索参数与语法说明](https://api-docs.deepseek.com/zh-cn/guides/search/)。

读取某个指定页面时，向 Fetch 传入链接即可：

```bash
curl https://api.deepseek.com/v1/tools/fetch \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://api-docs.deepseek.com/zh-cn/updates/"}'
```

返回对象中的 `title` 是页面标题，`content` 是 Markdown 正文。Markdown 使用标题、列表等文本标记保留内容结构，便于继续交给模型处理。Fetch 接受含主机名的 HTTP 或 HTTPS 链接，长度不超过 8192 个字符，链接中不能携带用户名或密码。

## 每次成功请求 0.005 元，结果条数不影响单次价格

Search 和 Fetch 的价格相同，都是**每 1000 次成功请求 5 元**，折合每次 0.005 元。两者按请求次数收费，不按返回结果条数或 Token 数收费。Token 是模型计量文本用量的单位。

只有 HTTP 200 且产生结果的请求才计费：Search 的 `results` 数组必须非空，Fetch 必须返回网页正文。失败、无搜索结果和超时请求不计费。把 `count` 从 5 改为 10，不会改变一次 Search 请求的单价。

按这个单价计算，**1000 次有效搜索加上 3000 次有效网页抓取，接口费用合计 20 元**。如果再调用模型阅读资料、生成回答，还会产生模型 Token 费用。模型部分可参考 [V4.1 Flash 1017 的 API 接入与峰谷价格](/posts/2026/10/deepseek-v41-flash-1017/)。

经 DeepSeek Harness、Claude Code、Codex 使用 DeepSeek API 时，服务端工具调用已经会访问 Search / Fetch。这部分调用此前未计费，将从**北京时间 2026 年 11 月 1 日 00:00**起按次收费。这个生效时间针对上述服务端工具调用；直接接入两项独立接口时，应按[搜索与抓取价目表](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)计算费用。

## 每个账号各限每秒 5 次，抓取受网站访问策略影响

Search 和 Fetch 分别按账号限制为每秒 5 次请求，两项额度互不占用，也独立于模型并发限制。同一账号更换 API Key，不会增加这项额度。Fetch 还对目标域名单独限速，超过限制会返回 HTTP 429。

Fetch 能否读到正文，取决于目标网页的可用性和访问策略。页面不可用、被网站拦截、内容类型不受支持或没有可提取正文时，可能返回 HTTP 404。

接入程序遇到 HTTP 408、429 或 5xx 错误，可以等待后重试；余额不足的 HTTP 402 需要先充值。其他 4xx 错误应先修改请求，再决定是否重试。批量检索和抓取任务需要控制请求速度，并分别记录接口调用次数与模型用量。
