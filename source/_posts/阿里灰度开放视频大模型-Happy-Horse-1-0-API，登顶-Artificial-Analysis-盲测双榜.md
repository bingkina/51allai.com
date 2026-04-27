---
title: 阿里灰度开放视频大模型 Happy Horse 1.0 API，登顶 Artificial Analysis 盲测双榜
permalink: posts/2026/04/alibaba-happy-horse-1-0-api-artificial-analysis/
categories: AI资讯
tags: [阿里巴巴, Happy Horse, 视频生成, 多模态, Artificial Analysis, API, 通义大模型]
date: 2026-04-28 00:18:32
description: 阿里视频大模型 Happy Horse 1.0 灰度开放 API，在 Artificial Analysis 盲测中以 1382/1400 Elo 评分登顶文生视频与图生视频双榜，超越字节 Seedance 2.0。
cover: https://images.51allai.com/blog/截图2026-04-28_00.17.21@2x_20260428_001949.png
---
> 该模型在纯视觉质量盲测中打破现有纪录，通过 150 亿参数单流架构实现音画同步生成，补齐了阿里在多模态生成业务上的关键短板。
![截图2026-04-28_00.17.21@2x](https://images.51allai.com/blog/截图2026-04-28_00.17.21@2x_20260428_001949.png)

## 盲测登顶与研发溯源
2026年4月上旬，Happy Horse 1.0 匿名登陆 Artificial Analysis Video Arena 盲测榜单并斩获两项第一。其文生视频（无音频）Elo 评分最高达 1382，图生视频（无音频）Elo 评分突破 1400，以数十点分差超越原榜首字节跳动 Seedance 2.0。该模型确系阿里巴巴研发，由前快手可灵技术负责人张迪带队。阿里内部近期已同步进行组织调整，多模态团队并入通义大模型事业部（周靖人负责）以统一模型出口。

## 模型架构与 API 生产特性
模型底层采用 150 亿参数的 40 层统一单流 Transformer（Self-Attention），摒弃了跨模态注意力机制（Cross-Attention）。该架构实现了文本、视频、音频 Token 的同步处理，支持 8 步去噪极速推理（无需 CFG）。

针对近期的灰度测试与 API 开放，其功能定义明确向生产端倾斜：
- 支持“文生视频”、“图生视频”及最高容纳 9 张参考图的 Reference-to-Video 模式。
- 引入多镜头结构控制（Shot 1/Shot 2/Shot 3）和明确的摄影机运镜参数，以解决多切片下的主体特征一致性问题。
- 支持基于自然语言的直接视频编辑。