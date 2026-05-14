---
title: xAI发布Grok 4.3大模型：强制全时推理，价格下调近半
permalink: posts/2026/05/xai-grok-4-3-always-on-reasoning/
tags: [Grok, xAI, 全时推理, 大模型对比, API定价]
date: 2026-05-06 18:55:12
categories: 大模型
description: "xAI 发布 Grok 4.3 大模型强制开启全时推理模式不可关闭，上下文窗口扩至100万 token，Artificial Analysis 的 GDPval-AA 评估 ELO 得分1500较前代暴涨321分，API 价格下调近半以极端性价比冲击 Agent 工作流市场。"
cover:
---
> Grok 4.3 将“推理”设为不可关闭的常驻状态，并在上下文长度提升至 100 万 token 的同时大幅削减 API 定价，以极端的性价比冲击 Agent 工作流及低成本模型市场。

## 架构演进：强制全时推理（Always-on Reasoning）与 1M 上下文
Grok 4.3 改变了前代模型的“思维链（Chain-of-Thought）”按需调用机制，将推理（Reasoning）设定为原生且无法关闭的常驻状态。模型默认在输出前进行多步骤逻辑思考。
- **参数指标**：支持最高 1,000,000 tokens 上下文窗口。知识库截止日期更新为 2025 年 12 月（原生支持联网搜索）。
- **实测表现**：在 Artificial Analysis 的 GDPval-AA 评估中，ELO 评分达到 1500（较 Grok 4.20 暴涨 321 分）。指令遵循和 Agentic 客服任务能力显著提升，𝜏²-Bench Telecom 测试得分达 98%。