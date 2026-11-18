---
title: OpenAI 发布 GPT-6.2 Astra 和 Sol，接入 Work 与 Codex
permalink: posts/2026/11/openai-gpt-62-astra-sol/
tags: [openai, chatgpt, codex, model-release, pricing]
sources:
  - name: OpenAI — Introducing GPT-6.2 Astra and Sol
    url: https://openai.com/index/introducing-gpt-6-2-astra-sol/
    note: 发布日期、模型定位、API 降价与 Ultrafast 开放范围
  - name: GPT-6.2 Astra API 模型规格
    url: https://developers.openai.com/api/docs/models/gpt-6.2-astra
    note: 上下文、输入输出范围、缓存价格与长输入附加费
  - name: GPT-6.2 Sol API 模型规格
    url: https://developers.openai.com/api/docs/models/gpt-6.2-sol
    note: 模态、上下文、标准价格及速度档位计费
  - name: GPT-6 Astra API 模型规格
    url: https://developers.openai.com/api/docs/models/gpt-6-astra
    note: 前代输入、缓存读取与输出价格，用于计算降幅
  - name: ChatGPT Work 与 Codex 模型使用说明
    url: https://learn.chatgpt.com/docs/models
    note: 模型选择、命令行入口、适用场景与 Codex 默认上下文
  - name: ChatGPT Work 与 Codex 定价及功能范围
    url: https://learn.chatgpt.com/docs/pricing
    note: 支持的付费套餐、客户端及 Enterprise 和 Edu 管理员开关
  - name: GPT-6 and other models in ChatGPT
    url: https://help.openai.com/en/articles/20001354-gpt-6-and-other-models-in-chatgpt
    note: 分阶段开放、客户端更新和普通 Chat 不在此次更新范围内
  - name: OpenAI API 更新日志
    url: https://developers.openai.com/api/docs/changelog
    note: 11 月 17 日上线、两个 API 入口与工具调用要求
  - name: Using GPT-6.2
    url: https://developers.openai.com/api/docs/guides/latest-model
    note: 推理档位、参数迁移与多轮对话历史保留规则
date: 2026-11-18 09:30:19
categories: 大模型
description: OpenAI 发布 GPT-6.2 Astra 和 Sol，接入 ChatGPT Work、Codex 与 API。本文整理使用入口、付费套餐、105 万 Token 上下文与默认窗口差异，说明 Astra 输入输出单价降低 20%、Sol 价格不变，以及缓存费用、长输入附加费和开发者迁移要点。
cover: https://images.51allai.com/blog/openai-gpt-62-astra-sol-cover_20261118_093635.png
---

