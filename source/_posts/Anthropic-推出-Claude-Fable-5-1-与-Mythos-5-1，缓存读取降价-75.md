---
title: Anthropic 推出 Claude Fable 5.1 与 Mythos 5.1，缓存读取降价 75%
permalink: posts/2026/09/claude-fable-5-1-mythos-5-1/
tags: [anthropic, claude-fable, model-release, pricing]
date: 2026-09-02 10:18:07
categories:
  - 大模型
description: Anthropic 推出 Claude Fable 5.1 与 Claude Mythos 5.1。两者共享 100 万 Token 上下文与 128K 输出规格，Fable 面向普通用户和开发者开放，Mythos 仅限受信机构；API 输入输出价格不变，缓存读取价格降至原来的四分之一。
cover: https://images.51allai.com/blog/claude-fable-5-1-mythos-5-1-cover-v2_20260902_103143.png
---

> Anthropic 推出 Claude Fable 5.1 与 Claude Mythos 5.1。两者使用同一底层模型，Fable 5.1 面向普通用户和开发者开放，Mythos 5.1 仅限受信机构。API 输入和输出价格保持不变，缓存读取价格从每百万 Token 1 美元降至 0.25 美元。
![Claude Fable 5.1 与 Mythos 5.1 模型发布封面](https://images.51allai.com/blog/claude-fable-5-1-mythos-5-1-cover-v2_20260902_103143.png)

## 同一模型，两套访问范围

Claude Fable 5.1 和 Claude Mythos 5.1 使用同一底层模型，区别在安全限制和开放范围。Fable 5.1 是面向通用用户的版本，可用于长时间运行的编码、研究和文档任务。Mythos 5.1 面向网络安全与生命科学等受限场景，只向 Project Glasswing 的获批机构开放。

Fable 5.1 已进入 Claude Pro、Max、Team 和 Enterprise 计划。开发者可通过 Claude API 调用 `claude-fable-5-1`，也可在 Amazon Bedrock、Google Cloud 和 Microsoft Foundry 使用。Mythos 5.1 的 API ID 为 `claude-mythos-5-1`，访问需要通过机构审核。

## 规格不变，缓存读取降至四分之一

两款模型都支持 100 万 Token 上下文，单次最多输出 128K Token，并默认开启自适应思考。上下文窗口决定模型一次能处理多少材料，适合大型代码库、长文档和跨多轮的复杂任务。

API 基础价格沿用 Fable 5：每百万输入 Token 10 美元，每百万输出 Token 50 美元。变化集中在提示词缓存。缓存读取从每百万 Token 1 美元降至 0.25 美元，适合需要反复读取同一段项目背景、代码或文档的长任务。5 分钟和 1 小时缓存写入价格分别为 12.50 美元和 20 美元。

## 开发者迁移要处理三项兼容变化

从 Fable 5 切换时，修改模型 ID 还不够。Fable 5.1 不支持强制工具调用；把 `tool_choice` 设为 `any` 或指定某个工具会返回 400 错误。需要固定输出结构时，应使用自动工具选择配合严格模式，或改用结构化输出。

模型的思考块也要求对话历史保持连续。旧模型不能读取 Fable 5.1 生成的思考块，修改较早的对话内容会让后续思考块失效。已经自行拼装 `messages` 数组的应用，需要检查是否会改写历史消息。

新增能力包括按消息调整思考强度、只对当前轮生效的系统消息，以及工具调用之间的进度更新。这些接口中有多项处于 Beta，接入时需要使用对应的测试版请求头。

## 安全回退会改变实际响应模型

Fable 5.1 对网络安全和生物领域继续采用分类与回退机制。触发网络安全限制的请求可切换到 Claude Opus 4.8，生物领域请求可切换到 Claude Opus 5。开发者需要在 API 集成中处理 `refusal` 状态，并配置服务端回退、中间件或自己的重试逻辑。

两款模型默认保留请求与输出 30 天，用于安全监测。需要零数据保留的企业必须获得 Anthropic 明确授权，不能沿用其他 Claude 模型的默认数据策略。

## 适合重复上下文较多的长任务

Fable 5.1 的直接变化不是基础 Token 单价下调，而是降低重复读取上下文的成本。代码智能体、持续研究和多阶段文档处理会多次读取同一份项目材料，缓存价格下降能直接减少这部分支出。

普通用户可在支持的 Claude 订阅中选择 Fable 5.1。开发团队迁移前应先检查工具调用方式、对话历史处理和数据保留要求，再用现有评测集比较任务完成质量与总成本。Mythos 5.1 不属于普通账户可直接选择的模型。
