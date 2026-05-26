---
title: 腾讯发布系统级AI助手Marvis，日送1000万Token
permalink: posts/2026/05/tencent-marvis-desktop-agent/
date: 2026-05-22 10:08:32
categories:
  - 智能体
tags:
  - desktop-agent
  - tencent
  - marvis
description: 腾讯应用宝团队发布操作系统级 AI Agent Marvis（马维斯），支持 Windows/Mac/安卓三端，无需邀请码直接开放。内置 6 个协同智能体，提供效率模式与隐私模式，每日 1000 万免费 Token。
cover:
---

> 腾讯应用宝团队推出操作系统级 AI Agent Marvis（马维斯），Windows/Mac/安卓三端可用，无需邀请码直接开放，每日 1000 万免费 Token。桌面 Agent 赛道再添大厂玩家。
![Marvis 产品界面](https://images.51allai.com/blog/截图2026-05-22_10.07.00@2x_20260522_101059.png)

## 产品定位与架构

Marvis 定位为"操作系统 Agent"，不是聊天机器人。它将系统、文件、应用、网络搜索纳入同一个 AI 中间层，用户通过自然语言指令直接操控整台电脑。

内置 6 个协同智能体，由 1 个 Supervisor Agent 统一调度：

- **PM Agent**：接收用户指令，拆解任务并分发给子 Agent，支持多任务并行执行
- **File Agent**：文件搜索、格式转换、去重合并、表格分析出报表、OCR 识别
- **Computer Agent**：管理系统设置（改默认浏览器、查硬件状态、设开关机时间、检测高耗电进程）
- **APP Agent**：联动常用软件，跨应用操作（查机票、电商比价）
- **Search Agent**：网络搜索与信息聚合
- **Browser Agent**：接管网页交互、数据抓取

## 端云协同与隐私模式

提供两种运行模式：

- **效率模式**：依托云端大模型完成语义理解和任务规划，操作执行在本地完成
- **隐私模式**：全部对话与数据在设备本地处理，不上传云端，断网可用

敏感操作设有 L2 级安全兜底机制，需用户确认后才执行。

## 跨端协同

支持 Windows/Mac/安卓三端，同账号互通。iOS 版本仍在开发中。

手机端可直接查看电脑屏幕并实时接管，PC 锁屏状态下手机仍可远程输入密码解锁操控。桌面版负责本地操作执行，APP 版承担远程指令发出与状态同步。

## 开放策略

无需邀请码，官网 [marvis.qq.com](https://marvis.qq.com) 直接下载。每人每天 1000 万免费 Token 额度。

