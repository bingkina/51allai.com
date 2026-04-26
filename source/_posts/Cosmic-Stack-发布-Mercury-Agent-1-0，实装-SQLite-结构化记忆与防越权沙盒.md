---
title: Cosmic Stack 发布 Mercury Agent 1.0，实装 SQLite 结构化记忆与防越权沙盒
permalink: posts/2026/04/cosmic-stack-mercury-agent-1-0/
categories: AI资讯
tags: [Mercury, Agent, OpenClaw]
date: 2026-04-26 12:14:24
description: 
cover: https://images.51allai.com/blog/截图2026-04-26_12.13.29@2x_20260426_121558.png
---
> Mercury Agent 提供了一套强调安全边界与持久化记忆的开源双端（CLI/Telegram）代理方案，通过本地数据库机制缓解了长文本上下文丢失，并以硬编码拦截阻断了工具滥用风险。
![截图2026-04-26_12.13.29@2x](https://images.51allai.com/blog/截图2026-04-26_12.13.29@2x_20260426_121558.png)

## “第二大脑”持久化记忆架构
v1.0 版本重构了数据存储逻辑，底层采用 SQLite 并结合 FTS5 实现全文本搜索。系统将记忆划分为身份、偏好、目标等 10 个数据维度。执行管线上，Agent 在每次对话结束后自动提取 0-3 个携带置信度与重要性评分的客观事实；并在发起新会话前，在 900 字符的上下文预算内自动注入匹配度最高的 5 条记忆。后台守护进程每 60 分钟自动执行一次记忆摘要整合与冗余降噪。

## 强化型权限隔离与死循环熔断
针对本地化 Agent 的越权调用风险，实装了两级拦截机制：
1. **底层指令阻断**：Shell 工具端实施黑名单机制，硬编码拦截 `sudo`、`rm -rf /` 等高危命令，强制要求目录级的读写作用域隔离（支持按次询问 Ask Me 或全局允许 Allow All 模式）。
2. **Token 熔断器 (ToolCallLoopDetector)**：追踪工具调用的状态机，当检测到连续 3 次触发相同工具及参数组时，强制向大模型注入系统级警告以改变执行策略，阻断死目录遍历或无限重试造成的 Token 预算损耗。

## 平台解耦的人格注入与组织访问模型
剥离传统商业 API 的系统提示词干预，完全通过本地 `soul.md`、`persona.md`、`taste.md` 等 Markdown 文件重写人格模型。项目支持以守护进程 24/7 运行于 CLI 及 Telegram 端。针对 Telegram 渠道，引入了基于配对验证码的 RBAC 组织架构（包含 Admin/Member 权限），并采用 `editMessageText` API 实现了高并发状态下的状态流式渲染。

## 争议/局限
- **本地存储带来的数据孤岛效应**：依赖单机 SQLite 和纯本地目录（`~/.mercury/`）的架构设计，实质上切断了多端云同步的可能。在跨设备开发或多协作者场景中，核心的“第二大脑”数据无法实现低延迟流转。
- **高度依赖规范约束**：原生状态下的 Agent 仍可能出现迎合用户（Sycophancy）或盲目重构代码的行为。实测中需要开发者手动植入极强约束力的 `AGENTS.md` 规则文件（如效仿 Claude Code 工作流）才能达到 Senior Engineer 级别的决策稳定性。

- [GitHub](https://github.com/cosmicstack-labs/mercury-agent)
- [官网](https://mercury.cosmicstack.org)