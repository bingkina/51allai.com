---
title: Douchat 开放 v0.1.8 桌面版，定位 Agent 版微信
permalink: posts/2026/09/douchat-agent-messaging-desktop/
tags:
  - douchat
  - ai-agents
  - desktop-agent
  - product-update
sources:
  - name: Douchat 中文官网
    url: https://douchat.ai/zh
    note: 产品定位、Agent 与模型接入范围、客户端版本、下载平台与数据处理方式
  - name: Douchat 官方价格页
    url: https://douchat.ai/pricing
    note: 充值档位、积分兑换比例与续费方式
date: 2026-09-22 17:01:46
categories:
  - 智能体
description: Douchat（豆信）开放 v0.1.8 桌面版下载，将 OpenAI 兼容云模型与多种本地 Agent CLI 放进同一聊天工作台。本文梳理已公开的功能、支持平台、数据流向和计费方式。
cover: https://images.51allai.com/blog/douchat-agent-messaging-desktop-cover_20260922_172412.png
---
> Douchat（豆信）开放 v0.1.8 桌面版下载，提供 macOS、Windows 与 Linux 安装包。它把 OpenAI 兼容云模型和 Claude Code、Codex、Gemini、Cursor、Kimi 等本地 Agent CLI 放进同一聊天工作台。
![Douchat Agent 版微信桌面工作台](https://images.51allai.com/blog/douchat-agent-messaging-desktop-cover_20260922_172412.png)

## 把模型和 Agent 放进同一条对话

[Douchat（豆信）官方网站](https://douchat.ai/zh) 把产品定位为“Agent 版微信”。它不是一个只能选择单一模型的聊天页面，而是把模型、本地 Agent 和长期对话放在同一桌面工作台中。

用户可以为不同 Agent 分别配置指令、工具、对话和群组关系，再在需要时把合适的 Agent 加入对话。这套设计更接近通讯录与群聊：每个 Agent 有明确分工，上下文留在对应的对话里，而不是分散在多个标签页。

## 支持云模型与本地 Agent CLI

Douchat 可以接入 OpenAI 兼容的云模型，也能连接电脑上已有的 Claude Code、Codex、Gemini、OpenCode、Cursor 和 Kimi 等本地 Agent CLI。CLI 是通过命令行运行的 Agent 工具；Douchat 提供一个统一聊天入口，无需把这些工具已有的凭证迁入 Douchat。

这和只管理单一编码工具会话的产品有明显区别。例如，[Claude Code Agent View](/posts/2026/05/claude-code-agent-view/) 把多个 Claude Code 后台会话收进同一终端面板；Douchat 则尝试跨越不同模型与本地 Agent，用类似即时通讯的方式组织它们。

## v0.1.8 覆盖三大桌面系统

官网当前提供的版本为 v0.1.8，包含五种安装包：

- macOS：Apple 芯片与 Intel Mac 分别提供 DMG。
- Windows：提供 64 位 x64 EXE。
- Linux：提供 x64 AppImage，以及面向 Debian / Ubuntu 的 DEB。

Douchat 现在是桌面产品，使用者需要在 macOS、Windows 或 Linux 电脑上安装客户端。每个桌面版本都可以在“关于”页面检查更新。

## 本地保存对话，云模型请求会经过 Douchat Cloud

桌面对话记录保存在用户电脑本地。Douchat Cloud 会保留账号与用量元数据，但不建立云端消息档案。

使用云模型时，请求会先经过 Douchat Cloud，再发往配置的模型服务商。消息内容用于完成当次请求，不会被持久化到 Douchat 的用量账本。对数据路径敏感的用户，需要区分“对话历史保存在本地”与“云模型请求会经过云端”这两件事。

## 积分采用单次充值

官方价格页提供 5 美元、10 美元、50 美元和自定义金额四种选择，1 美元兑换 1,000 积分。这是一次性充值，不会自动续费。
