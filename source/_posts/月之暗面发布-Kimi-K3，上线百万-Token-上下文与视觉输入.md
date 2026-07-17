---
title: 月之暗面发布 Kimi K3，上线百万 Token 上下文与视觉输入
permalink: posts/2026/07/kimi-k3-million-context/
tags: [moonshot, kimi, model-release, pricing, multimodal]
date: 2026-07-17 08:08:59
categories: 大模型
description: 月之暗面发布 Kimi K3，模型总参数达 2.8 万亿，支持 100 万 Token 上下文和原生视觉输入。本文梳理网页端、Kimi Work、Kimi Code 与 API 的使用入口、每百万 Token 价格、开发者接入方法和已确认限制，帮助普通用户选择使用方式，也让开发者核对缓存计费、长对话和视觉输入的传参要求。
cover: https://images.51allai.com/blog/kimi-k3-million-context-cover_20260717_081320.png
---
> 月之暗面发布 Kimi K3，模型总参数为 2.8 万亿，支持 100 万 Token 上下文和图像、视频输入。产品已接入 Kimi 网页端、Kimi Work、Kimi Code 与 API，开发者可用 `kimi-k3` 模型名调用。
![Kimi K3 百万 Token 上下文与视觉输入](https://images.51allai.com/blog/kimi-k3-million-context-cover_20260717_081320.png)

## Kimi K3 已进入网页端、桌面端和 API

普通用户可以在 Kimi 网页端使用 Kimi K3，也可以通过 iOS、Android 和 HarmonyOS 版 Kimi App 访问。需要处理本地文件和知识工作的用户，可在 Kimi Work 3.1.0 或更高版本中选择 K3；桌面客户端支持 Windows 和 Apple 芯片 Mac。

开发者有两条入口。终端用户可以打开 Kimi Code，通过 `/model` 命令切换到 Kimi K3；应用开发者可以在 Kimi API 中调用 `kimi-k3`。网页问答、桌面知识工作、终端编码和程序接口因此使用同一代模型。

## 2.8 万亿参数配合 100 万 Token 上下文

Kimi K3 的模型总参数为 2.8 万亿，上下文窗口为 100 万 Token。Token 是模型处理文字、代码等内容时使用的基本单位；窗口越大，一次请求中能放入的文档、代码和对话历史越多。对用户来说，这项规格适合长文档分析、大型代码仓库和需要保留大量中间材料的任务。

模型可以接收文字、图像和视频，并输出文字。图像理解适合读取截图、图表和文档页面；视频文件可以通过 API 文件接口提交。它不是图像或视频生成模型，视觉能力用于理解输入内容并完成后续分析、编码或知识工作。

架构采用 Kimi Delta Attention（KDA）和 Attention Residuals（AttnRes）。KDA 是面向长上下文的混合线性注意力机制，AttnRes 用于在模型不同深度之间选择需要保留的信息。模型同时采用混合专家架构，每次计算从 896 个专家模块中调用 16 个，不会让全部参数同时参与每个 Token 的处理。

## API 按输入是否命中缓存分别计价

Kimi K3 API 按每 100 万 Token 计费：命中缓存的输入为 0.30 美元，未命中缓存的输入为 3 美元，输出为 15 美元。上下文缓存会自动工作，不需要单独创建缓存 ID；连续请求保持相同的长前缀，更容易复用已有缓存。

接口兼容 OpenAI SDK。开发者把 `base_url` 设置为 `https://api.moonshot.ai/v1`，再把模型名设为 `kimi-k3` 即可调用：

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_MOONSHOT_API_KEY",
    base_url="https://api.moonshot.ai/v1",
)

response = client.chat.completions.create(
    model="kimi-k3",
    messages=[{"role": "user", "content": "分析这份材料的重点"}],
)
```

## 长对话和视觉输入需要按 K3 规则传参

Kimi K3 始终开启思考模式，首发版本的 `reasoning_effort` 仅接受 `max`。流式输出会把思考内容放在 `reasoning_content`，最终回答放在 `content`。多轮对话或工具调用时，需要把模型返回的完整 assistant 消息原样加入下一次请求，不能只保留最终回答。

长会话中途从其他模型切换到 K3，可能破坏它需要的思考历史。更稳妥的做法是用 K3 新建会话，并在后续轮次保留完整消息。视觉输入也有明确格式：图片需使用 Base64 数据或 Kimi 文件 ID，API 不接受公开图片 URL；视频要先上传为文件，再把文件 ID 放入消息。
