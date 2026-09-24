---
title: OpenAI 升级 ChatGPT Voice，可调用插件并执行 Work 任务
permalink: posts/2026/09/chatgpt-voice-plugins-work-agent/
tags: [openai, chatgpt, ai-agents, product-update]
sources:
  - name: ChatGPT Release Notes — Use plugins in Voice and get work done by speaking
    url: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
    note: 2026 年 9 月 23 日更新时间、Voice 插件支持、Work 任务范围与套餐边界
  - name: ChatGPT Voice | OpenAI Help Center
    url: https://help.openai.com/en/articles/20001274-chatgpt-voice
    note: Live 能力、插件调用、屏幕审批、可用终端与用量规则
  - name: ChatGPT Work and Codex | OpenAI Help Center
    url: https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
    note: Voice in Work 使用步骤、工具权限、任务续接与计费方式
date: 2026-09-24 09:33:05
categories: 智能体
description: OpenAI 升级 ChatGPT Voice：Live 可在网页、iOS 和 Android 调用插件与连接应用，并进入 ChatGPT Work 执行文档、演示文稿、表格和浏览器任务。本文说明使用入口、套餐要求、审批与用量规则。
cover: https://images.51allai.com/blog/chatgpt-voice-plugins-work-agent-cover_20260924_093744.png
---

> OpenAI 于 2026 年 9 月 23 日升级 ChatGPT Voice。Live 现在可在网页、iOS 和 Android 调用插件与连接应用，并进入 ChatGPT Work，通过语音发起文档、演示文稿、表格和浏览器任务。
![ChatGPT Voice 插件与 Work 语音智能体任务](https://images.51allai.com/blog/chatgpt-voice-plugins-work-agent-cover_20260924_093744.png)

## Voice 从语音问答扩展到工具调用

ChatGPT Voice 的 Live 模式原本已经支持实时对话、网页搜索和记忆。这次更新加入了插件与连接应用：用户在语音对话中可以要求 ChatGPT 使用账号已经具备的工具，并在同一聊天里查看文字回复。

这项变化让 Voice 不再只是把输入方式从打字换成说话。插件负责连接外部服务，Voice 则成为调用这些工具的实时入口。它使用账号现有的应用连接、数据权限和操作限制，不会因为改用语音而获得额外权限。

从产品边界看，Voice 并没有变成一个独立的新 Agent 产品。在普通 Chat 中，它调用插件完成工具操作；进入 Work 后，它把用户口述的目标交给智能体执行。语音负责实时下达和调整任务，具体执行能力来自插件或 Work。

## ChatGPT Work 可用语音启动多步任务

Voice 同时进入网页端和移动端的 ChatGPT Work。用户打开 Work 后选择 Voice 控件，就能直接说明要交付的结果，让 Work 创建文档、演示文稿和电子表格，调用连接应用，或在浏览器中处理任务。执行过程和结果会以文字保留在聊天中；结束语音通话后，仍在运行的任务可以继续以文字方式完成。

这与此前的 [Codex 桌面端语音调度](/posts/2026/07/codex-gpt-live-voice/) 是两条不同路径。Codex 继续面向软件开发，不能在网页或手机端作为独立模式选择；本次更新覆盖的是普通 Chat 中的插件调用，以及网页、iOS 和 Android 上的 Work。账号具备访问权限并已安装相应工具时，Voice 也可以在 Work 中使用它，例如此前上线的 [ChatGPT Work 数据智能体](/posts/2026/09/openai-chatgpt-work-data-agent/)。

## 关键操作仍需在屏幕上确认

当插件或 Work 任务需要用户批准操作时，ChatGPT 会在网页或手机屏幕上显示确认界面。用户必须通过屏幕按钮批准或拒绝，口头说“确认”不能代替这一步。

插件继续遵守原有的数据访问范围、工作区限制和动作规则。语音只改变下达指令与跟进任务的方式，不会绕过管理员配置，也不会扩大已连接账号能读取或修改的数据。

## 不同套餐能用的范围不同

Free 和 Go 用户可以在普通 Chat 的 Voice 中使用其套餐支持的插件。要在网页或手机端通过 Voice 使用 Work，账号必须同时具备 Voice 与 Work 访问权限；Work 面向符合条件的付费套餐，企业工作区还会受到管理员设置限制。

Voice in Work 会消耗套餐的每日 Voice 时长，实际执行的 Work 任务也按正常 Work 用量计算。用户用语音启动任务，不会获得额外的智能体额度。

## 在网页或手机端开始使用

普通语音对话中，先连接账号可用的插件或应用，再打开 Live，直接要求 ChatGPT 使用相应工具。需要创建文件或处理多步工作时，在 ChatGPT 网页端或移动应用中切换到 Work，选择 Voice 控件并允许麦克风访问，然后说明目标、所需材料和限制条件。

对话过程中可以继续说话补充要求，也可以查看同步出现的文字结果。任务涉及审批时，回到屏幕完成确认；通话结束后，可在同一聊天里继续查看和调整尚未完成的工作。
