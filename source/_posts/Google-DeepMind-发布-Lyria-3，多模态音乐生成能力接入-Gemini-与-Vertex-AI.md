---
title: Google DeepMind 发布 Lyria 3，多模态音乐生成能力接入 Gemini 与 Vertex AI
categories: AI资讯
tags: [DeepMind, Lyria 3, Gemini, Vertex AI]
date: 2026-02-19 19:41:11
---
# 标题：Google DeepMind 发布 Lyria 3，多模态音乐生成能力接入 Gemini 与 Vertex AI

> DeepMind 推出第三代高保真音乐生成大模型 Lyria 3，首次实现“图/文/视频到音频”的直连生成，并同步作为可编程基础设施开放 API。
![iShot_2026-02-19_19.41.48](https://images.51allai.com/blog/iShot_2026-02-19_19.41.48_20260219_194202.png)

# 架构与多模态生成能力

Lyria 3 突破了单一文本输入的限制，支持基于自然语言、图片及视频直接输出 30 秒高保真（48kHz）音频。 模型原生具备自动作词与和弦编排能力，用户可通过 Prompt 对流派、BPM（节奏）、人声声线及情绪张力进行细粒度控制。底层采用 Causal Streaming（因果流）架构，确保生成速度大于播放速度（RTF > 1），满足生产级系统的实时吞吐需求。在 Gemini 应用内，系统自动调用 Nano Banana 图像模型为生成的音轨输出定制化单曲封面。

# 商业与开发生态双线接入

* **消费者端**：以“Music”工具面板形式全量接入 Gemini Web 及移动端，首批支持英语、德语、日语等 8 种语言。Google AI Plus/Pro/Ultra 订阅用户享有比基础免费用戶更高的生成额度。
* **开发者端**：通过 Vertex AI 提供 API 接口，标志着音频生成正式被作为可编程基础设施对待。开发者可进行进阶操作，如音频转换（哼唱转管弦乐）、MIDI 风格迁移（通过 MIDI 和弦生成人声合唱）及保持原始旋律的乐器无缝替换。