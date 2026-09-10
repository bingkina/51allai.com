---
title: Google 推出 Pics，Docs 与 Slides 可直接修图
permalink: posts/2026/09/google-pics-workspace-image-editor/
tags: [google, gemini, nano-banana, image-generation, product-update]
sources:
  - name: Google Blog — Try Google Pics
    url: https://blog.google/products-and-platforms/products/workspace/google-pics/
    note: 产品定位、Nano Banana、主要功能、独立入口与 Workspace 集成
  - name: Google Workspace Updates — Google Pics generally available
    url: https://workspaceupdates.googleblog.com/2026/09/google-pics-brings-pro-level-ai-image-creation-and-editing-to-Google-Workspace.html
    note: 上线日期、开放节奏、适用套餐、功能范围与额度说明
  - name: Google Docs Editors Help — Get started with Google Pics
    url: https://support.google.com/docs/answer/17170048
    note: 桌面端要求、浏览器、文件格式、生成与导入方式
  - name: Google Docs Editors Help — Edit images with Google Pics
    url: https://support.google.com/docs/answer/17170454
    note: 局部编辑、文字编辑、批量修改与画幅调整步骤
  - name: Google Docs Editors Help — Google Pics availability
    url: https://support.google.com/docs/answer/17256710
    note: 账户类型、语言、地区与生成式功能额度限制
  - name: Google Docs Editors Help — Download, print, or share Pics images
    url: https://support.google.com/docs/answer/17170934
    note: JPEG 下载规格、协作分享与高分辨率额度消耗
date: 2026-09-10 11:11:32
categories: 多模态
description: Google 推出 AI 图像创作与编辑工具 Pics，用户可在独立网页、Docs 和 Slides 中生成或修改图片。本文梳理局部编辑、图中文字处理、2K/4K 导出、开放套餐与桌面端限制。
cover: https://images.51allai.com/blog/google-pics-workspace-image-editor-cover-v2_20260910_111903.png
---
> Google 于 2026 年 9 月 1 日正式推出 AI 图像创作与编辑工具 Pics。符合条件的个人与 Workspace 用户可从独立网页进入，也能在 Docs 和 Slides 中直接修改图片；工具支持对象级局部编辑、图中文字修改、多人协作及 2K、4K JPEG 导出。
![Google Pics 接入 Docs 与 Slides 的 AI 图像编辑工具](https://images.51allai.com/blog/google-pics-workspace-image-editor-cover-v2_20260910_111903.png)

## Pics 把生成和局部编辑放进同一画布

[Google Pics](https://pics.new/) 是 Google Workspace 的独立图像创作与编辑工具，底层使用 Gemini 的 Nano Banana 图像模型。用户可以输入文字生成新图，也可以从电脑、Google Drive 或 Google Photos 导入已有图片继续修改。电脑与 Drive 支持上传 JPG、PNG、BMP 和 TIFF 文件。

Pics 会为同一条提示词提供多个生成结果。已有图片还能作为元素或风格参考，例如沿用一张图片的配色。站内此前介绍过 [Nano Banana 2 的图像生成与编辑能力](/posts/2026/02/google-nano-banana-2/)；Pics 将这类模型能力封装成面向普通用户和团队的可视化编辑器。

## 对象、选区和文字可以分开修改

编辑图片时，用户可以把提示词作用于整张图，也可以点选具体对象，或拖动框选一个区域后再描述修改要求。一次操作最多可以加入五处对象、选区或文字修改，确认后统一应用。

Pics 会识别图片里的文字。用户可以直接替换文字内容，也能要求改变字重、斜体等样式。裁剪工具提供旋转和画幅调整，内置选项包括 16:9、1:1 和 4:3。

这种操作方式适合修改海报、社交媒体图片和演示插图：需要换一个对象时，不必重新生成整张图；需要制作不同语言版本时，可以直接处理图中文字和版式。

## Docs 与 Slides 可以直接打开 Pics 编辑器

在 Google Docs 或 Slides 中选中图片后，用户可以打开 Pics 编辑器，完成修改后用新结果替换文档或幻灯片里的原图。编辑器运行在当前应用内，不需要先把图片下载到本地再上传。

Pics 文件沿用 Workspace 的协作方式，可以邀请其他人以查看者或编辑者身份加入，也可以通过链接分享。用户还能在 Drive 中创建或打开 Pics 文件；Google 已安排继续扩展从 Drive 直接打开普通图片并编辑的入口。

## 个人与企业账户需要符合指定套餐

个人账户需要订阅 Google AI Pro 或 Ultra。企业账户支持 Business Standard、Business Plus、Enterprise Standard 和 Enterprise Plus；教育账户支持 Google AI Pro for Education，AI Expanded Access 附加方案也在开放范围内。组织管理员可以按网域、组织部门或群组关闭 Pics。

功能采用分批开放：快速发布网域从 9 月 1 日开始，最长需要 15 天；计划发布网域从 9 月 15 日开始，最长也需要 15 天。Pics 支持中文生成和编辑，适用范围覆盖支持 Google Workspace 的国家和地区；德国的个人账户不在开放范围内。

## 目前只支持桌面端，4K 下载消耗更多额度

Pics 目前只在桌面端使用。Google 列出的浏览器范围是最新版和前一个版本的 Chrome、Firefox，以及 Windows 上的 Microsoft Edge；其他浏览器可能无法使用全部功能。

完成图片后，可以下载原始尺寸、2K JPEG 或 4K JPEG，也可以打印或与协作者共享。下载较高分辨率会更快消耗推广期额度。生成式 AI 功能受使用上限约束，Google 为用户提供的较高访问额度至少持续到 2027 年 2 月 28 日；从 Docs 或 Slides 调用 Pics 时，仍沿用这些应用现有的 Nano Banana 图像生成额度。
