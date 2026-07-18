---
title: Anthropic 将 Claude Fable 5 纳入 Max 与 Team Premium 订阅
permalink: posts/2026/07/claude-fable-5-subscription-access/
tags:
  - anthropic
  - claude-fable-5
  - product-update
  - pricing
date: 2026-07-18 18:48:56
categories:
  - 行业观察
description: Anthropic 将 Claude Fable 5 纳入 Max 与 Team Premium 订阅，7 月 20 日起最多可使用每周额度的 50%。本文说明 Pro 与 Team Standard 的用量积分安排、计划价格、API 计费和数据保留规则。
cover: https://images.51allai.com/blog/claude-fable-5-subscription-access-cover_20260718_185432.png
---

> Anthropic 将从 7 月 20 日起把 Claude Fable 5 纳入所有 Max 与 Team Premium 计划，最多可占每周额度的 50%。Pro 与 Team Standard 用户仍通过用量积分使用，并获得一次性 100 美元积分。
![Claude Fable 5 Max 与 Team Premium 订阅方案](https://images.51allai.com/blog/claude-fable-5-subscription-access-cover_20260718_185432.png)

## 7 月 20 日起纳入两类订阅

Claude Fable 5 将从 2026 年 7 月 20 日起成为 Max 和 Team Premium 计划的订阅内模型，覆盖所有对应个人账户和团队高级席位。用户最多可以把每周使用额度的 50% 用在 Fable 5 上。

这里的 50% 是 Fable 5 在现有周额度中的使用上限，不是额外增加一份额度。其他 Claude 模型也会消耗同一个计划额度；如果周额度已经被其他模型用掉一部分，Fable 5 能使用的余额也会随之减少。

Max 计划从每月 100 美元起。Team Premium 席位按年付费时为每人每月 100 美元，按月付费时为每人每月 125 美元。此次调整改变的是模型在订阅中的包含范围，没有改变这两档计划的标价。

![Claude Fable 5 Max 与 Team Premium 订阅方案](https://images.51allai.com/blog/截图2026-07-18_18.55.28@2x_20260718_185600.png)

## Pro 与 Team Standard 改用用量积分

Pro 和 Team Standard 用户可以继续使用 Fable 5，但消耗的是单独计费的用量积分，不再占用计划内的每周额度。两类用户会获得一次性 100 美元积分，用于支付 Fable 5 的用量。

这一区分决定了实际成本：Max 和 Team Premium 用户可以在订阅额度内调用 Fable 5，达到 50% 上限后再选择使用积分；Pro 和 Team Standard 用户则从用量积分开始计费。

## API 仍按 Token 单独计费

Claude Fable 5 是 Anthropic 面向公众开放的最高能力档模型，主要用于长时间运行的编码任务和多阶段知识工作。模型默认支持 100 万 Token 上下文，单次请求最多输出 128K Token。上下文窗口决定模型一次能处理多少输入内容，100 万 Token 适合放入大型代码库或多份长文档。

Claude API 不包含在网页端订阅中。Fable 5 的 API 价格仍为每百万输入 Token 10 美元、每百万输出 Token 50 美元，开发者通过 `claude-fable-5` 调用。

## 使用前需要注意数据保留

Fable 5 的请求和输出会保留 30 天，用于运行安全监测机制。这一规则也适用于通过 GitHub Copilot 等第三方产品调用 Fable 5 的场景，和其他支持零数据保留的 Claude 模型不同。团队如果要处理客户资料、内部代码或受监管数据，需要先确认自身的数据合规要求。
