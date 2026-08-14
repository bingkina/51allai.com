---
title: Google 发布 Gemini 3.7 Flash，开放稳定 API 与限时价格
permalink: posts/2026/08/google-gemini-37-flash/
tags: [google, gemini, model-release, pricing]
date: 2026-08-14 11:15:57
categories: 大模型
description: Google 发布 Gemini 3.7 Flash 稳定版，模型支持百万 Token 输入、文字图片音视频与 PDF 输入。本文说明普通用户和开发者可以从哪些入口使用，并梳理模型的内置工具、思考档位、迁移注意事项，以及 2026 年底前的开发者接口限时价格与之后的计费变化。
cover: https://images.51allai.com/blog/google-gemini-37-flash-cover_20260814_112139.png
---
> Google 于 8 月 13 日发布 Gemini 3.7 Flash 稳定版。模型支持百万 Token 输入、64K Token 输出和多种内置工具，已开放 Gemini API、Google AI Studio、Antigravity 与 Gemini 应用；付费 API 限时价为每百万输入 Token 0.75 美元、输出 Token 3.75 美元。
![Google Gemini 3.7 Flash 稳定 API 与多模态能力](https://images.51allai.com/blog/google-gemini-37-flash-cover_20260814_112139.png)

## Gemini 3.7 Flash 已进入稳定版

Gemini 3.7 Flash 不是一个只供测试的预览型号。Google 在 2026 年 8 月 13 日将它以 GA（正式可用）状态发布，开发者可以在生产应用中指定稳定模型 ID `gemini-3.7-flash`。稳定 ID 不会像 `latest` 别名那样随新版本自动切换，更适合需要控制版本的线上服务。

这一版建立在 Gemini 3.6 Flash 之上，保留同一组内置工具。模型默认使用 `medium` 思考档位，开发者也可以选择 `low`、`medium` 或 `high`，用响应时间和 Token 消耗换取不同的推理强度。`minimal` 不在支持范围内，设置后会返回错误。

## 可以读取文字、图片、音视频和 PDF

Gemini 3.7 Flash 单次请求最多可接收 1,048,576 个 Token，最多输出 65,536 个 Token。Token 是模型处理和计费的基本单位；百万 Token 窗口可用于放入较长的代码库、文档集、音频、视频或 PDF，但实际成本仍取决于输入和输出的真实长度。

模型接受文字、图片、视频、音频和 PDF，输出形式为文字。它支持函数调用、代码执行、文件搜索、Google 搜索与地图接地、URL 上下文、结构化输出和上下文缓存。“接地”指模型在回答时调用外部检索，把结果带回当前任务。计算机使用工具仍标记为 Preview；模型本身进入稳定版，不等于每项配套工具都已转为稳定版。

Gemini 3.7 Flash 不支持直接生成图片或音频，也不接入 Live API。它可以理解图片和音视频，但回传的是文字结果。需要生图、语音合成或实时语音对话时，仍要选用对应的专用模型和接口。

## 限时价格持续到 2026 年底

Gemini Developer API 的标准付费档在 2026 年 12 月 31 日前按每百万输入 Token 0.75 美元、每百万输出 Token 3.75 美元计费，输出价格包含思考 Token。付费档的上下文缓存读取价为每百万 Token 0.075 美元，缓存存储价为每百万 Token 每小时 0.50 美元。

Batch 和 Flex 两种非标准消费方式的限时价分别为每百万输入 Token 0.375 美元、输出 Token 1.875 美元。Batch 适合不需要即时返回的批量处理；Flex 用更低价格换取可能波动的处理时间。

2027 年 1 月 1 日起，标准付费档将改为每百万输入 Token 1.50 美元、输出 Token 7.50 美元。免费层的输入和输出 Token 不收费，但适用的模型、速率和请求配额会受免费层限制。这些数字是 Gemini Developer API 价格，不是 Gemini 应用订阅费。

## 用户与开发者从不同入口使用

普通用户可以通过 Gemini 应用中的 Spark 接入这一模型。开发者可以在 Google AI Studio 里试用，再通过 Gemini API 把 `gemini-3.7-flash` 接入自己的应用；它也已进入 Google Antigravity。企业用户的对应入口包括 Gemini Enterprise App 和 Gemini Enterprise Agent Platform。

新项目可以直接在 Interactions API 的 `model` 字段中填入 `gemini-3.7-flash`。从 Gemini 3.5 Flash、Gemini 3 Flash Preview 或 Gemini 3.1 Pro 迁移时，需要移除已废弃的 `temperature`、`top_p` 和 `top_k` 采样参数，也不要预填模型回复轮次。已经使用 Gemini 3.6 Flash 的项目可以沿用同一组内置工具，再根据任务调整思考档位。
