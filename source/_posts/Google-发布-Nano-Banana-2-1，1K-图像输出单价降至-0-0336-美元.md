---
title: Google 发布 Nano Banana 2.1，1K 图像输出单价降至 0.0336 美元
permalink: posts/2026/10/google-nano-banana-21/
tags: [google, gemini, nano-banana, image-generation, pricing]
sources:
  - name: Gemini API 发布记录
    url: https://ai.google.dev/gemini-api/docs/changelog
    note: 10 月 6 日正式可用与旧模型迁移建议
  - name: Gemini Nano Banana 2.1 模型文档
    url: https://ai.google.dev/gemini-api/docs/models/gemini-nano-banana-2.1
    note: 模型 ID、输出规格、参考图与思考档位
  - name: Gemini API 图像生成指南
    url: https://ai.google.dev/gemini-api/docs/image-generation
    note: 对话编辑、分辨率、搜索工具与 SynthID
  - name: Gemini Developer API 定价
    url: https://ai.google.dev/gemini-api/docs/pricing
    note: 1K 与 2K 输出、输入与思考计费、Batch 费率
  - name: Nano Banana 2.1 模型卡
    url: https://deepmind.google/models/model-cards/nano-banana-2-1/
    note: 产品渠道及已知生成限制
  - name: Gemini API 模型迁移表
    url: https://ai.google.dev/gemini-api/docs/deprecations
    note: Nano Banana 2 的推荐替代模型
date: 2026-10-07 13:00:44
categories: 多模态
description: Google 发布 Nano Banana 2.1，支持 1K 至 4K 图像生成与对话编辑，1K 图像输出单价降至 0.0336 美元。本文梳理使用入口、参考图规格、批量价格和旧版 API 迁移，说明图片输出费用与完整调用成本的区别。
cover: https://images.51allai.com/blog/google-nano-banana-21-cover_20261007_130653.png
---

> Google 于 10 月 6 日推出 Nano Banana 2.1，模型 ID 为 `gemini-nano-banana-2.1`，已在 Gemini API 正式可用。它支持 1K、2K、4K 图像生成与对话编辑，标准调用的 1K 图片输出费用为每张 0.0336 美元，输入和思考另行计费。
![Nano Banana 2.1 图像生成与多轮编辑主题封面](https://images.51allai.com/blog/google-nano-banana-21-cover_20261007_130653.png)

## 产品介绍：生成图片，也能接着修改

Nano Banana 2.1 是 Google 的图像生成与编辑模型，也是 [Nano Banana 2](/posts/2026/02/google-nano-banana-2/) 的更新版本。输入一段文字可以生成图片，上传照片或参考图后，可以继续用文字要求调整内容。同一段对话还能接着修改上一轮结果，例如先生成商品场景图，再调整背景和构图。

普通用户可从 [Gemini](https://gemini.google.com/) 使用图像创作功能；希望试用具体模型或把生图接入软件的开发者，可以进入 [Google AI Studio](https://aistudio.google.com/) 并使用 Gemini API。模型的分发渠道还包括 Google Search AI Mode、Google Ads、Flow 和 Stitch。

## 支持 1K 至 4K，最多使用 14 张参考图

Nano Banana 2.1 默认输出 1K 图片，也支持 2K、4K。它支持 `1:4`、`4:1`、`1:8`、`8:1` 等狭长画幅，可用于横幅或竖版长图；新版不支持上一代的 512px 输出档位。

一次工作流最多支持 14 张参考图，其中人物参考最多 4 个、物体参考最多 10 个。做多人场景或多件商品组合时，可以分别提供参考素材，并在提示词中说明每个对象的位置与用途。参考图数量是输入规格，不代表每次输出都能完全保持外观一致。

模型支持调用 Google 网页搜索和图片搜索，为生成内容提供检索依据。开发者还可以选择 `minimal`、`medium`、`high` 三个思考档位，默认是 `medium`；思考过程属于计费的文本输出。

## 1K 图片输出每张 0.0336 美元

下面是 Gemini Developer API 的图片输出费用，单位为美元。Batch 是把多条请求作为批量任务提交的调用方式。

| 输出规格 | 标准调用，每张 | Batch，每张 |
| --- | ---: | ---: |
| 1K | 0.0336 | 0.0168 |
| 2K | 0.0504 | 0.0252 |

上一代 Nano Banana 2 的标准 1K 图片输出约为每张 0.067 美元，新版这一项费用约降为一半。按上述费率计算，生成 100 张 1K 图片，图片输出部分为 3.36 美元；使用 Batch 则为 1.68 美元。

**图片输出价格只是完整调用费用的一部分。** 标准调用的文本、图片和视频输入为每百万 Token 1.50 美元，文本及思考输出为每百万 Token 7.50 美元。Token 是接口计算内容量的单位；上传参考素材、生成文字和模型思考都会影响账单。调用搜索工具也有独立计费规则。Gemini 应用的使用额度与这些 API 费率是两套规则。

站内此前介绍过 [Nano Banana 2 Lite 的价格与输出规格](/posts/2026/07/google-nano-banana-2-lite/)。Lite 同样提供 0.0336 美元的标准 1K 图片输出，但只支持 1K，标准输入费率为每百万 Token 0.25 美元。比较成本时，需要连同输入素材和编辑流程一起计算。

## 使用场景、适用人群与限制

需要制作活动海报、商品场景图、信息图或系列人物素材的用户，可以把 Nano Banana 2.1 用于生成候选图和连续修改。要把图片创作接入内容工具、电商后台或设计流程的开发者，可以使用正式模型 ID，并根据交付尺寸选择分辨率。

文字与主体仍需要人工检查。小字号、长段文字可能模糊；人物经过编辑后可能出现外观偏差；局部涂画编辑也可能只执行部分要求。涉及知识、空间关系或准确数据的图片，应核对内容后再使用。生成图片包含 SynthID 数字水印，用于识别 AI 生成内容。

## 旧 API 项目迁移到新模型 ID

使用 `gemini-3.1-flash-image` 的项目，推荐迁移到 `gemini-nano-banana-2.1`。上线前应检查输出尺寸、参考图组合、对话编辑结果和实际账单；依赖 512px 输出的流程需要调整到新版支持的尺寸。

新项目可从 [图像生成接入指南](https://ai.google.dev/gemini-api/docs/image-generation) 开始。迁移时也应检查输入与思考费用，不能只用每张图片的输出单价估算完整成本。
