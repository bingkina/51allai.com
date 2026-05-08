---
title: Claude正式接入Office全家桶，跨应用还能共享记忆
permalink: posts/2026/05/claude-office-integration-cross-app-context/
date: 2026-05-08 15:04:46
categories:
  - 行业观察
tags:
  - Claude
  - Anthropic
  - Microsoft 365
  - AI办公
  - Copilot
description: Anthropic 将 Claude 全面接入 Microsoft Office，覆盖 Word、Excel、PowerPoint、Outlook 四款应用，支持跨应用上下文共享。本文梳理接入时间线、技术架构、共享上下文机制及订阅定价。
cover: https://images.51allai.com/blog/截图2026-05-08_15.12.27@2x_20260508_151322.png
---
> Anthropic 在 2026 年第一季度完成了 Claude 对 Microsoft Office 三件套的全覆盖，并通过跨应用上下文共享功能，让 Claude 在 Excel、PowerPoint、Word 之间保持统一的对话语境。这是 Claude 首次深度嵌入企业办公工作流，直接对标微软自家的 Copilot。
![截图2026-05-08_15.12.27@2x](https://images.51allai.com/blog/截图2026-05-08_15.12.27@2x_20260508_151322.png)

## 时间线：3 个月完成 Office 全覆盖

2026 年 3 月至 4 月，Claude 接入 Office 的节奏明显加速：

- **3 月 9 日**：微软在官方博客宣布 "Copilot Cowork"，将 Claude Cowork 技术集成进 Microsoft 365 Copilot。微软称该功能"不只是生成回复，而是完成任务、执行工作流、代表用户行动"。面向选定客户推出 Research Preview，3 月底通过 Frontier 项目扩大覆盖。
- **3 月 11 日**：Claude for Excel 和 Claude for PowerPoint 以 beta 形式上线，支持 Mac 和 Windows 平台，面向所有付费 Claude 订阅用户开放。
- **4 月 10-13 日**：Claude for Word 以公开 beta 形式推出（Team 和 Enterprise 计划优先），支持 .docx 和 .docm 格式。至此 Claude 完成对 Word、Excel、PowerPoint 三款核心 Office 应用的全覆盖。Outlook 加载项也在后续跟进。

## 跨应用上下文共享：核心机制

这是本轮更新的技术重点。

**工作原理**：用户在 Excel 中构建财务模型后，切换到 PowerPoint 要求生成汇报演示文稿时，Claude 自动携带 Excel 中的数据结构、公式逻辑和关键输出进入新应用，无需重新描述上下文。官方文档的原话是"上下文在应用之间自动传输，因此您无需手动复制和粘贴信息"。

**具体能力**：
- Excel → PowerPoint：将表格数据直接转为幻灯片图表
- PowerPoint → Word：将演示文稿内容扩展为详细文档
- Word → PowerPoint：将长文档摘要生成汇报幻灯片
- Outlook 集成：Claude 可读取邮件及附件内容，纳入跨应用工作流

**Skills 机制**：Claude for Office 引入预建"Skills"，将多步操作打包为单次点击。Excel 侧包括模型审计（公式错误检测）、LBO/DCF/三张报表模板构建、可比公司分析、数据清洗；PowerPoint 侧包括竞争格局演示、数据驱动的幻灯片更新、投行级审阅。组织可以创建自定义 Skill 供团队共享。

**重要限制**：跨应用会话的聊天历史记录不会在会话之间保存（"跨应用会话的聊天历史记录不会在会话之间保存"）。也就是说，所谓的"共享记忆"是会话内的跨应用上下文传递，不是跨会话的持久化记忆。每次打开新会话，Claude 不会保留之前的对话状态。

**Claude 的访问边界**：Claude 只能操作当前已打开的文件，无法创建、打开或切换文件。所有文件必须在操作前手动打开且加载项已激活。

## 技术架构与数据保留

Claude for Office 的推理请求通过三家云平台路由：

- Amazon Bedrock
- Google Cloud Vertex AI
- Microsoft Azure AI Foundry

微软同时将 Claude 直接嵌入 Excel 的 Agent Mode，Copilot 客户可以在 Copilot 内部同时运行 Claude 和 OpenAI 模型。

数据保留策略：所有输入和输出在接收或生成后 30 天内从 Anthropic 后端自动删除。但加载项不继承企业自定义的数据保留策略。

## 订阅计划与定价

- **Claude 侧**：需要付费 Claude 计划（Pro、Max、Team 或 Enterprise）。Pro/Max 用户跨应用功能默认开启；Team/Enterprise 默认关闭，需管理员在 Organization Settings > Office Agents 中手动激活。
- **微软侧**：Copilot Cowork 面向 Frontier 项目客户开放，具体定价未在官方博客披露。
- **欧盟/EFTA 和英国**：4 月 3 日起，Microsoft 365 Copilot 应用中新增 Anthropic 模型选项。

## 行业信号

Claude 直接嵌入 Office 意味着 Anthropic 从"聊天机器人"走向"办公基础设施"。微软引入 Claude 作为 Copilot 内部模型选项，也打破了此前 Copilot 独家使用 OpenAI 模型的格局——用微软官方的说法："Copilot 托管行业最佳创新，为不同任务选择合适的模型。"

对 Anthropic 而言，Office 是 GPT-4 早期最重要的应用场景之一（ChatGPT 与 Word/Excel 的集成曾引发大量讨论）。如今 Claude 以同等深度进入同一场景，竞争从对话体验转移到办公工作流的实际执行能力上。
