---
title: Google 推出原生多模态模型 Gemini Embedding 2 预览版
permalink: posts/2026/03/gemini-embedding-2-preview/
description: "Google 发布支持文本、图像、音视频及 PDF 同源向量化的嵌入模型 Gemini Embedding 2，原生打通跨模态检索，并支持弹性维度输出。 原生多模态统一向量空间 Gemini Embedding 2（模型 ID：gemini-embedding-2-preview…"
categories: AI资讯
tags: [Google, Gemini]
date: 2026-03-11 11:04:17
---
> Google 发布支持文本、图像、音视频及 PDF 同源向量化的嵌入模型 Gemini Embedding 2，原生打通跨模态检索，并支持弹性维度输出。

## 原生多模态统一向量空间

Gemini Embedding 2（模型 ID：`gemini-embedding-2-preview`）改变了以往不同模态需要独立处理再对齐的传统链路，原生支持将五种模态数据映射至单一的向量空间。 具体输入限制如下：

* **文本**：支持最高 8,192 Tokens 上下文窗口，覆盖 100+ 种语言。
* **图像**：单次 Prompt 最多输入 6 张图像（支持 PNG/JPEG，控制台直传无单文件大小限制）。
* **音频**：原生提取音频特征，跳过语音转文本（ASR）的中间件步骤。
* **视频**：单次支持最高 120 秒无声视频或 80 秒有声视频（MP4/MOV）。
* **文档**：单次请求直接支持解析最高 6 页的 PDF 文件。

## 引入套娃表示学习（MRL）与基准性能

该模型集成了套娃表示学习（Matryoshka Representation Learning, MRL）技术。默认输出 3072 维浮点向量，但允许开发者根据向量数据库的存储成本和检索延迟约束，在不显著损失语义精度的前提下，将维度向下弹性截断（官方推荐尺寸为 3072、1536、768，最低支持 128 维）。

核心 Benchmark 数据表明其跨模态检索能力处于头部梯队：

* **文本-代码（MTEB Code）**：均分 84.0。
* **文本-图像检索（Docci）**：recall@1 达 93.4。
* **文本-视频检索（MSR-VTT）**：ndcg@10 达 68.0。
* **语音-文本（MSEB）**：mrr@10 达 73.9。
* **多语言表现（MTEB Multilingual）**：得分 69.9。