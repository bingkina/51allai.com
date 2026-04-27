---
title: 阿里发布 Qwen3.6-Max-Preview，API 新增思维保留机制优化智能体编程
permalink: posts/2026/04/qwen3.6-max-preview/
categories: 大模型
tags: [alibaba, qwen, model-release]
description: "阿里云上线下一代旗舰大模型早期预览版，通过底层接口支持多轮思维链保留，刷新第三方平台国产大模型评测上限。"
date: 2026-04-20 21:27:36
---
> 阿里云上线下一代旗舰大模型早期预览版，通过底层接口支持多轮思维链保留，刷新第三方平台国产大模型评测上限。
![3.6_max_preview_banner](https://images.51allai.com/blog/3.6_max_preview_banner_20260420_212936.png)

## 性能跃升与基准表现
Qwen3.6-Max-Preview 定位为千问系列下一代旗舰大模型的早期版本。对比前序释放的 Qwen3.6-Plus 模型，该版本进一步提升了世界知识密度与复杂指令遵循能力。其核心技术突破点在于**智能体编程（Agentic Programming）**，宣称在 6 项相关核心基准测试中取得首位。同时，据第三方基准测试平台 Artificial Analysis 最新追踪数据，该预览版目前的综合性能表现位列国产模型第一。

## 部署与 preserve_thinking 机制
该模型当前已在 Qwen Studio 开放交互体验，并即将挂载至阿里云百炼 API（接口调用名：`qwen3.6-max-preview`）。
本次发布的工程核心在于 API 层面对 Agent 开发的专门适配：新增了 `preserve_thinking` 参数。激活此功能后，模型能在上下文消息中强制保留所有前序轮次的内部思维过程（Chain-of-Thought）。该机制从底层接口设计上，直接干预并降低了长周期多步推理任务中智能体面临的状态遗忘风险。