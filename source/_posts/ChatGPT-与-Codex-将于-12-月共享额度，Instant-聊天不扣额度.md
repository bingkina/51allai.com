---
title: ChatGPT 与 Codex 将于 12 月共享额度，Instant 聊天不扣额度
permalink: posts/2026/11/chatgpt-codex-shared-usage/
tags: [openai, chatgpt, codex, pricing, product-update]
sources:
  - name: OpenAI ChatGPT 与 Codex 用量限制说明
    url: https://help.openai.com/en/articles/20001625-understanding-chatgpt-and-codex-usage-limits
    note: 12 月开始共享额度、适用套餐、Token 计量、Instant 豁免及统一用量入口
  - name: ChatGPT Work 与 Codex 定价及用量文档
    url: https://learn.chatgpt.com/docs/pricing
    note: 现有共享机制、影响消耗的因素、积分与 API 计费区别及 Codex 用量查看方式
date: 2026-11-02 13:28:59
categories: 行业观察
description: ChatGPT 与 Codex 将于 12 月起在 Plus、Pro、Business 套餐中共享用量额度，Instant 聊天不扣这份额度。本文说明 Token 如何计量、统一余量的查看入口、达到上限后的选择，以及套餐用量与 API 计费的区别。
cover: https://images.51allai.com/blog/chatgpt-codex-shared-usage-cover_20261102_133443.png
---

> ChatGPT 与 Codex 将从 2026 年 12 月起共享 Plus、Pro、Business 套餐的用量额度，配合 Work 的智能体能力并入 ChatGPT 主体验。用量按 Token 计量，Instant 聊天不消耗这份额度；用户将能在“设置 → 用量”查看合并后的余量与重置时间。
![ChatGPT 与 Codex 12 月共享额度及 Instant 聊天豁免示意](https://images.51allai.com/blog/chatgpt-codex-shared-usage-cover_20261102_133443.png)

## 12 月起，ChatGPT 与 Codex 共用套餐额度

这次调整适用于 ChatGPT Plus、Pro 和 Business 用户。ChatGPT 是日常对话与处理任务的入口，Codex 主要用于编写、修改和检查代码。12 月起，两者纳入同一套套餐用量管理；Instant 聊天保留豁免，不扣除这份共享额度。

此前，[ChatGPT Work 与 Codex 已经共享用量](/posts/2026/08/openai-plus-codex-five-hour-limit/)。Work 是用于多步骤任务、调用工具完成工作的模式。随着这些智能体能力并入 ChatGPT 主体验，共享规则也将覆盖新的 ChatGPT 使用流程。

对同时用 ChatGPT 处理工作、用 Codex 开发软件的人来说，需要一起查看两边的消耗，安排剩余用量。[ChatGPT 与 Codex 用量规则](https://help.openai.com/en/articles/20001625-understanding-chatgpt-and-codex-usage-limits)可用于核对适用范围。

## 按 Token 计量，一条消息的消耗取决于任务

Token 是模型读取和生成信息时使用的计量单位。提示词、文件、聊天历史、工具返回的结果和模型回复都会产生 Token。相同条数的消息，实际消耗可能不同。

模型选择和任务复杂程度会影响额度使用。更高级的模型、需要处理大量上下文或连续调用工具的任务，通常消耗更多；不能只凭输入了多少字来估算剩余可用次数。

套餐内用量与额外购买的积分需要分开理解：前者是订阅包含的使用额度，后者用于继续使用符合条件的功能。按 Token 衡量任务消耗，并不等于每发一条消息就产生一笔额外付款。

## 在“设置 → 用量”查看统一余量

新规则生效后，用户将能在 ChatGPT 的 **设置 → 用量（Settings → Usage）** 中查看合并后的剩余用量和重置时间。使用 Codex 命令行时，也可以通过 `/status` 查看当前会话对应的用量状态。

达到上限后，可以等待额度重置、升级套餐，或购买积分继续使用符合条件的功能。安排长任务前先查看余量，比单纯统计当天发出了多少条消息更有帮助。

## API 密钥使用量仍单独计费

通过 ChatGPT 账号使用套餐，与通过 API 密钥运行 Codex，是两种计费路径。API 是供程序调用模型的接口；使用 API 密钥时，Codex 按 API 价格计费，费用与 ChatGPT 订阅用量分开。

日常使用中，可以缩小一次任务的范围，只提供相关文件和必要上下文，并让输出长度匹配实际用途。需要反复处理大型文件或代码库时，先检查模型选择与任务范围，再决定继续使用套餐额度还是另行支付 API 费用。
