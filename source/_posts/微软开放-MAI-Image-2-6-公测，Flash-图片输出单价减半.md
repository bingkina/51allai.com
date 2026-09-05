---
title: 微软开放 MAI-Image-2.6 公测，Flash 图片输出单价减半
permalink: posts/2026/09/mai-image-26-foundry-flash/
tags: [microsoft, mai-image, image-generation, pricing]
sources:
  - name: Microsoft AI MAI-Image-2.6 公共预览公告
    url: https://microsoft.ai/news/pushing-the-quality-cost-frontier-with-mai-image-2-6/
    note: 9 月 4 日开放范围、多图参考、联网检索与自动宽高比
  - name: Microsoft Foundry MAI-Image-2.6 与 Flash 发布说明
    url: https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/mai-image-2-6-and-mai-image-2-6-flash-quality-and-speed-at-production-scale/4550970
    note: 两款模型的输入与输出价格
  - name: Microsoft Learn MAI 图像模型使用文档
    url: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-mai-image
    note: 生成与编辑功能、请求参数、接入方式与配额
date: 2026-09-05 17:14:46
categories: 多模态
description: 微软将 MAI-Image-2.6 和 Flash 版开放至 Foundry 公开预览，支持文字生图、多图参考编辑、联网检索与自动宽高比。本文梳理网页体验和 API 接入入口、两款模型的计费差异，以及图片输出单价减半的具体含义。
cover: https://images.51allai.com/blog/mai-image-26-foundry-flash-cover_20260905_172042.png
---
> 微软于 9 月 4 日在 Microsoft Foundry 开放 MAI-Image-2.6 和 Flash 版公开预览。两款模型支持文字生图、图片编辑、多图参考和联网检索；Flash 的图片输出价格为每百万 Token 19 美元，是标准版的一半，也可通过 MAI Playground 体验。
![微软 MAI-Image-2.6 与 Flash 图像生成和编辑主题封面](https://images.51allai.com/blog/mai-image-26-foundry-flash-cover_20260905_172042.png)

## 可以从文字生成图片，也能修改已有图片

MAI-Image-2.6 是微软自研的图像生成模型。用户可以用文字描述画面，也可以提交已有图片，要求移除或替换物体、修改属性、局部重绘和更新图中文字。Flash 版提供相同的生成与编辑功能范围。

这次开放的两款模型都支持多图参考：一次创作可以结合不同图片中的人物、产品、风格和场景。对于已经有产品照片、还需要制作不同场景素材的用户，这比只用文字描述多了一种输入方式。

两款模型还提供联网检索和自动宽高比。开启联网检索后，模型可以使用 Bing Search 获取当前信息，作为生成图片时的补充上下文；自动宽高比则让模型根据提示词和参考图选择画面比例。开发者可分别通过 `web_grounding` 和 `auto_aspect_ratio` 控制这两项功能。

## Flash 的图片输出 Token 单价减半

Foundry 的公开起始价格按文字输入、图片输入和图片输出分开计算。Token 是服务用来计量输入、输出内容的单位，图片也会转换成对应的计费量。

| 计费项目 | MAI-Image-2.6 | MAI-Image-2.6-Flash |
| --- | ---: | ---: |
| 文字输入 | 5 美元／百万 Token | 1.75 美元／百万 Token |
| 图片输入 | 8 美元／百万 Token | 2.50 美元／百万 Token |
| 图片输出 | 38 美元／百万 Token | 19 美元／百万 Token |

按这组单价计算，Flash 的文字输入便宜 65%，图片输入便宜 68.75%，图片输出便宜 50%。例如，两款模型各产生 100 万个图片输出 Token，单独这一项费用分别为 38 美元和 19 美元。

**单价减半针对图片输出这一项。** 一次调用的总费用还取决于实际输入和输出用量，不能把每百万 Token 的价格直接当成每张图片的固定价格。

如果正在比较不同生图服务的计费方式，也可以参考[站内对 Nano Banana 2 Lite 的价格与输出规格梳理](/posts/2026/07/google-nano-banana-2-lite/)，对照时应区分每张图片价格和每百万 Token 价格。

## 网页体验与 API 接入分开选择

想直接试用，可进入 [MAI Playground](https://playground.microsoft.ai/) 选择模型。需要把生图和图片编辑接入自己的应用，则通过 [Microsoft Foundry](https://ai.azure.com/) 部署 MAI-Image-2.6 或 MAI-Image-2.6-Flash；两款在 Foundry 中均为公开预览。

接入后，文字生图使用 `/mai/v1/images/generations`，图片编辑使用 `/mai/v1/images/edits`。请求中的 `model` 填写实际部署名称；服务返回 PNG 图片数据。

批量任务还需要考虑调用配额。Foundry 当前的免费层对这两款模型均为每分钟 0 次请求，第 1 层为每分钟 2 次，第 6 层为每分钟 12 次；可用层级取决于订阅和部署配置。评估批量制作素材的成本时，应同时查看单价、每次用量和每分钟可调用次数。
