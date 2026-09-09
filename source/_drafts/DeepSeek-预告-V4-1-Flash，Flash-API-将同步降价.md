---
title: DeepSeek 预告 V4.1 Flash，Flash API 将同步降价
permalink: posts/2026/09/deepseek-v41-flash-release-plan/
tags:
  - deepseek
  - deepseek-v4
  - model-release
  - pricing
sources:
  - name: 上海证券报——DeepSeek V4.1 Flash 发布计划与新价格
    url: http://www.cnstock.com/commonDetail/787872
    note: 核对计划发布时间、Flash 新价格与 V4 Pro 请求路由安排
  - name: 证券时报——DeepSeek 计划发布 V4.1 Flash
    url: https://www.stcn.com/article/detail/4178256.html
    note: 交叉核对发布时间窗口与 V4 Pro 过渡期路由规则
  - name: DeepSeek API 模型与价格
    url: https://api-docs.deepseek.com/zh-cn/quick_start/pricing/
    note: 核对降价前 Flash 系列的峰谷价格与计费单位
  - name: DeepSeek V4.1 Flash 中间版本内测通知
    url: https://www.ithome.com/0/999/795.htm
    note: 核对 9 月 8 日中间版本内测与临时模型名
date: 2026-09-09 19:19:10
categories:
  - 大模型
description: DeepSeek 计划于 9 月 10 日前后发布 V4.1 Flash，并从当日 12:00 起下调 Flash 系列 API 价格。本文梳理新旧价差、V4 Pro 请求的自动路由安排及对现有开发者的影响。
cover: https://images.51allai.com/blog/deepseek-v41-flash-release-plan-cover_20260909_192627.png
---
> DeepSeek 计划于北京时间 9 月 10 日前后发布 V4.1 Flash。Flash 系列 API 将于 9 月 10 日 12:00 执行新价格；V4.1 Pro 上线前，指向 V4 Pro 的请求将自动路由到 V4.1 Flash，并按 Flash 单价计费。
![DeepSeek V4.1 Flash 发布计划与 Flash API 降价](https://images.51allai.com/blog/deepseek-v41-flash-release-plan-cover_20260909_192627.png)

## V4.1 Flash 计划于 9 月 10 日前后发布

DeepSeek 在 9 月 9 日公布 V4.1 Flash 的发布计划，时间窗口是北京时间 9 月 10 日前后。这次调整承接了前一天的 [V4.1 Flash 中间版本内测](/posts/2026/09/deepseek-v41-flash-beta/)，临时模型名为 `deepseek-v4.1-flash-expires-on-0910`。

此次公布的过渡方案会直接影响现有 V4 Pro 用户：V4.1 Flash 上线后、V4.1 Pro 上线前，平台会把指向 V4 Pro 的 API 请求全部路由到 V4.1 Flash，费用也按 V4.1 Flash 的单价计算。已使用 `deepseek-v4-pro` 的应用不需要为这次路由切换修改请求地址。

## Flash API 输入与输出单价下调

Flash 系列新价格将于 9 月 10 日 12:00 生效。每 100 万 Token 的价格如下：

| 计费项目 | 新空闲时段 | 新高峰时段 | 调整前空闲时段 | 调整前高峰时段 |
| --- | ---: | ---: | ---: | ---: |
| 缓存命中输入 | 0.02 元 | 0.04 元 | 0.05 元 | 0.10 元 |
| 缓存未命中输入 | 1 元 | 2 元 | 1.5 元 | 3 元 |
| 输出 | 4 元 | 8 元 | 4.5 元 | 9 元 |

与调整前相比，缓存命中输入降价 60%，缓存未命中输入降价约 33.3%，输出降价约 11.1%。高峰时段仍为工作日 9:00–12:00 和 14:00–18:00，周末全天执行空闲时段单价。

Token 是模型读取输入和生成输出时使用的计量单位。如果一次任务分别消耗 100 万个缓存未命中的输入 Token 和 100 万个输出 Token，新价格下空闲时段费用为 5 元，高峰时段为 10 元。调整前两个时段分别需要 6 元和 12 元。

## 现有 V4 Pro 项目需重新评估成本基线

自动路由保持了 V4 Pro 请求的接入方式，但后端实际处理模型和计费单价都会变化。对返回内容有稳定性要求的项目，可以在切换后重跑固定测试集，检查输出格式、工具调用和业务结果。

成本预算也应改用新单价。过去以 V4 Pro 价格估算的项目，在过渡期会按 Flash 价格扣费；可以沿用原有 Token 用量，分别代入缓存命中、未命中和输出单价，重新设定预算与告警阈值。
