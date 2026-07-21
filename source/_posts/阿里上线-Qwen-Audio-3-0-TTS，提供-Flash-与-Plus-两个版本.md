---
title: 阿里上线 Qwen-Audio-3.0-TTS，提供 Flash 与 Plus 两个版本
permalink: posts/2026/07/qwen-audio-30-tts/
tags: [alibaba, qwen, audio-generation, model-release]
date: 2026-07-21 17:18:19
categories: 多模态
description: 阿里上线 Qwen-Audio-3.0-TTS 语音合成模型，提供面向低延迟交互的 Flash 和面向高质量配音的 Plus 版本。本文说明指令与标签控制、多语言及中文方言范围、API 调用方式与按字符计费规则，并介绍两个版本各自适合的使用场景。
cover: https://images.51allai.com/blog/qwen-audio-30-tts-cover-first_20260721_172720.png
---
> 阿里上线 Qwen-Audio-3.0-TTS，分为 Flash 和 Plus 两个版本。两者支持语音合成、自然语言指令与情绪、拟声标签，开发者可通过 DashScope API 调用。国际服务按输入字符计费，Flash 每万字符 0.15 美元，Plus 为 0.20 美元。
![Qwen-Audio-3.0-TTS Flash 与 Plus 语音合成模型](https://images.51allai.com/blog/qwen-audio-30-tts-cover-first_20260721_172720.png)

## Flash 和 Plus 面向不同场景

Qwen-Audio-3.0-TTS 把文字转换为可播放的语音，支持边接收文字边返回音频的流式输出。Flash 主要用于语音助手、智能客服等对响应速度敏感的互动场景；Plus 面向有声书、新闻播报和内容配音等更重视成品质量的任务。

两个版本的模型 ID 分别是 `qwen-audio-3.0-tts-flash` 和 `qwen-audio-3.0-tts-plus`。它们属于 Qwen-Audio-TTS 产品线，不要与年初发布的 Qwen3-TTS 模型 ID 混用。

## 用自然语言和标签控制表达

调用接口时，可以在 `instruction` 参数里直接描述语速、情绪、语气和音色。例如，一段客服播报可以要求“语速稍慢，语气温和”，不需要分别调节多组音频参数。

模型还允许把标签直接写入待合成文本。`[excited]` 和 `[serious]` 可在指定位置切换表达方式，`[laughing]`、`[gasp]` 和 `[sighing]` 可插入笑声、吸气或叹气。这类精细标签只适用于单向流式模式。

## 支持多语言与中文方言

系统预设音色支持范围依具体音色而定，目前包含普通话和英语。克隆音色可用于中文、英语、日语、韩语、德语、法语、俄语、葡萄牙语、西班牙语、意大利语、泰语、印度尼西亚语、越南语、马来语、菲律宾语和阿拉伯语。

中文还可通过指令控制广东话、四川话、河南话、上海话等多种方言。实际可用范围与所选音色有关，调用前需按目标语言选择对应音色。

## 开发者怎么用

开发者需要先在模型服务平台开通服务并配置 `DASHSCOPE_API_KEY`，然后通过 DashScope Python 或 Java SDK 建立 WebSocket 连接。请求中至少需要指定模型、音色和待合成文本；需要控制表达时，再加入 `instruction` 参数。输出可保存为 MP3、WAV、PCM 或 Opus 格式。

该服务按输入文本字符数计费，输出音频不单独计费。新加坡区域的国际服务中，Flash 价格为每 1 万字符 0.15 美元，Plus 为每 1 万字符 0.20 美元。国际服务新开通账户有 1 万字符免费额度，有效期为 90 天。
