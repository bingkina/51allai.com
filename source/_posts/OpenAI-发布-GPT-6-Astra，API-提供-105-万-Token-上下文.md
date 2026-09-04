---
title: OpenAI 发布 GPT-6 Astra，API 提供 105 万 Token 上下文
permalink: posts/2026/09/openai-gpt-6-astra/
tags:
  - openai
  - astra
  - model-release
  - ai-agents
  - pricing
sources:
  - name: GPT-6 Astra Model | OpenAI API
    url: https://developers.openai.com/api/docs/models/gpt-6-astra
    note: 模型 ID、上下文窗口、输出上限、模态、工具支持与 API 价格
  - name: Model guidance | OpenAI API
    url: https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra
    note: Responses API 接入、推理档位、异步工具调用与中途调整
  - name: "GPT-6 Astra: A new generation of intelligence"
    url: https://openai.com/index/gpt-6-astra/
    note: 发布日期、电脑操作范围、分阶段开放与生产安全限制
  - name: GPT-6 Astra System Card
    url: https://deploymentsafety.openai.com/gpt-6-astra/vision
    note: Critical 网络安全能力分级、监控与防护措施
  - name: OpenAI launches new Astra model amid growing scrutiny over agents' safety
    url: https://www.investing.com/news/economy-news/openai-launches-new-astra-model-amid-growing-scrutiny-over-agents-safety-4888385
    note: Reuters 对发布时间、模型定位与安全争议的独立报道
date: 2026-09-04 09:34:46
categories:
  - 大模型
description: OpenAI 发布 GPT-6 Astra，API 模型提供 105 万 Token 上下文和 12.8 万 Token 最大输出，并支持电脑操作与多步工具任务。本文梳理接入方式、API 价格、长上下文附加费和安全限制。
cover: https://images.51allai.com/blog/openai-gpt-6-astra-cover_20260904_094313.png
---

> OpenAI 于 2026 年 9 月 3 日发布 GPT-6 Astra。API 模型 `gpt-6-astra` 提供 105 万 Token 上下文、12.8 万 Token 最大输出，支持图像输入、电脑操作和多种工具；标准价格为每百万 Token 输入 10 美元、输出 50 美元。
![OpenAI GPT-6 Astra 电脑操作与百万 Token 上下文](https://images.51allai.com/blog/openai-gpt-6-astra-cover_20260904_094313.png)

## GPT-6 Astra 从回答问题走向完成整段工作

GPT-6 Astra 面向需要连续执行多个步骤的任务。它可以在浏览器、代码和专业软件之间切换，处理表单、客户记录、科研数据、网站搭建和前端检查等工作。电脑操作指模型读取屏幕内容，再通过鼠标、键盘或浏览器完成实际操作。

## API 提供 105 万 Token 上下文

`gpt-6-astra` 的上下文窗口为 1,050,000 Token，最大输出为 128,000 Token。上下文窗口是一次请求中模型能同时处理的输入、历史和生成内容总量。这个容量适合完整代码库、多份长文档和持续工作流，但不等于每次请求都需要把窗口填满。

模型支持文本和图像输入，输出文本；不直接接收音频或视频。在 Responses API 中，它可以调用网页搜索、文件搜索、代码解释器、托管 Shell、电脑操作、MCP 和 Skills 等工具。`reasoning.effort` 可选 `low`、`medium`、`high`、`xhigh` 或 `max`，不支持 `none`。

## 标准 API 输入每百万 Token 10 美元

| 计费项 | 每百万 Token 价格 |
| --- | ---: |
| 输入 | 10 美元 |
| 缓存输入 | 1 美元 |
| 缓存写入 | 12.5 美元 |
| 输出 | 50 美元 |

按标准费率计算，一次请求如果使用 10 万输入 Token，并生成 1 万输出 Token，文本 Token 费用约为 1.5 美元，不包含搜索或电脑操作等工具调用费。当单次提示超过 272,000 个输入 Token 时，整个请求的输入与缓存费率按 2 倍计算，输出费率按 1.5 倍计算。

这条长上下文附加费会直接影响代码库分析和多文档处理的成本。开发者可以先删除无关文件、复用缓存前缀，再决定是否让单次请求跨过 272K 门槛。

## 开发者通过 Responses API 接入

接入时把模型名设为 `gpt-6-astra`。多步工具任务建议使用 Responses API；它支持异步工具调用，也允许用户在任务执行中追加要求。

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="读取项目文档，列出迁移风险和验证步骤。",
    reasoning={"effort": "high"},
)

print(response.output_text)
```

此次采用分阶段开放。首批用户来自获批的企业与网络安全项目，API 和付费产品的访问权限随后逐步增加。开发者在正式迁移前，应先确认账户的模型列表中已经出现 `gpt-6-astra`。

## 网络安全能力带来更严的访问限制

GPT-6 Astra 是第一个在 OpenAI Preparedness Framework 中达到 Critical 网络安全能力等级的模型。Critical 是 OpenAI 对高风险前沿能力的内部分级：在获得合适工具和权限时，模型可以在更少人工指导下完成漏洞发现与利用链构建。

普通生产版会拒绝生成高级漏洞利用概念验证，更深的防御性安全能力通过受限计划开放。产品还会监控工具使用过程；当系统判定操作超出授权边界时，ChatGPT 或 Codex 可能要求用户复核，API 任务则会停止。
