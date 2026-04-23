---
title: 小米公测 MiMo-V2.5 系列模型并重构 Token 定价
permalink: posts/2026/04/MiMo-V2.5/
categories: AI资讯
tags: [小米, MiMo, Agent]
date: 2026-04-23 19:19:16
---
> 距上一代发布仅36天，小米由前 DeepSeek 核心成员主导的新一代多模态大模型落地，主攻百万级上下文、高阶 Agent 自主执行能力，并大幅精简商业 API 定价模型。
![c744-5c48067d11334463031407d144763ed7](https://images.51allai.com/blog/c744-5c48067d11334463031407d144763ed7_20260423_192329.png)

# 矩阵构成与开源策略

本次公测共释放四款模型：基座模型 MiMo-V2.5、旗舰模型 MiMo-V2.5-Pro，以及语音维度的 V2.5-TTS Series 和 V2.5-ASR。其中，**MiMo-V2.5 与 MiMo-V2.5-Pro 确认将于近期向全球开源**。该系列研发负责人为前 DeepSeek 核心成员罗福莉。

# 核心演进数据与 Agent 表现

  - **MiMo-V2.5-Pro（高阶复杂长程任务）**：侧重专业生产力场景。官方给出的极端跑分案例显示，该模型能在 11.5 小时内自主无干预工作，期间进行 1868 次工具调用，最终产出 8192 行有效代码。
  - **MiMo-V2.5（越级全模态 Agent）**：具备原生视觉和音频理解能力，支持高达 100 万（1M）上下文窗口。在 Claw-Eval 智能体评测中，基座版本的 Agent 能力越级超越了前代旗舰 MiMo-V2-Pro。同时在 VideoMME、CharXiv 等评测中，多模态感知能力反超前代全模态版本 MiMo-V2-Omni。

# Token 效率与 API 定价重构

小米同步对模型订阅计划（Token Plan）进行了底层逻辑调整，核心诉求为降低实际调用门槛：

1.  **取消惩罚性机制**：废除“1 Token = 4 Credits”的计费换算方式。
2.  **长文本平权**：不再区分 256K 与 1M 上下文的计费单价。
3.  **引入波峰波谷定价**：新增夜间闲时优惠速率机制。
4.  **消耗优化（官方基准下）**：在同等 Claw-Eval 智能体测试成绩下，MiMo-V2.5-Pro 较 Kimi K2.6 节省约 42% Token 消耗；MiMo-V2.5 较 Muse Spark 节省约 50%。综合 API 调用成本下降约 50%。

# 即将开源

MiMo-V2.5-Pro 和 MiMo-V2.5 模型即将全球开源，敬请期待。

# 官方API接入

- Xiaomi MiMo 开放平台：https://platform.xiaomimimo.com
- Token Plan 订阅：https://platform.xiaomimimo.com/#/token-plan

# 产品体验
- Xiaomi MiMo Studio：https://aistudio.xiaomimimo.com/#/c