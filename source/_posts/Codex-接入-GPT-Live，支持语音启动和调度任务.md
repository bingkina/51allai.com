---
title: Codex 接入 GPT-Live，支持语音启动和调度任务
permalink: posts/2026/07/codex-gpt-live-voice/
tags:
  - openai
  - codex
  - product-update
  - desktop-agent
date: 2026-07-24 11:29:47
categories:
  - 智能体
description: Codex 接入 GPT-Live 后，用户可在 ChatGPT 桌面应用中用实时语音启动、查看和调整编码任务，并协调多个智能体。本文说明 macOS 与 Windows 的启用步骤、Screen context、配对 iOS Remote、单会话限制，以及语音额度和 Codex 任务用量的关系，帮助开发者判断这项功能适合哪些工作场景与使用方式。
cover: https://images.51allai.com/blog/codex-gpt-live-voice-cover_20260724_113308.png
---
> OpenAI 为桌面端 Codex 接入由 GPT-Live 驱动的 ChatGPT Voice。用户可以边说边启动任务、询问进度、打断执行并调整方向，语音对话与后台工作不必轮流等待。
![Codex GPT-Live 语音启动和调度任务](https://images.51allai.com/blog/codex-gpt-live-voice-cover_20260724_113308.png)

## Codex 从语音输入变成实时语音协作

2026 年 7 月 23 日发布的 ChatGPT 桌面应用 26.715，把 ChatGPT Voice 带到了 Codex。它与原有的语音听写不是同一种交互：听写会先把一段录音转成文字，再作为提示词发送；GPT-Live 支持实时双向语音，用户可以在系统说话时插话，也可以要求它先听完再回应。

这套语音能力不会替代 Codex 的任务执行界面。它更像一层实时控制入口：用户负责用自然语言说明目标、补充限制和改变优先级，Codex 继续在已有项目、工具和权限范围内处理工作。

## 语音可以启动、查看和调整任务

在 Codex 中开启 Voice 后，用户可以新建对话或任务，也可以让它查看其他线程的进度。任务运行期间，可以继续追问当前状态、了解阻塞原因，或用新的指令打断并调整方向。

Voice 还能在一次对话中协调多个智能体。用户不必逐个打开任务窗口确认状态，可以直接询问哪些任务仍在运行、哪些任务需要决策，再决定优先处理哪一个。通过语音发起的任务仍受 Codex 当前工具权限和审批规则约束。

## 在桌面应用中开启 Voice

使用入口位于 ChatGPT 桌面应用。打开应用后切换到 Codex，进入新对话或现有项目，选择 Voice 控件并授权麦克风，然后直接说明要完成的工作。对话过程中，Codex 的回复会同步显示为文字。

macOS 用户还可以在设置中开启 Screen context。开启后，Voice 可以获取当前最前方窗口的一张 appshot，作为这次对话的屏幕上下文；这不是持续共享整个屏幕。该功能可能需要系统的屏幕与音频录制、辅助功能权限。

## 支持桌面端和配对的 iOS Remote

Voice for Codex 面向 ChatGPT 桌面应用中的符合条件账户，支持 macOS 和 Windows。Codex 更新日志列出的计划包括 Plus、Pro、Business、Edu 和 Enterprise。配对桌面主机后，用户也可以从 iOS 的 Remote 入口使用这套语音能力。

Codex 仍不能作为独立模式直接从网页或手机端选择，移动端 Remote 连接的是桌面端正在运行的 Codex。系统同一时间只允许一场 Voice 对话。

Voice 使用单独的语音额度；由语音启动的 Codex 任务，仍从现有的智能体任务用量池中计费。对经常并行运行多个任务的用户，语音节省的是切换窗口和重复查看状态的操作，不会绕过原有用量、权限或审批限制。
