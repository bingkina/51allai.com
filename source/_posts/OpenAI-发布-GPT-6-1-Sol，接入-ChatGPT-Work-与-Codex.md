---
title: OpenAI 发布 GPT-6.1 Sol，接入 ChatGPT Work 与 Codex
permalink: posts/2026/10/gpt-61-sol-chatgpt-codex/
tags: [openai, chatgpt, codex, model-release, pricing]
sources:
  - name: ChatGPT 与 Codex 模型文档
    url: https://learn.chatgpt.com/docs/models
    note: Work 与 Codex 开放范围、套餐、管理员开关和模型选择方式
  - name: ChatGPT 与 Codex 更新日志
    url: https://learn.chatgpt.com/docs/changelog
    note: GPT-6.1 Sol 上线与 Codex CLI 模型目录更新
  - name: OpenAI API 更新日志
    url: https://developers.openai.com/api/docs/changelog
    note: 9 月 29 日发布、API 标准定价与多智能体测试功能
  - name: GPT-6.1 Sol API 模型规格
    url: https://developers.openai.com/api/docs/models/gpt-6.1-sol
    note: 上下文、模态、输出上限和长输入附加费
  - name: GPT-6 Sol 与 GPT-6.1 Sol 规格对比
    url: https://developers.openai.com/api/docs/models/compare?model=gpt-6-sol
    note: 输入、输出、缓存读取单价与上下文对比
  - name: GPT-6 API 使用指南
    url: https://developers.openai.com/api/docs/guides/latest-model
    note: 推理档位、Responses 工具调用与迁移限制
date: 2026-10-02 20:20:58
categories: [大模型]
description: OpenAI 发布 GPT-6.1 Sol，逐步接入 ChatGPT Work 与 Codex，覆盖 Plus、Pro 等付费套餐。API 输入与输出单价保持不变，缓存读取价格减半。本文说明模型使用入口、105 万 Token 上下文、适用场景与开发者迁移注意事项。
cover: https://images.51allai.com/blog/gpt-61-sol-chatgpt-codex-cover_20261002_202431.png
---

> OpenAI 于 9 月 29 日发布 GPT-6.1 Sol，并逐步向 ChatGPT Work 与 Codex 的付费用户开放。API 保留每百万 Token 输入 2 美元、输出 10 美元的标准单价，缓存读取降至 0.10 美元。模型提供 105 万 Token 上下文，支持文本和图片输入。
![GPT-6.1 Sol 接入 ChatGPT Work 与 Codex 主题封面](https://images.51allai.com/blog/gpt-61-sol-chatgpt-codex-cover_20261002_202431.png)

## 产品介绍：处理代码、文档和多步任务

GPT-6.1 Sol 是 OpenAI 的新一代 Sol 模型，可用于编程、计算机操作和专业工作。它支持文本与图片输入、文本输出，也能通过工具搜索资料、处理文件和执行代码。这里的工具调用，是让模型在回答之外调用软件完成具体步骤。

API 的上下文窗口为 105 万 Token，最大输出为 12.8 万 Token。Token 是模型处理文字的计量单位；上下文窗口决定一次请求能够容纳多少提示、资料和对话内容，不能直接换算成固定的中文字数。

在 ChatGPT 中，GPT-6.1 Sol 的入口是 **Work 和 Codex**，普通 Chat 对话不提供这一模型。Work 用于跨文档和应用完成工作，Codex 面向软件开发任务。

## 哪些用户可以使用，在哪里选择

首发开放范围包括 Plus、Pro、Business、Enterprise 和 Edu，采用逐步上线方式。Free 与 Go 不在首发范围内。Enterprise 和 Edu 默认关闭 GPT-6.1 Sol，需要管理员启用。

已获得权限的用户可以在 ChatGPT 桌面应用的 Codex、Codex CLI，以及网页和移动端的 ChatGPT Work 中使用。实际显示的选项受套餐、客户端和工作空间设置影响。

在模型选择器中选择 GPT-6.1 Sol 即可。桌面端和 Work 网页端也可以打开 Advanced，选择具体模型、推理强度和速度。推理强度控制模型投入多少处理时间；任务需要更深入的规划和分析时，可以提高档位。

Codex CLI 可在交互会话中输入 `/model` 切换，也可以启动时指定：

```bash
codex --model gpt-6.1-sol
```

具体入口和套餐范围可查看 [ChatGPT 与 Codex 模型使用说明](https://learn.chatgpt.com/docs/models)。

## API 输入、输出价格不变，缓存读取减半

GPT-6.1 Sol 与 GPT-6 Sol 的标准 API 价格对比如下，单位均为美元／百万 Token：

| 计费项目 | GPT-6 Sol | GPT-6.1 Sol |
| --- | ---: | ---: |
| 输入 | 2.00 | 2.00 |
| 缓存读取 | 0.20 | 0.10 |
| 缓存写入 | 2.50 | 2.50 |
| 输出 | 10.00 | 10.00 |

缓存让重复使用的提示前缀可以复用。此次减价针对缓存读取：100 万个命中缓存的输入 Token，读取费用从 0.20 美元降到 0.10 美元，减少 50%。首次写入和未命中缓存的输入另行计费，不能把这一降幅当作整项任务的成本降幅。

上述 GPT-6.1 Sol 单价适用于输入不超过 27.2 万 Token 的 Standard 请求。超过该门槛时，整次请求的输入和缓存费率变为 2 倍，输出费率变为 1.5 倍。Fast 模式价格为 Standard 的 2 倍；Batch 和 Flex 比 Standard 低 50%。区域处理在适用时另加 10%。

与 [GPT-6 Astra 的模型规格和 API 价格](/posts/2026/09/openai-gpt-6-astra/)相比，GPT-6.1 Sol 的标准输入、输出单价均为其五分之一。这比较的是每 Token 单价，实际任务账单还取决于用量、缓存和工具费用。API 按量计费与 ChatGPT 套餐中的使用额度分别计算。

## 开发者接入时要检查两个变化

开发者可通过 [GPT-6.1 Sol API 模型页面](https://developers.openai.com/api/docs/models/gpt-6.1-sol)查看规格，调用时使用模型 ID `gpt-6.1-sol`。

新模型支持 `low`、`medium`、`high`、`xhigh` 和 `max` 五个推理档位，API 默认是 `medium`。原 GPT-6 Sol 支持的 `none` 档位在 GPT-6.1 Sol 中不可用，`minimal` 也不支持。已有程序使用这两个值时，需要改为受支持的档位，例如从 `low` 开始验证。

工具调用需要使用 Responses API。Chat Completions 可用于不带工具的请求；已有程序若通过这一接口调用函数，需要调整接入方式。Responses API 还提供多智能体测试功能，允许模型把任务分配给子智能体处理。

## 使用场景，适用人群

GPT-6.1 Sol 面向需要反复处理复杂任务的开发者和办公用户：例如修改代码、分析文件，或结合应用与文档完成多步工作。开发者可以通过 API 把这些能力接入现有软件，个人用户则可以从 Work 或 Codex 的模型选择器进入。

评估时，可以选一项已有任务，保留相同的资料和要求，比较结果质量、耗时和用量。重复运行的流程还应检查缓存命中情况；缓存读取降价只有在相应输入命中缓存时才会体现在账单上。
