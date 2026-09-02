---
title: Codex with ChatGPT 开源，让 ChatGPT 规划、Codex 执行
permalink: posts/2026/08/codex-with-chatgpt-bridge/
tags: [codex-with-chatgpt, openai, codex, chatgpt, agent-framework]
date: 2026-08-31 09:57:09
updated: 2026-09-02 14:10:00
categories:
  - 智能体
description: Codex with ChatGPT 开源，把 ChatGPT 网页端用于规划和代码审查，本地 Codex 负责编辑、命令与测试。本文说明 8 个只读 MCP 工具、安装步骤、Cloudflare 连接方式、125 项测试结果，以及代码片段仍会传给 ChatGPT 的隐私边界，帮助开发者判断它是否适合个人或团队代码仓库。
cover: https://images.51allai.com/blog/codex-with-chatgpt-bridge-cover_20260831_100631.png
sources:
  - name: XiaoDuoYa/codex-with-chatgpt GitHub 仓库
    url: https://github.com/XiaoDuoYa/codex-with-chatgpt
---

> 社区项目 Codex with ChatGPT，让 ChatGPT 网页端负责规划和审查，本地 Codex 继续改代码、跑命令和测试。ChatGPT 通过 8 个只读 MCP 工具按需读取工作区，不能借此写文件或执行命令。
![Codex with ChatGPT 规划与本地执行桥接](https://images.51allai.com/blog/codex-with-chatgpt-bridge-cover_20260831_100631.png)

## ChatGPT 规划，Codex 保留执行权

Codex with ChatGPT 是一个非 OpenAI 官方的社区项目。它没有用网页端 ChatGPT 取代 Codex，而是把一次编码任务拆成两个角色：ChatGPT 理解需求、制定计划并审查结果；Codex 使用本地工具编辑文件、运行测试、查看 Git 状态并处理失败。

两端通过几种状态消息协调流程。ChatGPT 需要了解项目时，再从 MCP 连接中读取文件、搜索结果、代码差异或测试记录。MCP 是让 AI 调用外部数据和工具的标准接口，这里只负责从当前项目取回信息。

## 8 个工具只读取项目与执行记录

当前 v0.1.0 提供 8 个 MCP 工具：查看工作区信息、列出目录、读取文件、搜索工作区、查看 Git 状态、查看 Git 差异、读取测试状态和执行摘要。服务端没有写文件、删除文件、运行 Shell、安装依赖或提交 Git 的工具。

读取范围以单个工作区为边界。路径会在读取前解析为真实位置，用来拦截 `..`、绝对路径和符号链接越界。`.env` 文件、密钥、SSH 凭据和云端凭据等默认被排除，用户还可以用 `.c2cignore` 增加项目自己的忽略规则。

我们在最新 v0.1.0 代码上安装锁定依赖后，125 项自动化测试全部通过，TypeScript 类型检查也通过。测试覆盖了工作区越界、敏感文件排除、一次性配对码、OAuth、MCP 调用、Git 差异和连接恢复等路径。

## 一段指令可以交给 Codex 安装

项目要求 Node.js 20 或更高版本、Git、Codex 和 `cloudflared`。用户可以克隆仓库，用 pnpm 安装依赖并构建，再把仓库里的 `skill/SKILL.md` 复制到 Codex 的 skills 目录。也可以把 README 提供的安装指令整段交给 Codex，让它完成环境检查、下载、构建和 Skill 安装。

首次配置会启动本地桥接，再把它添加为 ChatGPT 的自定义 MCP App。连接使用 OAuth 授权和有效期 5 分钟的一次性配对码。设置完成后，用户可以直接告诉 Codex“使用 Codex with ChatGPT 帮我实现……”，Skill 会负责启动连接、请 ChatGPT 制定计划，再把执行结果交给 ChatGPT 审查。

ChatGPT 账号需要具备自定义 MCP App 和开发者模式权限。Codex 的 ChatGPT 登录与这条桥接是两件事：前者让 Codex 使用账号套餐，后者让 ChatGPT 网页端读取当前工作区并参与规划。它不会把现有 Codex 额度改成无限使用。

## 只读不等于代码没有离开电脑

这套架构不会把整个仓库打包上传，但 ChatGPT 通过 MCP 请求的文件片段、搜索结果、Git 差异和测试记录仍会离开本地环境，用于规划和审查。只读限制解决的是“ChatGPT 能否借连接修改项目”，不是“ChatGPT 能否看到代码”。

默认连接使用 Cloudflare Quick Tunnel，它会给本地桥接生成临时公网地址。该地址还需要有效的 OAuth 令牌才能读取数据，但 Quick Tunnel 本身是 Cloudflare 面向测试和开发的临时服务，地址会在进程重启后改变，也没有可用性保证。项目另外支持绑定 Cloudflare 账号和自有域名的固定地址。

对个人开源项目或可恢复的测试仓库，这种角色分工可以将规划和本地执行串起来。处理公司私有代码、客户数据或受合规要求约束的仓库时，应先检查 ChatGPT 套餐的数据规则、组织的外部服务政策、`.c2cignore` 以及实际暴露的 MCP 工具。

* 访问项目：https://github.com/XiaoDuoYa/codex-with-chatgpt
