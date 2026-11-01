---
title: DeepSeek 开源 Super-agent 原型，支持 GitHub 与飞书协作
permalink: posts/2026/11/deepseek-superagent-prototype/
tags: [deepseek, ai-agents, agent-framework, open-source, coding-agent]
sources:
  - name: dsh-superagent 官方仓库与项目说明
    url: https://github.com/deepseek-ai/dsh-superagent-prototype
    note: 项目归属、研究原型定位、单仓库范围及 GitHub 与飞书入口
  - name: dsh-superagent 授权机制与默认策略
    url: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/002-authorization.md
    note: 明确请求、规则接单、观察模式与任务授权范围
  - name: dsh-superagent 任务执行与恢复机制
    url: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/003-execution.md
    note: 独立执行会话、任务目录、并发限制、后续消息与重启恢复
  - name: dsh-superagent 管理面板说明
    url: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/005-panel.md
    note: 人工待办、系统健康、任务记录与停止操作
  - name: dsh-superagent 部署文档
    url: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/006-deployment.md
    note: 安装依赖、Harness 版本、账号要求、权限与平台限制
  - name: dsh-superagent 引导安装流程
    url: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/SETUP.md
    note: 编程助手引导配置、默认设置与人工确认步骤
  - name: dsh-superagent 策略实现
    url: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/src/policy.ts
    note: observe 默认值、规则匹配与并发数量配置
  - name: dsh-superagent MIT 许可证
    url: https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/LICENSE
    note: 代码使用与修改许可
date: 2026-11-01 09:57:27
categories: 智能体
description: DeepSeek 开源 dsh-superagent-prototype，以 Harness 插件组合包连接 GitHub 和飞书，将任务分派与代码执行分开。本文介绍研究原型的工作流程、默认观察模式、安装入口及账号权限边界，帮助开发者判断是否适合试用。
cover: https://images.51allai.com/blog/deepseek-superagent-prototype-cover_20261101_100921.png
---

> DeepSeek 开源 Super-agent 研究原型 dsh-superagent-prototype，基于 Harness 连接 GitHub 和可选的飞书消息，将获准的工作交给独立会话执行，再回到原讨论交付结果。代码采用 MIT 许可证，面向单个仓库；主动接单默认只记录判断，适合开发者研究团队协作式 Agent 的运行机制。
![DeepSeek Super-agent 原型的任务分派与 GitHub 飞书协作流程](https://images.51allai.com/blog/deepseek-superagent-prototype-cover_20261101_100921.png)

## 从讨论接收任务，再回到原处交付

[dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) 是 DeepSeek Harness 团队开源的编程智能体研究原型。Agent，也就是智能体，在这里指能围绕目标调用工具、修改代码并跟进结果的 AI。项目以 Harness 插件组合包运行，服务于一个 GitHub 仓库，也可以接入飞书。

一个典型流程是：获准的团队成员在 GitHub 讨论中向智能体提出请求，系统建立任务，在独立会话和目录中处理代码，随后把结果发回原讨论。交付物可以是一份 Pull Request（PR，即请求团队审查并合并代码的变更）。接入飞书后，团队也能从聊天中发起工作。

这套机制适合围绕同一代码仓库协作的团队，以及想研究任务调度、授权和消息衔接的开发者。它定位为研究代码，使用前需要审查并适配自己的环境。

## 主会话分派工作，执行器处理代码

Super-agent 把任务协调和具体执行分开。主会话使用 Router 角色，负责判断消息该建立新任务、补充已有任务，还是忽略；Worker 则是执行器，负责推进一项已接受的工作。

| 环节 | 具体处理方式 |
| --- | --- |
| 消息接入 | GitHub 和飞书消息进入系统，按发送者、会话范围和策略判断能否发起工作 |
| 任务分派 | 主会话接受任务或把后续消息交给已有任务，并保留授权范围 |
| 代码执行 | 每个任务有自己的执行会话和目录，可用 Git worktree 准备同一仓库的独立检出目录 |
| 人工处理 | Web 面板集中展示等待回答、等待审查、受阻或失败的任务 |

执行器的并发数量可以配置，默认是 3 个。任务排队、执行与等待人工处理有不同状态，用户可以在面板查看某项工作停在哪里。

任务与原讨论的关联也会保留。审查意见或后续消息可以送回对应执行器，让它继续处理；超出原任务范围的请求则交回主会话重新分派。系统还保存任务、订阅和待处理消息，重启后可据此恢复工作。

对已有 [DeepSeek Harness 开发者预览版](/posts/2026/08/deepseek-harness-developer-preview/)使用经验的读者，这次原型增加的是围绕团队消息建立、分派和持续跟进任务的一套流程。

## 主动接单默认先观察

“主动”由授权策略和规则控制。名单内成员直接向智能体提出的请求，可以按明确请求处理；系统从其他消息中推断出的潜在工作，需要经过规则评估。

主动接单有三种模式：

| 模式 | 对推断出的工作的处理 |
| --- | --- |
| `off` | 不接收这类候选工作 |
| `observe` | 评估并记录“本来会接受”的任务，不启动执行 |
| `auto` | 评估通过且至少命中一条已启用规则时，接受任务 |

默认值是 `observe`。团队可以先检查判断记录，确认规则和接收范围，再决定是否改为 `auto`。获准用户的明确请求在这三种模式下都能处理，观察模式只限制推断出的主动工作。

每项任务会记录接受时的策略版本和授权范围。讨论消息、评论和引用文档用于理解任务，本身不能改写这些权限。用户也可以在面板直接停止某项任务。

## 如何开始试用

安装需要 Node.js 22.19 及以上的 22.x 版本或 24 及以上版本，以及 pnpm、Git 2.32+、Python 3.8+、tmux、GitHub CLI 2.48+。Harness 还需配置可用的模型服务；部署示例固定使用 `@deepseek-ai/dsh@0.2.1-rc.3`。

先获取代码：

```bash
git clone https://github.com/deepseek-ai/dsh-superagent-prototype.git
cd dsh-superagent-prototype
```

然后让编程助手读取仓库中的 [`SETUP.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/SETUP.md)，协助完成安装。可以直接输入：

```text
Read SETUP.md in this repository and set up dsh-superagent with me.
```

引导流程会收集目标仓库、智能体账号、允许发起任务的成员、代码检出位置和合并方式，汇总计划后等待用户确认，再安装和配置。账号登录与密钥输入在用户自己的终端完成。

手动安装则从[部署文档](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/006-deployment.md)进入：构建插件、创建独立的 `superagent` Harness 配置、链接插件，再设置仓库和执行目录。服务启动后，在 Harness Web 侧栏打开 Superagent 面板。面板优先显示需要人处理的工作，也能查看系统健康和单项任务的历史。

## 试用前要确认的运行边界

当前原型服务于 `github.com` 上的单个仓库，不支持 GitHub Enterprise Server。智能体需要专用 GitHub 用户账号及仓库写权限；由于依赖账号通知，GitHub App 不能替代这个账号。飞书接入还需额外配置机器人和 `lark-cli`。

**独立任务目录不等于操作系统隔离。** 执行器以运行服务的系统用户身份执行命令，无需逐条审批，并可读取该用户的主目录。若要隔离个人文件和凭据，应使用只保存智能体所需凭据的专用系统账号。

代码采用 MIT 许可证，可以按许可要求使用和修改。公开版本是经过整理的研究原型，与内部实现及完整设计文章有区别。试用时应以仓库中的功能和部署流程为准，先选择一个范围清楚的仓库任务，通过观察记录和 PR 审查确认它的行为。
