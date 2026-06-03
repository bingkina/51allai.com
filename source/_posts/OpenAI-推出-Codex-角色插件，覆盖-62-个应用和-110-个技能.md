---
title: OpenAI 推出 Codex 角色插件，覆盖 62 个应用和 110 个技能
permalink: posts/2026/06/openai-codex-role-plugins/
tags: [openai, codex, product-update, agent-framework, role-plugins]
date: 2026-06-03 12:15:50
categories:
  - 智能体
description: OpenAI 推出 Codex 角色插件，官方称六类插件合计覆盖 62 个应用和 110 个技能，Codex 正从编程工具扩展到数据分析、销售、设计和金融等白领流程。
cover: https://images.51allai.com/blog/image_20260603_123034.png
---

> OpenAI 在 2026 年 6 月 2 日发布 Codex 重大更新，把重点从编程代理扩展到白领工作流。官方称，新推出的六类角色插件合计包含 62 个应用和 110 个技能，并加入 Sites 和内容批注能力。
![openai-codex-role-plugins](https://images.51allai.com/blog/image_20260603_123034.png)

## Codex 的目标人群被重新定义

OpenAI 这次没有把 Codex 包装成更强的代码补全工具。官方博客开头给出的信号很直接：Codex 周活跃用户超过 500 万，非开发者约占整体用户的 20%，增长速度是开发者的 3 倍以上。

这组数据来自 OpenAI 自述，Axios 也在报道中引用了同一口径，并补充称知识工作者中增长最快的任务包括数据分析、研究，以及报告、备忘录、文档、合同、多媒体素材、PDF 和电子表格等知识产物。Axios 报道称，数据分析任务周环比增长 110%，研究增长 37%，知识产物增长 36%。

更值得注意的是并发使用习惯。Axios 引述 OpenAI 数据称，超过 60% 的用户现在会在一天中的某个时间同时运行多个 Codex 任务，4 月中旬这一比例还不到一半。对办公室工作来说，这意味着 Codex 不只是回答问题，而是被当作多个后台工作流的调度器。

## 六类角色插件把工具链打包

OpenAI 称，本次上线六类面向角色的插件：数据分析、创意生产、销售、产品设计、公开股票投资和投资银行。每个插件把应用连接、技能、说明和工作流打成包。官方给出的合计规模是 62 个常用应用和 110 个技能。

插件覆盖的不是泛泛的“办公提效”。数据分析插件连接 Snowflake、Databricks Genie、Hex、Tableau 等工具，用于解释指标变化、生成报告和仪表盘。创意生产插件面向营销与创意团队，连接 Figma、Canva、Shutterstock、Picsart、Fal 等工具，处理广告变体、商品图和活动素材。销售插件连接 Salesforce、HubSpot、Slack、Outreach、Clay、Rox、Actively 等系统，用于客户上下文检索、会后跟进和风险交易检查。

产品设计插件偏原型和流程审查，重点工具包括 Figma 和 Canva。金融侧被拆成公开股票投资和投资银行两类：前者强调财报、公司比较、投资主题跟踪，后者面向 pitch 材料、可比公司和交易分析、尽调结论整理。

OpenAI 官方 GitHub 的 `role-based-plugins` 仓库目前也给出模板化结构：每个插件通常包含 `.codex-plugin/plugin.json`、应用绑定、MCP 配置、技能目录和资产目录。仓库 README 同时提醒，带连接器的插件可能包含占位 app 或 connector id，安装前需要替换为目标工作区可用的绑定。

## Sites 和批注把交付物留在 Codex 内

除了插件，OpenAI 还给 Codex 加了两个更偏“交付物”的能力。

Sites 面向 Business 和 Enterprise 预览开放。官方描述是，Codex 可以把想法、分析和计划生成可分享的交互式网站或应用，例如客户评审页、收入预测规划器、活动运营仪表盘、产品发布中心。这里的重点不是建站工具，而是把仪表盘、项目板、资料库这类工作产物直接做成团队可访问的 URL。

批注能力则把开发者熟悉的局部修改扩展到文档、表格和幻灯片。用户可以选中文档里的某个论断让 Codex 查来源，标记幻灯片里的图表要求重写标签，或选中站点导航栏要求改字体。OpenAI 的说法是，Codex 会围绕选中部分修改，而不是重做整个产物。