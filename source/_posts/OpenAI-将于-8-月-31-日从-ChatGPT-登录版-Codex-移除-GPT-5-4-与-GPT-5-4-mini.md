---
title: OpenAI 将于 8 月 31 日从 ChatGPT 登录版 Codex 移除 GPT-5.4 与 GPT-5.4 mini
permalink: posts/2026/08/codex-gpt-54-retirement/
tags: [openai, codex, gpt-5-4, product-update]
date: 2026-08-06 10:46:12
categories:
  - 智能体
description: OpenAI 将于 2026 年 8 月 31 日停止 ChatGPT 登录版 Codex 使用 GPT-5.4 与 GPT-5.4 mini，并建议分别迁移到 GPT-5.6 Terra 和 GPT-5.6 Luna。API 及使用 API Key 认证的 Codex 会话不受影响。受影响用户应在截止日期前检查工作区默认模型、已保存设置、托管配置、自定义智能体与定时任务，按对应关系完成替换，避免自动任务在模型移除后中断。
cover: https://images.51allai.com/blog/openai-codex-gpt-54-retirement-cover_20260806_105001.png
---

> OpenAI 将于 2026 年 8 月 31 日从使用 ChatGPT 账号登录的 Codex 中移除 GPT-5.4 与 GPT-5.4 mini。两款模型在 OpenAI API 和使用 API Key 认证的 Codex 会话中仍可继续使用，受影响的用户需要提前调整模型配置。
![GPT-5.4 与 GPT-5.4 mini 从 ChatGPT 登录版 Codex 移除及替代模型](https://images.51allai.com/blog/openai-codex-gpt-54-retirement-cover_20260806_105001.png)

## 这次调整只影响 ChatGPT 账号登录

8 月 31 日之后，使用 ChatGPT 账号登录 Codex 的用户将无法继续选择 GPT-5.4 和 GPT-5.4 mini。这里的变化针对 Codex 的 ChatGPT 登录方式，并不是两款模型在所有渠道统一停止服务。

OpenAI API 不在此次调整范围内。使用自己的 API Key 认证 Codex 的会话也不受影响，仍可继续调用 GPT-5.4 和 GPT-5.4 mini。对同时使用 ChatGPT 订阅和 API Key 的开发者来说，判断是否受影响的关键是 Codex 当前采用哪种认证方式。

## GPT-5.4 对应 Terra，mini 对应 Luna

两款旧模型有各自的推荐替代型号：GPT-5.4 对应 GPT-5.6 Terra，GPT-5.4 mini 对应 GPT-5.6 Luna。

| 当前模型 | 推荐替代模型 | Codex 模型标识 |
| --- | --- | --- |
| GPT-5.4 | GPT-5.6 Terra | `gpt-5.6-terra` |
| GPT-5.4 mini | GPT-5.6 Luna | `gpt-5.6-luna` |

Terra 是 GPT-5.6 系列中面向日常工作的均衡型号，适合承接原来交给 GPT-5.4 的常规编码、推理和工具调用任务。Luna 更强调速度与成本，定位与 GPT-5.4 mini 承担的轻量任务和子智能体工作更接近。

如果配置里直接写了模型名称，需要把 `gpt-5.4` 改为 `gpt-5.6-terra`，或把 `gpt-5.4-mini` 改为 `gpt-5.6-luna`。没有固定模型的 Codex 客户端会使用推荐模型，不需要为了这次调整手动锁定旧型号。

## 8 月 31 日前检查这些位置

需要检查的范围不只是当前对话里的模型选择。工作区默认模型、已保存的模型设置、管理员下发的托管配置、自定义智能体和定时任务，只要固定使用了 GPT-5.4 或 GPT-5.4 mini，都应在截止日期前替换。

Codex 桌面应用、CLI 和 IDE 扩展共享 `config.toml` 配置。若文件中存在 `model = "gpt-5.4"` 或 `model = "gpt-5.4-mini"`，应按对应关系修改。自定义智能体和定时任务可能拥有独立模型设置，也需要分别检查，避免任务在截止日期后因为找不到模型而中断。

这次迁移不要求所有用户改用同一个 GPT-5.6 型号。原来选择 GPT-5.4 的用户对应 Terra，原来用 GPT-5.4 mini 处理快速、重复任务的用户对应 Luna。按原有任务分工迁移，可以保留两类模型在能力、速度和成本上的不同角色。
