---
title: 深度求索开源 DeepSeek-V4 预览版，混合注意力机制重构百万上下文计算成本
permalink: posts/2026/04/deepseek-v4-preview/
categories: AI资讯
tags: [DeepSeek]
description: "DeepSeek 推出 1.6 万亿参数的 V4-Pro 与 2840 亿参数的 V4-Flash 预览版，通过底层注意力架构重构大幅度压缩长文本推理开销，核心代码能力直指闭源第一梯队。"
date: 2026-04-24 12:24:00
---
> DeepSeek 推出 1.6 万亿参数的 V4-Pro 与 2840 亿参数的 V4-Flash 预览版，通过底层注意力架构重构大幅度压缩长文本推理开销，核心代码能力直指闭源第一梯队。
![截图2026-04-24_12.26.41@2x](https://images.51allai.com/blog/截图2026-04-24_12.26.41@2x_20260424_122712.png)

本次预览版全系采用混合专家（MoE）架构，提供两个维度的开源权重：
- **DeepSeek-V4-Pro**：总参数量达 1.6T（1.6 万亿），单次前向计算激活 49B 参数。
- **DeepSeek-V4-Flash**：总参数量 284B，单次激活 13B 参数。
- **数据与后训练路径**：基于超 32T 高质量 Token 进行预训练。后训练采用两阶段范式：首先通过 SFT 与基于 GRPO 的强化学习进行领域独立专家模型的训练，随后通过同策略蒸馏（On-policy Distillation）将不同领域的能力合并入单一模型。全面启用 Muon 优化器以换取大规模训练的收敛速度与稳定性。

## 拆解“百万上下文”的底层解法
相较于单纯扩张显存上限，V4 的技术核心在于大幅削减极长上下文的内存墙与算力瓶颈：
- **混合注意力机制 (Hybrid Attention)**：模型结合了压缩稀疏注意力（CSA）与高重度压缩注意力（HCA）。据官方披露的基准测试，在 1M（一百万）Token 上下文长度设定下，V4-Pro 单 Token 推理的 FLOPs（浮点运算次数）仅为上一代 V3.2 的 27%，KV Cache 占用骤降至 10%。
- **流形约束超连接 (mHC)**：为应对 1.6T 极大规模的训练不稳定性，V4 引入了其 2025 年底公开的 mHC 技术。该机制在不损失模型表达能力的前提下，约束了残差连接中的信号跨层传播衰减问题。

## 推演模式与应用锚点
模型内置了独立的最大化推理模式（DeepSeek-V4-Pro-Max / Flash-Max）。在仓库级超长代码生成与跨文件逻辑测试中，内部及早期测试数据表明其表现出极强的长文本信息召回（NIAH）能力，旨在直接对标 Claude Opus 4.5 与 GPT 系列等前沿闭源模型的代码工程表现。

- 官网：https://chat.deepseek.com
- Hugging Face：https://huggingface.co/collections/deepseek-ai/deepseek-v4