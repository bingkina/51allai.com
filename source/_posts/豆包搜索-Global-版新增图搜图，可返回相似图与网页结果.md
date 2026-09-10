---
title: 豆包搜索 Global 版新增图搜图，可返回相似图与网页结果
permalink: posts/2026/09/doubao-search-visual-search/
tags: [bytedance, doubao, ai-search, product-update, web-search]
sources:
  - name: 火山引擎豆包搜索新功能发布记录
    url: https://docs.volcengine.com/docs/87772/2272950?lang=zh
    note: 2026 年 9 月 Global 版新增图搜图
  - name: 火山引擎豆包搜索 Global 版 API 文档
    url: https://docs.volcengine.com/docs/87772/2548026?lang=zh
    note: 图搜请求参数、返回字段、限流与免费额度
  - name: 火山引擎豆包搜索产品计费
    url: https://docs.volcengine.com/docs/87772/2272951?lang=zh
    note: Global 版计费方式
date: 2026-09-10 11:27:49
categories:
  - 智能体
description: 豆包搜索 Global 版在 2026 年 9 月新增图搜图：开发者可用图片 URL 或 Base64 发起检索，并获得相似图片、网页标题、URL 与站点信息。本文梳理请求字段、返回结构和调用边界。
cover: https://images.51allai.com/blog/doubao-search-visual-search-cover_20260910_113248.png
---
> 豆包搜索 Global 版在 2026 年 9 月新增图搜图。开发者可以把图片 URL 或 Base64 编码作为查询输入，也可指定图片局部并补充文字提示；返回结果同时包含相关图片和网页级信息。
![豆包搜索 Global 版图搜图与网页结果](https://images.51allai.com/blog/doubao-search-visual-search-cover_20260910_113248.png)

## 图片成为豆包搜索的查询输入

这次更新面向火山引擎豆包搜索 Global 版 API。它不是豆包 App 新增入口的说明，而是给企业和开发者接入搜索能力的接口更新。

豆包搜索在 7 月开放服务时，已经提供 API、Skill 和 MCP 等接入方式，具体背景可参考[豆包搜索服务开放与接入方式](/posts/2026/07/doubao-search-service/)。9 月加入图搜图后，Global 版的查询输入从文字扩展到图片。此前 8 月上线的是“文搜图”，也就是输入文字找图片；这次的“图搜图”直接使用一张图片发起检索。

## 支持整图、局部图片和文字辅助检索

图搜请求需要把 `SearchType` 设为 `visual`，并在 `ImageQuery` 中提供图片。图片可以使用 HTTP 或 HTTPS URL，也可以传入纯 Base64 编码，两种方式必须二选一。

`RegionOfInterest` 用于指定图片中的矩形区域。开发者可以用 0 到 1 之间的相对坐标设置区域边界，让检索只关注图片的一部分。若不传该字段，系统会使用整张图片。

文字字段 `Query` 在图搜模式下可以留空。需要缩小检索方向时，也可以加入不超过 100 个字符的文字提示。例如，商品图片中同时出现人物和服装时，应用可以指定服装区域，再用文字补充要找的对象。

| 请求字段 | 作用 | 已确认边界 |
| --- | --- | --- |
| `SearchType` | 选择图搜模式 | 值为 `visual` |
| `ImageQuery.Url` | 通过网络地址传图 | 与 Base64 二选一 |
| `ImageQuery.ImageBase64` | 直接传图片编码 | 不包含 Data URL 前缀 |
| `RegionOfInterest` | 指定检索区域 | 不传时使用整图 |
| `Query` | 用文字辅助图片检索 | 可留空，最长 100 个字符 |

## 一次返回图片与网页级信息

图搜结果以 `Documents` 数组返回。每条结果包含排序位置、网页 URL 和标题；`Snippet` 中可以同时出现文字片段与图片，图片字段包括宽度、高度、地址和替代文本。结果还可带有文件类型、站点名称和站点图标。

这套结构让接入方不必只展示一组图片缩略图。应用可以把相似图片与它所在的网页放在一起，保留可点击的页面入口和站点信息；也可以把这些字段继续交给智能体做整理、筛选或溯源。

单次请求默认返回 10 条结果，最多可设为 20 条。`MaxSnippetLength` 控制单个摘要片段长度，默认 300，最大 3000。

## 通过 Global 版 API 接入

开发者通过 `POST https://open.feedcoopapi.com/search_api/global_search` 调用接口，并在请求头中使用 API Key 完成 Bearer 鉴权。Global 版默认限流为账号维度 10 QPS，也就是每秒最多处理 10 次请求；需要更高额度时可提交工单扩容。

Global 版只支持按量后付费，不支持订阅套餐。每个火山引擎账号每月有 500 次免费联网搜索额度，这部分额度与 Custom 版共用，也不区分搜索类型。图搜图适合先用免费额度验证返回图片、网页字段和业务流程，再决定是否持续接入。
