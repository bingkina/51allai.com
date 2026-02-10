---
title: Google Antigravity IDE 正式集成 Claude Opus 4.6
categories: AI资讯
date: 2026-02-10 23:19:35
tags: Antigravity
---
> Google 旗下的 AI 原生 IDE "Antigravity" 已于 2026 年 2 月 6 日完成对 Anthropic 最新模型 Claude Opus 4.6 的接入，用户通过重启客户端即可在模型列表中调用。
![iShot_2026-02-10_23.16.11](https://images.51allai.com/blog/iShot_2026-02-10_23.16.11_20260210_232207.png)

## 核心集成：Claude Opus 4.6 (2026.02 Update)

根据 Google AI 开发者社区及 Reddit 核心用户反馈，Antigravity IDE 的最新热更新已将 reasoning model（推理模型）列表中的 Claude Opus 4.5 替换或升级为 Claude Opus 4.6。

* **接入方式：**官方原生支持（通过 Google Vertex Model Garden 渠道），无需用户配置第三方 Proxy。

* **版本特性：**Opus 4.6 是 Anthropic 于 2026 年 2 月初发布的最新旗舰模型，主要针对长上下文代码推理和复杂重构任务进行了优化。

* **生效方法：**用户需重启 Antigravity 客户端（完全关闭进程），在 Agent 设置的 "Reasoning Model" 下拉菜单中即可看到新版本。

## 性能表现与差异

早期采用者（Early Adopters）在实测中指出 Opus 4.6 与前代版本的显著差异：

* 问题修复能力：针对 4.5 版本中存在的特定死循环（Soft-locked loop）和移动端应用（如 Expo/React Native）构建错误，4.6 展现了更高的“一次性修复率”。

* Thinking 模式：在 "High Effort"（深度思考）模式下，Opus 4.6 的 Token 消耗速率约为 4.5 版本的 4 倍，表明其思维链（Chain of Thought）更加详尽。