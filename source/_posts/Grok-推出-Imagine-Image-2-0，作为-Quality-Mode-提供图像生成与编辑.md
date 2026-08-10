---
title: Grok 推出 Imagine Image 2.0，作为 Quality Mode 提供图像生成与编辑
permalink: posts/2026/08/grok-imagine-image-2/
tags:
  - xai
  - grok
  - image-generation
  - product-update
date: 2026-08-10 10:05:35
categories: 多模态
description: Grok 推出 Imagine Image 2.0，作为 Quality Mode 提供图像生成与编辑。普通用户可在网页和移动应用中对原图进行局部修改、分割选区和背景移除；开发者可通过 xAI Imagine API 调用同名模型，生成或编辑 1K、2K 图片，标价每张 0.05 美元。本文说明两类入口的适用场景和成本。
cover: https://images.51allai.com/blog/grok-imagine-image-2-cover-v2_20260810_100957.png
---
> Grok 已将 Imagine Image 2.0 作为 Quality Mode 提供给网页端和移动端用户，重点是让一张图可以反复局部修改。xAI 的 Imagine API 也提供同名图像模型：支持文生图、自然语言改图和最多三张参考图的编辑，每张图标价 0.05 美元。
![Grok Imagine Image 2.0 局部精确编辑示意](https://images.51allai.com/blog/grok-imagine-image-2-cover-v2_20260810_100957.png)

## 从生成一张图，变成在原图上继续改

Grok Imagine Image 2.0 是 Grok 的图像生成与编辑能力。它以 Quality Mode 的形式出现在 Grok Imagine 页面，以及 iOS、Android 应用中。

这次更新的重点不是只换一种画风，而是让用户能对已有图片继续下指令。用户可以用文字描述修改内容，让模型在原图基础上完成编辑。对于要反复调整构图、素材或细节的场景，这比每次从头生成更直接。

## 局部修改、分割与透明背景导出

Image 2.0 提供 Magic Wand、区域分割和背景移除等编辑方式。Magic Wand 用于指定画面中的一个区域并单独修改；分割可以先选出需要处理的对象或区域；背景移除则可把主体导出为透明背景图。

这些功能适合处理已经有明确主体的图片。例如，只替换商品图的背景、调整海报里的一个元素，或把人物、物品从原背景中取出后继续排版。它们解决的是“已生成图片怎么改”的问题，而不是只增加一次新的生成结果。

## 网页、移动端与 API 是两种使用入口

普通用户可以在 Grok 的网页端或移动应用里使用 Imagine。开发者则可以使用 xAI 的 Imagine API，模型标识为 `grok-imagine-image-quality`。该 API 支持从文字提示生成图片，也支持给已有图片下自然语言编辑指令。

API 还允许在一次编辑请求中传入最多三张参考图。参考图可以用于提供人物、物体、服饰或风格等视觉线索；输出比例也可以通过参数指定。对需要把图片能力接入产品或工作流的开发者来说，这比手动在应用内操作更容易自动化。

## 价格按生成图片计算

xAI 的开发者文档把图像生成和编辑列为按张计费：`grok-imagine-image-quality` 的价格是每张 0.05 美元，提供 1K 和 2K 两种输出分辨率。编辑请求的计费同时覆盖输入图片和生成结果，实际成本会随操作次数增加。

使用网页端、移动端还是 API，取决于任务方式。临时改一张图适合直接在 Grok Imagine 中完成；需要批量生成、固定尺寸，或要把图像能力接到自己的服务中时，API 更方便控制请求和输出。
