---
title: OpenAI 将 Codex 集成到 ChatGPT 手机端，实现远程操控
date: 2026-05-15 10:43:01
permalink: posts/2026/05/openai-codex-mobile-chatgpt/
categories:
  - 智能体
tags:
  - openai
  - codex
  - chatgpt
  - mobile
  - product-update
description: OpenAI 将 Codex 编码工具集成到 ChatGPT 移动端，覆盖 iOS 和 Android。手机端定位为"移动控制台"，可远程审批命令、查看 diffs、一键推 PR，免费可用。
cover:
---

> 5 月 14 日，OpenAI 宣布将 Codex 编码工具集成到 ChatGPT 移动应用（iOS + Android 预览版），手机端定位为远程"移动控制台"，而非直接编码环境。
![ChatGPT 应用与 Codex 应用图标并排](https://images.51allai.com/blog/codex-mobile_20260515_104234.png)

## 手机端定位：远程控制，非直接编码

OpenAI 明确界定了手机端的能力边界——"你不会在手机上用 Codex 编程"。手机端的功能是**管理**而非**编写**：

- 查看实时代码差异（Diffs）、测试运行截图、终端反馈
- 在 Codex 需要决策时提供指导，审批高风险的终端命令
- 通过语音或文字下达新的迭代指令
- 一键推送 GitHub Pull Request
- 切换模型、启动新线程、查看终端日志

手机端作为用户与编码项目环境之间的"中介"，适合通勤、散步或会议间隙远程监督编码进度，减少项目中的停机时间。

## 连接方式与安全架构

用户在手机 ChatGPT 应用内通过**扫码配对**连接运行 Codex 的 macOS 主机。连接建立后，手机端同步实时环境状态。

架构层面，Codex 通过**安全中继层**实现跨设备通信，受信任机器可访问，但不直接暴露于公共互联网。中继层负责保持活跃会话状态和上下文同步。关键约束：

- 文件、凭据、权限、本地配置全部保留在运行 Codex 的主机上
- 手机仅接收截图、终端输出、diffs、测试结果等反馈信息
- 目前仅支持 macOS 作为主机端，Windows 支持"稍后推出"

## 全套餐可用，深度适配 iOS Live Activities

此次预览版覆盖 ChatGPT 的所有订阅层级，包括免费版和 Go 版，Codex 手机端功能不额外收费。

iOS 端深度适配了**实时活动（Live Activities）**，允许用户在锁屏界面或灵动岛直接追踪后台自动化重构与测试的跑码进度，无需解锁手机。

## 底层模型：GPT-5.3-Codex

手机端操控的 Codex 实例运行在 GPT-5.3-Codex 模型上（2 月 5 日发布）。该模型是 OpenAI 的编码优化旗舰模型，主要数据点：

- Terminal-Bench 2.0：77.3%（Claude Opus 4.6 为 65.4%）
- 速度比 GPT-5.2-Codex 提升 25%
- 具备多模态"计算机使用"能力，可自主操作浏览器
- Codex 周活开发者超 200 万

## 竞品对比：Anthropic 的移动端布局

Anthropic 目前尚未将 Claude Code 集成到移动应用。其 Claude Code 产品仍停留在桌面端（macOS/Windows/Linux），手机端仅能通过浏览器访问 Web 界面。OpenAI 此举在移动端编码工具领域取得了先发优势。

不过，Anthropic 近期在桌面端动作密集：发布 Claude Opus 4.7、引入 Agent View、内置 FM 编程电台、接入 Office 全家桶等。两家的竞争焦点目前仍集中在桌面端编码体验的打磨上。
