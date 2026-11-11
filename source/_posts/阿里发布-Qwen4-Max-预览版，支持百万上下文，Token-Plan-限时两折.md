---
title: 阿里发布 Qwen4-Max 预览版，支持百万上下文，Token Plan 限时两折
permalink: posts/2026/11/alibaba-qwen4-max-preview/
tags: [alibaba, qwen, model-release, pricing]
sources:
  - name: Qwen4-Max-Preview 模型文档
    url: https://help.aliyun.com/zh/model-studio/qwen4-max-preview
    note: 预览期、Token Plan 专属接入、输入模态、输出预算与思考参数
  - name: 百炼文本生成与视觉理解
    url: https://help.aliyun.com/zh/model-studio/text-generation-model
    note: 百万上下文、文本输出、工具调用与结构化输出规格
  - name: Token Plan 个人版概述
    url: https://help.aliyun.com/zh/model-studio/token-plan-personal-overview
    note: 套餐价格、Credits 折扣、夜间时段、使用范围与数据授权
  - name: Token Plan 个人版快速开始
    url: https://help.aliyun.com/zh/model-studio/token-plan-personal-quick-start
    note: 专属 API Key、OpenAI 与 Anthropic 兼容地址
  - name: 百炼 API 兼容性升级
    url: https://help.aliyun.com/zh/model-studio/api-compatibility-upgrade-notice
    note: max_tokens 与 max_completion_tokens 的预算口径
  - name: 阿里云 Token Plan 产品页
    url: https://www.aliyun.com/benefit/scene/tokenplan
    note: Qwen4-Max 预览版首发上线及限时两折活动
date: 2026-11-11 21:38:45
categories: 大模型
description: 阿里发布 Qwen4-Max 预览版，支持百万 Token 上下文和文本、图片、视频输入，API 通过 Token Plan 开放。本文梳理预览期限、套餐与 Credits 折扣、接入地址及输出预算变化，说明个人版的使用范围，帮助用户安排试用与迁移。
cover: https://images.51allai.com/blog/alibaba-qwen4-max-preview-cover_20261111_214311.png
---

> 阿里于 11 月 11 日开放 Qwen4-Max 预览版，支持百万 Token 上下文和文本、图片、视频输入，API 通过 Token Plan 调用。预览期截至北京时间 11 月 25 日 24:00，期间模型保持不变，结束后下线；调用消耗的套餐 Credits 限时两折。
![阿里 Qwen4-Max 预览版百万上下文与 Token Plan 主题图](https://images.51allai.com/blog/alibaba-qwen4-max-preview-cover_20261111_214311.png)

## 百万上下文，支持图片和视频理解

Qwen4-Max 预览版是千问新一代旗舰多模态模型，可接收文字、图片和视频，并以文字回答。用户可以把文档、截图或视频与问题一起提交，用于材料分析、编程开发和办公任务。

它的上下文窗口为 **100 万 Token**。Token 是模型拆分、处理内容的基本单位；上下文容量决定一次任务能容纳多少材料和对话记录。站内此前介绍的 [Qwen3.8-Max 也提供百万 Token 上下文](/posts/2026/08/qwen38-max-launch/)，因此容量本身不能作为新版本效果提升的依据。

模型支持工具调用和结构化输出。前者允许模型请求外部函数或联网搜索，后者能按约定的 JSON 格式返回结果，便于软件继续处理。需要查资料、读取工具结果再回答的多步任务，可以通过这些接口组织起来。

## API 仅通过 Token Plan 开放，预览至 11 月 25 日

本次开放的模型标识为 `qwen4-max-preview`，API 仅支持 Token Plan，不支持按量计费。Token Plan 是按套餐订阅、用 Credits 抵扣消耗的服务；Credits 是套餐额度单位，与 Token 数量分别计量。

预览期为 **2026 年 11 月 11 日 10:00 至 11 月 25 日 24:00（北京时间）**。这段时间内模型不做变更，预览结束后下线。计划接入的用户应把试用、评估和后续切换安排在这个期限内。

个人版限定在编程和智能体工具中交互式使用，不能用于自动化脚本、自定义应用后端或非交互式批量调用。个人版的输入及生成内容会用于服务改进与模型优化，订阅前应确认材料是否适合该数据使用条款。

## 两折抵扣 Credits，新客套餐优惠另算

Qwen4-Max 预览版的限时两折作用于 **Credits 消耗**。个人版每晚 22:00 至次日 08:00 再享四折，叠加后为标准消耗的 8%，即 0.8 折。例如，一项原本消耗 1,000 Credits 的调用，活动期间消耗 200 Credits，夜间叠加后为 80 Credits。

套餐购买价是另一项费用。个人版 Lite 套餐为 39 元/月，含 20,000 Credits；从未购买过个人版的账号，可享 19.5 元/月的新客限时价，优惠有效期至 11 月 30 日 23:59:59（北京时间）。预算应分别核算订阅支出与调用消耗，实际 Credits 用量可在控制台查看。

## 使用专属密钥接入，检查思考与回答的共同预算

从 [Token Plan 产品页](https://www.aliyun.com/benefit/scene/tokenplan)订阅后，在控制台生成套餐专属 API Key，再把密钥、接口地址和模型名称配置到支持自定义模型的 AI 工具中。个人版密钥以 `sk-sp-` 开头，只在生成时完整显示一次，应及时保存。

| 配置项 | 值 |
| --- | --- |
| 模型标识 | `qwen4-max-preview` |
| OpenAI 兼容 Base URL | `https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1` |
| Anthropic 兼容 Base URL | `https://token-plan.cn-beijing.maas.aliyuncs.com/apps/anthropic` |
| 身份凭据 | Token Plan 套餐专属 API Key |

模型默认开启思考，也就是在给出回答前先进行推理。最大输出预算为 **393,216 Token，思考和最终回答共同占用**。在 OpenAI Chat Completions 接口中，`max_tokens` 与 `max_completion_tokens` 均限制这两部分的总量。

例如，把 `max_tokens` 设为 8,000，思考过程就会占用其中一部分，不能按“可得到 8,000 Token 的最终回答”规划输出。沿用旧配置迁移时，应为思考和回答一起预留预算，先用一份熟悉的材料检查是否出现提前截断，再调整上限。
