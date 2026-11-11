---
title: Google 正式上线 Gemini 4 Carbon，API 首发价与 Argon 相同
permalink: posts/2026/11/google-gemini-4-carbon/
tags: [google, gemini, model-release, ai-agents, pricing]
sources:
  - name: Gemini 4 Carbon is now available
    url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/
    note: 11 月 10 日扩大开放、Ultra 订阅渠道及 Fairwind 访问边界
  - name: Gemini 4 Carbon is now available for developers
    url: https://blog.google/innovation-and-ai/technology/developers-tools/gemini-4-carbon-developers/
    note: 付费 API 与开发者使用入口
  - name: Gemini 4 Carbon 模型文档
    url: https://aistudio.google.com/docs/models/gemini-4-carbon
    note: 稳定模型标识、输入输出类型与上下文规格
  - name: What's new in Gemini 4 Carbon
    url: https://aistudio.google.com/docs/whats-new-gemini-4-carbon
    note: 思考档位、共享上下文和后台长输出设置
  - name: Gemini Developer API pricing
    url: https://aistudio.google.com/docs/pricing
    note: Standard 与 Batch 单价、优惠截止日期和思考 Token 计费
  - name: Gemini 4 Carbon and /swarm
    url: https://antigravity.google/blog/gemini-4-carbon-in-google-antigravity/
    note: 多智能体协作预览、使用渠道和额度消耗
  - name: Gemini 4 Carbon Model Card
    url: https://deepmind.google/models/model-cards/gemini-4-carbon/
    note: 基于 Argon 的模型关系及不同渠道的访问条件
date: 2026-11-11 09:28:44
categories: 大模型
description: Google 于 11 月 10 日正式上线 Gemini 4 Carbon，开放付费 API，并向 Ultra 订阅用户逐步推出应用体验。本文梳理使用入口、与 Argon 相同的限时单价、思考 Token 计费、百万上下文条件，以及 Antigravity 的多智能体协作预览。
cover: https://images.51allai.com/blog/google-gemini-4-carbon-cover_20261111_093325.png
---

> Google 于 11 月 10 日扩大开放 Gemini 4 Carbon：开发者可使用付费 API，Google AI Ultra 用户可逐步在 Gemini 应用、Antigravity 和搜索 AI Mode 中体验。API 首发标准价为每百万输入 Token 2 美元、输出 10 美元，与 Argon 相同，优惠截至 11 月 30 日。
![Gemini 4 Carbon 正式上线与复杂任务协作主题图](https://images.51allai.com/blog/google-gemini-4-carbon-cover_20261111_093325.png)

## 从网络安全试用扩大到开发者和订阅用户

Gemini 4 Carbon 是 Google 的推理模型，基于 Gemini 4 Argon，面向复杂软件工程、资料分析、科学推理和需要连续执行多个步骤的智能体任务。智能体指能调用工具、按步骤推进工作的 AI 程序。

这次上线的变化是开放范围。Carbon 两周前先通过 Fairwind 计划向部分网络安全防御人员提供访问，11 月 10 日开始面向更多开发者、企业和个人订阅用户开放。

不同用户的入口如下：

| 使用方式 | 入口与条件 |
| --- | --- |
| 开发者测试与接入 | 在 [Google AI Studio](https://aistudio.google.com/prompts/new_chat?model=gemini-4-carbon) 测试，或使用付费 Gemini API；Carbon 不提供 API 免费档 |
| 个人日常使用 | 向 Google AI Ultra 订阅用户逐步推出 [Gemini 应用](https://gemini.google.com/) 和搜索 AI Mode 体验 |
| 编程与项目协作 | Ultra 用户可在 [Google Antigravity](https://antigravity.google/) 的 App、CLI 和 IDE 扩展中使用 Carbon |
| 企业使用 | 通过 Gemini for business 接入 |
| 专门的网络安全防御能力 | 通过 Fairwind 计划申请 Carbon for cyber，按审核条件逐步开放 |

API 付费调用与应用订阅是不同渠道；Fairwind 的专门网络安全访问也有单独的申请条件。

## 多模态输入、文字输出，百万容量由输入和生成共享

API 中的稳定模型名称为 `gemini-4-carbon`。它可接收文字、图片、视频、音频和 PDF，输出文字，适合在同一任务里处理文档、图表和代码。它支持代码执行、函数调用、文件搜索和结构化输出；函数调用用于连接外部工具，结构化输出用于按规定字段返回数据。

Carbon 的统一上下文窗口为 1,048,576 Token。Token 是模型处理内容的计量单位，输入材料、思考过程和最终输出共同占用这份容量。因此，“百万上下文”不能理解为放入百万 Token 的材料后，还能额外生成同样长度的回答。

默认同步输出上限为 65,536 Token。更长的生成需要使用 Long decode，也就是分段继续生成：在 Interactions API 中开启后台执行，并把 `max_output_tokens` 设为 65,536 以上。仅开启后台执行而不提高输出上限，仍会在 64K Token 处停止。长输出还需为输入和思考过程预留容量。

思考深度有 `low`、`medium`、`high` 三档，默认是 `medium`。输出上限包含思考与回答两部分，接入时要为最终回答留出空间。

## 首发单价与 Argon 相同，12 月 1 日起翻倍

以下是 Gemini API 的 Standard 标准调用价格，单位为美元／百万 Token。输出费用包含模型思考消耗的 Token。

| 计费项目 | 截至 2026 年 11 月 30 日 | 自 2026 年 12 月 1 日起 |
| --- | ---: | ---: |
| 输入 | 2 | 4 |
| 输出，含思考 | 10 | 20 |

例如，一次任务使用 10 万个未缓存输入 Token，并产生 1 万个可计费输出 Token，首发期的模型费用为 0.30 美元，12 月 1 日起为 0.60 美元。这里的输出用量已包含思考 Token，计算不含搜索等工具费用。

不需要即时返回的批量任务可使用 Batch：首发期输入、输出分别为 1 美元、5 美元／百万 Token，12 月 1 日起调整为 2 美元、10 美元。

Carbon 与 [Gemini 4 Argon](/posts/2026/10/google-gemini-4-argon/) 的每 Token 单价相同，但单次任务的账单还取决于实际用量。对复杂问题，Carbon 会使用更多思考 Token，不能把相同单价理解成每项任务费用相同。评估接入成本时，应统计包含思考的完整用量。

## Antigravity 同步预览多智能体协作

Antigravity 同时推出 `/swarm` 预览功能，可把一项需求交给多个智能体协作：协调者分配工作，执行者在各自独立的代码工作区中修改文件，验证者运行测试并检查改动。用户可以在共享看板里查看进展，并进入具体智能体的执行记录。

团队中的智能体可以分别指定模型，例如让 Carbon 负责架构设计和审查，让其他模型处理具体实现。`/swarm` 从 11 月 10 日起在 Antigravity App 和 CLI 中逐步开放预览；Carbon 本身也可用于 IDE 扩展。多智能体并行会比普通单次对话更快消耗额度。

准备试用的开发者，可以先在 AI Studio 用自己的文档或代码测试 Carbon，再比较实际耗时、结果和 Token 用量；需要多个智能体协作推进项目时，再使用 Antigravity 的 `/swarm` 预览。
