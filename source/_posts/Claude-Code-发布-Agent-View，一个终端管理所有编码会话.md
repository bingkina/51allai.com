---
title: Claude Code 发布 Agent View，一个终端管理所有编码会话
permalink: posts/2026/05/claude-code-agent-view/
date: 2026-05-12 14:13:44
categories:
  - 智能体
tags:
  - Claude Code
  - Anthropic
  - Agent View
  - 多任务管理
description: Anthropic 为 Claude Code 推出 Agent View（研究预览），v2.1.139 起可用。一个终端界面管理所有并行编码会话，支持分派、监控、Peek 回复和 Attach 切换。本文整理功能细节、快捷键与限制。
---

> Claude Code 原生内置多任务管理面板，开发者无需再开多个终端或依赖 tmux 来并行调度 AI 编码会话。
![Claude Code Agent View 界面](https://images.51allai.com/blog/agent-view-cover_20260512_141812.jpg)

## 核心功能：一个列表掌控所有会话

Agent View 是 Claude Code 的原生终端面板，以表格形式列出所有后台会话。运行 `claude agents` 即可打开，按状态分组排列：

| 状态 | 含义 |
| :--- | :--- |
| 动画闪烁 (✽) | 正在工作，Claude 正在执行工具或生成回复 |
| 黄色 (✻) | 需要输入，等待用户回答或权限确认 |
| 灰色变暗 (∙) | 空闲，不阻塞具体问题 |
| 绿色 | 任务完成 |
| 红色 | 出错终止 |
| 灰色 | 用户手动停止 |

需要输入和工作中的会话置顶，已完成的老会话自动折叠为"... N more"。打开 PR 的会话和失败会话始终可见，不会被折叠。

每行的一行摘要由 Haiku-class 模型自动生成，显示会话正在做什么、需要什么、或产出了什么。活跃会话的摘要每 15 秒刷新一次。

## 三种交互模式：Peek / Attach / Dispatch

Agent View 提供三种操作深度，对应不同的使用场景：

**Peek（瞥一眼）**：选中一行按 `Space` 打开预览面板，显示最近输出、是否需要输入、以及是否打开了 PR。大多数情况下无需打开完整对话即可回复。在 Peek 面板中直接打字并 `Enter` 即可发送回复；多选问题时可直接按数字键选择；回复前加 `!` 前缀可发送 Bash 命令。

**Attach（接入）**：按 `Enter` 或 `→` 接入完整会话，终端变为正常的 Claude Code 交互模式。接入时 Claude 会显示一段离开的期间的简要回顾。按 `←` 可断开并返回表格视图，不会停止会话。

**Dispatch（分派）**：在底部输入框直接输入提示词并 `Enter`，即可创建新的后台会话。支持 `@subagent` 指定子代理、`@repo` 指定仓库目录、`/skill` 触发技能、`Shift+Enter` 分派后立即接入。

## 从 Shell 直接分派后台会话

不打开 Agent View 也可以直接创建后台任务：

```bash
claude --bg "investigate the flaky SettingsChangeDetector test"
```

分派后 Claude 会打印短 ID 和管理命令：

```
backgrounded · 7c5dcf5d
  claude agents             list sessions
  claude attach 7c5dcf5d    open in this terminal
  claude logs 7c5dcf5d      show recent output
  claude stop 7c5dcf5d      stop this session
```

也可以在已有会话中运行 `/bg` 或 `/background` 将其转入后台。

## Shell 管理命令速查

| 命令 | 用途 |
| :--- | :--- |
| `claude agents` | 打开 Agent View |
| `claude attach <id>` | 在当前终端接入会话 |
| `claude logs <id>` | 打印最近输出 |
| `claude stop <id>` | 停止会话 |
| `claude respawn <id>` | 重启已停止的会话 |
| `claude respawn --all` | 重启所有已停止会话 |
| `claude rm <id>` | 从列表中移除会话 |

## 后台会话的架构

后台会话由一个独立的用户级 supervisor 进程托管（日志位于 `~/.claude/daemon.log`），不依赖任何打开的终端。关闭终端、自动更新都不影响运行中的会话。

每个后台会话有独立的 Claude Code 进程。活跃运行或已接入的会话进程保持运行；完成后约一小时未被接入的会话，supervisor 会停止其进程以释放资源，转录和状态保留在磁盘上，下次接入时自动恢复。

文件隔离方面：后台会话默认无法直接写入工作目录。当会话需要编辑文件时，Claude 自动在 `.claude/worktrees/` 下创建隔离的 git worktree，确保并行会话互不冲突。删除会话时 worktree 一并清除。

状态存储路径：

| 路径 | 内容 |
| :--- | :--- |
| `~/.claude/daemon.log` | Supervisor 日志 |
| `~/.claude/daemon/roster.json` | 运行中的后台会话列表 |
| `~/.claude/jobs/<id>/state.json` | Agent View 中显示的每行状态 |

设置 `disableAgentView` 为 `true` 或环境变量 `CLAUDE_CODE_DISABLE_AGENT_VIEW` 可完全禁用后台会话功能。

## 键盘快捷键

Agent View 中的常用快捷键（按 `?` 查看全部）：

| 快捷键 | 功能 |
| :--- | :--- |
| `↑` / `↓` | 在行之间移动 |
| `Enter` | 接入选中会话；输入框有文字时分派新会话 |
| `Space` | 打开/关闭 Peek 面板 |
| `Shift+Enter` | 分派并立即接入新会话 |
| `Ctrl+S` | 切换按状态分组 / 按目录分组 |
| `Ctrl+T` | 置顶/取消置顶选中会话 |
| `Ctrl+R` | 重命名选中会话 |
| `Ctrl+X` | 停止会话；两秒内再按一次删除 |
| `←` | 断开接入，返回表格视图 |
| `Esc` | 关闭 Peek / 清空输入 / 退出 |

## 限制

Agent View 目前为研究预览状态，需注意：

- **配额消耗**：每个后台会话独立消耗订阅配额，并行运行 10 个代理的消耗约为单会话的 10 倍
- **不存活于休眠**：机器休眠或关机后后台会话停止，唤醒后需 `claude respawn --all` 恢复
- **Worktree 随会话删除**：删除会话时其 worktree 一并清除，合并或推送变更前需确认
- **快捷键可能变更**：研究预览期间界面和快捷键可能调整
- **组织管理员可禁用**：通过 `disableAgentView` 托管设置可关闭此功能

## 可用性与版本

Agent View 自 **v2.1.139** 起作为研究预览发布，适用于 Pro、Max、Team、Enterprise 和 API 订阅用户。升级方式：`npm update -g @anthropic-ai/claude-code`（或通过原安装方式更新）。