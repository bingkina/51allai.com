---
title: Anthropic 移除 Claude Code 终端宠物，意外验证“伴随式多智能体”工程价值
permalink: posts/2026/05/anthropic-claude-code-buddy-removal-accompanying-multi-agent-value/
tags:
  - anthropic
  - claude-code
  - multi-agent
  - developer-tools
  - companion-ai
date: 2026-05-03 20:22:22
categories: 智能体
description: "Anthropic 在 Claude Code v2.1.97 中移除了上线仅8天的 Buddy 终端宠物功能，其底层骨与魂架构通过确定性数值生成与 LLM 驱动 System Prompt 构成低配版多智能体协同网络，引发社区版本锁定与 MCP 分叉重构潮。"
cover:
---
> Anthropic 在 Claude Code v2.1.97 版本中移除了作为愚人节彩蛋的 `/buddy` 电子宠物功能，此举引发开发者强烈反弹，并暴露出该功能的“观察者智能体”架构在实际代码审查中的意外效用。

## 官方静默下线与“骨与魂”架构剖析
Anthropic 在未发布更新公告的情况下，于 v2.1.97 版本移除了 `/buddy` 终端指令。官方在 GitHub Issue (#46011) 中将其定性为“已完结的愚人节小型特性”并拒绝恢复。
追溯其 3 月末泄漏的源码，该宠物系统并未停留在 UI 动画表层，而是采用了一套被称为“骨与魂 (Bones and Soul)”的底层机制：
- **骨 (确定性验证层)**：系统基于用户 ID 运行 FNV-1a + Mulberry32 伪随机数生成算法，锁定生成 18 种物种、5 个稀有度（最高 1% 概率闪光）以及 5 项核心数值（Debugging, Patience, Chaos, Wisdom, Snark）。该数据每次会话实时重算，无法通过修改本地 Config 文件作弊。
- **魂 (LLM 驱动层)**：主模型基于前述生成的确定性数值，分配专属的 System Prompt。
这在本质上构成了一个低配版的多智能体（Multi-agent）协同网络：主控 Claude 负责执行编码与文件读取，而 Buddy 作为独立的影子节点，拥有监听终端上下文的只读权限。

## 社区的分叉与 MCP 协议重构潮
面对官方的下线操作，开发者社区迅速形成多条技术自救路线：
1. **版本锁死**：大量用户主动降级并锁死至 v2.1.96 版本，以维持本地会话存活。
2. **MCP (模型上下文协议) 剥离重构**：出现了 `claude-buddy` 与 `fiorastudio/buddy` 等开源项目。新方案利用 MCP、Skills 钩子与状态栏注入，将宠物逻辑彻底脱离 Claude Code 内核，转为独立的本地 SQLite 持久化服务，不仅存活率不再受制于 Anthropic 官方更新，更实现了跨终端（如 CursorCLI、Github CopilotCLI）的兼容。
3. **行为数据游戏化**：部分开发者（如 `codecritters` 项目）开始将其重构成基于真实 Coding 会话驱动的终端 Roguelike 游戏。