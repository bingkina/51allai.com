---
title: 小红书开放 dots3-note preview 权重，支持 512K 上下文与多模态输入
permalink: posts/2026/08/xiaohongshu-dots3-note-preview/
tags: [xiaohongshu, dots3-note, open-source, model-release, multimodal]
date: 2026-08-14 11:35:56
categories: 大模型
description: 小红书开放 dots3-note preview 模型权重与建模代码，采用 Apache 2.0 许可证。本文梳理 2800 亿总参数、160 亿激活参数、512K Token 上下文、文本图片视频音频输入范围，以及开发者通过 Hugging Face、ModelScope 和 8 卡节点部署 FP8 版本的实际路径，帮助开发者判断适用的多模态任务并看清本地运行所需的算力与框架条件。
cover: https://images.51allai.com/blog/xiaohongshu-dots3-note-preview-cover_20260814_115327.png
---

> 小红书 dots studio 已开放 dots3-note preview 模型权重与建模代码，采用 Apache 2.0 许可证。模型总参数为 2800 亿，单次推理激活 160 亿参数，支持最长 512K Token 上下文，可接收文本、图片、视频和音频并输出文本。本文重点说明公开范围、模型结构、输入输出方式与本地部署门槛。
![小红书 dots3-note preview 开放权重多模态模型封面](https://images.51allai.com/blog/xiaohongshu-dots3-note-preview-cover_20260814_115327.png)

## 开放的是 dots3 系列首个公开权重模型

dots3-note preview 是 dots3 系列首个开放权重模型。公开内容包括模型权重和建模代码，许可证为 Apache 2.0。开发者可以从 Hugging Face 或 ModelScope 获取 BF16 原始精度版本，也可以选择 FP8 版本；FP8 用更低的数值精度保存和计算模型参数，主要用于减少显存占用并提高部署效率。

项目与模型权重地址：

- GitHub：[https://github.com/studio-dots-ai/dots3-note-prev](https://github.com/studio-dots-ai/dots3-note-prev)
- Hugging Face：[https://huggingface.co/dots-studio/dots3-note-prev](https://huggingface.co/dots-studio/dots3-note-prev)

这次开放的准确名称是 dots3-note preview。模型页同时提供配置文件、分词器、聊天模板和分片权重，代码仓库则给出 Transformers、SGLang 与 vLLM 的运行方式。它不是只公开论文或在线演示，开发者拿到权重后可以在自己的计算环境中部署服务。

## 2800 亿参数中每次激活 160 亿

dots3-note preview 采用混合专家架构，英文简称 MoE。可以把它理解为模型内部有多组处理不同信息的“专家”，每次生成内容时只调用其中一部分，而不是让全部参数同时参与计算。

模型总参数为 2800 亿，处理一个 Token 时激活 160 亿参数。主体包含 1 个稠密层和 45 个 MoE 层，共有 256 个路由专家与 1 个共享专家，每次选择 8 个路由专家参与计算。视觉编码器本身也是 MoE 架构，总参数 70 亿、激活参数 12 亿；音频编码器为 8 亿参数的稠密模型。

这些数字说明了模型的结构和运行方式，不等同于普通电脑可以轻松加载。官方部署文档优先推荐在单个 8 卡 GPU 节点上运行 FP8 权重，BF16 版本需要更多显存。面向 vLLM 的示例使用 8 张 NVIDIA H100，并把最大上下文设置为 262144 Token；SGLang 示例则给出了 524288 Token 的配置。实际可用长度需要在显存、并发量和输入类型之间调整。

## 一次请求可以混合文字、图片、视频和音频

模型支持文字、图片、视频和音频输入，输出形式为文字。开发者可以让它阅读图片或图表、处理带声音的视频、转写音频，再用文字返回结果。视频文件包含音轨时，模型也会处理其中的声音。

512K Token 是模型支持的最长上下文容量。Token 是模型切分文字后的基本单位，不能简单等同于汉字数。较长的上下文适合放入更多文档、对话记录或任务过程，但部署时能否使用完整 512K，仍取决于服务器显存和同时处理的请求数量。

聊天模板提供推理模式开关。开发者可以设置 `enable_thinking=True` 让模型输出前执行推理，也可以关闭该开关直接返回结果。自托管服务还可以启用兼容 OpenAI API 的工具调用格式，现有应用可通过常见的对话接口向本地模型发送请求。

## 开发者可以怎样部署

官方推荐的主路径是部署 FP8 权重，再通过 SGLang 或 vLLM 提供多 GPU 推理服务。服务启动后会暴露一个兼容 OpenAI 对话接口的本地地址，应用可以使用 OpenAI Python 客户端连接，不需要改写整套请求逻辑。

vLLM 的主分支已经加入 dots3-note preview 支持，官方示例建议在相关功能进入稳定版本前使用较新的 nightly build。Transformers 与 SGLang 的接入文档提供了指定代码版本和容器镜像，音频与视频处理还需要匹配 PyTorch 的 `torchcodec` 和系统中的 FFmpeg。

对普通用户而言，这次开放最直接的价值是模型权重和部署代码已经可以下载、检查与二次开发。按官方推荐的 8 卡方案，它更适合有多 GPU 服务器的开发团队、研究机构和云端推理平台，而不是在普通笔记本上直接运行的小模型。
