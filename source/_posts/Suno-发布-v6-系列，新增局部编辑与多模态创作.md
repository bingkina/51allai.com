---
title: Suno 发布 v6 系列，新增局部编辑与多模态创作
permalink: posts/2026/09/suno-v6-music-models/
tags: [suno, audio-generation, model-release, product-update]
sources:
  - name: Suno — Introducing v6
    url: https://blog.suno.com/blog/introducing-v6
    note: 发布日期、三款模型定位、开放范围与新增创作功能
  - name: Suno 官方 X 帖文 — Welcome to the v6 era
    url: https://x.com/suno/status/2097714273942163823
    note: v6 系列发布与合作开发信息
  - name: Suno Pricing
    url: https://suno.com/#pricing-section
    note: Free、Pro 与 Premier 当前月付价格
  - name: Engadget — Suno trained its v6 AI music models with help from Warner and BMG
    url: https://www.engadget.com/2251539/suno-trained-its-v6-ai-music-models-with-help-from-warner-and-bmg/
    note: 独立核对模型数量、订阅范围与编辑功能
date: 2026-09-09 23:56:33
categories: 多模态
description: Suno 发布 v6、v6-wild 和 v6-mini 三款音乐模型，加入自然语言局部改歌、多来源混音、采样分离及图文音视频生成入口。本文说明三款模型的适用场景、账户范围与当前订阅价格。
cover: https://images.51allai.com/blog/suno-v6-music-models-cover_20260910_000126.png
---
> Suno 于 9 月 9 日发布 v6、v6-wild 和 v6-mini 三款音乐模型。新系列支持用自然语言修改歌曲局部、组合多首歌曲的元素，并可从文字、音频、图片或视频开始创作；v6-mini 对免费账户开放。
![Suno v6 三款音乐模型与局部编辑和多模态创作](https://images.51allai.com/blog/suno-v6-music-models-cover_20260910_000126.png)

## 三款模型对应不同创作方式

Suno v6 系列由三个模型组成。v6 面向目标较明确的创作和后续精修，v6-wild 用于尝试变化更大的方向，v6-mini 则是所有账户都能使用的入口。

| 模型 | 主要用途 | 可用账户 |
| --- | --- | --- |
| v6 | 按明确目标生成和精修歌曲 | Pro、Premier |
| v6-wild | 探索不同编曲和声音方向 | Pro、Premier |
| v6-mini | 日常音乐生成 | 包括免费账户在内的所有用户 |

当前月付价格为：Free 免费，Pro 每月 10 美元，Premier 每月 30 美元。免费用户可以直接使用 v6-mini；需要使用 v6 或 v6-wild 的用户需订阅 Pro 或 Premier。

## 自然语言可以只修改歌曲的一部分

v6 系列允许用户选中已有歌曲的一段，再用日常语言说明改法。系统可以替换这一段，同时保留歌曲其余部分。例如，用户可以要求改变副歌的演唱方式，也可以只替换歌词中的一个词或一行，不必从头生成整首歌。

这类局部编辑把“生成”和“修改”放进同一条工作流。用户先得到完整歌曲，再针对不满意的段落继续调整，适合需要反复修改歌词、演唱或编曲细节的创作。

## 多首歌曲的元素可以在一次请求中组合

新系列可以在一次请求中组合多个来源。用户可指定从一首歌取人声、从另一首歌取鼓点，再添加新歌词和风格要求，生成新的混音结果。

采样处理也进入同一流程。用户可以指定时间点，从歌曲中提取一段乐器素材，再围绕它生成新的节拍。这比先导出音频、在其他软件中切片，再返回生成工具的步骤更短。

## 文字、音频、图片和视频都能作为起点

v6 系列接受文字、音频、图片和视频作为创作输入。用户可以从一句描述、语音备忘录、视觉素材或视频开始，再让模型把这些参考转成音乐。图片和视频在这里提供情绪与氛围参考，并不是把画面直接转换成固定音效。

如果主要需求是通过 Gemini 或 API 从图文生成歌曲，可以对照阅读 [Google Lyria 3.5 的使用入口与 API 价格](/posts/2026/09/google-lyria-35-gemini-api/)。Suno v6 这次更新的重点，是在生成之后继续局部编辑、混音和采样。

## 普通用户怎么选

免费账户先使用 v6-mini，适合从提示词或多模态素材快速开始一首歌。Pro 和 Premier 用户在目标清楚时可选择 v6；需要寻找不同方向时，可先用 v6-wild 生成方案，再把选中的结果交给 v6 继续调整。

三款模型共用局部编辑、多来源混音、采样与多模态输入能力。选择时先看账户权限，再看任务是精确执行还是探索方向，不需要把三个模型依次使用一遍。
