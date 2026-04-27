---
title: OpenClaw 更新 v2026.4.24：默认集成 DeepSeek V4 并在 Google Meet 实现实时语音闭环
permalink: posts/2026/04/openclaw-deepseek-google-meet/
categories: 智能体
tags: [openclaw, openclaw, agent-framework, product-update]
date: 2026-04-26 11:45:11
description: OpenClaw 更新 v2026.4.24，将默认底层模型切换为 DeepSeek V4 Flash
cover:
---
> 开源 AI Agent 框架 OpenClaw 释出最新版本，将默认底层模型切换为 DeepSeek V4 Flash，并重构多模态会议与浏览器自动化底层，标志着本地化 Agent 的核心工作流从“异步指令流”向“实时多模态干预”演进。

## 默认模型矩阵替换与 DeepSeek V4 深度集成
官方内置模型目录（Bundled Catalog）已正式集成 DeepSeek V4 Flash 与 V4 Pro，并将 **V4 Flash 设为全局新用户的默认引导模型（Onboarding Default）**。
针对多步复杂任务，修复了 DeepSeek 模型在连续工具调用（Follow-up Tool-call）阶段由于上下文截断导致的 thinking/replay 行为中断问题，确保长工作流的稳定性。为了提升启动性能，模型目录升级为静态加载架构（Static Catalogs），并通过清单后备（Manifest-backed）机制大幅降低初始拉取延迟。

## 实时语音架构重构与 Google Meet 原生支持
Talk、Voice Call 以及新增的 Google Meet 模块现在全面支持基于完整 Agent 上下文的“实时语音循环（Realtime Voice Loops）”。
新增的 Google Meet 官方插件允许 Agent 作为独立参与者（Participant Plugin）接入会议：
- **底层支持**：支持个人 Google 账号授权授权，内置基于 Chrome 和 Twilio 的实时音视频传输通道。
- **产物自动化**：提供原生工作流导出会议副产物，包含自动音视频录像、实时转录（Transcripts）、智能笔记与参会人员考勤打卡。
- **主机兼容**：新增面向 Parallels 虚拟化环境的配对节点支持（Chrome/BlackHole/SoX 主机端桥接）。

## 浏览器自动化（RPA）与系统性能调优
浏览器控制内核引入了**视口坐标点击（Coordinate Clicks）**功能，作为传统 DOM 树定位的兜底方案，显著降低了前端框架混淆导致的 UI 自动化失败率。此外，放宽了默认动作执行的超时预算（Action Budgets），增强了多标签页复用及崩溃恢复（Tab Reuse/Recovery）的鲁棒性。
系统启动负载被进一步削减：默认不再预装 `node-llama-cpp`（本地 Embedding 依赖），将其降级为按需拉取的可选运行时包。