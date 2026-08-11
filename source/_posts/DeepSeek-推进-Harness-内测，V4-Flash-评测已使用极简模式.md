---
title: DeepSeek 推进 Harness 内测，V4-Flash 评测已使用极简模式
permalink: posts/2026/08/deepseek-harness-code-agent-beta/
tags:
  - deepseek
  - deepseek-v4
  - coding-agent
  - agent-framework
  - product-update
date: 2026-08-11 23:26:20
categories:
  - 智能体
description: DeepSeek Harness 已进入定向内测招募，并被用于 V4-Flash 的公开代码智能体基准测试。本文解释 Harness 如何连接模型、文件与终端，梳理当前参与条件、官方评测口径，以及普通开发者现阶段可使用的 DeepSeek 编程工具接入方式，帮助读者分清自研 Harness 与第三方 Agent 工具。
cover: https://images.51allai.com/blog/deepseek-harness-code-agent-beta-cover_20260811_233138.png
---

> DeepSeek 正在为 Harness 招募有开源智能体项目经验的内测参与者。V4-Flash 的官方更新日志还确认，公开代码智能体基准测试已经使用 DeepSeek Harness 极简模式，产品从内部工程系统走到了定向测试阶段。
![DeepSeek Harness 代码智能体执行框架封面](https://images.51allai.com/blog/deepseek-harness-code-agent-beta-cover_20260811_233138.png)

## Harness 负责让模型真正操作代码仓库

Harness 不是一个新模型，而是围绕模型运行的执行系统。模型负责理解需求、推理和生成下一步动作；Harness 把这些动作接到真实工具上，例如读取文件、修改代码、运行终端命令、收集测试结果，再把执行结果送回模型继续处理。

在普通聊天窗口里，让模型“修复测试失败”通常只会得到一段建议或代码片段。进入代码智能体工作流后，同一个请求会变成循环任务：检查仓库、定位失败、修改文件、运行测试、读取报错，再决定是否继续调整。谁来保存任务上下文、怎样组织工具调用、如何把终端输出交还给模型，都属于 Harness 的工作范围。

DeepSeek 招聘站已经把“Agent Harness 团队”列为独立招聘方向，同时还在招募 Agent Infra、Agent 后端、前端与客户端开发、Code Agent 数据工程等岗位。这些公开岗位把团队范围指向完整的智能体产品链路，而不是只为模型补一组提示词。

## V4-Flash 的代码智能体评测已经使用 Harness

DeepSeek 在 7 月 31 日更新 V4-Flash 正式版 API 时，第一次给出了 Harness 的明确技术落点：公开基准中的 Code Agent 任务使用 DeepSeek Harness 极简模式运行，推理档位设为 `max`，`top_p` 为 0.95，`temperature` 为 1.0。

这条注释很重要，因为代码智能体评测测到的不只是模型。工具定义、系统提示、上下文整理、失败重试和执行环境都会影响最终结果。同一个模型放进不同 Harness，完成任务的步骤、成本和成功率可能不同。因此，V4-Flash 更新日志中的分数更适合用来说明 DeepSeek 的模型与自研执行框架已经联合测试，不能脱离这套设置直接当成与其他编程工具的同条件排名。

官方把这套极简模式标为“即将发布”。它至少说明当前测试没有完全依赖现成的 Claude Code、Codex 或其他第三方框架，DeepSeek 已经用自己的执行层跑公开代码智能体任务。

## 内测先面向做过开源 Harness 的开发者

DeepSeek Agent Harness 团队负责人崔添翼随后公开征集内测参与者。招募对象是做过 Agent Harness 相关开源项目的开发者，报名需要提供 GitHub ID 和代表项目。公开列出的项目类型覆盖 plugin、skill、MCP、orchestrator、aggregator 和 UI，团队会从报名者中选择一部分进入测试，并提供部分 API 额度用于适配。

这不是面向所有用户的注册入口，而是一次带项目筛选的开发者内测。筛选条件也透露了测试重点：团队希望现有智能体工具、协议、编排器和界面项目在 Harness 推出时完成接入。对普通用户来说，现在能直接使用的仍是 DeepSeek 已公开的 API 与第三方 Agent 工具接入方案；对框架作者来说，代表项目和实际维护经验才是这轮内测的申请材料。

## 现有开发者可以先用 V4-Flash 接入编程工具

等待 Harness 扩大开放范围并不妨碍开发者使用 DeepSeek 做代码任务。DeepSeek API 文档已经提供 Claude Code、Codex、OpenCode、Pi 等 Agent 工具的接入指南。V4-Flash 原生支持 Responses API，并针对 Codex 做了适配；开发者可以把 `deepseek-v4-flash` 设为后端模型，在现有编程智能体里调用。

这条路径与 DeepSeek Harness 不是同一项产品。前者是把 DeepSeek 模型接入已经公开的第三方工具，工具的上下文管理和执行循环由第三方实现；后者是 DeepSeek 自研的执行层，当前公开证据集中在官方评测设置和定向内测招募。

对准备申请或后续接入的开发者，眼下最有用的准备不是猜测界面，而是整理自己的开源 Agent 项目：它解决了什么执行问题，怎样管理上下文和工具，失败后如何恢复，以及如何让其他模型或协议接入。这些内容正好对应本轮招募明确点名的项目类型。
