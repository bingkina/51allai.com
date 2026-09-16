---
title: OpenAI 将于 10 月 14 日从 ChatGPT、Work 与 Codex 停用 GPT-5.5
permalink: posts/2026/09/openai-gpt-55-retirement/
tags:
  - openai
  - chatgpt
  - gpt-5-5
  - product-update
  - codex
sources:
  - name: ChatGPT 官方 X 公告
    url: https://x.com/ChatGPT/status/2099954190600876533
    note: GPT-5.5 停用日期、涉及产品与 Codex 替代模型
  - name: GPT-5.6 and GPT-6 Pro in ChatGPT | OpenAI Help Center
    url: https://help.openai.com/en/articles/11909943-gpt-55-in-chatgpt
    note: GPT-5.6 Sol、Luna、Terra 与 GPT-6 Astra 的套餐和产品可用范围
  - name: ChatGPT Work and Codex | OpenAI Help Center
    url: https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
    note: Work 与 Codex 的模型范围、Astra 用量规则和最低客户端版本
date: 2026-09-16 09:24:07
categories:
  - 行业观察
description: OpenAI 将于 2026 年 10 月 14 日从 ChatGPT、ChatGPT Work 与 Codex 停用 GPT-5.5，覆盖所有套餐。本文说明 Codex 用户可迁移到 GPT-5.6 Sol 或 GPT-6 Astra，并梳理不同套餐的替代模型与客户端版本要求。
cover: https://images.51allai.com/blog/openai-gpt-55-retirement-cover_20260916_092843.png
---

> OpenAI 将于 2026 年 10 月 14 日从 ChatGPT、ChatGPT Work 与 Codex 停用 GPT-5.5，覆盖所有套餐。Codex 用户可改用 GPT-5.6 Sol 或 GPT-6 Astra；实际可选模型取决于套餐、工作区权限与客户端版本。
![GPT-5.5 停用与 ChatGPT、Work、Codex 迁移路线](https://images.51allai.com/blog/openai-gpt-55-retirement-cover_20260916_092843.png)

## GPT-5.5 将在三个产品入口停用

GPT-5.5 的停用日期是 2026 年 10 月 14 日，范围包括普通 ChatGPT 对话、ChatGPT Work 和 Codex，适用于所有套餐。用户在截止日前仍依赖 GPT-5.5 处理固定工作流时，需要提前换到当前模型，并用常见任务检查输出格式、工具调用和用量。

这次变化与站内此前记录的 [GPT-5.5 发布](/posts/2026/04/openai-gpt-5.5-agentic/) 属于不同阶段：前者说明模型上线，当前安排处理产品内的停用与迁移。

## Codex 用户可转向 Sol 或 Astra

Codex 用户可以把 GPT-5.5 会话迁移到 GPT-5.6 Sol 或 GPT-6 Astra。GPT-5.6 Sol 面向编码、研究和复杂工作；GPT-6 Astra 也可用于 Codex，但是否出现取决于套餐与工作区权限。

不同入口的现行模型分配并不完全相同：

| 使用入口 | 已确认的替代范围 |
| --- | --- |
| ChatGPT 普通对话 | Free 与 Go 使用 GPT-5.6 Luna；符合条件的付费套餐使用 GPT-5.6 Sol |
| ChatGPT Work | Plus、Pro、Business 与 Enterprise 可用 GPT-5.6 Sol、Terra 和 Luna |
| Codex | Free 与 Go 可用 GPT-5.6 Terra；Plus、Pro、Business 与 Enterprise 可用 Sol、Terra 和 Luna |
| Work 与 Codex 中的 Astra | Plus 包含有限用量；Pro 与 Business 的可用量随套餐而变，Enterprise 还受工作区模型权限控制 |

普通 ChatGPT 对话里的 [GPT-5.6 Sol 与 Luna 套餐分配](/posts/2026/08/chatgpt-gpt-56-sol-luna-access/) 不能直接套用到 Work 和 Codex。迁移时应在实际使用的入口检查模型选择器，而不是只看 Chat 页面。

## 更新客户端后再切换模型

Codex 使用 GPT-5.6 需要 ChatGPT 桌面应用 Codex 模式 26.707.30751 或更高版本，或者 Codex CLI 0.144.0 或更高版本。GPT-6 Astra 对 Codex CLI 的最低要求是 0.153.0；桌面端应通过“菜单 → 检查更新”安装最新版本。

看不到 Astra 时，先确认客户端版本，再检查套餐和工作区权限。[GPT-6 Astra 的模型规格与使用边界](/posts/2026/09/openai-gpt-6-astra/) 与这次停用安排分开，选择替代模型时还要考虑任务类型和可用额度。

## 迁移前保留一组固定测试

模型切换会改变回答风格、推理过程和工具使用方式。长期运行的 Codex 或 Work 任务可以保留一组固定输入，至少覆盖常用指令、文件处理、工具调用和最终交付格式；切换模型后用同一组输入重跑，再更新默认模型或团队配置。

工作区管理员还可以在 Work 与 Codex 的模型设置中配置起始模型、推理强度和新对话行为。起始设置不会授予成员原本没有的模型权限，因此团队迁移需要同时检查角色权限。
