---
title: Claude Code 2.1.139 发布，新增 Agent View 与 /goal 命令
permalink: posts/2026/05/claude-code-2-1-139-release/
tags: [claude-code, anthropic, agent-view, product-update]
date: 2026-05-12 20:27:07
categories: [智能体]
description: Anthropic 发布 Claude Code 2.1.139，引入 Agent View 统一会话管理和 /goal 目标驱动工作流，修复认证死锁、MCP 内存泄漏等 30 余项缺陷。
cover:
---

> Anthropic 为 Claude Code 推出 Agent View（研究预览）和 `/goal` 命令，一次解决多会话管理与目标驱动工作流两个高频需求，同时修复 30 余项覆盖认证、MCP、UI 渲染的缺陷。

## Agent View：统一会话列表（研究预览）

新增 `claude agents` 命令，在一个列表中展示所有 Claude Code 会话——运行中、等待用户输入、已完成。这是此前社区反馈最密集的功能之一：开发者经常同时运行多个 agent（前台编码 + 后台调研 + 子 agent 任务），但缺乏全局视图。

该功能标记为"研究预览"，意味着接口和行为可能继续调整。文档同步上线：https://code.claude.com/docs/en/agent-view

## `/goal` 命令：目标驱动多轮工作流

用户设定一个完成条件后，Claude 会持续跨 turn 工作直到条件满足。支持交互模式、`-p`（无头模式）和 Remote Control。运行时会以浮层面板形式实时显示已用时间、轮数和 token 消耗。

这与此前 Anthropic 推出的 `/loop` 命令互补——`/loop` 按固定间隔循环执行，`/goal` 则以结果为导向持续工作，不预设轮数上限。

## Hook 与 MCP 能力增强

Hook 系统新增两个字段：
- `args: string[]`（exec form）：绕过 shell 直接 spawn 命令，路径占位符不再需要引号包裹。
- `continueOnBlock`（`PostToolUse` 配置项）：设为 `true` 时，hook 的拒绝原因会被反馈给 Claude 并继续当前 turn。

MCP stdio 服务器现在接收 `CLAUDE_PROJECT_DIR` 环境变量，插件配置中可直接引用 `${CLAUDE_PROJECT_DIR}`。`/mcp` 重连时能读取 `.mcp.json` 的变更，无需重启；失败时显示 HTTP 状态码和 URL。远程 MCP 服务器的瞬断重连重试已对所有用户开放。

## 插件与上下文工具优化

- `claude plugin details <name>`：展示插件组件清单和每会话预估 token 成本。
- `/context all`：per-skill token 估算现在考虑模型 tokenizer，并显示取整后的值。
- `claude plugin install <name>@<marketplace>`：自动刷新 marketplace 并重试，不再直接报"not found"。
- 子 agent 的 API 请求现在携带 `x-claude-code-agent-id` / `x-claude-code-parent-agent-id` 请求头，OTEL span 中也补充了 `agent_id` / `parent_agent_id` 属性。

## 30 余项 Bug 修复

本次修复覆盖多个维度：

**认证与核心流程**
- 修复过期凭据 + `forceRemoteSettingsRefresh` 策略导致 `claude auth login/logout/status` 死锁的问题。
- 修复流取消后看门狗定时器未清除，导致响应完成后 5 分钟出现虚假"stream idle timeout"。

**MCP 与沙盒**
- 修复 HTTP/SSE MCP 服务器流式传输非协议数据时的无限内存增长——SSE 帧响应体现在上限为 16 MB。
- 修复 `autoAllowBashIfSandboxed` 未自动批准含 shell 展开（`$VAR`、`$(cmd)`）的命令。
- 修复 10+ MCP 服务器且缓存目录不可写时的静默 `exit 1`，错误信息现在包含根本原因。

**UI 与交互**
- 修复暗色主题下超链接使用不可读的深海军蓝，现在适配活动主题。
- 修复 Cursor 和 VS Code 1.92–1.104 中鼠标滚轮滚动速度问题，触控板现在以稳定速率滚动，滚轮保持约 3 行/格。
- 修复粘贴或拖放多张图片时仅插入最后一张的问题。
- 修复 Bash 模式下上箭头历史重复第一条记录并覆盖正在编辑的草稿。
- 转录视图的字母快捷键在鼠标点击后失效的问题。
- CJK 字符/emoji 因视觉单元格宽度计算错误导致的溢出问题。
- emoji 和异平面字符在模糊匹配高亮时被错误拆分的问题。

**VSCode 集成**
- 新增 Cmd/Ctrl+Shift+T 重新打开最近关闭的会话标签，可通过 `claudeCode.enableReopenClosedSessionShortcut` 配置。
