---
title: OpenAI 开源 Codex Security CLI，支持本地与 CI 扫描代码漏洞
permalink: posts/2026/07/openai-codex-security-cli/
tags: [openai, codex, open-source, security, product-update]
date: 2026-07-29 09:35:44
categories:
  - 智能体
description: OpenAI 开源 Codex Security CLI 与 TypeScript SDK，采用 Apache-2.0 许可证，可在本地、提交前和 CI 流程中扫描代码并导出结构化结果。本文说明安装门槛、账号权限、扫描范围、结果保存注意事项，以及开源代码与云端扫描服务的边界，帮助开发者判断如何在个人项目、团队仓库和自动化流水线中安全使用。
cover: https://images.51allai.com/blog/openai-codex-security-cli-cover_20260729_093948.png
---

> OpenAI 已公开 Codex Security CLI 与 TypeScript SDK，代码采用 Apache-2.0 许可证。开发者可以扫描完整仓库、指定目录或代码差异，并把结果导出为 SARIF、CSV 或 JSON；运行扫描需要 Codex Security 访问权限和账号或 API 凭据。
![OpenAI Codex Security CLI 本地与 CI 代码扫描流程](https://images.51allai.com/blog/openai-codex-security-cli-cover_20260729_093948.png)

## 开源的是 CLI 和 TypeScript SDK

Codex Security 这次公开的是一套命令行工具和 TypeScript SDK。命令行工具适合开发者在终端、本地 Git 仓库和 CI 流程里调用；SDK 则让团队把扫描能力接入自己的内部工具。公开包名为 `@openai/codex-security`，当前代码中的版本号是 `0.1.1`，许可证为 Apache-2.0。

这与此前通过网页连接 GitHub 仓库的 Codex Security 服务不是同一个使用入口。CLI 直接接收本地仓库路径，也能只检查指定目录、两个 Git 版本之间的差异，或工作区里尚未提交的改动。扫描代码的前提是用户拥有仓库，或获得了明确的安全评估授权。

公开仓库采用单向镜像方式同步。外部开发者可以查看代码、提交问题和提出功能建议，但外部 Pull Request 不能直接导入 OpenAI 的内部主仓库。维护者会在主仓库处理被接受的改动，再同步到公开仓库。

## 三条命令完成首次扫描

CLI 需要 Node.js 22 或更高版本。真正执行扫描和导出结果时，还需要 Python 3.10 或更高版本。安装、登录和扫描可以按下面的顺序完成：

```bash
npm install @openai/codex-security
npx codex-security login
npx codex-security scan /path/to/repo
```

本地交互使用可以登录 ChatGPT 账号；远程服务器支持设备码登录；CI 等无人值守环境可以通过 `OPENAI_API_KEY` 或 `CODEX_API_KEY` 提供凭据。CLI 和 SDK 仍处于 beta 阶段并要求 Codex Security 访问权限。完整仓库扫描还可能要求 Trusted Access for Cyber，仅完成登录或设置 API Key 不会自动获得这项权限。

正式扫描前可以先加上 `--dry-run`。这个模式会检查仓库路径、扫描目标和输出目录，不会启动 Codex，也不会读取凭据或联网。它适合先排除路径写错、结果目录放错位置等配置问题。

## 可以扫完整仓库，也可以只看这次改动

日常开发不一定需要每次重扫全部代码。`--path` 可以把范围限制在某个服务或目录；`--diff origin/main --head HEAD` 用于检查两个版本之间的已提交变更；`--working-tree --base HEAD` 则检查暂存区和工作区里的改动。需要扩大检查范围时，可以选择 deep 模式。

团队还可以通过 `--knowledge-base` 提供架构文档、威胁模型和安全规则。威胁模型是对系统入口、信任边界和高风险路径的整理，能让扫描结合项目实际结构，而不是只看一段孤立代码。CLI 会递归读取指定目录中的 Markdown、文本、PDF 和 Word 文档。

扫描默认只生成报告，不会因为发现问题直接修改仓库。结果中会记录发现项、覆盖范围和报告文件。覆盖状态可能是完整、部分或未知；把一次扫描当成审查证据前，需要同时检查未覆盖区域和留待处理的问题。

## 报告可进入 CI 和代码审查流程

Codex Security 可以导出 SARIF、CSV 和 JSON。SARIF 是代码扫描工具常用的结构化格式，适合交给支持该格式的代码托管或安全平台继续处理。CI 中可以使用 `--fail-on-severity high` 设置严重级别门槛：扫描完成且出现达到门槛的发现时返回状态码 `1`，覆盖不完整或运行失败时返回状态码 `2`。

`npx codex-security install-hook` 可以给当前 Git 仓库安装提交前检查。它会在每次提交前扫描已暂存和未暂存的变更，默认阻止高严重级别发现或扫描错误，同时保留仓库里已有的 pre-commit 脚本。团队也可以用 `bulk-scan` 批量扫描 GitHub 账号或组织下的多个仓库，并通过同一个结果目录续跑中断的任务。

扫描结果应保存在被扫描仓库和其 Git 工作树之外。报告可能包含源码片段、漏洞细节和复现步骤，不适合提交进代码仓库、公开 Issue 或多人共享目录。在 macOS 和 Linux 上，已有输出目录还需要限制为当前用户可访问。

## SDK 适合接入内部平台

TypeScript SDK 通过 `CodexSecurity` 类启动扫描，返回带类型的发现项、覆盖信息和报告路径。它支持完整仓库、指定路径、Git 差异和工作区扫描，也提供预检、成本上限、进度回调和取消能力。SDK 使用 ESM 模块，需要运行在 Node.js 22 或更高版本的服务端环境。

CLI 与 SDK 让团队可以检查公开实现、固定依赖版本，并把安全扫描接入已有流程；扫描过程仍会调用 Codex Security 服务并消耗账号或 API 侧的可用额度。对个人开发者，最直接的起点是先用 `--dry-run` 检查配置，再对一个自己有权评估的小型仓库执行标准扫描，确认结果目录和覆盖报告符合预期后再接入提交钩子或 CI。
