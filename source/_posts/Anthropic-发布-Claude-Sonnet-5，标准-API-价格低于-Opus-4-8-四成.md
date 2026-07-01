---
title: Anthropic 发布 Claude Sonnet 5，标准 API 价格低于 Opus 4.8 四成
permalink: posts/2026/07/anthropic-claude-sonnet-5/
tags:
  - anthropic
  - claude-sonnet
  - model-release
  - pricing
  - coding-agent
date: 2026-07-01 11:37:20
categories:
  - 大模型
description: Claude Sonnet 5 已进入 Anthropic API，标准价格比 Opus 4.8 低 40%，限时价更低。本文梳理 1M 上下文、128K 输出、迁移限制、任务能力边界和开发者实际成本，重点看它为什么会成为高频 Agent 任务的中间层选择。
cover: https://images.51allai.com/blog/701b8b30-0aa0-4114-8e10-823a13870626_20260701_114429.jpeg
---
> Anthropic 在 2026 年 6 月 30 日发布 Claude Sonnet 5。它的标准 API 价格是每百万输入 3 美元、输出 15 美元，比 Opus 4.8 低 40%；到 8 月 31 日还有每百万输入 2 美元、输出 10 美元的限时价。能力叙事集中在编码、浏览器使用和长链路 Agent，独立复现仍要等真实项目数据。
![Claude Sonnet 5 模型发布与 API 定价](https://images.51allai.com/blog/701b8b30-0aa0-4114-8e10-823a13870626_20260701_114429.jpeg)

## 价格：标准价比 Opus 4.8 低 40%

Claude Sonnet 5 的 API ID 是 `claude-sonnet-5`，定位不是旗舰线替代品，而是把更多 Agent 能力放进 Sonnet 价格带。标准价格维持 Sonnet 4.6 水平：每百万输入 tokens 3 美元，每百万输出 tokens 15 美元。和 Opus 4.8 的 5 美元输入、25 美元输出相比，单 token 标准价低 40%。

更直接的价格窗口在 2026 年 8 月 31 日之前。Sonnet 5 上线初期按每百万输入 2 美元、输出 10 美元计费，相当于比 Opus 4.8 低 60%。9 月 1 日之后回到标准价。

| 模型 | 输入价格 | 输出价格 | 说明 |
| --- | ---: | ---: | --- |
| Claude Sonnet 5 限时价 | $2 / MTok | $10 / MTok | 到 2026 年 8 月 31 日 |
| Claude Sonnet 5 标准价 | $3 / MTok | $15 / MTok | 2026 年 9 月 1 日起 |
| Claude Opus 4.8 | $5 / MTok | $25 / MTok | Opus 线标准价 |

这会影响模型选择。过去很多团队把 Opus 留给复杂编码、长链路 Agent 或高风险知识工作，把 Sonnet 用在吞吐量更高的普通任务。Sonnet 5 如果在部分任务接近 Opus 4.8，成本结构会迫使开发者重新分层：不是所有请求都上 Opus，也不是所有任务都退回便宜模型。

## 规格：1M 上下文、128K 输出、新 tokenizer

Sonnet 5 默认支持 100 万 tokens 上下文，没有更小的上下文窗口版本。同步 API 的最大输出是 128K tokens，输入支持文本和图像，输出仍是文本。可用渠道覆盖 Claude API、Claude Platform on AWS、Amazon Bedrock、Google Cloud 和 Microsoft Foundry 预览版；Priority Tier 暂不支持。

迁移时不能只看窗口大小。Sonnet 5 换用了新 tokenizer，同一段文本大约会比 Sonnet 4.6 多出 30% tokens。对从 Sonnet 4.6 迁移的团队，这会改变三件事：token 计数、1M 上下文实际能塞进的文本量、以及等价请求的真实成本。

这条不改变 API 返回结构，但会影响预算。旧系统里按 Sonnet 4.6 调好的 `max_tokens`、截断阈值、缓存分段和成本预估，都应该重新计数。否则 1M 上下文看起来更大，实际文本容量可能没有预期中那么宽。

## 迁移限制：adaptive thinking 默认打开

Sonnet 5 被设计成 Sonnet 4.6 的 drop-in upgrade，但有几个会让老代码直接报错的变化。

第一，adaptive thinking 默认开启。以前没有传 `thinking` 字段的 Sonnet 4.6 请求，会按无 thinking 运行；同样请求切到 Sonnet 5 后，会进入 adaptive thinking。要关闭 thinking，需要显式传 `thinking: {type: "disabled"}`。`max_tokens` 也要重算，因为 thinking 和最终回答共用输出上限。

第二，手动 extended thinking 被移除。`thinking: {type: "enabled", budget_tokens: N}` 会返回 400。现在应该使用 adaptive thinking 和 `effort` 参数，而不是手工指定思考 token 预算。

第三，非默认采样参数不再接受。`temperature`、`top_p`、`top_k` 只要设成非默认值，就会返回 400。很多 SDK wrapper 会默认塞一个 temperature，这类封装需要清理。assistant message prefilling 也继续不支持，结构化输出要走 system prompt、structured outputs 或 `output_config.format`。

## 能力边界：部分 Agent 任务接近 Opus，不等于全线替代

“追平 Opus 4.8”不能写成全场景事实。现有公开信息更适合这样理解：Sonnet 5 是 Sonnet 4.6 的同价升级，最大增益落在编码和 agentic tasks；在浏览器使用、规划、编码、知识工作等任务上，标称表现接近 Opus 4.8，但还缺少独立、可复现、跨项目的第三方评测。

这一区别很重要。Opus 4.8 仍是复杂推理、长周期自主编码和高自治任务的 Opus 线模型；Fable 5 和 Mythos 5 又在更高能力层。Sonnet 5 的价值不是把这些模型全部替换掉，而是给高频 Agent 工作流提供一个成本低得多的默认选项。

开发者真正应该测四件事：

- 长任务跑到中后段，是否比 Sonnet 4.6 更少丢目标。
- 工具调用是否更稳定，尤其是浏览器、代码执行和检索链路。
- 新 tokenizer 后，等价任务的总 token 成本是否仍然下降。
- 安全拒绝是否会影响正常的安全测试、代码审计或运维自动化。

只有这些数据跑出来，Sonnet 5 才能从“更便宜的高能力模型”变成“可以替换默认路由的生产模型”。

## 安全：Sonnet 线第一次加入实时网络安全防护

Sonnet 5 也是第一款带实时网络安全防护的 Sonnet-tier 模型。涉及被禁止或高风险网络安全主题的请求，可能会被拒绝。这个拒绝不是 HTTP 错误，而是成功返回 HTTP 200，并在 `stop_reason` 里标记 `refusal`。

对普通聊天用户，这只是安全边界。对做 Agent 平台或安全工具的团队，它会变成工程问题：监控系统不能只看 HTTP 状态码，必须解析模型返回；自动重试也不能把 refusal 当成瞬时失败重复轰炸。安全测试、漏洞复现、红队模拟这类场景，尤其需要在上线前测拒绝率。

订阅端也在同步切换。公开上线节奏显示，Sonnet 5 已成为 Claude Free 和 Pro 用户的默认模型，Max、Team、Enterprise 用户也可用。这让它不只是 API 模型更新，而是 Anthropic 把日常 Claude 体验推向 Agent 任务的默认底座。
