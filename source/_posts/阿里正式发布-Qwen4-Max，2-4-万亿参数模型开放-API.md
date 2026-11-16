---
title: 阿里正式发布 Qwen4-Max，2.4 万亿参数模型开放 API
permalink: posts/2026/11/alibaba-qwen4-max-release/
tags: [alibaba, qwen, model-release, multimodal, pricing]
sources:
  - name: 阿里云 Qwen4-Max 正式发布公告
    url: https://www.alibabacloud.com/blog/alibaba-unveils-qwen4-max-new-ai-teammate-for-work-creativity-and-discovery_603783
    note: 发布日期、2.4 万亿参数、710 亿激活参数与可用渠道
  - name: Qwen4-Max 模型文档
    url: https://help.aliyun.com/zh/model-studio/qwen4-max
    note: 输入输出模态、上下文、思考模式、工具调用与输出上限
  - name: 千问 AI 平台 Qwen4-Max 模型页
    url: https://www.qianwenai.com/models/qwen4-max
    note: API 入口、模型标识、北京区接口地址与缓存创建价格
  - name: 阿里云百炼模型调用价格
    url: https://help.aliyun.com/zh/model-studio/model-pricing
    note: 北京区 Qwen4-Max 与 Qwen3.8-Max 标准单价及缓存命中价格
date: 2026-11-16 20:28:19
categories: 大模型
description: 阿里于 11 月 16 日正式发布 Qwen4-Max，2.4 万亿参数模型支持百万 Token 上下文和文本、图片、视频输入，并开放按量 API。本文说明 710 亿激活参数、北京区输入与输出价格、缓存计费条件，以及从预览版迁移时需要核对的配置。
cover: https://images.51allai.com/blog/alibaba-qwen4-max-release-cover_20261116_210555.png
---

> 阿里于 11 月 16 日正式发布 Qwen4-Max，模型规模为 2.4 万亿参数，每个 Token 激活约 710 亿参数，支持百万 Token 上下文与文字、图片、视频输入。正式版已开放按量 API，北京区标准输入、输出价格分别为每百万 Token 10 元、30 元，缓存命中的输入为 0.5 元。
![阿里 Qwen4-Max 正式版 2.4 万亿参数与多模态 API 主题图](https://images.51allai.com/blog/alibaba-qwen4-max-release-cover_20261116_210555.png)

## 2.4 万亿参数，每次计算激活约 710 亿

Qwen4-Max 是千问新一代旗舰多模态模型，采用 MoE（混合专家）架构。这类架构将模型分成多个专家模块，处理输入时只选择其中一部分参与计算。**2.4 万亿是模型的总参数规模，710 亿是每个 Token 激活的参数量**，两者描述的是不同指标。

参数是模型在训练中学到的数值。相比同为 2.4 万亿规模的 Qwen3.8-Max，新模型每个 Token 激活的参数减少了 25%。这个比例描述参与计算的规模，不能直接换算成用户任务的提速或费用降幅。

模型可接收文本、图片和视频，并以文本输出。用户可以提交文档、截图或视频，要求提取信息、解释内容或生成代码。图片与视频在这里是供模型理解的输入材料。

上下文窗口为 **100 万 Token**。Token 是模型处理内容的基本单位，上下文容量决定一次请求能容纳多少输入、对话和生成内容。此前的 [Qwen3.8-Max 已支持百万 Token 上下文](/posts/2026/08/qwen38-max-launch/)，这项容量在正式版中延续。

## 正式版开放按量 API，标准输入与输出单价下降约 16.7%

与 11 月 11 日上线、API 通过 Token Plan 开放的[限时预览版](/posts/2026/11/alibaba-qwen4-max-preview/)相比，正式版增加了按量调用入口，模型标识为 `qwen4-max`。开发者可以按实际输入、输出用量结算，也可通过 Token Plan 使用。

以下为北京区人民币单价，单位均为每百万 Token；标准输入价格对应未命中缓存的输入。

| 计费项 | Qwen3.8-Max | Qwen4-Max 正式版 |
| --- | ---: | ---: |
| 标准输入 | 12 元 | 10 元 |
| 输出，含思维链与回答 | 36 元 | 30 元 |

两项标准单价均下降约 **16.7%**。按一次任务使用 10 万输入 Token、1 万输出 Token 计算，未命中缓存且不使用额外收费工具时，新模型费用为 **1.30 元**，前代同样用量为 1.56 元。任务实际用了多少 Token，仍会影响最终账单。

## 0.5 元是缓存命中价，创建缓存另计

Qwen4-Max 的显式与隐式缓存命中价均为 **0.5 元／百万输入 Token**。缓存会复用重复输入的公共前缀，例如系统提示词、工具说明和参考文档，减少对同一部分内容的重复计算。

这个单价只适用于命中的输入部分。未命中的输入按标准输入价结算，输出仍按输出价结算。例如，10 万输入 Token 全部命中已有缓存时，输入部分为 0.05 元；如果同时产生 1 万输出 Token，输出部分仍为 0.30 元。

显式缓存需要主动创建，北京区保留 5 分钟的创建价为 12.5 元／百万 Token，保留 1 小时为 20 元／百万 Token。上述命中示例不含创建费用。评估缓存是否划算时，应把创建费用和后续复用次数一起算入。

## 普通用户直接体验，开发者核对正式版配置

普通用户可在千问办公、千问应用、Qoder 和 Qwen Studio 等入口体验新模型。需要接入自己软件的开发者，可从[千问 AI 平台 Qwen4-Max 模型页](https://www.qianwenai.com/models/qwen4-max)进入控制台，创建 API Key 并配置调用。

北京区按量 API 的 OpenAI 兼容配置如下：

| 配置项 | 值 |
| --- | --- |
| 模型标识 | `qwen4-max` |
| Base URL | `https://cn-beijing.maas.qianwenaiapi.com/compatible-mode/v1` |
| API Key | 对应服务的阿里云百炼 API Key |

模型兼容 OpenAI 与 Anthropic API，支持工具调用、联网搜索和结构化输出。工具调用允许模型请求外部函数执行操作；结构化输出可按约定的 JSON 格式返回结果，便于软件继续处理。

正式版默认开启思考模式，在回答前先进行推理。思考强度可选 `low`、`high`、`xhigh`，默认 `high`；思考模式的最大输出预算为 262,144 Token，非思考模式为 131,072 Token，输出计费包含思维链与回答。

从预览版迁移时，应同时核对模型标识、API Key、服务地址和输出预算。Token Plan 使用套餐专属密钥与地址；上表对应北京区按量接口。先用一项熟悉的任务检查调用结果、Token 用量和费用，再切换现有工作流。
