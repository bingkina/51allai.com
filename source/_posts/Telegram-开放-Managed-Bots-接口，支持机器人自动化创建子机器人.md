---
title: Telegram 开放 Managed Bots 接口，支持机器人自动化创建子机器人
permalink: posts/2026/04/telegram-managed-bots-api-automated-bot-creation/
categories: 智能体
tags:
  - telegram
  - agent-framework
  - bot-automation
  - api-update
  - multi-agent
date: 2026-04-30 10:18:23
description: Telegram Bot API 9.6 引入 Managed Bots 托管机器人机制，主机器人可直接创建和接管子机器人，废除 BotFather 手动复制 Token 流程。通过 getManagedBotToken 等新增 API 实现 Bot-to-Bot 自动化部署链，为 AI Agent 集群的无感分发提供底层基础设施支持。
cover:
---
> Telegram Bot API 9.6 引入托管机器人（Managed Bots）机制，废除传统的 BotFather 密钥复制流程，允许主程序自动创建及接管子机器人，为 AI Agent 及自动化应用的无感部署提供底层基础设施。
![c82f3df5fb2bdde5f3](https://images.51allai.com/blog/c82f3df5fb2bdde5f3_20260430_101956.webp)

## API 核心机制重构
Telegram 于 2026 年 4 月初发布 Bot API 9.6 更新。新增 `getManagedBotToken(user_id)` 及 `replaceManagedBotToken(user_id)` 方法，使主机器人（Manager Bot）可直接获取及轮换子机器人密钥。底层通信新增 `ManagedBotUpdated` 事件类，主机器人在子机器人成功创建或密钥变更时会收到实时回调。此机制在架构层实现了 Bot-to-Bot 的自动化部署链。

## 部署工作流去摩擦化
彻底淘汰此前依赖人工在 BotFather 中生成并复制 Token 的流程。主程序通过调用新增的 `request_managed_bot` 键盘按钮，直接触发 Telegram 客户端预设的原生机器人创建 UI。用户点击确认后，子机器人的归属权绑定至该用户账户，但控制权（Token）通过 API 直接下发给主机器人。前提条件是开发者需预先在 @BotFather 的 Mini App 中开启 "Bot Management Mode"。
