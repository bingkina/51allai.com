---
title: Cloudflare 发布 cf 命令行工具，覆盖 2900 多个 API 命令
permalink: posts/2026/10/cloudflare-cf-cli/
tags: [cloudflare, ai-agents, product-update]
sources:
  - name: Cloudflare 官方发布公告
    url: https://blog.cloudflare.com/cloudflare-cf-cli-launch/
    note: 发布日期、产品定位、API 覆盖范围与 Wrangler 迁移安排
  - name: Cloudflare CLI 官方文档
    url: https://developers.cloudflare.com/cf/
    note: 测试状态、命令数量、功能范围与 Wrangler 关系
  - name: Cloudflare CLI 安装与登录文档
    url: https://developers.cloudflare.com/cf/get-started/
    note: 运行要求、安装命令、认证方式与首次使用步骤
  - name: Cloudflare CLI 智能体使用文档
    url: https://developers.cloudflare.com/cf/agents/
    note: 命令搜索、Schema、dry-run 与智能体安全使用方式
  - name: Cloudflare cf 官方代码仓库
    url: https://github.com/cloudflare/cf
    note: 开源代码与许可证
date: 2026-10-01 15:25:13
categories: 智能体
description: Cloudflare 发布统一命令行工具 cf，测试版覆盖 2900 多个公共 API 命令，并整合 Workers 开发部署。本文说明默认 JSON、自然语言命令搜索、TypeScript 配置、Wrangler 迁移方式，以及开发者和 AI 编程智能体如何安装使用。
cover: https://images.51allai.com/blog/cloudflare-cf-cli-cover_20261001_152741.png
---

> Cloudflare 发布统一命令行工具 `cf`，测试版覆盖 2900 多个公共 API 命令，并可创建、开发和部署 Workers。它默认输出 JSON，提供自然语言命令搜索和 TypeScript 配置，面向开发者、自动化脚本与 AI 编程智能体。
![Cloudflare cf 统一命令行工具与 AI 编程智能体](https://images.51allai.com/blog/cloudflare-cf-cli-cover_20261001_152741.png)

## 产品介绍：一个入口管理 Cloudflare 公共 API 和 Workers

Cloudflare 于 2026 年 9 月 28 日发布 `cf` 开放测试版。它把域名、DNS、存储、安全设置和 Workers 项目放进同一个命令行入口，[官方文档](https://developers.cloudflare.com/cf/)列出 2900 多个命令；其中大部分从描述 Cloudflare API 的 Schema 生成，与 API 文档和 SDK 使用同一类结构化来源。

这次发布不是给 Wrangler 简单增加一批子命令。Wrangler 主要服务使用 `wrangler.jsonc` 或 `wrangler.toml` 配置的 Workers 项目，长期积累约 280 条操作路径。`cf` 同时覆盖公共 Cloudflare API 和 Workers 开发命令，代码已在 [Cloudflare 官方仓库](https://github.com/cloudflare/cf)公开，采用 Apache 2.0 与 MIT 许可证。

## 默认输出 JSON，智能体可以自己查找命令

`cf` 默认把结果以 JSON 写入标准输出，不需要额外添加 `--json`。进度、状态和错误信息进入标准错误流，因此脚本和 AI 智能体可以直接解析结果，或用 `jq` 过滤字段。

面对数千条命令，用户不必先记住完整层级。`cf cli search` 接受自然语言描述，在本地索引中返回最多五条匹配结果；搜索本身不需要登录。确定命令后，`cf schema` 可以列出对应 API 请求的方法、路径和参数，`--dry-run` 则会输出即将发送的请求而不执行变更。[智能体使用文档](https://developers.cloudflare.com/cf/agents/)还提醒，删除操作在非交互环境中可能因缺少 `--force` 而中止，但仍返回退出码 0，自动化流程需要同时检查错误输出中的 `Aborted.`。

```bash
cf cli search "create D1 database"
cf schema d1 create
cf d1 create --name my-database --dry-run
```

## Workers 改用 TypeScript 配置，Wrangler 项目可以逐步迁移

新建 Workers 项目使用 `cloudflare.config.ts`。这种配置可以获得类型检查和编辑器自动补全，也能通过代码复用不同环境的共同设置。`cf init` 用于创建项目，`cf dev`、`cf build` 和 `cf deploy` 分别处理本地开发、构建与部署，默认开发链路基于 Cloudflare Vite 插件。

现有 Wrangler 项目不需要立即重写。资源管理命令可以在原项目旁边直接使用；但在含有 Wrangler 配置、没有 `cloudflare.config.ts` 的项目里运行 `cf dev`、`cf build` 或 `cf deploy` 前，应先执行 `cf migrate --dry-run` 预览改动，再用 `cf migrate` 转换配置。依赖 Wrangler 打包能力的部分项目，`cf` 会继续委托 Wrangler 执行构建和部署。

`cf` 仍处于测试阶段，命令、配置格式和构建输出在稳定版前都可能变化。准备迁移生产项目的团队，适合先在分支或测试项目里检查生成的配置和 `TODO(@cloudflare)` 标记，再切换部署流程。

## 如何安装和开始使用

`cf` 要求 Node.js 22.18 或更高版本。虽然包管理器可以通过 Bun 安装它，但官方文档明确说明不能以 Bun 作为运行时，否则加载 `cloudflare.config.ts` 的命令会失败。

```bash
npm install --global cf
cf auth login
cf auth whoami
cf zones list
```

安装包同时提供 `cf` 和 `cloudflare` 两个等价命令；如果本机已有名为 `cf` 的程序，可以改用 `cloudflare`。登录过程会打开浏览器，让用户批准账户访问。`cf` 保存自己的登录凭据，不复用 Wrangler 的登录状态，因此已使用 Wrangler 的用户也要单独登录一次。完整步骤可查看[安装与登录说明](https://developers.cloudflare.com/cf/get-started/)。

无人值守的 CI 或远程智能体应使用权限最小化的 `CLOUDFLARE_API_TOKEN`，并在存在多个账户时显式设置 `CLOUDFLARE_ACCOUNT_ID`。`cf` 不支持 Global API Key，也不应把令牌写入版本库。

## 使用场景，适用人群

网站管理员可以用同一套命令查询 Zone、增删 DNS 记录和管理安全配置；Workers 开发者可以创建项目、在本地调试并部署；平台团队可以把 JSON 输出接入脚本和 CI；AI 编程智能体则能先搜索命令、读取参数 Schema、预览请求，再执行经过授权的操作。

对只维护一个 Wrangler 项目的开发者，现有流程仍可继续使用。`cf` 更适合需要同时操作 Workers 与其他 Cloudflare 产品，或希望让自动化程序和智能体使用统一、机器可读接口的团队。由于当前版本仍是 Beta，涉及删除资源、修改 DNS 或部署生产服务时，仍应保留人工确认和最小权限令牌。
