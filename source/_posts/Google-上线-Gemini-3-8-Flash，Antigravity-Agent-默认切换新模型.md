---
title: Google 上线 Gemini 3.8 Flash，Antigravity Agent 默认切换新模型
permalink: posts/2026/09/google-gemini-38-flash/
tags: [google, gemini, model-release, ai-agents, pricing]
date: 2026-09-02 23:49:59
categories: 大模型
description: Google 上线 Gemini 3.8 Flash 稳定版，并将 Antigravity Agent 默认模型切换至新版本。普通用户可在 Google AI Studio 试用，开发者可通过稳定模型 ID 接入生产应用。本文梳理百万 Token 输入、内置工具、2026 年底前限时 API 价格和旧版迁移参数，并说明计算机使用仍处预览、图像与音频生成不在该模型范围内。
cover: https://images.51allai.com/blog/google-gemini-38-flash-cover_20260902_235750.png
---
> Google 于 9 月 2 日上线 Gemini 3.8 Flash 稳定版，模型 ID 为 `gemini-3.8-flash`。它已可用于生产环境，支持百万 Token 输入与 64K Token 输出；Gemini Managed Agents 中的 Antigravity Agent 也已默认切换到该模型。
![Google Gemini 3.8 Flash 与 Antigravity Agent 默认模型升级](https://images.51allai.com/blog/google-gemini-38-flash-cover_20260902_235750.png)

## Gemini 3.8 Flash 已进入稳定版

Gemini 3.8 Flash 以 GA（正式可用）状态上线，开发者可以在生产应用中指定稳定模型 ID `gemini-3.8-flash`。在 Google AI Studio 中可直接试用，也可通过 Gemini API 接入应用。

模型单次请求最多可接收 1,048,576 个 Token，最多输出 65,536 个 Token。它能读取文字、图片、视频、音频和 PDF，返回形式为文字。Token 是模型处理内容和计费的基本单位，百万 Token 窗口可用于放入较长的代码库、文档集或多媒体材料。

## Antigravity Agent 默认切换至 3.8 Flash

Gemini Managed Agents 里的 Antigravity Agent 现在默认使用 Gemini 3.8 Flash。这是一个由 Google 托管的通用智能体，能在隔离的远程环境中浏览网页、运行代码、调用工具并生成文件。开发者也可以通过 `agent_config` 选择它底层使用的 Gemini 模型。

3.8 Flash 支持函数调用、代码执行、文件搜索、Google 搜索与地图接地、URL 上下文、结构化输出和上下文缓存。“接地”指模型在回答时调用外部检索，再把检索结果带回当前任务。计算机使用功能仍标记为 Preview；模型本身 GA 不代表每项配套工具都已进入稳定版。

## 思考档位与输出范围没有混在一起

Gemini 3.8 Flash 默认使用 `medium` 思考档位，还可选 `low` 或 `high`。思考档位用来调整模型在给出答案前的推理强度，会同时影响延迟和 Token 消耗。`minimal` 不在支持范围内，传入该值会返回错误。

模型可以理解图片和音视频，但不直接生成图片或音频，也不支持 Live API。需要生图、语音合成或实时语音对话时，仍需使用对应的专用模型和接口。

## API 限时价延续到 2026 年底

Gemini Developer API 的标准付费档在 2026 年 12 月 31 日前按每百万输入 Token 0.75 美元、每百万输出 Token 3.75 美元计费，输出价格包含思考 Token。2027 年 1 月 1 日起，两项价格分别调整为 1.50 美元和 7.50 美元。

免费层的输入和输出 Token 不收费，但实际可用量受免费层配额限制。Batch 和 Flex 的限时付费价均为每百万输入 Token 0.375 美元、输出 Token 1.875 美元，适合对即时返回要求较低的批量任务。

## 迁移时要调整这些参数

将应用切换到 Gemini 3.8 Flash 时，首先把模型字符串改为 `gemini-3.8-flash`。生成配置中需要移除 `temperature`、`top_p`、`top_k` 和 `candidate_count`，并用字符串枚举 `thinking_level` 取代 `thinking_budget`。

多轮交互建议通过服务端 `previous_interaction_id` 串联上下文，同时移除预填充的模型回复轮次。使用 `generateContent` API 时，每个 `FunctionResponse` 还需包含 `call_id` 和 `name`，否则工具调用链路无法正确对应请求与结果。
