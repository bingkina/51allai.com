---
title: Anthropic 发布 Claude Fable 5，Mythos 级模型首次面向通用用户
permalink: posts/2026/06/anthropic-claude-fable-5/
tags:
  - anthropic
  - claude-fable
  - model-release
  - ai-safety
date: 2026-06-10 09:58:36
categories:
  - 大模型
description: Claude Fable 5 是 Anthropic 首个面向通用用户开放的 Mythos 级模型。本文梳理模型能力、API 价格、安全回退、数据保留和评测可信度边界。
cover: https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fb7055119423427c40a0e4d84054aed17682b50a2-2880x1620.png&w=3840
---

> Anthropic 在 2026 年 6 月 9 日发布 Claude Fable 5，把此前只在 Project Glasswing 中受限开放的 Mythos 级能力推向通用用户。它的关键信息不是“更强”，而是 1M 上下文、128k 输出、每百万输入 10 美元、每百万输出 50 美元，以及高风险请求会回退到 Claude Opus 4.8。
![Claude Fable 5 与 Mythos 5 官方发布图](https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fb7055119423427c40a0e4d84054aed17682b50a2-2880x1620.png&w=3840)

## Fable 5 是通用版 Mythos

Anthropic 将 Claude Fable 5 定义为“面向通用用户安全开放的 Mythos-class 模型”。官方说明里，Mythos-class 位于 Opus class 之上；4 月先通过 Project Glasswing 向网络防御和关键软件基础设施伙伴开放 Claude Mythos Preview，这次则同时推出 Claude Fable 5 和受限版 Claude Mythos 5。

两者底层模型相同，差别在安全限制。Fable 5 面向通用用户，带有更严格的分类器；Mythos 5 面向 Project Glasswing 伙伴和后续精选生命科学研究机构，部分网络安全或生物/化学限制会被移除。Anthropic 在文档中给出的 API ID 分别是 `claude-fable-5` 和 `claude-mythos-5`。

## 价格和规格都已经进入 API 文档

Fable 5 已在 Claude API、Claude Platform on AWS、Amazon Bedrock、Vertex AI 和 Microsoft Foundry 上开放。官方文档列出的默认上下文窗口是 1M tokens，单次请求最高输出 128k tokens。价格为每百万输入 tokens 10 美元、每百万输出 tokens 50 美元。

这比 Claude Opus 4.8 的 API 价格更高。Anthropic 同时强调，Fable 5 不支持关闭 adaptive thinking；原始思维链不会返回，开发者只能拿到省略或摘要形式的 thinking block。对做长任务代理、代码迁移、文档分析的团队来说，这意味着模型能力、成本和可观测性要一起重新评估。

订阅端的开放节奏更保守。Anthropic 称，Pro、Max、Team 和按席位计费的 Enterprise 用户在 6 月 9 日至 6 月 22 日可额外使用 Fable 5；6 月 23 日之后将改为需要 usage credits，除非容量允许延长。

## 安全机制不是拒答，而是回退

Fable 5 的关键产品设计是“回退”。当分类器识别到网络安全、生物与化学、模型蒸馏相关请求时，系统会改由 Claude Opus 4.8 处理，并告知用户发生了回退。Anthropic 称，早期数据里超过 95% 的 Fable sessions 没有触发回退；但它也承认分类器会偏保守，部分无害请求会被误伤。

API 文档补了集成细节：如果请求被拒，Messages API 返回的是 HTTP 200，`stop_reason` 为 `refusal`，而不是错误码。开发者可以通过 `fallbacks` 参数或 SDK middleware 做自动重试。若请求在输出前被拒，不会对这次拒绝计费；切换模型时有 fallback credit 处理 prompt-cache 成本。

还有一项容易被忽略的变化：Fable 5、Mythos 5 以及同等或更高能力模型会被纳入 30 天数据保留。Anthropic 称这些数据不会用于训练新模型，但会用于防御复杂攻击、识别新 jailbreak 和降低误报。对零数据保留有硬性要求的企业，这一条比 benchmark 更现实。

## 性能数据目前主要来自官方口径

Anthropic 给出的性能叙述覆盖软件工程、知识工作、视觉、长上下文记忆和生命科学。官方称，Stripe 在一个 5000 万行 Ruby 代码库里用 Fable 5 一天完成了原本需要团队手工两个月以上的迁移；Cognition 的 FrontierCode、Hebbia 的金融推理 benchmark、IMC 的交易分析评估也被列为早期验证案例。

这些信息有价值，但可信度边界要说清楚：目前公开材料以 Anthropic 官方博客、官方 API 文档和早期客户背书为主。媒体报道基本围绕官方发布信息展开，尚未看到独立第三方对 Fable 5 的可复现实测。尤其是“最强网络安全能力”“几乎所有 benchmark 达到 SOTA”这类判断，仍属于官方口径。

Fable 5 这次真正值得记录的地方，是 Anthropic 把“高能力模型的通用开放”做成了一个产品化折中：通用用户拿到 Mythos 级底座，但敏感领域由分类器和 Opus 4.8 回退隔离；受信任机构继续通过 Glasswing 或后续 trusted access program 获取更少限制的 Mythos 5。模型能力提升本身不是新闻的全部，访问分层和数据保留同样是产品边界。
