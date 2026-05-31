---
title: OpenAI 扩大 Codex for Open Source，开源维护者可申请 Pro 与 API 额度
permalink: posts/2026/05/openai-codex-for-open-source/
tags: [openai, codex, open-source, product-update, security]
date: 2026-05-31 09:09:30
categories:
  - 智能体
description: "OpenAI 扩大 Codex for Open Source，面向核心开源维护者提供 6 个月 ChatGPT Pro、API 额度和有条件 Codex Security，重点覆盖 PR 审查、问题分类和发布维护。"
cover: https://images.51allai.com/blog/截图2026-05-31_09.11.07@2x_20260531_091652.png
---

> OpenAI 将 Codex Open Source Fund 扩展为面向开源维护者的申请制项目。入选者可获得 6 个月 ChatGPT Pro、项目 API 额度，以及按仓库需求评估的 Codex Security 访问权；目前核心信息来自 OpenAI 官方页面。
![Codex for Open Source 申请页面](https://images.51allai.com/blog/截图2026-05-31_09.11.07@2x_20260531_091652.png)

## 计划从 API 额度扩展到维护者工具包

OpenAI 开发者社区页显示，Codex for Open Source 面向开源维护者开放申请。项目不是新的开源模型发布，而是给维护者提供 Codex 相关工具和额度，覆盖日常编码、问题分类、代码审查、维护自动化和发布流程。

官方页面同时提到，过去一年 Codex Open Source Fund 已以 100 万美元规模支持需要 API credits 的项目，其中包括把 Codex 用于 GitHub PR 工作流的团队。现在该基金的支持范围扩大到 ChatGPT Pro with Codex、API credits 和 Codex Security。

## 入选维护者能拿到什么

OpenAI 列出的支持包括三项：

- 6 个月 ChatGPT Pro，包含 Codex，用于日常编码、triage、review 和维护工作流。
- 面向项目的 API credits，可用于 PR review、维护自动化、发布工作流和其他核心 OSS 工作。
- Codex Security 的有条件访问权限，主要面向有更深安全覆盖需求、且符合条件的仓库。

这里需要区分事实和官方口径：6 个月 Pro、API 额度、Codex Security 条件访问是官方页面明确写出的项目内容；这些工具实际能为维护者节省多少时间，OpenAI 暂未给出统一的第三方评测数据。

## 申请门槛看重维护职责，而不只看星标

OpenAI 表单要求申请者填写 GitHub 用户名、公开仓库 URL、维护者角色、仓库星标数、月下载量或生态重要性说明，还要求填写 OpenAI 组织 ID 和 API 额度用途。

开发者社区页给出的申请对象是“核心维护者或广泛使用的公开项目”。如果项目没有典型的高星标或高下载量，但在生态系统中承担明确角色，OpenAI 也建议申请者解释原因。这意味着审核会看仓库使用情况、生态重要性和持续维护证明，而不是单一指标。

## 对开源维护者的真实价值在低可见度工作

这类计划值得关注的点，不在“免费 Pro”本身，而在维护任务的结构：PR 审查、issue 分类、版本发布、依赖和安全修复都很耗时，但外部贡献者通常看不到这部分劳动。

Codex 如果能稳定接入这些流程，价值会先出现在低可见度的维护环节：重复性 review、变更摘要、测试失败定位、release checklist、漏洞修复建议。反过来，风险也在这里：自动化系统接触代码、CI、权限和安全上下文时，维护者仍需要保留最终审查权。
