---
title: CC Switch 打通 Codex Chat Completions 路由，第三方模型可接入 Codex
permalink: posts/2026/05/cc-switch-codex-chat-routing/
tags:
  - cc-switch
  - codex
  - product-update
  - agent-framework
  - open-source
date: 2026-05-30 17:16:59
categories:
  - 智能体
description:
  CC Switch v3.16.0 新增 Codex Chat Completions 路由，把 Codex 的 Responses 请求转换给 OpenAI Chat Completions 上游，第三方模型接入门槛明显降低。
cover: https://images.51allai.com/blog/截图2026-05-30_17.17.33@2x_20260530_171907.png
---

> CC Switch v3.16.0 把 Codex 的第三方供应商能力补上了关键一环：本地代理可将 Codex Responses 请求转换为 Chat Completions，再把响应重建回 Responses 形态。它解决的是协议适配问题，不是模型能力本身的保证。
![CC Switch Codex Chat Completions 路由界面](https://images.51allai.com/blog/截图2026-05-30_17.17.33@2x_20260530_171907.png)

## Codex 不再只等 Responses 上游

CC Switch 在 2026 年 5 月 29 日发布 v3.16.0。发布说明把首要更新放在 Codex Chat Completions 路由：Codex 供应商现在可以由只支持 OpenAI Chat Completions API 的上游提供服务。

这层代理做三件事：

- 把 Codex 发出的 Responses 请求转换成 Chat Completions 请求；
- 把 JSON 与 SSE 流式响应重建回 Responses 形态；
- 尽量保留 reasoning、`<think>`、工具调用状态和 `previous_response_id` 续接。

对用户来说，变化很直接：过去一些只能给 Claude Code、OpenCode 或普通 OpenAI 兼容客户端用的模型服务，现在有机会进入 Codex CLI / Codex Desktop 的工作流。

## 22 个预设只是入口，关键在协议转换

v3.16.0 还加入了 22 个带 Chat 路由的 Codex 第三方供应商预设，并让 Stream Check 对 Chat 格式供应商使用 `/chat/completions` 形态探测，而不是拿 `/v1/responses` 去误判。

这不是简单的 base URL 改写。Codex 的客户端语义仍偏向 Responses API：流式事件、工具调用、历史续接、usage 统计、错误信封都要重新拼回来。发布说明中列出的修复也集中在这里：MiniMax 非首位 system 消息、Kimi / MiniMax 流式 usage 丢失、Chat 错误体无法被 Codex 识别、工具调用推理内容回填等。

换成工程语言：CC Switch 在 Codex 与一批 Chat Completions 上游之间补了一个协议整流层。

## 推理参数开始按供应商适配

Codex 接入第三方模型后，最容易出问题的是 reasoning 参数。不同供应商的 OpenAI 兼容接口并不兼容：有的用 `reasoning_effort`，有的用 `enable_thinking`，有的只接受开关，不接受 effort 档位。

v3.16.0 增加了 Codex Chat 思考能力自适应。CC Switch 会根据供应商名称、base URL 和模型名注入对应参数；OpenRouter、DeepSeek、StepFun 这类有 effort 档位的供应商会透传等级，Kimi、GLM、Qwen、MiniMax、MiMo、SiliconFlow 这类只暴露思考开关的供应商则会丢弃 effort 等级。

这点值得单独看：Codex UI 里调了思考等级，并不代表每个第三方模型都会按同样语义执行。供应商接口只给开关时，等级调节不会产生实际效果。

## 历史会话也被一起修

这次更新不只做新路由，还处理了 Codex 第三方供应商的身份问题。过去 Codex 会按 `model_provider` 过滤可恢复历史，供应商 id 一变，老会话可能看起来像消失了。

v3.16.0 把第三方 Codex 供应商统一归入稳定的 `custom` model-provider 桶，并提供一次性迁移：改写历史 JSONL 会话与 `state_5.sqlite` 线程表，原文件备份到 `~/.cc-switch/backups/codex-history-provider-migration-v1/`。这类迁移不改变模型能力，但会影响老会话能不能被找回。

## “任意大模型”的边界

把这次更新称为“Codex 接入任意大模型”可以理解，但要加边界：它依赖上游能提供可兼容的 Chat Completions 接口，或者通过 cc-router 这类路由器把 Anthropic / OpenAI 协议上游翻译成 Codex 能调用的 `/v1/responses` 或等价接口。

cc-router 文档也给出类似路径：Codex CLI 和 Codex Desktop 共用 `~/.codex` 配置，可以把自定义 provider 指向本地路由服务，由路由器再分发到不同虚拟模型槽。安全边界同样清楚：`~/.codex/auth.json` 会保存访问 token，不应提交到仓库；本地路由端口只应暴露在可信网络。
