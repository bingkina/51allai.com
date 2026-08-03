---
title: 阿里正式上线 Qwen3.8-Max，支持百万 Token 上下文与多模态输入
permalink: posts/2026/08/qwen38-max-launch/
tags: [alibaba, qwen, model-release, multimodal]
date: 2026-08-03 20:38:45
categories: 大模型
description: "阿里正式上线 Qwen3.8-Max，模型采用 2.4 万亿参数的混合专家架构，原生支持图像与文本输入，并提供 100 万 Token 上下文、混合思考、函数调用、内置工具和结构化输出。本文说明官方 API 接入方式以及这些能力适合处理的任务。"
cover: https://images.51allai.com/blog/qwen38-max-launch-cover_20260803_204426.png
---
> 阿里于 8 月 3 日正式上线 Qwen3.8-Max。新模型采用 2.4 万亿参数的混合专家架构，支持图像与文本输入、100 万 Token 上下文、混合思考、函数调用、内置工具和结构化输出。普通用户可用图像与长文档提问，开发者可通过 QwenCloud API 接入模型。
![Qwen3.8-Max 百万 Token 多模态模型主题图](https://images.51allai.com/blog/qwen38-max-launch-cover_20260803_204426.png)

## Qwen3.8-Max 从预览转为正式模型

QwenCloud 在 8 月 3 日的模型更新中加入 `qwen3.8-max`。这个正式模型 ID 可用于 API 请求，与 7 月先行开放的 `qwen3.8-max-preview` 区分开来。

模型规模为 2.4 万亿参数，采用 MoE（Mixture of Experts，混合专家）架构。这种架构把模型分成多个“专家”模块，处理每段输入时选择其中一部分参与计算。参数规模可以说明模型的容量，但不能单独代表任务效果。

## 图像和长文档可放进同一次任务

Qwen3.8-Max 是原生视觉语言模型，能在同一个请求中处理文本和图像。用户可以把截图、报表或文档页面与问题一起提交，不必先手工转成纯文本。

它的上下文窗口为 100 万 Token。Token 是模型拆分和计算内容的基本单位；QwenCloud 将 100 万 Token 粗略换算为 75 万个英文单词或 10 本长篇小说。对开发者来说，这个容量可用来放入大型代码库、多份长文档或较长的多轮任务记录。

## 思考、工具与结构化输出同时可用

Qwen3.8-Max 支持混合思考模式，且默认开启思考。混合思考允许应用按任务需要使用推理过程：复杂的数学、调试或规划任务可以分步处理，普通问答则可以减少不必要的思考开销。

函数调用允许模型按规则请求外部程序，例如查询数据库或触发业务流程。内置工具则包含搜索与代码执行等由平台提供的能力。结构化输出可以让结果遵循固定的 JSON 格式，便于软件直接解析，而不是再从自然语言回复中提取字段。

## 开发者可沿用 OpenAI 兼容接口

使用 Qwen3.8-Max 需要先在 QwenCloud 创建 API Key，再将请求中的模型名称设为 `qwen3.8-max`。QwenCloud 提供 OpenAI 兼容的 Responses API 和 Chat Completions API，也提供 Anthropic Messages API 与 DashScope SDK。已经使用这些调用方式的项目，可以在现有客户端中配置 QwenCloud 的 API Key、接口地址和模型 ID。
