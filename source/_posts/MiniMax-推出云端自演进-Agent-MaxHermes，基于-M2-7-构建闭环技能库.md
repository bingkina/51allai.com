---
title: MiniMax 推出云端自演进 Agent MaxHermes，基于 M2.7 构建闭环技能库
permalink: posts/2026/04/minimax-maxhermes-self-evolving/
categories: 智能体
tags: [minimax, maxhermes, cloud-agent]
description: "MiniMax 依托底层 M2.7 模型的代码与推理能力，上线云端 AI 助手 MaxHermes。产品核心在于从“静态工具调用”转向“动态技能自提炼”，并实现 24 小时脱机运行。"
date: 2026-04-16 14:43:11
---
> MiniMax 依托底层 M2.7 模型的代码与推理能力，上线云端 AI 助手 MaxHermes。产品核心在于从“静态工具调用”转向“动态技能自提炼”，并实现 24 小时脱机运行。
![截图2026-04-16_14.36.08@2x](https://images.51allai.com/blog/截图2026-04-16_14.36.08@2x_20260416_144400.png)

## 闭环自主演进机制 (Self-Evolution)
MaxHermes 的核心架构基于云端沙箱。有别于单次 Prompt 交互，当其完成复杂长链路任务（如跨组件操作或逻辑推演）后，会自动提炼操作路径，生成可复用的“技能”（Skills）并作为独立文档持久化保存。这些技能在后续触发相同场景时按需动态加载，并通过真实反馈数据不断自我迭代。系统原生支持跨会话记忆（Cross-session memory）和多个子代理（Sub-agents）并行处理。

## 10 秒云端部署与通讯端直连
摒弃了本地高昂的部署门槛，MaxHermes 定位为开箱即用的云原生托管服务。支持 10 秒级云端实例拉起，实现 24/7 不间断在线。前端交互已与主流即时通讯平台（Telegram、Discord、Slack）原生打通，用户无需跳转专有平台即可直接下发自然语言定义的定时或持续性任务。商业化方面，该实例已整合至 MiniMax Agent 的订阅生态（Pro 版 $58/月起），其工具调用需额外消耗账户 Token。

## 底层驱动：MiniMax-M2.7 MoE 模型
该 Agent 的工程稳定性直接依赖于开源的 M2.7 稀疏混合专家模型。基准测试显示，M2.7 在解决真实软件工程问题的 SWE-Pro 基准中得分 56.22%（逼近 Claude Opus 4.6 梯队），端到端交付 VIBE-Pro 测试达 55.6%，且在办公自动化（Word/Excel/PPT）基准 GDPval-AA 中以 1495 ELO 登顶开源榜首。官方数据显示，在超 2000 Tokens 的高复杂度技能调用场景中，模型维持了 97% 的指令依从率。