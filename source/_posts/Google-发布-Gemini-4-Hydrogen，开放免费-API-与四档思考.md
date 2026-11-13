---
title: Google 发布 Gemini 4 Hydrogen，开放免费 API 与四档思考
permalink: posts/2026/11/google-gemini-4-hydrogen/
tags: [google, gemini, model-release, ai-agents, pricing]
sources:
  - name: Introducing Gemini 4 Hydrogen
    url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/
    note: 发布日期、产品定位、应用与搜索开放范围
  - name: Gemini 4 Hydrogen 模型文档
    url: https://aistudio.google.com/docs/models/gemini-4-hydrogen
    note: 稳定模型标识、输入输出类型、容量和工具支持
  - name: What's new in Gemini 4 Hydrogen
    url: https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen
    note: 免费 API、四档思考、迁移参数与共享上下文
  - name: Gemini Developer API pricing
    url: https://aistudio.google.com/docs/pricing#gemini-4-hydrogen
    note: Standard、Batch 单价、思考计费和免费档数据使用
  - name: Long decode
    url: https://aistudio.google.com/docs/long-decode
    note: 默认输出上限、后台执行与分段续接条件
  - name: Gemini 4 Hydrogen and Orchestrator
    url: https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/
    note: 动态模型切换、工作分工与 Pro、Ultra 开放范围
date: 2026-11-13 09:36:25
categories: 大模型
description: Google 发布 Gemini 4 Hydrogen，向开发者开放免费与付费 API，并在 Gemini 应用和搜索中逐步推出。本文梳理使用入口、四档思考、百万 Token 共享容量和长输出条件，以及 API 单价、迁移设置与 Antigravity 模型协作。
cover: https://images.51allai.com/blog/google-gemini-4-hydrogen-cover_20261113_094139.png
---

> Google 于 11 月 12 日发布 Gemini 4 Hydrogen，面向日常编程、文档处理和工具调用任务，开放免费与付费 API。模型支持四档思考，输入、思考与输出共享百万 Token 容量；付费标准价为每百万输入 Token 1.50 美元、输出 Token 7.50 美元。
![Google Gemini 4 Hydrogen 免费 API 与四档思考主题图](https://images.51allai.com/blog/google-gemini-4-hydrogen-cover_20261113_094139.png)

## Gemini 4 新增面向日常任务的型号

Gemini 4 Hydrogen 是 Google 新推出的通用 AI 模型，可用于编写和调试代码、整理资料，以及按步骤调用工具完成任务。能够调用工具、连续推进工作的 AI 程序，通常称为智能体。

开发者使用的稳定模型标识为 `gemini-4-hydrogen`。它能接收文字、图片、视频、音频和 PDF，输出文字；可以读取图表和文档内容，也支持代码执行、文件搜索、函数调用与结构化输出。函数调用让模型连接外部工具，结构化输出则让结果按指定字段返回，方便软件继续处理。

Hydrogen 本身不直接生成图片或音频，也不支持 Live API 实时语音接口。理解音视频与生成音视频是不同能力，接入时需要按任务选择对应模型。

## 免费用户能用，应用与 API 分别开放

普通用户可从 [Gemini 应用](https://gemini.google.com/) 体验 Hydrogen。免费用户通过自动模型选择，在适合的提示词下获得 Hydrogen 响应；这与自行指定模型的使用方式不同。Google 搜索也开始向所有用户逐步推出 Hydrogen。

开发者可以在 [Google AI Studio](https://aistudio.google.com/prompts/new_chat?model=gemini-4-hydrogen) 测试，或通过 Gemini API 接入自己的程序。API 同时提供免费档与付费档，免费档受速率和配额限制，支持 GenerateContent 与 Interactions 两种接口。

在 Antigravity 编程工具中，Hydrogen 向付费 Google AI Pro 和 Ultra 订阅用户逐步开放。应用订阅、Antigravity 使用额度和 API 调用费用分别计算，不能把订阅权益当成免费 API 额度。

## 四档思考，默认从 high 开始

Hydrogen 支持 `low`、`medium`、`high` 和新增的 `xhigh` 四档思考，默认是 `high`。思考档位用于控制模型在回答前投入多少推理，影响响应时间与 Token 消耗。Token 是模型处理内容和计费时使用的单位，不等于汉字或英文单词。

快速聊天、分类和交互式网页原型，可以先测试 `low` 或 `medium`；复杂编程和多步任务可从默认 `high` 开始。需要更深推理时再尝试 `xhigh`，同时比较结果、耗时和用量，选择能满足任务要求的档位。

从 Gemini 3.8 Flash 迁移时，默认档位会从 `medium` 变为 `high`。沿用旧程序但不显式设置档位，推理用量可能随之变化。Hydrogen 不接受 `minimal`，传入会报错。

## 百万容量由输入、思考和输出共同占用

Hydrogen 的统一上下文窗口为 **1,048,576 Token**，输入材料、思考过程和最终回答共享这份容量。放入接近上限的文档后，可供继续生成的空间会相应减少。

默认同步输出预算为 65,536 Token，包含思考和最终回答。需要超过这一预算时，可使用 Long decode，也就是分段继续生成。在 Interactions API 中，一种接入方式是同时设置 `background: true`，并把 `max_output_tokens` 提高到 65,536 以上，让服务端在后台续接。

只开启后台执行、保持默认输出上限，仍会在 65,536 Token 处停止。长输出的总量也受剩余上下文容量限制；“最高百万输出”不能理解为输入百万 Token 后，还能额外输出百万 Token。

## API 标准价为输入 1.50 美元、输出 7.50 美元

以下为付费 Gemini API 的模型价格，单位是美元／百万 Token。输出费用包含思考 Token。

| 调用方式 | 输入 | 输出，含思考 |
| --- | ---: | ---: |
| Standard 标准调用 | 1.50 | 7.50 |
| Batch 批量处理 | 0.75 | 3.75 |

Standard 对整个百万上下文窗口使用统一单价。例如，一次任务使用 10 万个未缓存输入 Token，并产生 1 万个可计费输出 Token，模型费用为 **0.225 美元**；同样用量采用 Batch 为 0.1125 美元。这项计算不含搜索等工具费用，输出用量已包含思考。

隐式缓存命中的输入，Standard 单价为每百万 Token 0.075 美元。隐式缓存由服务自动识别可复用内容，Hydrogen 不支持开发者自行创建显式缓存。免费档内容可用于改进产品，标准付费档内容不用于改进产品，处理业务资料前应按所用档位核对数据条款。

## Antigravity 新增动态切换模型的 Orchestrator

Antigravity 同步推出 Orchestrator，可在同一次任务中动态切换模型。例如，由 Carbon 分析依赖、制定计划，再交给 Hydrogen 修改代码、更新软件包和运行测试；遇到困难时，可以切回 Carbon 检查状态并调整计划。

Orchestrator 的开放范围与单独使用 Hydrogen 不同：Ultra 用户逐步获得 Carbon 和 Argon 两种 Orchestrator 选项，付费 Pro 用户获得 Argon 选项。需要了解 Carbon 的使用入口，可参阅 [Gemini 4 Carbon 上线与 API 价格说明](/posts/2026/11/google-gemini-4-carbon/)。

已有 3.8 Flash 程序迁移时，除了更换模型名称，还应移除显式缓存字段以及 `temperature`、`top_p`、`top_k` 采样设置，检查共享上下文与输出预算。先用一组熟悉的任务比较思考档位和完整账单，再决定是否把批量处理或日常编程流程切换到 Hydrogen。
