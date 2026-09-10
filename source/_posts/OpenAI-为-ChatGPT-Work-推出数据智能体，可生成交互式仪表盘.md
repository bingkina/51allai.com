---
title: OpenAI 为 ChatGPT Work 推出数据智能体，可生成交互式仪表盘
permalink: posts/2026/09/openai-chatgpt-work-data-agent/
tags: [openai, chatgpt, ai-agents, product-update]
sources:
  - name: Now everyone can put data to work | OpenAI
    url: https://openai.com/index/put-data-to-work/
    note: 发布日期、数据源、仪表盘、权限与安装方式
  - name: ChatGPT 官方 X 帖子
    url: https://x.com/ChatGPT/status/2098065296968011853
    note: 数据智能体发布与 Data 插件入口
  - name: Data Analytics | ChatGPT Plugins
    url: https://chatgpt.com/plugins/Plugin_fc9843a6fb34819195d6c7802398a8a7
    note: 插件功能、数据工具与可审查交付物
  - name: ChatGPT Work and Codex | OpenAI Help Center
    url: https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
    note: ChatGPT Work 定位、可用终端与用量规则
date: 2026-09-10 23:12:19
categories: 智能体
description: OpenAI 为 ChatGPT Work 推出数据智能体，可连接企业数据源，用自然语言调查指标变化并生成可编辑、分享和刷新的交互式仪表盘。本文说明连接范围、权限边界与启用步骤。
cover: https://images.51allai.com/blog/openai-chatgpt-work-data-agent-cover_20260910_232836.png
---

> OpenAI 于 2026 年 9 月 10 日为 ChatGPT Work 推出数据智能体。用户可用自然语言查询已授权的企业数据，追问指标变化的原因，再将分析生成可编辑、分享和刷新的交互式仪表盘。
![ChatGPT Work 数据智能体与交互式仪表盘](https://images.51allai.com/blog/openai-chatgpt-work-data-agent-cover_20260910_232836.png)

## 从业务问题直接开始分析

Data 智能体运行在 ChatGPT Work 中，主要处理企业里的产品、运营、销售和财务数据问题。用户可以直接询问“上周活跃用户为什么变化”，让它比较前后时段、查找可能的驱动因素，并继续追问结果。使用过程不要求用户手写数据库查询语句。

它不只输出一次性回答。分析结果可以转成内置交互式仪表盘，团队成员能够编辑、分享和刷新。用户也可以把品牌规范加入任务，调整图表和页面的视觉样式。

![ChatGPT Work 数据智能体与交互式仪表盘](https://images.51allai.com/blog/截屏2026-09-10_23.29.29_2_20260910_233011.png)

## 可连接数据仓库、文档和 BI 工具

已公布的数据源包括 Amazon Redshift、Datadog、Google BigQuery、ClickHouse、Databricks、MongoDB 和 Snowflake。Google Drive 与 SharePoint 里的文件和文档也能加入分析。

单有原始表格还不足以准确理解企业指标。Data 智能体还可读取业务术语、指标定义、自定义计算方式和数据间的关系。这些上下文可以来自 Databricks Genie Ontology、dbt、GitHub、Snowflake Horizon 和现有 BI 仪表盘。BI 是商业智能的缩写，这里指企业已有的数据分析和报表系统。

它还能在 Omni、Oracle BI、Power BI、Sigma、Tableau 和 ThoughtSpot 中创建或操作仪表盘。因此，团队可以保留现有数据平台，通过 ChatGPT Work 用自然语言指挥分析。

## 查询继续遵守现有数据权限

企业管理员决定哪些数据连接可用，以及哪些角色可以使用它们。Data 智能体发出查询时，会执行已连接账号原有的表、行和列级权限。连接并不会让成员越过数据平台已有的访问范围。

分析完成后，Data 智能体可以通过 Slack 或电子邮件分享结果，也可以通过已连接工具执行用户批准的后续操作。这类写入和对外发送会继续受工作区设置、应用权限与确认机制约束。

## 在插件目录安装后使用 @Data

具备 ChatGPT Work 访问权限的账号，可以在 Plugins 目录找到 Data，选择“Install plugin”并完成所需的账号连接。之后在对话中输入 `@Data`，再直接提出业务问题。

企业管理员也可以从“Workspace settings > Plugins”为团队安装或开放 Data，然后配置 Databricks、Snowflake 等数据源插件及可用角色。在 ChatGPT Work 中运行数据分析任务，会沿用 [ChatGPT Work 与 Codex 共享额度](/posts/2026/08/openai-plus-codex-five-hour-limit/) 的用量结构。
