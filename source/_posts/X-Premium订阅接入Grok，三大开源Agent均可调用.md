---
title: X Premium订阅接入Grok，三大开源Agent均可调用
permalink: posts/2026/05/x-premium-grok-open-source-agents/
date: 2026-05-23 20:49:59
categories: 智能体
tags: [openclaw, hermes-agent, xai, grok, x-premium]
description: X Premium+ 订阅用户可通过 OAuth 在 Hermes Agent、OpenClaw、OpenCode 中调用 Grok 模型，$40/月订阅成了最具性价比的 Agent 模型调用方案。
cover: 
---

> X Premium+ 用户不再局限于 xAI 官网使用 Grok。通过 OAuth 认证，Hermes Agent、OpenClaw、OpenCode 三大开源 AI Agent 框架已相继接入 Grok API，月费 40 美元的订阅成了最具性价比的 Agent 模型调用方案。
![xAI官方宣布Grok支持OpenCode](https://images.51allai.com/blog/截图2026-05-23_20.51.47@2x_20260523_205253.png)

X（原 Twitter）Premium+ 订阅用户现可通过 xAI 的 OAuth 认证流程，在 **Hermes Agent**、**OpenClaw**、**OpenCode** 三款开源 AI Agent 框架中直接调用 Grok 模型。

此前，Grok 的使用场景基本被限制在 x.com 和 grok.com 的网页界面内。这次 OAuth 打通意味着：一个 $40/月的 X Premium+ 订阅，不仅能刷信息流、用 Grok 聊天，还能作为底层模型驱动本地运行的 AI Agent。

## 技术实现

**认证方式**：浏览器 OAuth 2.0 PKCE 流程。用户在 Hermes Agent 中执行 `hermes auth add xai-oauth`，跳转到 `accounts.x.ai` 完成授权，token 自动保存到本地 `~/.hermes/auth.json`，无需手动配置 API key。OpenClaw 的接入方式类似，同样通过 Grok OAuth 绑定订阅。

**模型能力**：默认调用 `grok-4.3`，端点为 `https://api.x.ai/v1`。单张 bearer token 覆盖对话、TTS、图像/视频生成和转录。Hermes 底层复用 `codex_responses` 适配器，reasoning、tool-calling、streaming 和 prompt caching 均正常工作。

**后台刷新**：access token 过期后 Hermes 会在后台自动刷新，不需要用户重新登录。远程/无头模式下可通过 `--no-browser` 配合 SSH 端口转发完成授权。

## 性价比算一笔账

Grok API 按量付费的价格是 **输入 $2/M tokens，输出 $6/M tokens**，上下文窗口 200 万 tokens。作为对比，Claude Sonnet 4.6 的输入价格是 $3/M tokens，输出 $15/M tokens。

X Premium+ 月费 $40（年付 $395），包含较高的 Grok 使用额度。对于运行本地 Agent 的开发者来说，这个额度远比直接按量调用 xAI API 或其他模型便宜。这也是为什么有开发者在 X 上直接评价："X Premium Plus 成为最具性价比的订阅产品。"

## 三个 Agent 的差异化定位

**Hermes Agent**（Nous Research）—— 定位自学习 AI Agent。内置学习闭环、RL 研究支持，执行速度快。在 Grok OAuth 接入上走得最快，官方文档已覆盖完整的中文配置指南。还支持 X 搜索工具作为 Agent 的技能之一。

**OpenClaw** —— 本地优先的开源 Agent 框架。支持更广泛的渠道统一（Telegram、Discord、Slack 等），社区技能生态更大。xAI 官方也有独立页面介绍如何在 OpenClaw 中使用 Grok。

**OpenCode** —— 同样支持 X Premium 订阅通过 Grok OAuth 调用，面向 coding 场景。

三者定位不同但共享同一个 Grok OAuth 认证路径，用户可以根据自己的 Agent 使用场景选择框架。

## 已知问题

xAI 的 OAuth 后端曾出现对标准 SuperGrok 订阅用户返回 HTTP 403 的情况（OAuth 层级 gating 问题）。兜底方案是改用 API key：设置 `XAI_API_KEY` 环境变量，将 provider 切换为 `xai` 即可绕过 OAuth。
