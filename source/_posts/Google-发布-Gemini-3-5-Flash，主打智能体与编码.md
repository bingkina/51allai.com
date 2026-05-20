---
title: Google 发布 Gemini 3.5 Flash，主打智能体与编码
permalink: posts/2026/05/google-gemini-3-5-flash-release/
tags:
  - google
  - gemini
  - model-release
  - ai-agents
date: 2026-05-20 21:27:34
categories:
  - 大模型
description: Google 在 I/O 2026 发布 Gemini 3.5 Flash，定位为智能体与编码优化的前沿模型。1M 上下文窗口，全面基准测试超越 3 Flash，定价为前代的 3 倍。
cover:
---

> Google 在 I/O 2026（5 月 19 日）发布 Gemini 3.5 Flash，定位为"将前沿智能与行动能力结合"的首个模型，全面 GA 上线。
![Gemini 3.5 Flash 产品卡片](https://images.51allai.com/blog/截图2026-05-20_21.25.40@2x_20260520_212656.png)

## 定位：首个"前沿智能 + 行动能力"结合的模型

Gemini 3.5 Flash 在 Google I/O 2026 上发布，同日全球 GA。Google 将其定位为系列中的第一个模型——"将前沿智能与行动能力结合"（frontier intelligence with action），核心场景是智能体（agent）工作流和编码任务。

该模型已集成到 Google 全线产品：Gemini App、Google Search 的 AI 模式、Antigravity、Gemini API、AI Studio、Gemini Enterprise Agent Platform，以及作为 Gemini Spark 个人智能体的默认底层模型。Gemini 3.5 Pro 计划下月发布。

## 基准测试：全面超越 Gemini 3 Flash

以下为 Gemini 3.5 Flash 与 3 Flash 的官方对比数据（来源：DeepMind Model Card）：

| 基准 | 3.5 Flash | 3 Flash | 提升 |
|---|---|---|---|
| Terminal-bench 2.1 | 76.2% | 58.0% | +18.2pp |
| SWE-Bench Pro | 55.1% | 49.6% | +5.5pp |
| MCP Atlas | 83.6% | 62.0% | +21.6pp |
| OSWorld-Verified | 78.4% | 65.1% | +13.3pp |
| Finance Agent v2 | 57.9% | 42.6% | +15.3pp |
| CharXiv Reasoning | 84.2% | 80.3% | +3.9pp |
| MMMU-Pro | 83.6% | 81.2% | +2.4pp |
| ARC-AGI-2 | 72.1% | 33.6% | +38.5pp |
| MRCR v2 (128K) | 77.3% | 67.2% | +10.1pp |
| MRCR v2 (1M) | 26.6% | 22.1% | +4.5pp |

增幅最大的三项：ARC-AGI-2（+38.5pp）、MCP Atlas（+21.6pp）、Terminal-bench 2.1（+18.2pp），均指向智能体执行能力的显著提升。

官方还称其输出速度"比同类前沿模型快 4 倍"，在优化版 Antigravity 2.0 中可达"12 倍"。Google 内部日均处理 token 量已超过三万亿。

以上数据均为 Google 官方口径，暂无第三方独立复现。

## 技术规格：1M 上下文，可控思考深度

- **上下文窗口**：最高 1M token 输入，64K token 输出
- **输入模态**：文本、图像、音频、视频文件
- **输出模态**：文本
- **思考层级**：支持动态调节思考深度，以平衡质量、成本和延迟

ARC-AGI-2 的大幅提升（33.6% → 72.1%）和 1M 上下文的持续理解能力（MRCR 1M 从 22.1% 提升到 26.6%）是本次升级中值得关注的两个技术信号。

## 定价：为标准前沿模型的 3 倍，但低于同类前沿模型

Gemini 3.5 Flash 定价（标准层）：

| | 输入（$/M tokens） | 输出（$/M tokens） |
|---|---|---|
| 标准 | $1.50 | $9.00 |
| 延迟处理（Deferred） | $0.75 | $4.50 |
| 高优先级路由 | $2.70 | $16.20 |

作为对比，Gemini 3 Flash 的标准层价格为 $0.50/$3.00 —— 3.5 Flash 的定价恰好是前代的 3 倍。

Google 官方称其"以低于同类前沿模型一半的成本提供前沿级能力"。官方博客还给出了一个案例：若头部企业将 80% 工作负载迁移至 3.5 Flash，年节省可超 10 亿美元。

## 企业部署案例

Google 在发布会上列出了多个早期合作伙伴的部署场景（均为官方口径）：

- **Shopify**：并行子智能体，用于商家增长预测
- **Macquarie Bank**：在 100+ 页文档上进行推理，用于客户入驻流程
- **Salesforce**：与 Agentforce 集成，支持多轮工具调用
- **Ramp**：对复杂发票进行 OCR，结合历史数据推理
- **Xero**：自主执行多周工作流，如 1099 税务表单处理
- **Databricks**：实时数据监控和诊断
