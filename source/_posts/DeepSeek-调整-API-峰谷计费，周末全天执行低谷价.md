---
title: DeepSeek 调整 API 峰谷计费，周末全天执行低谷价
permalink: posts/2026/08/deepseek-api-weekend-off-peak-pricing/
tags:
  - deepseek
  - deepseek-v4
  - pricing
  - product-update
date: 2026-08-22 23:20:59
categories:
  - 行业观察
description: DeepSeek API 将于 2026 年 8 月 23 日起调整峰谷计费，周六、周日全天统一按低谷价收费。本文梳理生效时间、工作日高峰时段、V4 Flash 与 V4 Pro 单价，并说明周末批处理任务如何按缓存命中、未命中输入与输出分别估算成本，帮助开发者调整任务时间和预算。
cover: https://images.51allai.com/blog/deepseek-api-weekend-off-peak-pricing-cover_20260822_232514.png
---
> DeepSeek API 将于北京时间 2026 年 8 月 23 日 00:00 调整峰谷计费。周六、周日全天统一按低谷价收费；工作日仍按 9:00–12:00、14:00–18:00 为高峰时段，其余时间执行低谷价。
![DeepSeek API 周末全天低谷价计费调整](https://images.51allai.com/blog/deepseek-api-weekend-off-peak-pricing-cover_20260822_232514.png)

## 周末不再设置高峰价

DeepSeek 把 API 峰谷计费拆成了工作日和周末两套规则。新规则生效后，周一至周五继续在北京时间 9:00–12:00、14:00–18:00 按高峰价计费，其余时段为低谷价。周六和周日则不再按时钟切换价格，24 小时都执行低谷价。

调整从 8 月 23 日 00:00 起生效。这一时点是周日，因此首个适用日是 8 月 23 日；之后的完整周末都按新规则计费。

## 每个完整周末有 14 小时从高峰价切换为低谷价

按现行时段划分，每天原有 7 小时高峰时段，一个完整周末共 14 小时。低谷价是高峰价的一半，所以在这 14 小时内发起同等 Token 用量的请求，单价会比调整前低 50%。

这一变化对可延后执行的任务更直接。批量摘要、离线分析、索引更新和自动评测可以放到周末任意时段，不必再避开白天的两段高峰时间。

## V4 Flash 与 V4 Pro 周末按同一张低谷价表扣费

价格按每 100 万 Token 计算。Token 是模型处理文本时的计量单位；输入又根据是否命中缓存分为两档。

| 模型 | 输入（缓存命中） | 输入（缓存未命中） | 输出 |
| --- | ---: | ---: | ---: |
| DeepSeek V4 Flash | 0.05 元 | 1.5 元 | 4.5 元 |
| DeepSeek V4 Pro | 0.15 元 | 4.5 元 | 13.5 元 |

DeepSeek V4 Flash Vision Exp 的三项低谷单价与 V4 Flash 相同。它接收的图片会先按尺寸换算成 Token，再与文本 Token 一起计费。

## 调整对象是 DeepSeek API 调用

这套规则作用于通过 API Key 发起、按 Token 扣费的 DeepSeek API 请求。使用网页端或 App 对话的用户，不需要把这张 API 价格表直接换算成客户端费用。

对已经记录 Token 用量的项目，可以保持现有的输入、输出和缓存命中统计方式，再按请求发生的工作日或周末重新计算预算。
