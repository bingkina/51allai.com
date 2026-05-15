---
title: Moonshot 推出 Kimi WebBridge，让 AI Agent 直接操控浏览器
date: 2026-05-15 10:32:33
permalink: posts/2026/05/moonshot-kimi-webbridge-browser-agent/
categories:
  - 智能体
tags:
  - Kimi WebBridge
  - Moonshot AI
  - 浏览器自动化
  - Agent框架
description: Moonshot AI 发布 Kimi WebBridge 浏览器扩展，基于 Chrome DevTools Protocol 实现本地 Agent 对浏览器的直接控制，支持 Claude Code、Cursor、Codex 等第三方 Agent 接入，页面内容和登录态全程不离开用户设备。
---

> Moonshot AI 发布 Kimi WebBridge 浏览器扩展，基于 Chrome DevTools Protocol 实现本地 Agent 对浏览器的直接控制，支持 Claude Code、Cursor、Codex 等第三方 Agent 接入。
![Kimi WebBridge 功能页截图](https://images.51allai.com/blog/截图2026-05-15_10.29.55@2x_20260515_103211.png)

## 产品定位：Agent 的浏览器"遥控器"

Kimi WebBridge 是一款 Chrome/Edge 浏览器扩展，由 Moonshot AI（月之暗面）推出。核心功能：让 AI Agent（包括 Claude Code、Cursor、Codex、Kimi Code CLI、Hermes 等）像真人一样在已登录的浏览器窗口中执行点击、滚动、填表、截图、抓取页面文本等操作。

与云端浏览器方案不同，WebBridge 采用本地优先架构：本地后台服务 + 浏览器扩展配对运行，所有操作在用户设备上完成，页面内容和登录态不经过 Moonshot 服务器。

## 技术架构：CDP 直连，Agent 无关设计

WebBridge 的技术栈分三层：

- **本地服务**：在 macOS 或 Windows 上运行的后台守护进程，接收 Agent 发来的任务指令。
- **浏览器扩展**：基于 Chrome DevTools Protocol（CDP）在 Chrome/Edge 中执行具体 DOM 操作——点击元素、填充表单、截图、读取页面内容。CDP 是开发者调试浏览器用的底层接口，WebBridge 把它复用为 Agent 的操作通道。
- **Agent 接入层**：官方提供一条 curl 安装脚本，粘贴到终端即可将 Agent 与 WebBridge 服务自动连接。设计上不绑定 Kimi 自家模型，属于 Agent-agnostic 架构。

## 与 K2.6 模型协同

WebBridge 由 K2.6 技术驱动。K2.6 是 Moonshot AI 于 2026 年 4 月 20 日开源的 MoE 模型（1 万亿参数，32B 激活参数，256K 上下文窗口），SWE-Bench Pro 得分 58.6%，支持 300 个子 Agent 并行、4000 步协调执行、最长 12 小时自主运行。WebBridge 作为浏览器操作层，与 K2.6 的长程任务规划能力配合，适合多步骤网页任务（行情调研、职位比对、机票比价等）。

## 接入现状

目前已验证兼容的 Agent：Claude Code、Kimi Code CLI、Cursor、Codex、Hermes、OpenClaw。用户只需安装 Chrome/Edge 扩展 + 运行本地服务，一条命令即可完成对接。扩展在 Chrome Web Store 和 Edge Add-ons 上架，无需额外注册账号。
