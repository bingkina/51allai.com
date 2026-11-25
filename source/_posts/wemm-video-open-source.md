---
title: 微信开源 WeMM-Video，可结合画面和原声回答视频问题
permalink: posts/2026/11/wemm-video-open-source/
tags: [tencent, wechat-ai, multimodal, open-source]
date: 2026-11-25 22:50:03
categories: 多模态
description: 腾讯微信视觉团队开源 WeMM-Video。模型可以结合视频画面和原声，用中文或英文回答问题。本文介绍音画问答示例、2B 到 35B-A3B 四个版本的下载入口、Apache 2.0 许可和本地运行方式。
cover: https://images.51allai.com/blog/wemm-video-open-source-cover-v2_20261125_225846.png
sources:
  - name: 腾讯 WeMM-Video 项目页
    url: https://tencent.github.io/WeMM-Video/index.html
    note: 模型规格、视频问答示例和下载入口
  - name: WeMM-Video 技术报告
    url: https://arxiv.org/html/2611.26409v1
    note: 音画处理方式、中英双语和模型架构
  - name: 腾讯 WeMM-Video 代码仓库
    url: https://github.com/Tencent/WeMM-Video/blob/main/README_zh.md
    note: 输入输出类型、部署示例和运行环境
  - name: 腾讯 WeMM-Video 模型集合
    url: https://huggingface.co/collections/tencent/wemm-video
    note: 四个模型版本和各版本的下载格式
  - name: WeMM-Video 2B 发布记录
    url: https://huggingface.co/tencent/WeMM-Video-2B/commits/main
    note: 11 月 20 日上传 2B 模型文件的记录
  - name: WeMM-Video 许可证
    url: https://github.com/Tencent/WeMM-Video/blob/main/LICENSE
    note: Apache 2.0 的适用范围和第三方组件条款
---

> 11 月 20 日，腾讯微信视觉团队开源 WeMM-Video。这个中英双语模型系列可以同时利用视频画面和原声，以文字回答问题，例如指出直播何时确认了一个价格，以及这个价格包含哪些商品。此次开源包含 2B、4B、9B 和 35B-A3B 四个版本。
![微信 WeMM-Video 结合视频画面与原声音轨进行文字问答的示意图](https://images.51allai.com/blog/wemm-video-open-source-cover-v2_20261125_225846.png)

## 视频问答可以用上原声

把一段带货直播回放交给 WeMM-Video，可以问它“什么时候确认了这个价格，包含哪些商品？”模型按时间对齐视频画面和声音，结合主播说的话与镜头中的商品作答。项目页提供[直播带货、电影对白和体育解说的问答样例](https://tencent.github.io/WeMM-Video/index.html#examples)。

![WeMM-Video 的直播视频问答、音画推理、音乐理解与图文问答示例](https://images.51allai.com/blog/wemm-video-open-source-demo_20261125_225851.png)

除了视频，它也接收文字、图片和单独的音频，输出中文或英文文字。Instruct 模式直接作答，Thinking 模式会分步推理，适合需要串联多条线索的问题。

## 四个版本基于 Qwen 3.5 和 3.6

2B、4B 和 9B 采用稠密架构。35B-A3B 采用混合专家架构，按输入选择参与计算的网络。它的语言主干约有 350 亿个参数，每一步生成约有 30 亿个参数参与计算。

| WeMM-Video 版本 | 基础模型 | 模型下载 |
| --- | --- | --- |
| 2B | Qwen3.5-2B | [2B 模型](https://huggingface.co/tencent/WeMM-Video-2B) |
| 4B | Qwen3.5-4B | [4B 模型](https://huggingface.co/tencent/WeMM-Video-4B) |
| 9B | Qwen3.5-9B | [9B 模型](https://huggingface.co/tencent/WeMM-Video-9B) |
| 35B-A3B | Qwen3.6-35B-A3B | [35B-A3B 模型](https://huggingface.co/tencent/WeMM-Video-35BA3B) |

## 用 2B 版运行视频问答示例

开发者可以用 Transformers 加载 2B 版，先跑一段带原声的视频。这个示例需要 Python 3.12、配有兼容 CUDA 12.9 驱动的 NVIDIA 显卡，以及用于处理音视频的 FFmpeg。安装命令和示例脚本见 [WeMM-Video 快速开始](https://github.com/Tencent/WeMM-Video/blob/main/README_zh.md#快速开始)。

四个版本也提供降低模型存储开销的量化文件，可在 [Hugging Face 模型集合](https://huggingface.co/collections/tencent/wemm-video)或 [ModelScope 模型集合](https://modelscope.cn/collections/WeChat-Vision/WeMM-Video)下载。项目源码和这批开源模型采用 Apache 2.0 许可。第三方组件沿用各自的许可条款。
