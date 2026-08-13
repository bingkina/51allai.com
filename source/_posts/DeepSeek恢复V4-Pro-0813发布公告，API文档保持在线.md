---
title: DeepSeek恢复V4 Pro 0813发布公告，API文档保持在线
permalink: posts/2026/08/deepseek-v4-pro-0813-announcement-restored/
tags: [deepseek, deepseek-v4, product-update, model-release]
date: 2026-08-13 20:11:38
categories: 行业观察
description: DeepSeek V4 Pro 0813发布公告在8月13日下午短暂从官网首页和开放平台入口消失，随后已重新出现在官网首页与更新日志。模型与价格页在公告消失期间仍列出0813版本，API调用名未变。本文梳理公告撤下与恢复后的实际状态，帮助用户区分页面变化和模型下线。
cover: https://images.51allai.com/blog/deepseek-v4-pro-0813-announcement-restored-cover_20260813_201654.png
---

> DeepSeek V4 Pro 0813 的发布横幅和开放平台公告在 8 月 13 日下午一度消失，随后已恢复。当前官网首页、API 更新日志和模型价格页均再次确认 V4 Pro 正式版，`deepseek-v4-pro` 的调用方式没有改变。
![DeepSeek V4 Pro 0813发布公告恢复与API状态](https://images.51allai.com/blog/deepseek-v4-pro-0813-announcement-restored-cover_20260813_201654.png)

## 发布公告短暂消失后恢复

8 月 13 日下午，DeepSeek 官网首页的 V4 Pro 正式版横幅以及开放平台中的对应公告一度无法看到。撤下期间，模型与价格页仍将 `deepseek-v4-pro` 对应的版本标为 `DeepSeek-V4-Pro-0813`。

当日晚间再次检查时，官网首页已经恢复 V4 Pro 正式版横幅。API 文档的更新日志也出现了日期为 2026 年 8 月 13 日的 V4 Pro 更新条目，写明正式版已部署到 App、网页端和 API。

这一过程涉及发布信息的展示状态，不应直接解读为模型已经下线或 API 已经撤回。当前可见的三个官方页面——官网首页、更新日志、模型与价格页——给出的产品状态已经重新一致。

## API调用名和版本号都保留

开发者仍使用 `deepseek-v4-pro` 作为模型名，不需要把版本日期写进请求，也不需要更换 OpenAI 格式的基础地址 `https://api.deepseek.com`。模型与价格页当前列出的后端版本仍是 `DeepSeek-V4-Pro-0813`。

该页面同时保留 100 万 Token 上下文、38.4 万 Token 最大输出、工具调用、JSON 输出、Responses API 和 Anthropic API 等规格。Responses API 是 OpenAI 提供的一套模型调用格式，DeepSeek 对它的支持让 Codex 等开发工具可以直接接入 V4 Pro。

已经接入 V4 Pro API 的项目不需要因为这次公告变化修改代码。需要确认线上状态时，应以实时 API 文档和服务状态页为准，而不是只看首页横幅是否出现。

## App、网页端和API仍按正式版展示

恢复后的更新日志把 V4 Pro 0813 定义为正式版，并列明 App、网页端和 API 三个入口。普通用户可以继续通过 DeepSeek 网页端或 App 使用当前旗舰模型；开发者则继续通过原有 API 模型名调用。

更新日志还列出了 low、high 和 max 三档思考强度。思考强度决定模型在回答前投入多少推理过程：简单任务可以使用较低档位，长步骤智能体或复杂代码任务可以选择更高档位。

此前发布的 [DeepSeek V4 Pro 0813 API 与 Codex 接入说明](/posts/2026/08/deepseek-v4-pro-0813-codex/) 仍适用于当前调用方式。公告短暂消失没有改变这部分配置。

## 价格页面同步给出调价时间

V4 Pro 的当前价格仍按每 100 万 Token 计费：缓存命中输入 0.025 元、缓存未命中输入 3 元、输出 6 元。更新日志和价格页同时写明，新的峰谷定价将在北京时间 8 月 17 日 0 时生效；低谷时段价格为高峰时段的一半。

因此，准备长期调用 V4 Pro 的团队需要分别记录当前价格和新价格生效后的成本。公告是否出现在首页不会改变实际账单，计费应以调用发生时价格页显示的规则为准。

## 当前状态以恢复后的官方页面为准

截至 8 月 13 日晚间，V4 Pro 正式版横幅、更新日志和模型价格页均已恢复一致：版本号是 `DeepSeek-V4-Pro-0813`，调用名仍为 `deepseek-v4-pro`，App、网页端和 API 继续提供正式版。

这次短暂的公告变化没有形成模型下线事实。对普通用户而言，使用入口没有变化；对开发者而言，现有 API 配置也无需调整。
