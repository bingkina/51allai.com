---
title: DeepSeek 开放 Harness 开发者预览版，源码采用 MIT 协议
permalink: posts/2026/08/deepseek-harness-developer-preview/
tags:
  - deepseek
  - coding-agent
  - agent-framework
  - open-source
  - product-update
date: 2026-08-13 21:06:37
categories:
  - 智能体
description: DeepSeek Harness 开发者预览版已开放安装并公开源码，采用 MIT 协议和“一切皆插件”架构。本文梳理 npm 启动方式、Web UI 工作区、DeepSeek 与自定义模型配置、文件和命令权限、插件扩展机制，以及开发者需要注意的预览版实际使用与版本升级边界。
cover: https://images.51allai.com/blog/deepseek-harness-developer-preview-cover_20260813_211344.png
---

> DeepSeek Harness 结束了只面向少数项目开发者的定向测试阶段，开发者预览版已可通过 npm 运行。项目源码同步公开，采用 MIT 协议，开发者可以配置模型、选择本地工作区，再通过 Web UI 让智能体读写文件和运行命令。
![DeepSeek Harness 开发者预览版与插件架构封面](https://images.51allai.com/blog/deepseek-harness-developer-preview-cover_20260813_211344.png)

## 开发者现在可以直接运行 Harness

DeepSeek Harness 不是新模型，而是让模型执行实际任务的智能体框架。模型负责理解需求和决定下一步，Harness 负责准备上下文、调用工具、记录会话和管理执行过程。对代码任务来说，它把“给出一段代码”变成一个可以读取仓库、修改文件、执行命令和检查结果的循环。

开发者安装 Node.js 后，可以在项目目录运行：

```bash
npx @deepseek-ai/dsh web
```

命令会启动本地 Web UI，默认地址是 `http://127.0.0.1:3080`。新界面需要先配置模型，再添加一个本地目录作为工作区。选定工作区后，智能体才能开始会话并操作其中的文件。

## Web UI 把模型、工作区和权限放在一起

模型设置页可以保存 DeepSeek API 密钥，保存后不需重启服务。它也支持 Anthropic、OpenAI 等模型提供方，以及自定义 OpenAI 兼容端点。这个设计把 Harness 与某一个固定模型拆开：使用者可以在同一套执行环境里切换已配置的模型。

一次任务可以读取和编辑工作区文件、运行命令、维护计划，也可以把工作委派给子智能体。遇到当前权限策略要求用户审批的操作时，Web UI 会先询问，而不是直接执行。开发者在把真实仓库交给它之前，仍需要检查工作区范围和权限设置。

## “一切皆插件”不只是界面扩展

DeepSeek Harness 的模型适配器、工具注册表、会话日志和 Agent Loop 都以插件形式组合。Agent Loop 可以理解为智能体反复执行“思考、调用工具、读取结果”的循环。在这套架构里，开发者可以替换模型提供方、文件系统、命令执行后端、沙箱或子智能体实现，不需要把新能力硬写进一个固定内核。

运行时会按配置组合多层插件包。用户自己的配置位于这些默认层之上，因此既可以加入新插件，也可以覆盖默认服务。项目还提供了插件开发文档，并建议在公开插件仓库上添加 `dsh-plugin` 主题，方便其他开发者发现。

## 源码和 npm 包都已公开

项目的 GitHub 仓库已公开，许可证为 MIT。npm 上的 `@deepseek-ai/dsh` 同样标注 MIT，并把 `dsh` 暴露为命令行入口。开发者除了直接用 `npx` 启动，也可以克隆仓库，安装依赖后从源码构建。

GitHub 地址：[https://github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

当前版本明确定位为开发者预览，仓库提醒后续会出现破坏兼容性的变更。对想研究架构、开发插件或验证本地工作流的人，现在已经有可运行的入口；对需要稳定接口的生产项目，则要把版本变更纳入升级和回滚流程。
