---
title: Google 发布三款 Gemini 模型，3.6 Flash 评测输出 Token 用量降低 17%
permalink: posts/2026/07/google-gemini-36-flash-models/
tags: [google, gemini, model-release, pricing]
date: 2026-07-22 09:43:29
categories: 大模型
description: Google 发布 Gemini 3.6 Flash、3.5 Flash-Lite 和 3.5 Flash Cyber。本文梳理 3.6 Flash 在评测中的 17% 输出 Token 降幅、两款通用模型的 API 定价与开放入口，以及 Cyber 版的限量使用范围。
cover: https://images.51allai.com/blog/google-gemini-36-flash-models-cover_20260722_094831.png
---
> Google 发布 Gemini 3.6 Flash、3.5 Flash-Lite 和 3.5 Flash Cyber。其中，3.6 Flash 在一组综合评测中比 3.5 Flash 少用 17% 输出 Token；前两款已开放 API，Cyber 版将通过 CodeMender 限量提供。
![Google 三款 Gemini 模型与 3.6 Flash Token 效率](https://images.51allai.com/blog/google-gemini-36-flash-models-cover_20260722_094831.png)

## 三款模型分别处理通用任务、高吞吐任务和代码安全

Gemini 3.6 Flash 是这次更新中的通用型号，面向编程、知识工作、多模态理解和需要连续调用工具的多步任务。多模态指模型可以同时处理文字、图片、音频、视频和 PDF，而不是只接收文字。

Gemini 3.5 Flash-Lite 把重点放在高吞吐和低成本，适合批量文档解析、结构化数据提取，以及由多个小型执行单元分工完成的智能体任务。Gemini 3.5 Flash Cyber 则建立在 3.5 Flash 之上，针对查找、验证和修复软件漏洞做了专门调整，并与代码安全智能体 CodeMender 配套使用。

## 3.6 Flash 同时减少输出用量和输出单价

在一组覆盖知识、推理与编程等任务的第三方综合评测中，Gemini 3.6 Flash 完成任务时使用的输出 Token 比 3.5 Flash 少 17%。Token 是模型处理和计费的基本文本单位；同一任务需要的输出 Token 越少，通常代表生成过程更精简。17% 是这组评测的整体结果，不是每次调用都固定减少 17%。

Gemini 3.6 Flash 的 API 输入价格保持每百万 Token 1.50 美元，输出价格从 3.5 Flash 的 9 美元降到 7.50 美元，输出单价降低约 16.7%。实际账单还会受到输入长度、输出长度和调用次数影响。

模型 ID 为 `gemini-3.6-flash`，支持 1,048,576 个输入 Token 和 65,536 个输出 Token。它可以接收文字、图片、视频、音频和 PDF，输出为文字。

## Flash-Lite 面向批量文档和轻量任务

Gemini 3.5 Flash-Lite 的模型 ID 是 `gemini-3.5-flash-lite`。API 价格为每百万输入 Token 0.30 美元、每百万输出 Token 2.50 美元，比 3.6 Flash 更适合大量、重复、单次复杂度较低的任务。

它与 3.6 Flash 一样支持 1,048,576 个输入 Token 和 65,536 个输出 Token，也能读取文字、图片、视频、音频和 PDF。典型用途包括批量读取票据、从长文档抽取字段、生成结构化 JSON，以及让主智能体把较简单的子任务交给它执行。

## Flash Cyber 只通过 CodeMender 限量开放

Gemini 3.5 Flash Cyber 不是面向所有开发者的通用 API 模型。它会先在 CodeMender 的限量试点中提供，开放对象为政府和可信合作伙伴。

CodeMender 会多次调用 Flash Cyber，让多个执行单元扫描代码路径、验证漏洞并合并成一份报告。这个专用型号与公开 Gemini API 分开部署，普通开发者不能直接选择它。

## 两款通用模型已经可以接入

Gemini 3.6 Flash 和 Gemini 3.5 Flash-Lite 均已进入正式可用状态，开发者可以通过 Google AI Studio 和 Gemini API 调用。3.6 Flash 也已进入 Google Antigravity 与 Gemini 应用；企业用户还可以在 Gemini Enterprise Agent Platform 中使用。

接入新模型时需要检查现有请求参数。`temperature`、`top_p` 和 `top_k` 已被弃用，接口会忽略这些自定义值；把最后一轮对话预填为模型回复也不再受支持。迁移旧应用时，先移除这些设置可以避免后续接口报错。
