---
title: LibTV 平台接入 HappyHorse 1.0，实现原声音视频单流同步生成
permalink: posts/2026/04/libtv-happyhorse-1-0/
categories: 多模态
tags: [libtv, happyhorse, video-generation, audio-generation]
date: 2026-04-27 19:51:30
description: "LibTV 平台正式上线 HappyHorse 1.0 视频音频生成模型，依托150亿参数统一架构首次在应用端打通视频画面与高保真音频的联合生成全链路，实现原声音频与视频画面的单流同步输出能力，彻底重构传统影视制作中的后期配音与拟音工作流。"
cover: https://images.51allai.com/blog/20260427-194949_20260427_195203.jpeg
---
> LibTV 平台正式上线 HappyHorse 1.0 模型，依托 150 亿参数的统一架构，该模型在应用端首次打通视频画面与高保真音频的联合生成链路，重构传统影视后期的配音与拟音工作流。
![20260427-194949](https://images.51allai.com/blog/20260427-194949_20260427_195203.jpeg)

## HappyHorse 1.0 模型架构与 Benchmark 数据
- **底层架构**：采用约 150 亿参数的 40 层单流自注意力 Transformer（Sandwich 架构）。文本、图像、视频及音频 Token 在同一序列中进行联合去噪，无独立交叉注意力模块。
- **评测排名**：在 Artificial Analysis Video Arena 盲测中，无音频 T2V（Elo 1333）与无音频 I2V（Elo 1392）类别位列第一，纯视觉表现超越 Seedance 2.0 及 Kling 3.0。
- **视觉输出规格**：原生支持 1080p 视频生成，单次生成时长覆盖 5-15 秒，主要突破点在于原生景深物理与电影级光影质感。

## 原生音频合成（Native Audio Generation）参数
- **单次前向传递**：摒弃传统视频模型“先画后音”的双管线后处理模式。模型在同一次前向传递（Forward pass）中同步输出画面、角色对白、环境音及拟音（Foley）。
- **音素级对齐**：支持中、英、粤、日、韩、德、法 7 种语言的音素级（Phoneme-level）唇形同步。据披露数据，其词错率（WER）指标为 14.60%。

## LibTV 平台的工程化与工作流融合
- **节点式调度**：结合 LibTV “无限画布”的底层交互，HappyHorse 1.0 的长序列与多模态生成能力被转化为结构化节点。创作者可在同一画布内完成视觉生成与音轨控制的同步调整。
- **Agent 直连**：LibTV 底层架构支持“小龙虾”（OpenClaw）等 Personal Agent 调用。允许用户通过自然语言下发包含镜号与声场要求的复合指令，由 Agent 自主编排并调用 HappyHorse 1.0 完成成片。