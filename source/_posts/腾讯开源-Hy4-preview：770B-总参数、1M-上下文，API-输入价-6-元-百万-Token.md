---
title: 腾讯开源 Hy4 preview：770B 总参数、1M 上下文，API 输入价 6 元/百万 Token
permalink: posts/2026/08/tencent-hy4-preview/
tags: [tencent, hunyuan, open-source, model-release, pricing]
date: 2026-08-28 19:54:41
updated: 2026-09-02 14:10:00
categories: 大模型
description: 腾讯开源 Hy4 preview，模型采用 770B 总参数、49B 激活参数的混合专家架构，支持 100 万 Token 上下文。本文梳理 Apache 2.0 许可证、应用与 API 入口，以及输入 6 元、输出 18 元每百万 Token 的调用成本。
cover: https://images.51allai.com/blog/tencent-hy4-preview-cover_20260828_195812.png
sources:
  - name: 腾讯混元 Hy4 preview 官方仓库
    url: https://github.com/Tencent-Hunyuan/Hy4-preview
---

> 腾讯于 2026 年 8 月 28 日开源 Hy4 preview。模型拥有 770B 总参数、49B 激活参数和 100 万 Token 上下文，并已接入腾讯产品、腾讯云 TokenHub 与 OpenRouter；API 输入价格为 6 元/百万 Token。
![腾讯 Hy4 preview 770B 参数与 1M 上下文封面](https://images.51allai.com/blog/tencent-hy4-preview-cover_20260828_195812.png)

## 770B 参数中每次激活 49B

Hy4 preview 是一款混合专家模型（MoE）。它拥有 770B 总参数，处理每个 Token 时激活 49B 参数。MoE 会按输入选择一部分“专家”参与计算，避免每次生成都调用全部参数；49B 激活参数描述的是单步计算量，不等于下载或部署时只需加载 49B 权重。

模型主干共 78 层。第一层使用标准前馈网络，其余 77 层各有 256 个路由专家和 1 个共享专家，每个 Token 会调用其中 8 个路由专家及共享专家。主干外还带有一层 MTP，用于一次预测后续多个 Token，配合推理框架提高生成效率。

上下文长度为 100 万 Token。上下文决定模型一次请求能读取多少文字、代码和历史步骤；容量增加后，开发者可以在同一任务中放入更长的代码仓库、文档集合或多轮操作记录。

## API 输入 6 元，输出 18 元

Hy4 preview 的 API 按每 100 万 Token 计费：普通输入 6 元、输出 18 元，命中缓存的输入为 0.3 元。缓存适合多次请求重复使用相同的系统提示词、文档或代码前缀，可以减少重复输入的费用。

按这个单价计算，一次请求如果输入 10 万 Token、输出 1 万 Token，费用约为 0.78 元；其中输入 0.6 元，输出 0.18 元。实际账单仍取决于每次请求的输入、输出和缓存命中量。

国内开发者可以通过腾讯云 TokenHub 接入，海外入口包括 OpenRouter。OpenRouter 的实时模型目录列出 1,048,576 Token 上下文，并支持工具调用、结构化输出和推理强度参数。

## 应用入口覆盖办公、代码与日常问答

不写代码的用户可以在 WorkBuddy、CodeBuddy、元宝和 ima 中选择 Hy4 preview。WorkBuddy 面向桌面办公任务，CodeBuddy 用于代码开发，元宝和 ima 提供日常问答与知识处理入口。发布日起，WorkBuddy 与 CodeBuddy 提供两周免费体验。

需要把模型接入软件的开发者可以使用 TokenHub 或 OpenRouter API。需要在自有环境运行的团队，可以从 Hugging Face、ModelScope、GitCode 或 CNB 下载 Hy4 preview 与 FP8 版本，并通过 vLLM 或 SGLang 部署。模型采用 Apache 2.0 许可证。

## Preview 版本适合先按任务试用

Hy4 preview 默认使用高推理强度，适合数学、代码和复杂推理任务。需要直接回答时，自建服务可以通过 `reasoning_effort` 关闭深度思考，以缩短不必要的推理过程。

模型说明列出的已知问题包括：处理复杂任务时可能思考过久，也可能反复检查自己的结果。普通用户可以先在腾讯产品中比较实际体验；开发者则可通过 API 记录延迟、Token 用量和任务成功率，再决定是否用于稳定业务。
