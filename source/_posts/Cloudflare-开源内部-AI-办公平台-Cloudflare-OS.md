---
title: Cloudflare 开源内部 AI 办公平台 Cloudflare OS
permalink: posts/2026/08/cloudflare-os-ai-workspace/
tags:
  - cloudflare
  - cloudflare-os
  - open-source
  - ai-agents
  - agent-framework
date: 2026-08-06 10:53:39
categories:
  - 智能体
description: Cloudflare 开源内部 AI 办公平台 Cloudflare OS，把智能体对话、可修改的小应用和权限治理放进同一工作空间。项目采用 Apache 2.0 许可证，可在本地体验或部署到 Cloudflare 账户；本文说明 Gadgets、Gatekeepers、隔离机制和早期访问限制，帮助团队判断试用场景，并了解接入企业数据前需要检查的权限边界与人工审批流程。
cover: https://images.51allai.com/blog/cloudflare-os-ai-workspace-cover-5x2_20260806_105839.png
---

> Cloudflare 开源内部 AI 办公平台 Cloudflare OS。它把智能体对话、可修改的小应用和权限治理放进同一工作空间，代码采用 Apache 2.0 许可证，并提供本地运行及部署到 Cloudflare 账户的入口。当前版本属于 Early Access。
![Cloudflare OS AI 办公平台与隔离智能体工作空间](https://images.51allai.com/blog/cloudflare-os-ai-workspace-cover-5x2_20260806_105839.png)

## 它不是电脑操作系统

Cloudflare OS 是一套面向企业工作的 AI 生产力环境，最初用于 Cloudflare 内部。用户从浏览器里的对话开始，为工作空间交代目标；智能体可以结合组织准备的知识、技能和已连接资源完成任务，还能把结果做成文档、小应用或持续处理的工作流程。

名字里的“OS”不是 Windows、macOS 那类管理个人电脑硬件的操作系统。这里指的是一层工作平台：它连接用户、智能体、应用和外部服务，同时管理应用隔离、访问权限与共享范围。Cloudflare 已把代码放到公开 GitHub 仓库，使用 Apache 2.0 许可证，企业可以复制并改造成带有自己知识和工具的内部版本。

## 对话可以直接变成可修改的小应用

Cloudflare OS 把智能体生成的小型个人应用称为 Gadget。用户可以让智能体制作演示文稿、协作白板或项目看板，也可以继续用自然语言修改功能。每个 Gadget 都有自己的实例，不是所有用户共同访问同一个中心化应用。

Gadget 默认保持私有，也可以分享给指定用户或通过链接协作。需要把应用本身保留给自己、只分享做法时，可以生成 Blueprint。Blueprint 类似应用模板，分享的是代码；其他人据此创建各自独立的副本，再按自己的需求继续修改。

每个 Gadget 都提供便于智能体调用的 API。前后端通过 Cap'n Web RPC 通信，智能体可以在应用内部继续协作，不必再为每个小应用单独搭建一套 MCP 服务。MCP 是让 AI 连接外部工具和数据的通用协议，而 Cloudflare OS 在 Gadget 内部使用自己的调用机制完成这层连接。

## Gatekeepers 控制外部数据和写入操作

智能体和 Gadget 默认没有外部资源权限。用户需要把某个具体资源介绍给它，例如一个 GitHub 仓库，而不是一次性开放整个账户。负责连接外部服务的 Gatekeeper 会处理授权、限定可访问的资源并记录操作。

遇到会产生外部影响的操作时，Gatekeeper 会给用户保留批准或拒绝的环节。它可以先在本地模拟结果，让智能体继续规划后续步骤，再把多项操作集中交给用户审核。这样，读取信息和准备结果可以继续进行，真正的写入仍由人决定。

隔离也落在应用运行层。Gadget 的服务端运行在 Dynamic Worker 中，默认不能直接访问互联网，只能通过明确配置的 Workers Bindings 连接指定资源；客户端运行在沙箱 iframe 中，并通过内容安全策略限制网络访问。每个工作空间使用 Durable Object 保存状态，每个 Gadget 则在独立的 Dynamic Worker Facet 中运行。

## 可以本地体验，也能部署到 Cloudflare 账户

本地体验需要先安装 pnpm，在项目根目录运行：

```bash
pnpm run-local
```

随后访问 `http://localhost:8787`。这套命令使用 Wrangler 和开源 Workers 运行时 workerd 在本地启动完整堆栈，数据保存在项目的 `.wrangler` 子目录中。这个方式用于快速查看产品，不是生产部署方案。

希望使用 Cloudflare 托管资源的用户，可以通过 `os.cloudflare.app/deploy` 部署到自己的 Cloudflare 账户；需要配置 Gatekeepers 或修改代码时，还可以从 `cloudflare-os-starter` 仓库开始。Cloudflare OS 也能基于 workerd 运行在自有服务器上，但当前仓库把这条自托管路径列为后续提供完整文档和工具的内容。

## 现阶段适合试用和研究架构

2026 年 8 月公开的 Cloudflare OS v2 是一次重写，仓库将其标记为 Early Access，并说明仍处于快速开发阶段。对普通用户来说，最直接的体验路径是部署到自己的 Cloudflare 账户；对开发团队来说，这个仓库也提供了一套可阅读的智能体权限、应用隔离和协作架构。

接入 GitHub、Google、Notion、Slack 等外部服务时，相应 Gatekeeper 需要单独配置，部分服务还要求准备 OAuth 客户端凭据。准备放入企业数据前，应先在测试环境核对资源授权、操作日志、人工审批和分享权限，再决定接入哪些真实账户。
