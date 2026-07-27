---
title: 月之暗面开放 Kimi K3 模型权重，同步发布技术报告
permalink: posts/2026/07/kimi-k3-open-weights/
tags: [moonshot, kimi, model-release, open-source, multimodal]
date: 2026-07-28 00:21:28
categories: 大模型
description: 月之暗面开放 Kimi K3 完整模型权重并发布技术报告。2.8 万亿参数模型采用 MoE 架构，支持约 100 万 Token 上下文和原生图像理解；本文说明 Hugging Face 下载体量、部署方式，以及 Kimi K3 License 对商业服务和大型产品的使用条件，帮助开发者判断自托管资源与合规边界。
cover: https://images.51allai.com/blog/kimi-k3-open-weights-cover_20260728_002550.png
---
> 月之暗面开放 Kimi K3 完整模型权重并发布技术报告。模型共 2.8 万亿参数，每次计算激活 1040 亿参数，支持约 100 万 Token 上下文和原生图像理解；权重已在 Hugging Face 提供下载。
![Kimi K3 模型权重与技术报告封面](https://images.51allai.com/blog/kimi-k3-open-weights-cover_20260728_002550.png)

## Kimi K3 完整权重已开放下载

Kimi K3 的模型权重已经放到 Hugging Face，下载页面无需申请访问权限。仓库包含 96 个 Safetensors 权重分片，全部文件占用约 1.56 TB。Safetensors 是大模型常用的权重文件格式，可以在加载前读取文件结构，也避免执行文件中夹带的代码。

这次开放的是完整 Kimi K3 权重，不是缩小版模型。模型总参数为 2.8 万亿，实际处理每个 Token 时激活 1040 亿参数。它采用 MoE，也就是“混合专家”架构：模型共有 896 个专家模块，每个 Token 选择其中 16 个参与计算。这样可以扩大模型容量，同时避免每次推理都调用全部参数。

模型支持约 100 万 Token 的上下文窗口，并带有原生图像理解能力。上下文窗口决定一次请求能够容纳多少文字、代码、图片信息和对话历史。模型卡列出的输入模态为文字和图像，输出为文字。

## 技术报告公开模型结构

随权重一起发布的技术报告解释了 Kimi K3 的主要结构。模型由 93 层组成，注意力部分包括 69 层 Kimi Delta Attention（KDA）和 24 层 Gated MLA，并使用 Attention Residuals（AttnRes）在不同深度之间选择和组合信息。

权重采用 MXFP4 格式，激活值采用 MXFP8 格式。这里的 4 位和 8 位表示模型计算时保存数字所用的精度。更低精度可以减少存储和计算开销，但 Kimi K3 的整体体量仍然很大，下载完整仓库就需要约 1.56 TB 空间。

开放范围还包括高性能注意力内核、MoE 通信库，以及用于规模化运行智能体环境的基础设施。开发者可以结合技术报告了解模型训练与推理结构，而不只是在网页或 API 中调用成品模型。

## 开发者可以下载部署或调用 API

模型仓库包含 Transformers 所需的配置、分词器、图像处理器和模型代码。推理部署可使用 vLLM、SGLang 或 TokenSpeed；对应项目已经提供 Kimi K3 的运行说明。开发者也可以在 Kimi API 中选择 `kimi-k3`，通过兼容 OpenAI 或 Anthropic 的接口调用，无需自行下载完整权重。

Kimi K3 始终开启思考模式。多轮对话和工具调用需要把上一轮返回的完整 assistant 消息继续传入，包括 `reasoning_content` 和 `tool_calls`。如果只保留最终回答，模型会丢失用于延续任务的思考历史。终端用户也可以在 Kimi Code 中通过 `/model` 选择 Kimi K3。

## 开放权重使用 Kimi K3 License

模型代码和权重使用专门的 Kimi K3 License，不是 Apache-2.0 或 MIT。许可证允许使用、复制、修改、分发、再授权、销售、部署和微调模型，也允许制作衍生作品，但使用者需要保留版权与许可声明，并遵守适用法律。

许可证对商业服务设有额外条件。如果企业以 API 等形式向第三方提供模型推理或微调服务，企业及其关联方连续 12 个月合计收入超过 2000 万美元，需要先与月之暗面签订单独协议，才能将 Kimi K3 或其衍生作品用于商业用途。

如果使用 Kimi K3 的商业产品月活跃用户超过 1 亿，或月收入超过 2000 万美元，产品界面需要显著展示“Kimi K3”。内部使用，以及通过月之暗面官方产品或认证推理合作伙伴使用模型，不适用这两项额外要求。准备将模型用于商业服务的团队，应先按自己的业务模式核对完整许可证文本。

* 模型权重：https://huggingface.co/moonshotai/Kimi-K3
* 技术报告：https://github.com/MoonshotAI/Kimi-K3/blob/main/k3_tech_report.pdf