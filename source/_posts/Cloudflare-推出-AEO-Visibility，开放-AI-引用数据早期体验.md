---
title: Cloudflare 推出 AEO Visibility，开放 AI 引用数据早期体验
permalink: posts/2026/08/cloudflare-aeo-visibility-data/
tags: [cloudflare, ai-search, ai-agents, product-update]
date: 2026-08-14 18:26:14
categories: 行业观察
description: Cloudflare 推出 AEO Visibility Dashboard，并开放早期体验申请。它通过 Claude、GPT 回答中的引用率、提及率、突出性和声音份额，结合网站真实爬取与引荐流量，帮助站长判断内容是否进入 AI 助手推荐结果，并与 Agent Readiness 的技术检查配合使用，为内容调整提供可比较的数据依据。
cover: https://images.51allai.com/blog/cloudflare-aeo-visibility-data-cover_20260814_182844.png
---
> Cloudflare 推出 AEO Visibility Dashboard，当前以早期体验形式开放申请。它统计 Claude 与 GPT 回答中的引用率、提及率、突出性和声音份额，并结合真实爬取及引荐流量，帮助站长判断网站是否进入 AI 助手的推荐结果。
![Cloudflare AEO Visibility AI 引用数据仪表板](https://images.51allai.com/blog/cloudflare-aeo-visibility-data-cover_20260814_182844.png)

## 已发布，当前开放早期体验申请

Cloudflare 于 2026 年 8 月 6 日发布 AEO Visibility Dashboard。AEO 是 Answer Engine Optimization 的缩写，中文可理解为“答案引擎优化”：关注网站是否会被 AI 助手引用、提及或推荐，而不是网页在传统搜索结果中的排名。

这项工具已经进入 Cloudflare 的 AEO Suite，但当前使用方式是申请早期体验。企业可登录 Cloudflare 仪表板，从 Overview 页面提交 AEO Visibility 的体验申请。Agent Readiness 也位于同一入口，用于检查 AI 智能体能否访问和读取网站。

## 四项指标分别回答什么问题

AEO Visibility 把 AI 助手对网站的使用情况拆成四项指标：

- **引用率**：在网站所属业务类别的回答中，将该网站列为信息来源的回答占比。
- **提及率**：AI 助手在回答中提到品牌的频率，不要求同时引用品牌官网。
- **突出性**：网站被引用时，其内容在回答中所占的实际比重，以及引用出现的位置。
- **声音份额**：网站的引用率与同类竞争站点相比所占的比例。

提及和引用是两件事。品牌名称出现在回答里，只能说明模型提到了它；引用率还要看回答是否把该网站列为信息来源。站长可以据此区分品牌被模型识别与网站内容被当作依据这两个环节。

## 模型回答与真实网络流量分开统计

Cloudflare 会先从网站内容推断行业和业务类别，再使用不指定品牌的常见问题向 AI 助手发起查询。当前覆盖 Anthropic 的 Claude 和 OpenAI 的 GPT，问题包括产品推荐、同类比较和通用咨询。系统通过 Cloudflare AI Gateway 对不同模型重复查询，再从答案文本和引用来源中计算指标。

这部分结果不是站长每次扫描时临时生成。Cloudflare 会按业务类别预先运行查询面板，建立类别基准，并把同一份基线用于该类别下的账户。因此，仪表板加载的是预先计算的快照，方便不同站点在相同问题范围内比较。

另一组 AI Operator Activity 数据来自经过 Cloudflare 网络的实际请求。它按运营商展示爬取流量、引荐流量，以及 403 拦截和 404 失效链接等错误。模型查询数据回答“AI 助手怎样描述和引用网站”，网络数据则回答“哪些运营商真正访问了网站，又带回了多少访问者”。

## AEO Visibility 与 Agent Readiness 的分工

Agent Readiness 先检查网站是否具备被智能体使用的技术条件，包括 robots.txt、XML sitemap、机器可读的 Markdown、API 目录，以及 MCP、WebMCP 等高级接口。每项检查会给出通过、失败或中性结果，并保留对应请求和响应作为证据。

AEO Visibility 接着观察下游结果：当 AI 助手回答与该业务相关的问题时，网站有没有被提及、引用或推荐。前者解决“能不能读”，后者衡量“读到之后有没有进入答案”。站长可以先处理访问与内容格式问题，再重新扫描并对照引用率、提及率和竞争位置的变化。
