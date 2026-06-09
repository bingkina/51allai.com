---
title: Google 升级 NotebookLM，接入 Gemini 3.5 与 Antigravity
permalink: posts/2026/06/google-notebooklm-gemini-antigravity/
tags:
  - google
  - notebooklm
  - gemini
  - product-update
date: 2026-06-09 12:31:41
categories:
  - 智能体
description: Google 升级 NotebookLM，接入 Gemini 3.5 与 Antigravity，新增云端代码执行、多格式导出和聊天内构建来源库能力。本文梳理官方评测数据、可用范围与可信度边界。
cover: https://storage.googleapis.com/gweb-uniblog-publish-prod/images/IMG_1_Hero_2x.width-1300.png
---

> Google 在 6 月 8 日升级 NotebookLM：默认底座转向 Gemini 3.5 与 Antigravity，给每个 notebook 配置安全云端计算机，可运行代码、生成文件，并从聊天中补全来源库。现阶段面向 Google AI Ultra 和部分 Workspace 商业客户开放。
![Google NotebookLM Gemini 3.5 与 Antigravity 升级界面](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/IMG_1_Hero_2x.width-1300.png)

## NotebookLM 开始承担执行型研究任务

Google 官方博客把这次更新定义为 NotebookLM 的“agentic capabilities”升级。具体变化有三项：聊天体验接入 Gemini 3.5 与 Antigravity；每个 notebook 配置安全云端计算机，可以写代码、运行代码；系统内置超过 100 个软件技能，用于处理更复杂的研究和分析任务。

这不是单纯换模型。NotebookLM 原来的强项是围绕用户上传资料做问答、摘要和内容生成，边界相对清楚。新版本开始把“找资料、分析资料、产出文件”连成一条链路：用户可以先用一个模糊问题启动项目，再让 NotebookLM 通过 Google Search 寻找相关网页来源，加入 notebook 后继续生成报告、图表或表格。

TechCrunch 对这一点的概括更直接：过去 NotebookLM 更依赖用户先带着来源进入产品，新版本开始在聊天中帮助用户搭建来源库。这会改变产品定位。它不再只是“基于资料的阅读器”，而是在向轻量研究代理靠近。

## 官方评测显示长文分析和网页研究提升最大

Google 给出了一组内部 side-by-side 评测数据。相对上一代系统，升级后的 NotebookLM 在五个核心评测维度上的平均胜率超过 65%，比平局线高 15 个百分点。长文档分析胜率为 69.9%；高级网页研究与来源发现胜率为 78.2%。

这些数字来自 Google 官方评测，不能当作第三方复现结果。Google 在脚注中解释，评测集覆盖 source-grounded Q&A、多语言交互、长文档理解、内容生成、多来源研究等 NotebookLM 常见场景。对读者更有用的信号是：Google 把最大增益放在“source discovery”和“large document analysis”上，这正对应 NotebookLM 过去最容易卡住的两个环节。

换成使用层面的语言：以前用户要先知道该放什么资料；现在产品试图帮用户找到资料。以前 NotebookLM 更多是解释资料；现在它要判断什么时候该生成结构化产物，比如摘要、学习指南、FAQ、briefing document、图表或表格。

## 导出格式扩展到 PDF、PPTX、XLSX 和结构化数据

NotebookLM 现在支持更多产物格式。Google 官方列出的新增类型包括：PNG / SVG 图表，PDF、DOCX、Markdown、TXT 文档，Nano Banana 生成的 PNG / JPG / GIF 图片，CSV / JSON 结构化数据，以及 Microsoft Excel 的 XLSX 和 PowerPoint 的 PPTX。

这项更新补的是知识工作流里的最后一公里。NotebookLM 过去已经能生成学习指南、摘要、音频概览和幻灯片，但很多输出仍停留在“可读，不一定可交付”的状态。PPTX、XLSX、CSV、JSON 的意义在于，它们能被拖进现有办公链路继续改，而不是只作为一个 AI 页面里的结果。

Google 还强调，用户可以给输出提供更细的指令，并在生成后继续编辑。结合 2 月份 NotebookLM 已经上线的幻灯片单页修改与 PPTX 导出，这条产品线的方向比较清楚：把 NotebookLM Studio 从内容生成入口，推成可下载、可修改、可交付的工作台。

## 开放范围仍然偏窄

这次升级从 2026 年 6 月 8 日起在 Web 端全球推出，但不是面向所有用户。Google 官方口径是：Google AI Ultra 用户，以及拥有 AI Ultra Access 和 AI Expanded Access 的 Workspace 商业客户可以使用，后续会扩大到更多用户。

这意味着免费版和普通付费层用户短期内可能看不到完整能力。对于企业用户，真正需要验证的不是“能不能生成 PPT”，而是安全云端计算机、网页来源发现、代码执行和 Workspace 数据边界如何落地。Google 官方博客没有披露执行环境的细节、资源限制、审计方式或数据隔离参数。