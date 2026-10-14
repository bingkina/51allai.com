---
title: Google 上线 Gemini 4 Argon，API 首发价格限时减半
permalink: posts/2026/10/google-gemini-4-argon/
tags: [google, gemini, model-release, ai-agents, pricing]
sources:
  - name: "Gemini 4 Argon: Built to solve your hardest problems"
    url: https://blog.google/intl/en-in/products/introducing-gemini-4-argon/
    note: 上线日期、API 与应用开放范围
  - name: Gemini 4 Argon comes to the Gemini app
    url: https://blog.google/innovation-and-ai/products/gemini-app/gemini-4-argon-availability/
    note: Pro、Ultra 订阅开放与 macOS 应用中的 Antigravity 接入
  - name: Gemini 4 Argon 模型文档
    url: https://ai.google.dev/gemini-api/docs/models/gemini-4-argon
    note: 模型标识、输入输出类型、上下文与工具支持
  - name: Gemini Developer API pricing
    url: https://ai.google.dev/gemini-api/docs/pricing
    note: Standard 与 Batch 价格、优惠期限及缓存计费
  - name: Long decode
    url: https://ai.google.dev/gemini-api/docs/long-decode
    note: 共享上下文、后台执行与分段续接输出
date: 2026-10-14 08:36:14
categories: 大模型
description: Google 上线 Gemini 4 Argon，向开发者开放付费 API，并向 Pro、Ultra 订阅用户开放应用体验。本文介绍使用入口、多模态输入、百万 Token 共享上下文与长输出条件，以及截至 11 月 30 日的首发优惠和后续价格。
cover: https://images.51allai.com/blog/google-gemini-4-argon-cover_20261014_084736.png
---

> Google 于 10 月 13 日上线 Gemini 4 Argon，开放付费 API，并向 Gemini 应用中的 Pro、Ultra 订阅用户提供体验。API 标准调用首发价为每百万输入 Token 2 美元、输出 10 美元，优惠截至 11 月 30 日。模型支持多模态输入，长输出需启用专门的后台执行模式。
![Gemini 4 Argon 上线与多模态任务处理主题图](https://images.51allai.com/blog/google-gemini-4-argon-cover_20261014_084736.png)

## 产品介绍：面向复杂任务的推理模型

Gemini 4 Argon 是 Google 的旗舰推理模型，面向软件工程、数学与科学问题，以及需要连续执行多个步骤的智能体任务。智能体指能够按任务调用工具、推进操作的 AI 程序。开发者调用时使用的模型名称为 `gemini-4-argon`。

它能接收文字、图片、视频、音频和 PDF，输出文字。处理文档、分析图像或视频内容，以及生成代码，都可以使用同一个模型。工具能力包括代码执行、函数调用、文件搜索，以及结合 Google 搜索或地图获取信息；其中电脑操作能力处于预览阶段。

这些能力各有用途：代码执行可用于计算和检验结果，函数调用让模型连接业务系统，文件搜索用于查找已有资料。接入应用时，开发者仍需配置相应工具和权限。

## 怎么用：应用订阅与 API 分别开放

普通用户可通过 [Gemini 应用](https://gemini.google.com/) 使用 Argon，开放对象为 Google AI Pro 和 Ultra 订阅用户，功能从 10 月 13 日开始逐步推出。搜索中的 AI 模式也向这两个订阅档位开放；Google Antigravity 的 Argon 访问则面向 Ultra 用户。

Gemini macOS 应用同时接入了 Antigravity 的编程智能体界面，用户可以从对话切换到编程、制作网页和原型。此前的 [Gemini macOS 客户端介绍](/posts/2026/04/gemini-macos-swift-client/) 说明了桌面应用的使用方式，本次更新增加了在应用内进入编程工作的入口。

开发者可在 [Google AI Studio](https://aistudio.google.com/) 中测试，并通过付费 Gemini API 接入自己的软件。Argon 不提供 API 免费档；应用里的 Pro 订阅体验与 API 的付费调用是不同的使用渠道。

## 百万 Token 是共享容量，长输出需要启用续接

Argon 的统一上下文窗口为 1,048,576 Token。Token 是模型处理内容时使用的计量单位，一段文字通常会拆成多个 Token。这里的容量由输入、模型思考和输出共同占用，不能同时放入百万 Token 的材料，再额外生成百万 Token 的回答。

模型文档列出的默认同步输出上限为 65,536 Token。需要更长结果时，可使用 Long decode，也就是分段继续生成：在 Interactions API 中开启后台执行，把 `max_output_tokens` 设置到 65,536 以上，服务端会按最多 64K Token 一段续接，并将结果保存在同一个任务中。

因此，只把现有程序的模型名称换成 `gemini-4-argon`，不会自动获得百万 Token 长输出。需要长篇分析或持续生成代码的开发者，应按 [长输出接入说明](https://ai.google.dev/gemini-api/docs/long-decode) 配置后台任务，并为输入和思考过程预留上下文空间。

## API 首发价格减半，12 月 1 日调整

以下为 Gemini API 的 Standard 标准调用价格，单位是美元／百万 Token。输出价格包含模型思考所消耗的 Token。

| 计费项目 | 截至 2026 年 11 月 30 日 | 自 2026 年 12 月 1 日起 |
| --- | ---: | ---: |
| 输入 | 2 | 4 |
| 输出，含思考 | 10 | 20 |
| 缓存命中的输入 | 0.10 | 0.20 |

首发期的输入与输出单价均为后续价格的一半。缓存命中的输入按普通输入价格的 5% 计费；Argon 仅支持隐式缓存，由服务自动识别可复用内容，不支持自行创建显式缓存。

例如，一次任务使用 10 万个未缓存输入 Token，并产生 1 万个可计费输出 Token，首发期的模型费用为 0.30 美元，12 月 1 日起为 0.60 美元。这个计算不包含搜索等工具费用，实际输出用量还需计入思考 Token。

不需要即时返回的批量任务可使用 Batch：首发期输入和输出分别为 1 美元、5 美元／百万 Token，12 月 1 日起调整为 2 美元、10 美元。持续运营的应用应按后续价格做预算，具体计费可查看 [Gemini API 价格表](https://ai.google.dev/gemini-api/docs/pricing)。

## 使用场景与适用人群

需要分析长文档、整理多份资料或制作代码原型的订阅用户，可以先在 Gemini 应用中体验。开发团队可将 Argon 接入包含文档检索、计算和业务操作的流程；处理长任务时，结合后台执行读取结果。

应用选型还需比较成本。本站此前介绍的 [Gemini 3.8 Flash](/posts/2026/09/google-gemini-38-flash/) 也支持编程与智能体任务，标准调用单价更低。可以用同一批业务任务分别测试两款模型，比较结果质量、耗时和包含思考的实际 Token 用量，再决定哪些步骤使用 Argon。
