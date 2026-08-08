---
title: Claude Code 新增跨会话消息，多个会话可互相传递进度
permalink: posts/2026/08/claude-code-cross-session-messaging/
tags:
  - claude-code
  - anthropic
  - product-update
  - coding-agent
date: 2026-08-08 22:55:57
categories:
  - 智能体
description: Claude Code 新增跨会话消息功能，多个独立会话可以互相传递进度、发现和决策。本文说明 v2.1.224 及以上版本的使用入口、消息边界、权限处理和 macOS、Linux 可用范围。
cover: https://images.51allai.com/blog/claude-code-cross-session-messaging-cover_20260808_230623.png
---

> Claude Code 新增跨会话消息，多个独立会话可以互相传递进度、发现和决策。功能要求 v2.1.224 或更高版本，支持 macOS 和 Linux；消息只传递一段文本，不会自动带上另一会话的完整历史或文件。
![Claude Code 跨会话消息与多个终端会话传递进度](https://images.51allai.com/blog/claude-code-cross-session-messaging-cover_20260808_230623.png)

## 多个独立会话可以互相传递进度

Claude Code 现在可以让一个会话把信息发给另一个会话。这里的“会话”可以理解为一个独立运行的 Claude Code 工作窗口：它有自己的对话上下文、工作目录和权限设置。

新功能适合并行处理同一个项目。例如，一个会话负责后端接口，另一个会话处理前端页面。后端会话完成接口调整后，可以把变更摘要发给前端会话；负责测试的会话也可以把失败原因传回正在修改代码的会话。用户不必在多个终端之间反复复制同一段进度说明。

这不是会话合并功能。跨会话传递的是一段纯文本消息，不是完整对话历史，也不是文件内容。需要把原会话的上下文整体带到另一个终端时，仍应使用会话恢复功能。

## 用两个工具发现和发送消息

Claude Code 通过 `ListAgents` 查找当前可以联系的会话，再通过 `SendMessage` 发送文本。用户通常不需要直接调用这两个工具，只要告诉 Claude 想让另一个会话知道什么，Claude 会选择目标并组织消息。

在终端中可以运行 `/list-agents`，也可以使用别名 `/peers`，查看当前会话能联系到的其他会话。列表会显示会话名称和工作目录；如果多个会话名称相同，Claude Code 会补充短标识，帮助区分目标。

同一台机器上的会话通过本地会话通信通道互相发送消息，不经过 Anthropic 服务器。跨机器的会话则依赖 Remote Control 连接，消息经 Anthropic 服务器转发。容器与宿主机使用不同文件系统时，两个环境中的会话不能直接互相发现。

## 权限仍由接收会话单独控制

跨会话消息不会被当作用户本人输入，因此不能代替用户批准权限请求，也不能要求接收会话修改权限、`CLAUDE.md` 或其他配置。消息文本里的 `/compact` 等命令也只会作为普通文字出现，不会被自动执行。

接收会话需要权限才能完成消息中的操作时，仍会按照自己的规则弹出权限提示。用户还可以用 `crossSessionInbound` 控制接收方式：`accept` 自动接收，`hold` 先等待批准，`refuse` 直接拒绝。跨机器消息还可以通过 `isolatePeerMachines` 要求离开本机前先获得批准。

## 版本和使用范围

跨会话消息要求 Claude Code v2.1.224 或更高版本，运行环境为 macOS 或 Linux，包括 WSL 2 中的 Linux。原生 Windows 不提供这一功能；Amazon Bedrock、Claude Platform on AWS、Google Cloud 的 Agent Platform 和 Microsoft Foundry 也不在当前支持范围内。

升级后可以先运行 `claude --version` 检查版本，再在会话中输入 `/list-agents`。如果命令无法识别，说明当前环境不具备跨会话消息能力；如果能列出会话但消息没有送达，则应检查发送权限、接收方的 `crossSessionInbound` 设置以及跨机器连接状态。
