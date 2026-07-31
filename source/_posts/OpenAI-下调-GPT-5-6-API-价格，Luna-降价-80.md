---
title: OpenAI 下调 GPT-5.6 API 价格，Luna 降价 80%
permalink: posts/2026/07/openai-gpt-5-6-api-price-cut/
tags:
  - openai
  - gpt-5-6
  - pricing
  - product-update
date: 2026-07-31 09:08:58
categories:
  - 大模型
description: OpenAI 下调 GPT-5.6 API 价格，Luna 输入与输出单价均降低 80%，Terra 均降低 20%。本文列出两款模型的新旧价格、缓存输入与长上下文附加费，说明 ChatGPT Work、Codex 和 API 的可用范围，以及 Sol Fast mode 的速度、兼容方式与计费变化，帮助开发者按任务规模和响应速度选择模型。
cover: https://images.51allai.com/blog/openai-gpt-5-6-api-price-cut-cover_20260731_091616.png
---
> OpenAI 从 7 月 30 日起下调 GPT-5.6 Terra 与 Luna 的 API 价格：Terra 输入和输出单价均降低 20%，Luna 均降低 80%。两款模型保留 105 万 Token 上下文，订阅价格与额度预算不变，但使用时消耗的额度减少；Sol 另提供速度最高提升 2.5 倍的 Fast mode，按标准处理的两倍计费，供延迟敏感请求选用。
![OpenAI GPT-5.6 Terra 与 Luna API 降价](https://images.51allai.com/blog/openai-gpt-5-6-api-price-cut-cover_20260731_091616.png)

## Luna 与 Terra 的输入、输出价格同步下调

GPT-5.6 系列在 7 月 9 日全面开放，包含 Sol、Terra 和 Luna 三个型号。Sol 面向需要较高推理能力的复杂任务，Terra 在能力与成本之间取中间档，Luna 则用于对成本敏感、调用量大的工作。

7 月 30 日生效的新价格按每 100 万个 Token 计费。Token 是模型处理文字时使用的计量单位，一段中文通常会被拆成多个 Token。

| 模型 | 原输入价 | 新输入价 | 原输出价 | 新输出价 | 降幅 |
| --- | ---: | ---: | ---: | ---: | ---: |
| GPT-5.6 Terra | 2.50 美元 | 2.00 美元 | 15.00 美元 | 12.00 美元 | 20% |
| GPT-5.6 Luna | 1.00 美元 | 0.20 美元 | 6.00 美元 | 1.20 美元 | 80% |

这次调整没有改变 GPT-5.6 Sol 的标准 API 单价。Terra 的缓存输入价格为每 100 万 Token 0.20 美元，Luna 为 0.02 美元。缓存输入指重复使用且命中缓存的提示词内容，适合系统提示词、固定文档和多轮任务中反复出现的前缀。

## Luna 的批量任务成本降到原来的五分之一

假设一次批处理共使用 100 万输入 Token 和 10 万输出 Token，暂不计算工具调用等额外费用。Luna 原价需要 1.60 美元，新价为 0.32 美元；Terra 原价需要 4.00 美元，新价为 3.20 美元。

Luna 更适合分类、信息抽取、固定格式生成和智能体中的常规执行步骤。Terra 适合日常问答、文档处理和需要工具调用的通用任务。实际选型仍应先用自己的数据和验收标准测试，再比较完成同一任务所需的总 Token、耗时与成功率。

## 百万级上下文不等于所有长度都按基础价计费

Terra 与 Luna 的上下文窗口都是 105 万 Token，单次最多输出 12.8 万 Token。上下文窗口可以理解为模型一次请求能够读取和处理的总内容容量，包括用户输入、工具结果和模型生成内容。

当输入超过 27.2 万 Token 时，整次请求的输入单价按基础价的 2 倍计算，输出单价按 1.5 倍计算。Terra 的长上下文输入与输出价格因此变为每 100 万 Token 4 美元和 18 美元；Luna 则为 0.40 美元和 1.80 美元。处理超长文档或长时间运行的智能体任务时，需要按这一档价格估算，而不是直接套用短上下文单价。

## ChatGPT Work 与 Codex 订阅价格不变

Terra 和 Luna 继续在 ChatGPT Work、Codex 与 OpenAI API 中提供。Free 和 Go 用户可以使用 Terra；Plus、Pro、Business 与 Enterprise 用户可以选择 Terra 和 Luna。

ChatGPT 与 Codex 的订阅价格和额度预算没有调整。价格变化体现在用量折算上：调用 Terra 与 Luna 时消耗的额度减少。API 用户则直接按新的 Token 单价付费。

开发者可以通过 Responses API 或 Chat Completions API 调用两款模型。两者都支持文本输入和输出、图片输入、流式输出、函数调用与结构化输出，也可以在 Responses API 中使用网页搜索、文件搜索、代码解释器、Shell、MCP 和计算机操作等工具。

## Sol 的 Fast mode 用两倍价格换取更低延迟

Priority Processing 在 7 月 30 日改名为 Fast mode。GPT-5.6 Sol 使用 Fast mode 时，速度最高可达到标准处理的 2.5 倍，价格是标准处理的 2 倍，模型能力不变。

API 请求可以把 `service_tier` 设置为 `fast`。原有的 `priority` 参数继续兼容，并会使用相同的处理方式。Fast mode 适合用户正在等待结果、延迟直接影响体验的请求；后台批处理更适合先比较标准处理与低成本模型的总费用。
