---
title: DeepSeek V4 Pro 更新至 0813，API 原生接入 Codex
permalink: posts/2026/08/deepseek-v4-pro-0813-codex/
tags:
  - deepseek
  - deepseek-v4
  - product-update
  - coding-agent
date: 2026-08-13 09:59:17
categories:
  - 智能体
description: DeepSeek V4 Pro API 已更新至 0813 版本，调用模型名保持不变。本文梳理百万 Token 上下文、38.4 万 Token 最大输出、Responses API、Codex 接入方式与当前计费，并对比 V4 Flash 的价格与并发差异，为复杂智能体任务、长代码库分析和高频调用提供模型选型与部署决策依据。
cover: https://images.51allai.com/blog/deepseek-v4-pro-0813-codex-cover_20260813_100516.png
---
> DeepSeek V4 Pro API 对应的模型版本已更新为 DeepSeek-V4-Pro-0813，现有项目继续使用 `deepseek-v4-pro` 即可调用。该版本支持 100 万 Token 上下文、38.4 万 Token 最大输出、Responses API 和 Codex 接入。
![DeepSeek V4 Pro 0813 API 与 Codex 接入封面](https://images.51allai.com/blog/deepseek-v4-pro-0813-codex-cover_20260813_100516.png)

## API 模型版本已切换到 0813

`deepseek-v4-pro` 现在对应 `DeepSeek-V4-Pro-0813`。调用时使用的模型名没有变，OpenAI 格式的接口地址仍是 `https://api.deepseek.com`。已经接入 V4 Pro API 的项目不需要为 0813 新建一个模型名，也不需要更换基础地址。

模型提供思考和非思考两种模式，默认使用思考模式。思考模式会在回答前进行更多推理，适合复杂代码修改、长步骤工具调用和多约束任务；日常问答或对延迟更敏感的任务可以选择非思考模式。

## 上下文和输出规格保持百万 Token 档位

DeepSeek-V4-Pro-0813 的上下文长度为 1M，也就是 100 万 Token；单次最大输出长度为 384K，即 38.4 万 Token。Token 是模型计算文本长度和费用的基本单位，一个汉字、英文片段、数字或标点都可能占用 Token。

这一容量可以让开发者在同一次请求中放入更多代码文件、长文档和任务记录。对编程智能体来说，较长输出也能容纳更多工具调用步骤、修改说明和代码结果。实际可放入的文字量会受内容语言、格式和分词结果影响，不能把 100 万 Token 直接换算成固定字数。

除普通文本生成外，0813 版本支持 JSON Output、Tool Calls、Responses API 和 Anthropic API。对话前缀续写处于 Beta 阶段；FIM 补全也处于 Beta 阶段，并且只能在非思考模式中使用。FIM 是根据光标前后的内容补全中间代码，常用于代码编辑器。

## Responses API 让 Codex 直接调用 DeepSeek

Codex 通过 Responses API 与模型交互，DeepSeek API 已原生支持这套格式。Codex CLI、ChatGPT 桌面端和 VS Code 的 Codex 插件共用 `~/.codex` 中的配置。完成一次模型目录与提供方配置后，三种客户端都可选择 `deepseek-v4-pro`。

DeepSeek 提供的配置脚本会先备份现有 `config.toml`，再写入包含 V4 Pro 与 V4 Flash 的模型目录，并在配置中新增 DeepSeek 模型提供方。现有的 MCP 服务器和项目信任配置会保留。配置时需要自己的 DeepSeek API Key，使用量从 DeepSeek 开放平台账户扣费，不使用 ChatGPT 订阅额度。

## 现有项目可以保持模型名不变

已经通过 OpenAI 兼容接口调用 V4 Pro 的应用，可以继续使用原来的模型参数：

```python
from openai import OpenAI

client = OpenAI(
    api_key="<your DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.responses.create(
    model="deepseek-v4-pro",
    input="检查这个项目中的测试失败原因。",
)

print(response.output_text)
```

当前价格按每 100 万 Token 计算：缓存命中的输入为 0.025 元，缓存未命中的输入为 3 元，输出为 6 元。账号级并发上限为 500；一个请求从发出到模型完成响应之前，都会占用一个并发位。

同一定价页中，V4 Flash 的缓存未命中输入和输出分别为 1 元与 2 元，并发上限为 2500。需要较高并发、成本更敏感的任务可以继续使用 Flash；需要复杂推理和长步骤执行的任务可以分开调用 Pro。定价页同时提醒 DeepSeek API 服务计划近期整体调价，长期运行的项目应按实际 Token 用量保存当前成本基线。
