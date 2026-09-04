---
title: Google 将 Lyria 3.5 接入 Gemini，API 每首 0.08 美元
permalink: posts/2026/09/google-lyria-35-gemini-api/
tags: [google, lyria, audio-generation, product-update, pricing]
sources:
  - name: Google Gemini — Lyria 3.5 in Gemini announcement
    url: https://x.com/GeminiApp/status/2095905395789504954
    note: Gemini 上线时间、曲风与人声选择、模板和长短音轨入口
  - name: Google DeepMind — Lyria 3.5
    url: https://deepmind.google/models/lyria/
    note: 模型能力、最长生成时长与 SynthID 水印
  - name: Gemini — Lyria AI music and song generator
    url: https://gemini.google/overview/music-generation/
    note: 免费与订阅入口、生成时长、下载格式和地区年龄要求
  - name: Google AI for Developers — Generate music with Lyria 3.5
    url: https://ai.google.dev/gemini-api/docs/music-generation
    note: API 模型 ID、输入输出格式、使用方法与限制
  - name: Google AI for Developers — Gemini Developer API pricing
    url: https://ai.google.dev/gemini-api/docs/pricing#lyria-3.5
    note: Lyria 3.5 API 定价
date: 2026-09-05 00:24:25
categories: 多模态
description: Google 将 Lyria 3.5 音乐生成模型接入 Gemini，并向开发者开放 Gemini API。本文梳理长短音轨入口、图文生成方式、每首 0.08 美元的 API 价格，以及单轮生成与 SynthID 水印限制。
cover: https://images.51allai.com/blog/google-lyria-35-gemini-api-cover_20260905_002802.png
---
> Google 将 Lyria 3.5 接入 Gemini，用户可选择曲风、人声或纯音乐，通过文字、图片生成短片段或最长 3 分钟音轨。开发者可调用模型 ID `lyria-3.5`，每首收费 0.08 美元。
![Google Lyria 3.5 接入 Gemini 与 API 音乐生成](https://images.51allai.com/blog/google-lyria-35-gemini-api-cover_20260905_002802.png)

## Lyria 3.5 接入 Gemini 音乐生成

Google 在 9 月 4 日宣布将 Lyria 3.5 接入 Gemini。用户可以先选择音乐流派，再决定生成带人声的歌曲或纯音乐；模板库提供现成的创作起点，也可以直接输入自己的描述。

这次更新不是 Lyria 系列第一次进入 Gemini。2 月发布的 [Lyria 3 已把文字、图片和视频生成音乐带入 Gemini](https://www.51allai.com/posts/2026/02/deepmind-lyria-3-gemini-vertex/)，Lyria 3.5 延续了这套入口，并把重点放在更丰富的编曲、人声表现和音质上。

Gemini 的音乐工具支持文字和图片提示。免费用户选择“Fast”可生成最长 30 秒音轨；选择“Thinking”或“Pro”可生成最长 3 分钟音轨，Google AI Plus、Pro 和 Ultra 订阅方案提供更高额度。生成结果可以下载为 MP3 或带封面的 MP4。

这项功能面向 Gemini 已开放国家和地区的年满 18 岁用户。用户可在提示词中写明流派、年代、节奏、乐器、人声类型和歌词主题，也可以提交自己的歌词，并用 `[Verse]`、`[Chorus]`、`[Bridge]` 标记主歌、副歌和桥段。

## Gemini API 新增 `lyria-3.5` 模型

开发者可以通过 Gemini API 的 Interactions API 调用 `lyria-3.5`。模型接受文字或图片输入，输出 44.1 kHz 立体声 MP3，并可同时生成带时间信息的歌词和歌曲结构。

`lyria-3.5` 面向包含主歌、副歌和桥段的完整歌曲。生成时长可以写进提示词，也可以用时间戳安排各段结构。若只需要循环、预览或测试提示词，可先用 `lyria-3-clip-preview` 生成固定 30 秒片段。

API 免费层不提供 Lyria 3.5。付费层按请求计费，每首完整歌曲 0.08 美元；生成 100 首的模型调用费用是 8 美元。

## 当前版本一次生成一首，不能连续改同一音轨

Lyria 3.5 的 API 音乐生成采用单轮流程。一次请求会生成一首歌曲，但不能在后续对话里继续要求“只改副歌”或“保留人声并替换鼓组”。需要修改时，应调整提示词后重新生成。

安全过滤会拦截模仿特定艺人声音或生成受版权保护歌词的请求。同一提示词重复调用也可能得到不同结果。所有生成音频都包含人耳难以察觉的 SynthID 水印，用于识别内容是否由 Google AI 生成或编辑。
