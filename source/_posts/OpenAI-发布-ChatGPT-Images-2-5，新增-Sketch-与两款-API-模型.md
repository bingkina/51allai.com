---
title: OpenAI 发布 ChatGPT Images 2.5，新增 Sketch 与两款 API 模型
permalink: posts/2026/09/chatgpt-images-25-sketch-api/
tags: [openai, chatgpt, image-generation, product-update, pricing]
sources:
  - name: OpenAI ChatGPT Images 2.5 发布公告
    url: https://openai.com/index/introducing-chatgpt-images-2-5/
    note: 发布日期、产品功能、开放范围与两款 API 模型定位
  - name: OpenAI ChatGPT Images 使用帮助
    url: https://help.openai.com/en/articles/11084440-images-in-chatgpt
    note: ChatGPT 入口、Sketch、模板、编辑方式与套餐范围
  - name: OpenAI API 定价
    url: https://developers.openai.com/api/docs/pricing
    note: GPT-Image-2.5 与 GPT-Image-2 的输入、缓存输入和输出价格
date: 2026-09-09 09:31:02
categories: 多模态
description: OpenAI 发布 ChatGPT Images 2.5，加入 Sketch 草图生图、模板、图片批注和提示词分享。本文说明 ChatGPT 各端使用入口、Flare 与 Sunburst 两款 API 模型的定位，以及相较 GPT-Image-2 翻倍的 Token 价格。
cover: https://images.51allai.com/blog/chatgpt-images-25-sketch-api-cover_20260909_093602.png
---

> OpenAI 于 9 月 8 日发布 ChatGPT Images 2.5，面向 ChatGPT、ChatGPT Work 和 Codex 全档位用户推出。新版加入 Sketch 草图生图、模板、图片批注和提示词分享；API 同步提供 Flare 与 Sunburst 两款模型，两款模型的 Token 单价均为 GPT-Image-2 的两倍。
![ChatGPT Images 2.5 Sketch 与 Flare、Sunburst API 模型](https://images.51allai.com/blog/chatgpt-images-25-sketch-api-cover_20260909_093602.png)

## 草图和图片批注进入生成流程

ChatGPT Images 2.5 把草图、模板和图片批注放进同一套创作流程。用户可以先选海报、Logo 等模板，再补充画面内容、文字和风格；也可以在生成后的图片上添加批注，把修改要求指向具体位置。

Sketch 目前在 ChatGPT 移动应用中使用。在输入框输入 `@` 并选择 Sketch 后，可以直接画出轮廓，确认草图，再补充主体、颜色或风格要求。它适合难以只靠文字说明的布局，例如商品摆放位置、海报分区或人物动作。

模板暂不支持 Work mode。普通对话中的图像生成与编辑仍可通过网页、iOS 和 Android 使用，ChatGPT Images 覆盖所有套餐。

## 局部修改仍要检查选区之外的变化

图片批注减少了反复重写完整提示词的需要。需要更换一个物体、背景或一段文字时，可以先标出区域，再描述修改内容；连续调整同一张图时，前一轮结果会保留在当前对话中，方便继续迭代。

选区不是像素级蒙版，修改可能延伸到标记范围之外。处理人物五官、商品标签、品牌图形或密集文字时，保存前仍要逐项检查未选区域、拼写、边缘和构图。

如果目标是制作贴纸、图标或商品抠图，可以继续使用[透明背景图像的生成与编辑方法](/posts/2026/08/chatgpt-transparent-images/)。

## API 分为 Flare 与 Sunburst

开发者可以通过 Images API 或 Responses API 调用两款新模型：

| 模型 ID | 适合的工作流 | 取舍 |
| --- | --- | --- |
| `gpt-image-2.5-flare` | 日常生成、快速原型和批量任务 | 速度优先 |
| `gpt-image-2.5-sunburst` | 需要更细编辑控制的营销素材和产品图 | 精度优先，生成时间更长 |

Images API 提供从文字生成新图片和编辑已有图片两个端点。Responses API 可以把图像生成放进多轮对话或多步骤流程，并继续使用前一轮图片做高保真编辑。

## 两款新模型的 Token 单价相同

Flare 与 Sunburst 使用同一组标准价格。它们不是按每张图片收取固定费用，而是按输入和输出 Token 计费；实际成本会随图片尺寸、质量、输入素材和生成内容变化。

| 计费项 | GPT-Image-2.5 Flare / Sunburst | GPT-Image-2 | 变化 |
| --- | ---: | ---: | ---: |
| 图片输入 | 8 美元/百万 Token | 4 美元/百万 Token | 2 倍 |
| 图片缓存输入 | 2 美元/百万 Token | 1 美元/百万 Token | 2 倍 |
| 图片输出 | 30 美元/百万 Token | 15 美元/百万 Token | 2 倍 |
| 文本输入 | 5 美元/百万 Token | 2.5 美元/百万 Token | 2 倍 |
| 文本缓存输入 | 1.25 美元/百万 Token | 0.625 美元/百万 Token | 2 倍 |

普通用户无需选择 API 模型，直接在 ChatGPT 的对话或 Images 页面创建和编辑图片即可。开发者若更看重响应速度，可先测试 Flare；需要多轮局部精修时，再比较 Sunburst 带来的控制能力是否值得更长的生成时间。
