---
title: OpenAI 放开 Codex 模型供应商，本地工作流可接第三方模型
permalink: posts/2026/06/codex-third-party-model-providers/
tags:
  - openai
  - codex
  - product-update
  - agent-framework
  - model-providers
date: 2026-06-18 09:54:36
categories:
  - 智能体
description: OpenAI Codex 已支持配置自定义模型供应商，本地 CLI、IDE 扩展和应用可指向 Responses 或 Chat Completions 兼容上游，但云端任务和 Chat Completions 兼容仍有明确边界。
cover: https://images.51allai.com/blog/截图2026-06-17_23.46.12@2x_20260618_095706.png
---

> OpenAI Codex 的模型供应商边界变了：本地工作流可以指向支持 Responses 或 Chat Completions 的模型与供应商。真正需要看清的是限制条件：Chat Completions 兼容已进入弃用路径，云端任务暂时不能改默认模型。
![OpenAI Codex 模型供应商配置界面](https://images.51allai.com/blog/截图2026-06-17_23.46.12@2x_20260618_095706.png)

## Codex 不再只绑定默认 OpenAI 路径

Codex 现在把模型选择拆成两层：`model` 决定调用哪个模型，`model_provider` 决定请求发往哪个供应商。默认仍是 OpenAI，但本地配置里可以新增供应商，写入 base URL、认证环境变量、请求头，以及线缆协议。

这对开发者的实际影响很直接。过去 Codex 更像一个围绕 OpenAI 自家模型设计的编码代理；现在，本地 Codex CLI、IDE 扩展和桌面应用可以接入代理、路由器、数据驻留项目、Azure 兼容端点，甚至本地开源模型供应商。配置入口不在项目仓库的 `.codex/config.toml`，而在用户级 `~/.codex/config.toml`。这是一个安全边界：仓库不能悄悄改你的模型供应商和凭据路径。

一个最小配置大致长这样：

```toml
model = "gpt-5.4"
model_provider = "proxy"

[model_providers.proxy]
name = "OpenAI using LLM proxy"
base_url = "http://proxy.example.com"
env_key = "OPENAI_API_KEY"
```

如果只是把内置 OpenAI provider 指向代理或数据驻留域名，可以直接设置 `openai_base_url`，不必新建 provider。这个细节避免了很多无意义的供应商拆分。

## 支持第三方模型，不等于任意模型都好用

Codex 文档给出的口径是：可以指向支持 Responses API 或 Chat Completions API 的模型与供应商。这里的关键词不是“第三方”，而是“协议兼容”。

Responses API 更贴近 Codex 当前的工作流语义：工具调用、推理摘要、流式事件、续接历史、usage 统计，都更容易保留。Chat Completions 还能用，但已经被标记为弃用，未来版本会移除。也就是说，今天靠 Chat Completions 适配进 Codex 的模型供应商，应该把迁移到 Responses 兼容作为中期任务，而不是长期架构。

本地 OSS 模式也被纳入这个框架。通过 `--oss`，Codex 可以连接 Ollama 或 LM Studio 这类本地 provider。它适合离线试验、低成本子任务、私有代码快速草拟；它不自动继承 OpenAI 模型的工具调用稳定性、长上下文表现和安全策略。模型能接上，只是第一步。

## Bedrock 是企业分发路径，不是普通代理

Amazon Bedrock 被写成内置 provider，而不是普通自定义 provider。配置后，Codex 本地请求直接发到 Bedrock；OpenAI 托管的 Responses API 不在请求链路里。认证也换成 AWS 原生方式：Bedrock API key 或 AWS SDK credential chain。

这条路径的定位很清楚：企业希望用 AWS 的权限、区域和审计体系来跑支持的 OpenAI 模型。目前公开支持的模型 ID 包括 `openai.gpt-5.5` 和 `openai.gpt-5.4`，可用性受 AWS Region 限制。

功能边界也要写在前面。Bedrock 配置支持本地 Codex 工作流，但依赖 OpenAI 托管云服务、托管工具或云端发现能力的功能不一定可用；Fast Mode 也不在初始 Bedrock 路径内。它解决的是企业模型访问与身份治理，不是把所有 Codex 云能力搬进 AWS。

## 云端任务还没开放模型选择

这次变化主要落在本地 Codex。CLI、IDE 扩展和本地应用可以改模型、改 provider；Codex Cloud 任务目前不能改变默认模型。

这个差异会影响团队落地方式。个人开发者可以在本机把 Codex 指向代理、Bedrock、本地模型或供应商兼容端点；企业如果依赖云端并行任务、托管环境和远程执行，就不能把“本地 provider 可配置”直接等同于“整个 Codex 平台可多模型路由”。

更准确的判断是：Codex 的本地运行时已经开始供应商解耦，云端产品还保持更强的 OpenAI 托管路径。

## 第三方模型接入的真实成本在协议层

把 base URL 改成第三方供应商通常不够。Codex 需要稳定处理工具调用、流式输出、错误格式、推理参数、上下文窗口和历史续接。不同供应商对“reasoning”的理解也不一致：有的接受 effort 档位，有的只支持开关，有的压根不暴露对应参数。

这会带来两个结果。第一，代理和路由器的价值上升，它们不只是转发请求，还要把供应商差异整理成 Codex 能理解的形态。第二，模型能力需要重新验证。能完成普通对话的模型，不一定能稳定执行跨文件修改、测试运行、工具审批和长任务恢复。

对开发者来说，这次更新的信号不是“Codex 可以随便换模型”。更有价值的变化是：Codex 正把模型供应商变成可配置层。本地工作流先打开，企业分发路径跟上，Chat Completions 兼容给过渡窗口。下一步要看的，是第三方供应商能不能把 Responses 语义补齐。
