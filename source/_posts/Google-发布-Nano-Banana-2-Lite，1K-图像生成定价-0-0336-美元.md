---
title: Google 发布 Nano Banana 2 Lite，1K 图像生成定价 0.0336 美元
permalink: posts/2026/07/google-nano-banana-2-lite/
tags: [google, gemini, nano-banana, image-generation, pricing]
date: 2026-07-01 09:58:45
categories: 多模态
description: Nano Banana 2 Lite 在 Gemini API GA，主打 1K 低延迟图像生成。本文梳理模型 ID、价格、分辨率限制、Batch 成本和与 Nano Banana 2 的差异。
cover: https://images.51allai.com/blog/截图2026-07-01_10.03.01@2x_20260701_100357.png
---
> Nano Banana 2 Lite 已在 Gemini API GA，模型 ID 为 `gemini-3.1-flash-lite-image`。它只支持 1K 输出，标准调用每张约 0.0336 美元，Batch 约 0.0168 美元，定位不是画质旗舰，而是高频交互和低成本编辑。
![Nano Banana 2 Lite 图像生成模型示意](https://images.51allai.com/blog/截图2026-07-01_10.03.01@2x_20260701_100357.png)

## Lite 把重点放在吞吐和价格

Nano Banana 2 Lite 的稳定模型 ID 是 `gemini-3.1-flash-lite-image`，另有 `gemini-3.1-flash-lite-image-preview-06-30` 预览别名。它已进入 GA，Gemini API 的生产环境可以直接调用稳定 ID。

这不是 Nano Banana 2 的全能力版本。Lite 面向高频图像生成和编辑，标称端到端延迟低于 2 秒。价格也按这个方向收窄：标准调用下，图片输出计费为每百万 tokens 30 美元，折算 1K 图片约 0.0336 美元；Batch API 为半价，约 0.0168 美元。输入 tokens 价格为每百万 0.25 美元，文本和 thinking 输出为每百万 1.50 美元。

## 分辨率限制比价格更值得先看

Lite 只提供 1K 输出，默认 1024 x 1024。它支持图文交错生成和基于参考图的编辑，也支持多种固定宽高比，覆盖横图、竖图、方图和移动端常见比例。但 2K、4K 输出不在这个型号里。

这会直接决定使用边界。批量生成缩略图、商品草图、社媒素材候选、界面插图和快速换背景，Lite 的价格和延迟更合适。需要大幅面海报、精修人物、复杂排版或高一致性的品牌资产，仍要看 Nano Banana 2 标准版或 Pro 线。

## 多参考图不是完整角色一致性

Lite 支持最多 14 张参考图做对象或风格输入，但角色一致性和风格一致性没有作为 Lite 的明确能力项列出。这个细节容易被忽略：多图参考可以提高对象保真，不等于能稳定维护一个角色的全套视觉身份。

它也不支持 Grounding with Google Search。实际约束是，Lite 不适合把实时事实、地点、商品信息直接带进图片生成链路。需要外部事实约束时，开发者要先在自己的系统里完成检索和结构化，再把可控文本或参考图交给模型。
