---
title: Cloudflare 发布 @cloudflare/computer，为 AI 智能体提供持久工作区
permalink: posts/2026/08/cloudflare-computer-agent-workspace/
tags:
  - cloudflare
  - open-source
  - agent-framework
  - product-update
date: 2026-08-04 19:03:50
categories:
  - 智能体
description: Cloudflare 发布开源运行时 @cloudflare/computer，为 AI 智能体提供基于 Durable Objects 和 SQLite 的持久工作区。它让不同执行后端共用文件，完成读写、命令与 Git 操作，并提供权限门控、审计和观测能力。本文梳理 Worker 隔离环境、Linux 容器、接入步骤、容量与预览版限制，帮助开发者判断是否适合用于实验和原型。
cover: https://images.51allai.com/blog/cloudflare-computer-agent-workspace-cover_20260804_190926.png
---

> Cloudflare 发布 @cloudflare/computer 早期预览版，为 AI 智能体提供可持续保存文件的工作区，并把轻量 Worker 隔离环境与完整 Linux 容器放在同一套运行接口下。项目采用 MIT 许可证，当前只适合实验和原型开发。
![Cloudflare Computer AI 智能体持久工作区与多后端运行环境](https://images.51allai.com/blog/cloudflare-computer-agent-workspace-cover_20260804_190926.png)

## 它不是一台远程桌面云电脑

@cloudflare/computer 是给开发者使用的开源智能体运行时。它把文件系统、命令执行和 Git 操作整理成一套工作区接口，让 AI 智能体可以读取代码、改写文件、运行测试，再继续处理下一步任务。

这里的“computer”不是带桌面窗口的消费级云电脑。它更接近一间给智能体使用的持久工作室：文件留在工作区中，执行任务时再接入合适的计算环境。开发者不必把每一步都固定在同一个长期运行的 Linux 容器里。

Cloudflare 在 2026 年 8 月 3 日发布早期预览版。npm 上的当前版本为 0.1.1，代码托管在 Cloudflare 的公开 GitHub 仓库，并使用 MIT 许可证。

## SQLite 保存工作区，Durable Object 负责状态

工作区运行在 Cloudflare Durable Objects 中。Durable Object 可以理解为带持久状态的 Worker 实例；@cloudflare/computer 使用它自带的 SQLite 存储作为文件系统的权威数据源，所以工作区可以跨重启保留。

开发者可以通过接近 `node:fs/promises` 的异步接口读写文件、创建目录、列出内容、删除文件和搜索文本。工作区还可以挂载 R2 存储桶中的只读文件，也能使用内置 Git 客户端克隆仓库、暂存改动和提交版本。

每个工作区大约可使用 10 GB，并与对应 Durable Object 的存储配额共享。这个设计适合代码、文档和智能体任务产生的小型文件集合，不适合直接搬入体积很大的单体仓库。

## 三种后端共用同一批文件

当前仓库提供三种执行后端，开发者可以按任务选择，也可以在一个工作区中同时注册多个后端：

- Container 后端提供完整 Linux 用户空间，可以运行真实二进制文件、Node.js、npm 和需要联网的命令。工作区通过 FUSE 挂载到容器，改动再同步回 SQLite 文件系统。
- Worker shell 后端在 Dynamic Worker 中用 just-bash 执行 Shell 命令，不需要容器或 Docker，适合文件整理、文本处理和常见命令。
- Worker JavaScript 后端在新的 Dynamic Worker 中执行 ECMAScript 模块，可以使用结构化输入和输出，并访问工作区支持的文件接口。

三种后端都通过 `workspace.runtime.exec()` 进入。开发者可以明确指定后端，也可以在给 AI 智能体的工具描述中解释每个后端适合什么任务。这样，普通文件操作可以留在启动更轻的 Worker 环境，需要原生程序时再交给容器。

## 给智能体准备了文件与命令工具

软件包提供兼容 AI SDK 的工具封装，包括 `read`、`write`、`edit` 和 `ls`。配置执行环境后，还可以加入 `exec`；开发者可以限制单次读取的字节数和行数，并为不同后端写清用途。

所有工作区操作都可以接入权限门控、审计和观测。对开发者来说，这比直接把一个无限制 Shell 交给模型更容易控制：应用可以限定智能体能读什么、能改什么，并留下操作轨迹。

最小接入方式是先安装 npm 包，再把工作区放进 Durable Object：

```bash
npm install @cloudflare/computer
```

基础文件系统需要为 Worker 开启 `nodejs_compat`。Worker shell 和 Worker JavaScript 后端还需要 `experimental` 兼容标记与 Worker Loader 绑定；Container 后端则需要 Cloudflare Container 和随包提供的 `computerd` 服务。

## 当前只适合实验与原型

Cloudflare 把这个版本明确标记为 Preview Only。API 仍可能变化，仓库文档中的部分设计说明也用于表达后续方向，不代表当前代码已经全部实现。

容器侧文件系统保存在内存中，并通过 FUSE 与工作区同步。大量安装 `node_modules`、解压大型归档或持续读写大文件，会比容器原生磁盘慢。需要构建生产级智能体的团队，应先用小型代码库和可丢弃任务验证工作区容量、同步开销与后端配置，再决定是否把它接入现有流程。
