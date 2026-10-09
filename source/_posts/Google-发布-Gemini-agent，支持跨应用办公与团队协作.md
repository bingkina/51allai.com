---
title: Google 发布 Gemini agent，支持跨应用办公与团队协作
permalink: posts/2026/10/google-gemini-agent-work/
tags: [google, gemini, ai-agents, productivity]
sources:
  - name: Google Cloud introduces the Gemini agent
    url: https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-at-work/
    note: 发布日期与企业办公定位
  - name: Welcome to Gemini at Work 2026 — Introducing the Gemini agent
    url: https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026
    note: 云端执行、Workspace 协作、独立身份、权限与费用控制
  - name: Empowering SMBs to do more with Gemini
    url: https://cloud.google.com/blog/topics/startups/how-to-grow-your-small-business-using-google-gemini
    note: 中小企业应用场景与实施支持
  - name: Gemini for Business 产品页面
    url: https://cloud.google.com/gemini-enterprise
    note: 企业试用入口、早期访问范围与数据权限
date: 2026-10-09 10:20:42
categories: 智能体
description: Google 发布面向企业办公的 Gemini agent，把问答、内容生成、代码执行与跨应用任务放进同一个入口。本文介绍云端持续执行、Workspace 团队智能体的独立身份、适用场景，以及企业权限和费用控制方式。
cover: https://images.51allai.com/blog/google-gemini-agent-work-cover_20261009_102412.png
---

> Google 于 2026 年 10 月 8 日发布面向企业办公的 Gemini agent，支持规划任务、调用工具并把结果交回办公应用。它能作为带独立账户的团队成员参与协作；后台多步任务等能力处于早期访问阶段，企业可配置访问权限和项目支出上限。
![Google Gemini agent 跨应用办公与团队智能体协作示意](https://images.51allai.com/blog/google-gemini-agent-work-cover_20261009_102412.png)

## 产品介绍：把工作目标交给 Gemini agent

Gemini agent 是面向企业工作流程的智能体。用户交给它一个目标，它规划步骤、调用工具、连接业务系统，完成问答、文档与媒体制作、代码编写和运行。智能体指能够使用工具执行任务的 AI；这里的重点是把成果交回文档、邮箱或开发环境。

它支持定时任务和事件触发，在云端保留任务上下文，合上电脑后长任务仍可继续。复杂工作可以拆给临时子智能体，协调并行或先后执行的步骤。产品与企业部署信息可从 [Gemini Enterprise](https://cloud.google.com/gemini-enterprise) 入口了解。

企业可联系 Google Cloud 销售，或自行开启 Gemini Enterprise Plus 的 30 天免费试用。后台多步任务、移动端与桌面端 Gemini，以及第三方模型选择处于早期访问阶段，试用套餐与这些功能的开放范围需要分别确认。

## Workspace 内协作，团队智能体拥有独立身份

Gemini 可在 Gmail、Drive、Docs、Slides、Sheets、Chat 和 Calendar 内工作。例如，把邮件中的项目汇报需求交给它整理成演示文稿，或结合聊天群成员和已有邮件协调会议时间。

团队还可以创建承担固定职责的 coworker agent，即团队协作智能体。它拥有自己的 Workspace 账户、邮箱、日历和 Drive，成员可以在群聊中提及它，也可以在文档评论里让它处理工作。操作以智能体自己的身份记录，它只读取分享给它的内容。

## 使用场景与适用人群

适合先尝试的任务，是材料已经在企业系统里、输出形式清楚的工作：项目汇报、会议协调、内部资料检索，以及文档和演示稿整理。项目负责人、市场团队和行政人员可以从这类重复流程开始。

中小团队也可以利用 Gemini 连接已有系统与数据，处理后台行政工作、查找历史文件和支持客户沟通。实施时可通过 [Google Cloud Partner Network](https://cloud.google.com/partners) 寻找合作伙伴，协助选择场景、制作原型和部署智能体。

## 企业如何控制权限与费用

企业管理员可为智能体配置按角色划分的访问权限；动作进入审计记录，代码执行放在隔离环境中，网络访问经过 Agent Gateway 策略检查。部署时需要把它能读取哪些资料、能执行哪些动作设定清楚。

项目还可设置 AI 支出硬上限。系统跟踪模型处理用量和隔离执行环境的费用，达到上限后暂停该项目的智能体。

选择模型与配置智能体是两个层面的工作。需要了解 Gemini 模型接口的读者，可以参阅 [Gemini 3.7 Flash 的稳定 API 与多模态输入说明](/posts/2026/08/google-gemini-37-flash/)。