> OpenAI 于 11 月 17 日发布 GPT-6.2 Astra 和 GPT-6.2 Sol，两款模型开始向 ChatGPT Work 与 Codex 的付费用户开放，并同步提供 API。Astra 面向复杂专业任务，输入和输出单价较 GPT-6 Astra 降低 20%；Sol 面向日常编程与办公，沿用 GPT-6.1 Sol 的 API 价格。
![GPT-6.2 Astra 与 Sol 接入 ChatGPT Work、Codex 和 API 主题封面](https://images.51allai.com/blog/openai-gpt-62-astra-sol-cover_20261118_093635.png)

## Astra 处理复杂项目，Sol 面向日常工作

[GPT-6.2 Astra 和 Sol](https://openai.com/index/introducing-gpt-6-2-astra-sol/) 是两款可以结合资料与工具完成任务的模型。Astra 的使用场景包括跨多个服务排查代码错误、修改并测试软件，以及把研究资料整理成符合给定模板的演示文稿。Sol 则面向日常代码修改、报告起草，或把项目说明、会议记录和时间表整理成执行计划。

两款模型都接受文本和图片输入，输出文本。通过工具调用，它们可以搜索网页、查找文件、运行代码或操作计算机。工具调用指模型在处理任务时使用外部软件执行步骤，具体能用哪些工具取决于所在客户端或应用的配置。

在 API 中，两款模型的上下文窗口均为 **105 万 Token**，最大输入为 92.2 万 Token，最大输出为 12.8 万 Token。Token 是模型处理内容的计量单位；上下文窗口决定一次请求能够容纳多少指令、资料和对话，不能直接换算成固定的中文字数。

## 在 Work 与 Codex 中选择，普通 Chat 不在此次更新范围内

ChatGPT Work 与 Codex 的支持套餐包括 Plus、Pro、Business、Enterprise 和 Edu。Work 可通过网页、移动端和桌面端使用；Codex 提供应用和命令行入口。Enterprise 和 Edu 工作空间中的两款模型默认关闭，需要管理员启用。

使用桌面应用时，先通过 `Menu → Check for Updates` 更新并重启，再进入 Work 或 Codex，在输入框下方选择模型和推理强度。如果界面显示 Power 滑块，可打开 Advanced 选择具体模型。开放采用分阶段方式，账户能否看到选项还取决于套餐和工作空间权限。

Codex CLI 也需要更新到最新版本。交互会话中可用 `/model` 切换模型，启动时也可以直接指定：

```bash
codex --model gpt-6.2-astra
codex --model gpt-6.2-sol
```

API 的最大窗口与客户端默认配置需要分开看。Codex 中 Astra 默认使用 27.2 万 Token 上下文，Sol 默认使用 50 万 Token；需要更长上下文时，可在 `config.toml` 中调整 `model_context_window`。模型入口和配置方式可查看 [Work 与 Codex 模型使用说明](https://learn.chatgpt.com/docs/models)。

这次更新的入口是 Work 和 Codex，普通 Chat 对话没有加入两款 6.2 模型。此前的 [ChatGPT 对话模型升级与可交互回答](/posts/2026/10/chatgpt-gpt-6-intelligent-ui/)属于另一项更新。

## Astra 输入输出降价 20%，Sol 价格保持不变

以下为 Standard 处理档位的 API 单价，单位均为**美元／百万 Token**：

| 计费项目 | GPT-6 Astra | GPT-6.2 Astra | GPT-6.2 Sol |
| --- | ---: | ---: | ---: |
| 输入 | 10.00 | 8.00 | 2.00 |
| 缓存读取 | 1.00 | 0.40 | 0.10 |
| 输出 | 50.00 | 40.00 | 10.00 |

与 [GPT-6 Astra](/posts/2026/09/openai-gpt-6-astra/)相比，6.2 Astra 的输入和输出单价均降低 20%，缓存读取降低 60%。Sol 的这三项价格沿用 [GPT-6.1 Sol](/posts/2026/10/gpt-61-sol-chatgpt-codex/)，均为 6.2 Astra 的四分之一。这里比较的是每 Token 单价，整项任务的费用还取决于实际用量、缓存和工具调用。

缓存可复用重复出现的提示内容。表中的缓存读取价只适用于命中缓存的输入；写入另行计费。保留 30 分钟时，Astra 和 Sol 的缓存写入价分别为每百万 Token 10 美元、2.50 美元；保留 12 小时则分别为 20 美元、5 美元。

上述价格适用于输入不超过 27.2 万 Token 的请求。超过这一门槛时，**整次请求**的输入和缓存费率变为 2 倍，输出费率变为 1.5 倍。Batch 批处理按 Standard 的半价计费，Fast 为 2 倍。

两款模型也提供 Ultrafast 速度档位。API 截至太平洋时间 2027 年 2 月 28 日按 Standard 的 3 倍计费，3 月 1 日起为 6 倍。在订阅中，Pro 500 用户可为两款模型选择 Ultrafast，Pro 200 则先开放 Sol；符合条件的 Enterprise 和 Edu 用户需由管理员启用。

## 开发者迁移时要检查接口、推理档位和对话历史

API 模型 ID 分别为 `gpt-6.2-astra` 和 `gpt-6.2-sol`，均支持 Responses 与 Chat Completions。需要搜索、计算机操作或其他工具调用时，必须使用 Responses API。

新接入可从 `medium` 推理强度开始。已有请求若使用 `none` 或 `minimal`，应改为 `low` 等受支持档位；这两款模型不接受 `none`。迁移时还要移除不支持的 `temperature`、`top_p` 等参数，完整规则可查看 [GPT-6.2 接入与迁移指南](https://developers.openai.com/api/docs/guides/latest-model)。

多轮任务还要保留已有对话历史的顺序和内容，把新要求追加到后面。6.2 API 检测到对话前缀被改写、切换到较低档模型，或终端用户、组织发生变化时，会丢弃已有推理记录。保持前缀不变，有助于保留推理记录，也让前面的输入继续满足缓存复用条件。
