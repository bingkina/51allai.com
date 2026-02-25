---
title: MiniMax 推出 MaxClaw：OpenClaw 框架的 Serverless 托管部署方案
categories: AI资讯
tags: [MiniMax, MaxClaw, OpenClaw]
date: 2026-02-26 00:03:17
---
> MiniMax 基于开源智能体框架 OpenClaw 推出免运维云端部署服务 MaxClaw，通过底座模型 M2.5 与通讯软件的原生集成，将复杂 Agent 的部署门槛降至 10 秒量级。
![iShot_2026-02-26_00.02.40](https://images.51allai.com/blog/iShot_2026-02-26_00.02.40_20260226_000355.png)

# OpenClaw 的一键云端化

MaxClaw 并非独立的新一代底层大模型，而是开源智能体框架 OpenClaw 的官方云托管版本。其核心业务逻辑在于消除本地部署的技术债与硬件依赖（规避了部署原生 OpenClaw 常需的本地算力硬件或复杂环境配置），实现“10秒拉起，零运维”。前端直接通过 MiniMax Agent (agent.minimax.io) 提供可视化配置 UI。

# 跨端分发与记忆持久化

* **通信渠道直连**：系统默认打通 Telegram、Discord 与 Slack 通信协议。Agent 直接挂载于用户的高频通讯场景内响应指令，剥离了对独立 App 或网页端入口的强制依赖。
* **记忆机制**：底层支持会话状态的持久化。官方系统级赋予 Agent 长期记忆能力，可基于历史交互进行上下文微调、理解用户偏好并维持固定的人格设定。

# 算力引擎：M2.5 模型矩阵支撑

MaxClaw 的运行由 MiniMax 自研的 M2.5 系列模型（包含 Lite / Highspeed 版本）驱动。根据开发者文档，M2.5 针对代码生成、复杂重构及长文本推理进行了定向强化。此外，M2.5 极低的 API 推理成本（官方数据：高并发 100 TPS 持续运行一小时成本约 1 美元）构成了 MaxClaw 支撑高频 Agent 调用的商业基础。