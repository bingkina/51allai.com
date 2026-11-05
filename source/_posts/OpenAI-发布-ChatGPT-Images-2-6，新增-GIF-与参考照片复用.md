---
title: OpenAI 发布 ChatGPT Images 2.6，新增 GIF 与参考照片复用
permalink: posts/2026/11/chatgpt-images-26-gif-reference/
tags: [openai, chatgpt, image-generation, product-update, pricing]
sources:
  - name: OpenAI Images 2.6 发布公告
    url: https://openai.com/index/introducing-images-2-6/
    note: 发布日期、ChatGPT 与 Codex 开放范围、API 功能
  - name: ChatGPT Images 使用帮助
    url: https://help.openai.com/en/articles/11084440-images-in-chatgpt
    note: GIF 逐步开放、生成与编辑限制、保存和复用参考照片
  - name: OpenAI 图像生成 API 指南
    url: https://developers.openai.com/api/docs/guides/image-generation
    note: complexity 参数、批注编辑、SVG 与 GIF 输出及接口限制
  - name: GPT-Image-2.6 Flare 模型文档
    url: https://developers.openai.com/api/docs/models/gpt-image-2.6-flare
    note: 模型 ID、用途和 Token 价格
  - name: GPT-Image-2.6 Sunburst 模型文档
    url: https://developers.openai.com/api/docs/models/gpt-image-2.6-sunburst
    note: 模型 ID、用途和 Token 价格
  - name: OpenAI API 定价
    url: https://developers.openai.com/api/docs/pricing
    note: 两款 2.6 模型与 2.5 模型的标准 Token 单价对照
date: 2026-11-05 09:31:51
categories: 多模态
description: OpenAI 发布 ChatGPT Images 2.6，加入 GIF 动图和跨对话复用参考照片。本文介绍生成入口、GIF 编辑限制，以及 Flare、Sunburst 两款 API 模型的复杂度控制、SVG 输出和与 2.5 相同的标准 Token 单价。
cover: https://images.51allai.com/blog/chatgpt-images-26-gif-reference-cover_20261105_093645.png
---

> OpenAI 于 11 月 4 日发布 ChatGPT Images 2.6，在 ChatGPT 和 Codex 各订阅档位推出。ChatGPT 正逐步开放 GIF 生成，并支持保存参考照片供后续对话调用；开发者可使用 Flare、Sunburst 两款 API 模型，标准 Token 单价与 2.5 相同。
![ChatGPT Images 2.6 GIF 动图生成与参考照片复用示意](https://images.51allai.com/blog/chatgpt-images-26-gif-reference-cover_20261105_093645.png)

## 从静态图片生成循环 GIF

ChatGPT Images 是 ChatGPT 中创建和修改图片的功能。2.6 加入 GIF 动图创作：输入文字描述，或上传一张静态图片，就能要求把指定主体做成循环动画。GIF 是能够连续播放多帧画面的图片格式，常用于表情包、角色动作和产品展示。

例如，可以上传一张宠物照片，要求“让它抬起前爪打招呼，结尾回到起始姿势，生成循环 GIF”。生成后可在对话中继续描述修改，也能打开动图调整播放速度、下载或分享。

这项功能正在 ChatGPT 中逐步开放。它支持修改 ChatGPT 自己创建的 GIF，**不能编辑用户上传的现成动画 GIF**；从已有素材开始时，应上传静态图。

## 保存参考照片，在新对话中直接调用

参考照片可以保存后重复使用。上传照片，请 ChatGPT 将其存为参考，再起一个名称；之后在其他对话中输入 `@` 加上保存的名称，就能调用该照片。

例如，把宠物照片命名为 `Pepper`，后续可输入“为 @Pepper 画一张水彩肖像”。这省去了每次开启新对话都重新上传同一张照片的步骤，适合围绕固定人物或宠物持续创作。

此前 [Images 2.5 的 Sketch 草图与模板功能](/posts/2026/09/chatgpt-images-25-sketch-api/)用于提供构图起点；这次的参考照片复用则把同一份素材带进后续对话。

## 普通用户从对话或 Images 入口使用

用户可以直接在对话中要求生成图片，也可以选择 More → Images。ChatGPT Images 覆盖所有套餐，支持网页、iOS 和 Android；Codex 也能生成和编辑图片。

需要修改已有图片时，上传图片并说明改动，或打开生成结果后选中局部区域，再输入修改要求。选区不保证精确限定修改范围，保存前仍应检查文字、人物细节和未选中的部分。

## API 增加复杂度控制和 SVG、GIF 输出

开发者可选用两款模型：

| 模型 ID | 面向的任务 |
| --- | --- |
| `gpt-image-2.6-flare` | 需要快速迭代的图片生成与编辑 |
| `gpt-image-2.6-sunburst` | 细节较多的构图与图片编辑 |

两款模型均支持 `complexity` 参数，取值为 `low`、`medium` 或 `high`，省略时默认为 `high`。它控制生成前的规划程度；`quality` 则单独控制画面质量。只改背景或一块招牌时，可以先尝试低复杂度；复杂布局再比较更高档位的结果。

API 也支持通过独立的透明 PNG 批注层指明修改位置，并提供 SVG 和 GIF 输出。SVG 是由路径、形状等组成的矢量格式，适合需要继续编辑的图标和插画。

SVG、GIF 都通过图片生成端点输出，图片编辑端点不支持这两种输出格式。接入时需要区分“生成动画”和“编辑图片”这两种请求。

## 标准 Token 单价与 2.5 相同

Flare 和 Sunburst 使用相同的标准 Token 单价，与对应的 2.5 模型一致。Token 是接口用于计算输入、输出用量的单位，不能直接等同于图片张数。

| 计费项 | 两款 2.6 模型的标准价格 |
| --- | ---: |
| 文本输入 | 5 美元／百万 Token |
| 文本缓存输入 | 1.25 美元／百万 Token |
| 图片输入 | 8 美元／百万 Token |
| 图片缓存输入 | 2 美元／百万 Token |
| 图片输出 | 30 美元／百万 Token |

相同单价不保证每张图片成本相同，实际费用取决于用量。SVG 输出还包括生成参考图片和编写矢量内容所用模型的费用；`complexity` 参数本身没有独立附加费。

制作表情或角色动作时，可先从 ChatGPT 的单张静态参考图开始；需要把图片生成、批注修改和文件输出接入自己的软件时，再选择 API，并分别核对输出格式和实际用量。
