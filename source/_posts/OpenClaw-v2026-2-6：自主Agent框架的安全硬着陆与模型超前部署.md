---
title: OpenClaw v2026.2.6：自主Agent框架的安全硬着陆与模型超前部署
date: 2026-02-07 19:03:24
categories: AI资讯
tags: OpenClaw
---
> 这是一个标志着 OpenClaw 从“极客玩具”向“生产级基础设施”转型的里程碑版本。核心信号在于对安全性的系统级加固（34项安全提交），以及对下一代模型（Opus 4.6/GPT-5.3）的超前架构兼容。
![iShot_2026-02-04_20.31.35](https://images.51allai.com/blog/iShot_2026-02-04_20.31.35_20260204_203456.png)

* **安全防线重构 (Critical Security Hardening)**
* **SSRF 与 远程执行封堵**：修复了高危的 SSRF 漏洞，现在对 Skill 安装下载和媒体理解（Media Understanding）的 Provider 获取请求实施严格的 SSRF 护栏，并明确阻止私有/本地主机 URL。
* **权限收束**：Windows 环境下的 `exec` 白名单得到加固，封堵了通过单 `&` 符号绕过 `cmd.exe` 的路径。Gateway 的 `/approve` 指令现在强制要求 `operator.approvals` 权限，杜绝未授权审批。
* **身份验证升级**：在跳过设备身份验证前，现在强制要求验证共享密钥（Shared-secret auth），并修复了 Matrix 协议中模糊名称解析可能导致的未授权访问问题。

* **模型与基础设施扩展 (Model & Infra)**
* **超前兼容性**：代码库已预埋对 **Anthropic Opus 4.6** 和 **OpenAI Codex gpt-5.3-codex** 的支持（含前向兼容的回退机制）。这意味着 OpenClaw 正试图成为首个原生支持这两款尚未全面公测模型的主流 Agent 框架。
* **多模态与记忆增强**：原生集成 **Voyage AI** 以提升长期记忆（Memory）的检索性能；新增 **xAI (Grok)** 作为官方支持的 Provider。
* **可观测性**：Web UI 新增 Token 使用量仪表盘（Token Usage Dashboard），解决了此前自托管用户难以统计多模型混合调用成本的痛点。

* [OpenClaw v2026.2.6 Release Notes](https://github.com/openclaw/openclaw/releases/tag/v2026.2.6)