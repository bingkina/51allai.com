---
title: DeepSeek 保留 V4 Pro API，9 月 14 日后继续按原价提供
permalink: posts/2026/09/deepseek-v4-pro-api-continues/
tags:
  - deepseek
  - deepseek-v4
  - pricing
  - product-update
sources:
  - name: DeepSeek API 模型与价格
    url: https://api-docs.deepseek.com/zh-cn/quick_start/pricing/
    note: 核对 V4 Pro 续供说明、模型版本、调用名、规格与现行价格
  - name: DeepSeek API 更新日志
    url: https://api-docs.deepseek.com/updates/
    note: 核对 9 月 14 日后继续提供 V4 Pro API 的安排
  - name: 第一财经——DeepSeek 9 月 14 日后继续提供 V4 Pro API
    url: https://www.yicai.com/news/103361549.html
    note: 交叉核对服务调整公告时间与计费不变口径
date: 2026-09-13 09:38:45
categories:
  - 大模型
description: DeepSeek 调整 V4 Pro 下线安排，9 月 14 日后继续提供 deepseek-v4-pro API，模型版本与计费方式保持不变。本文列出现行峰谷价格及对已有项目的影响。
cover: https://images.51allai.com/blog/deepseek-v4-pro-api-continues-cover_20260913_094539.png
---
> DeepSeek 调整 V4 Pro API 服务安排：2026 年 9 月 14 日后继续提供 `deepseek-v4-pro`，计费方式保持不变。当前模型仍为 DeepSeek-V4-Pro-0813，现有项目可以沿用原模型名和 API 地址。
![DeepSeek V4 Pro API 9 月 14 日后继续服务与原价计费](https://images.51allai.com/blog/deepseek-v4-pro-api-continues-cover_20260913_094539.png)

## V4 Pro 不再按原计划于 9 月 14 日下线

DeepSeek 将在 2026 年 9 月 14 日之后继续提供 V4 Pro API。当前模型与价格页仍列出 `deepseek-v4-pro`，对应版本为 `DeepSeek-V4-Pro-0813`。

此前的安排是：9 月 14 日 12:00 后，指向 V4 Pro 的请求将转交给 V4.1 Flash，并按 Flash 单价计费。现在的续供通知改变了这项安排。使用 V4 Pro 固定输出表现或工具调用行为的项目，不必因原定下线时间切换模型。

这次变化与 [V4.1 Flash 发布前公布的临时路由方案](/posts/2026/09/deepseek-v41-flash-release-plan/) 直接相关。V4.1 Flash 仍通过 `deepseek-flash` 单独提供，两个模型名在当前价格页并列显示。

## V4 Pro 继续执行现行峰谷价格

V4 Pro 仍按每 100 万 Token 分项计费。Token 是模型读取输入和生成输出时使用的计量单位。

| 计费项目 | 空闲时段 | 高峰时段 |
| --- | ---: | ---: |
| 缓存命中输入 | 0.15 元 | 0.30 元 |
| 缓存未命中输入 | 4.5 元 | 9.0 元 |
| 输出 | 13.5 元 | 27.0 元 |

高峰时段为北京时间周一至周五 9:00–12:00、14:00–18:00，其余时间执行空闲价格。一次调用若消耗 100 万个缓存未命中的输入 Token，并生成 100 万个输出 Token，空闲时段费用为 18 元，高峰时段为 36 元。

## 现有项目可以保持调用配置

OpenAI 兼容接口的基础地址仍是 `https://api.deepseek.com`，模型参数继续填写 `deepseek-v4-pro`。当前文档列出的上下文长度为 100 万 Token，最大输出为 38.4 万 Token，单账号并发上限为 500。

V4 Pro 继续支持 JSON Output、Tool Calls、Responses API 和 Anthropic API。已经接入这些接口的应用可以保持现有配置，并继续按 V4 Pro 的峰谷价核算预算。
