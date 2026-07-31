---
title: DeepSeek-V4-Flash 正式版 API 上线公测，原生接入 Codex
permalink: posts/2026/07/deepseek-v4-flash-0731-codex/
tags:
  - deepseek
  - deepseek-v4
  - product-update
  - coding-agent
date: 2026-07-31 14:46:31
categories:
  - 智能体
description: DeepSeek-V4-Flash 正式版 API 上线公测，版本更新为 0731，原生支持 Responses API 并可直接接入 Codex。本文梳理模型更新范围、百万 Token 上下文、最大输出长度、调用价格和接入方法，并说明图片、文件、会话状态及部分内置工具在当前接口中的使用限制，帮助开发者判断现有项目是否需要调整。
cover: https://images.51allai.com/blog/deepseek-v4-flash-0731-codex-cover_20260731_145348.png
---
> DeepSeek-V4-Flash 正式版 API 于 7 月 31 日上线公测，版本更新为 DeepSeek-V4-Flash-0731。模型结构和尺寸保持不变，主要变化来自重新后训练，并新增原生 Responses API 与 Codex 接入能力；本次更新只作用于 Flash API。
![DeepSeek-V4-Flash 0731 正式版 API 与 Codex 接入封面](https://images.51allai.com/blog/deepseek-v4-flash-0731-codex-cover_20260731_145348.png)

## 这次更新只更换 Flash API 模型版本

调用 `deepseek-v4-flash` 的开发者现在使用的是 DeepSeek-V4-Flash-0731。它仍是 2840 亿总参数、单次激活 130 亿参数的混合专家模型，支持 100 万 Token 上下文。Token 是模型处理文本时使用的计量单位，100 万 Token 适合容纳大型代码仓库、长文档或多轮任务记录。

0731 版本没有更换模型结构，也没有扩大模型尺寸。更新集中在后训练阶段，即在基础训练完成后继续用指令、反馈和任务数据调整模型的行为。对使用者来说，这次改动的重点不是上下文窗口或参数量增加，而是 API 端的编程智能体适配。

本次升级不涉及 DeepSeek-V4-Pro API，也不涉及 DeepSeek APP 和网页端当前使用的模型。已经在这些入口使用 DeepSeek 的普通用户，不会因为这次 Flash API 更新自动切换到 0731 版本。

## Responses API 让 Codex 可以直接连接 DeepSeek

DeepSeek-V4-Flash-0731 原生支持 Responses API。这个接口把文本输出、推理过程、函数调用、工具调用和流式事件放在同一套响应结构中，Codex 可以通过它与模型交互。开发者不再需要先把 Responses 请求转成 Chat Completions 请求，再转发给 DeepSeek。

DeepSeek 为 Codex CLI、ChatGPT 桌面端和 VS Code 的 Codex 插件提供了共用配置方案。这些客户端读取同一个 Codex 配置目录，配置模型提供方后即可选择 `deepseek-v4-flash`。当前能通过这条原生路径接入 Codex 的 DeepSeek 模型只有 V4-Flash。

Responses API 目前支持函数工具、服务端网页搜索，以及 Codex 使用的 `apply_patch` 自定义工具。它不接受图片和文件输入；`file_search`、`code_interpreter`、`computer_use` 和 MCP 等内置工具也不在当前支持范围内。接口采用无状态方式，不支持通过 `previous_response_id` 或 `conversation` 保存服务端对话状态，应用需要自行带上后续请求所需的上下文。

## API 调用方式没有更换域名

Responses API 继续使用 `https://api.deepseek.com`。安装 OpenAI Python SDK 后，可以把 DeepSeek API Key、接口地址和模型名传给客户端：

```python
from openai import OpenAI

client = OpenAI(
    api_key="<your DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.responses.create(
    model="deepseek-v4-flash",
    instructions="You are a helpful assistant.",
    input="检查这个项目中的测试失败原因。",
)

print(response.output_text)
```

需要逐步显示输出时，可以把 `stream` 设为 `True`。流式响应通过一组带类型的 SSE 事件返回，正常完成时以 `response.completed` 结束，不使用 `data: [DONE]` 作为结束标记。迁移自其他 Responses API 服务的应用，需要检查自身是否依赖 DeepSeek 尚未支持的参数或工具。

## 上下文、输出长度和价格保持现有档位

DeepSeek-V4-Flash-0731 支持思考与非思考两种模式，默认开启思考模式。上下文长度为 100 万 Token，单次最大输出长度为 38.4 万 Token，并继续支持 JSON 输出、工具调用、Anthropic API、对话前缀续写和非思考模式下的 FIM 补全。FIM 是根据光标前后内容补全中间代码的方式，常用于代码编辑器。

当前人民币价格按每 100 万 Token 计算：缓存命中的输入为 0.02 元，未命中的输入为 1 元，输出为 2 元。缓存会复用请求开头已经处理过的相同内容，因此重复携带大型代码库说明、规则或长文档时，命中缓存可以减少输入费用。

开发者迁移时需要同时核对模型名和客户端能力。新项目可以直接使用 `deepseek-v4-flash` 与 Responses API；现有 Chat Completions 或 Anthropic API 项目仍可继续使用原有协议，只需确认调用的模型版本和思考模式符合预期。
