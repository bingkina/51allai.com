---
title: OpenAI发布GPT-Realtime-2，首款GPT-5级推理语音模型
date: 2026-05-08 16:48:34
permalink: posts/2026/05/openai-gpt-realtime-2-voice-model/
categories:
  - 大模型
tags:
  - OpenAI
  - GPT-Realtime-2
  - 语音模型
  - 实时API
description: OpenAI 发布 GPT-Realtime-2，首款搭载 GPT-5 级推理能力的实时语音模型。上下文窗口从 32K 扩至 128K，Big Bench Audio 得分 96.6%，支持工具调用与多级推理调节，API 定价为音频输入 $32/M tokens、输出 $64/M tokens。
---
> OpenAI 将 GPT-5 级推理能力引入实时语音 API，上下文窗口从 32K 扩至 128K，并配套推出实时翻译和语音转录两款辅助模型，首次构建完整的语音 Agent 工具链。
![OpenAI GPT-Realtime-2 发布页截图](https://images.51allai.com/blog/c35e2e416c5a783253ea2e88a68e841c_1778214838.jpg_20260508_165430.png)

## GPT-5 级推理进入语音交互

GPT-Realtime-2 是 OpenAI 首个在语音对话中集成 GPT-5 级别推理能力的模型。与上一代 GPT-Realtime-1.5 相比，核心升级包括：

- **上下文窗口从 32K 扩至 128K tokens**，支持在更长语音会话中维持用户约束、偏好和业务逻辑。
- **支持工具调用（function calling）**，可在对话过程中实时查询日历、搜索系统等外部工具，并支持 MCP 协议。
- **处理中途打断**：用户可随时打断语音输入，模型能正确处理中断并继续对话。
- **领域知识增强**：医疗术语、专有名词识别准确度提升。

开发者可通过 `reasoning.effort` 参数调节推理强度，分为 minimal、low、medium、high、xhigh 五档。官方建议生产环境从 low 起步，按需提高计算量以换取更完整的判断。

## Benchmark 数据

两个核心评测基准的结果：

| 基准 | 结果 |
|------|------|
| Big Bench Audio (high) | 96.6%，比 GPT-Realtime-1.5 高出 15.2 个百分点 |
| Audio MultiChallenge (xhigh) | 48.5%，比 1.5 版本提升 13.8 个百分点 |

Big Bench Audio 是单轮评测，涵盖语音、音乐、自然声音等类别的推理能力。Audio MultiChallenge 是多轮对话场景下的指令跟随评测，更贴近实际语音 Agent 的工作负载。

Zillow 在内部 adversarial 电话测试中报告，经过 prompt 调优后任务成功率从 69% 提升至 95%。

## 定价与 API 参数

音频 Token 定价：

| 类型 | 价格 |
|------|------|
| 音频输入 | $32 / M tokens |
| 音频输出 | $64 / M tokens |
| 缓存音频输入 | $0.40 / M tokens |
| 文本输入 | $4 / M tokens |
| 文本输出 | $24 / M tokens |

模型规格：上下文窗口 128K，最大输出 4,096 tokens，知识截止日期 2025 年 10 月 1 日。支持 text/audio/image 输入，text/audio 输出。Tier 1 速率限制：200 RPM / 1,000 RPD / 40,000 TPM。

## 配套模型：实时翻译与语音转录

同步发布的还有两款辅助模型：

**gpt-realtime-translate** — 流式语音翻译，支持 70+ 语种输入、13 种目标语言输出。按 $0.034/分钟计费。面向客服、旅行、跨语言协作等场景。

**gpt-realtime-whisper** — 流式语音转文字，边听边输出部分转录结果。按 $0.017/分钟计费。适用于直播字幕等实时场景。

## 实际应用场景

GPT-Realtime-2 的定位是生产环境语音 Agent。官方公告中提到的典型场景包括电话客服、技术支持、预订系统等需要多轮对话和工具调用的场景。模型支持 WebRTC、WebSocket 和 SIP 电话协议，可直接接入传统电话网络。

目前所有数据均来自 OpenAI 官方博客和开发者文档，暂无第三方独立评测。中文媒体报道均转引官方口径，措辞高度相似。
