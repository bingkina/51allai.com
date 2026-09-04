---
title: OpenAI 为未获 Astra 权限的付费用户每日发放 Codex 重置
permalink: posts/2026/09/codex-daily-banked-reset-astra/
tags:
  - openai
  - codex
  - product-update
  - pricing
sources:
  - name: Tibo Sottiaux 关于 Astra 等待期可存重置的公告
    url: https://x.com/thsottiaux/status/2095651088502591861
    note: 每日发放条件、起始时间与首个重置到账时间
  - name: Codex changelog
    url: https://developers.openai.com/codex/changelog?type=codex-mobile
    note: Codex 可存限额重置功能的上线记录
  - name: Codex Pricing
    url: https://developers.openai.com/codex/pricing/
    note: 当前用量窗口、用量面板、额度与限额规则
  - name: GPT-6 Astra Model | OpenAI API
    url: https://developers.openai.com/api/docs/models/gpt-6-astra
    note: GPT-6 Astra 的分阶段开放范围
date: 2026-09-04 15:19:43
categories:
  - 智能体
description: OpenAI 将为付费 ChatGPT 套餐中尚未获得 GPT-6 Astra 权限的用户每天发放一次 Codex 可存重置。本文说明发放条件、可存重置与自动恢复的区别，以及如何查看账户用量。
cover: https://images.51allai.com/blog/codex-daily-banked-reset-astra-cover_20260904_153021.png
---

> OpenAI 从 2026 年 9 月 3 日起，为付费 ChatGPT 套餐中尚未获得 GPT-6 Astra 权限的用户每天发放一次 Codex 可存重置。重置到账后不会立即执行，用户可以留到需要恢复 Codex 用量时再使用。
![Codex 每日可存重置与 GPT-6 Astra 开放进度](https://images.51allai.com/blog/codex-daily-banked-reset-astra-cover_20260904_153021.png)

## 未获 Astra 权限的每一天都会获得一次重置

这次发放以账户是否已经获得 GPT-6 Astra 权限为条件。只要用户使用付费 ChatGPT 套餐，并且账户还不能使用 Astra，当天就会获得一次可存重置。首个重置安排在公告发出约 3 小时后到账。

它不是一次覆盖所有用户的即时清零，而是按天加入账户的单次重置机会。用户获得 Astra 权限后，不再符合“尚未获得权限”的发放条件。[GPT-6 Astra 的模型规格与开放安排](/posts/2026/09/openai-gpt-6-astra/)采用分阶段上线，首批面向 Trusted Access Program 企业，Plus、Pro、Business 和 Enterprise 套餐随后开放。

![Codex 每日可存重置与 GPT-6 Astra 开放进度](https://images.51allai.com/blog/截屏2026-09-04_15.31.12_20260904_153154.png)

## 可存重置由用户决定何时使用

Codex 在 6 月加入可存限额重置功能。普通自动恢复会按账户现有周期发生；可存重置先保存在账户中，是否立即使用由用户决定。正在执行长任务、当前用量仍充足时，可以先保留，等限额影响工作后再启用。

这项安排增加的是重置次数，不会把 Codex 改成不限量服务。Codex 的本地消息和云端聊天仍共享套餐用量，并可能叠加每周限额。不同模型、上下文长度、推理强度和工具调用都会改变实际消耗，[Codex 5 小时与每周限额的区别](/posts/2026/07/codex-five-hour-limit-returns/)仍然适用。

## 在用量面板确认是否到账

用户可以打开 Codex 的用量面板，查看当前限额、恢复时间和账户中可用的重置。页面出现可用重置后，再根据任务安排决定使用时间。

Codex CLI 的 `/status` 可以在当前会话中查看剩余限额，但可存重置是否到账仍应以账户用量面板为准。此次发放的是套餐限额重置，不是 OpenAI API 余额，也不会改变 API 按 Token 计费的方式。

## 这项安排覆盖 Astra 的等待期

GPT-6 Astra 已于 9 月 3 日开始分阶段开放，不同账户获得权限的时间可能不同。每日可存重置把补偿与每个付费账户的等待天数直接关联：等待一天，获得一次重置；账户取得 Astra 权限后，按公告条件停止新增。

对仍在使用现有 Codex 模型的用户，最直接的做法是先检查用量面板，再决定是否把重置留给大型代码修改、长时间调试或其他连续任务。重置解决的是套餐用量恢复，不会提前为账户开启 Astra。
