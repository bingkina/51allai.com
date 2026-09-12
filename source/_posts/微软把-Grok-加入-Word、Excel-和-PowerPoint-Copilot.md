---
title: 微软把 Grok 加入 Word、Excel 和 PowerPoint Copilot
permalink: posts/2026/09/microsoft-copilot-grok-office-apps/
tags:
  - microsoft-365
  - copilot
  - xai
  - grok
  - product-update
sources:
  - name: Microsoft 365 官方 X 公告
    url: https://x.com/Microsoft365/status/2098791167185785301
    note: Grok 的推送范围、Office 应用与 Frontier 首发对象
  - name: Get started with the Microsoft Copilot Frontier Program
    url: https://learn.microsoft.com/en-us/microsoft-365/admin/manage/get-started-frontier?view=o365-worldwide
    note: Frontier 的预览属性、许可证要求与管理员开通路径
  - name: Overview of Microsoft Copilot Chat
    url: https://learn.microsoft.com/en-us/copilot/overview
    note: Copilot 模型选择器与 Microsoft 365 应用内的授权差异
  - name: Grok for Microsoft 365 | Microsoft Marketplace
    url: https://marketplace.microsoft.com/en-us/product/saas/wa200011214?tab=overview
    note: 独立 Grok Office 加载项的入口、适用订阅与权限
date: 2026-09-13 00:00:31
categories:
  - 行业观察
description: 微软将 Grok 模型加入 Word、Excel 和 PowerPoint 中的 Copilot，首批面向 Microsoft Frontier 项目客户推送。本文说清新入口、开通条件，以及它与独立 Grok Office 加载项的区别。
cover: https://images.51allai.com/blog/microsoft-copilot-grok-office-apps-cover_20260913_000446.png
---
> 微软于 2026 年 9 月 12 日宣布，Grok 模型正在推送到 Word、Excel 和 PowerPoint 中的 Copilot，首批面向 Microsoft Frontier 项目客户。演示画面显示，Grok 与 GPT、Claude 一起出现在 Copilot 模型选择器中。
![Microsoft Copilot 在 Word Excel PowerPoint 加入 Grok 模型](https://images.51allai.com/blog/microsoft-copilot-grok-office-apps-cover_20260913_000446.png)

## Grok 进入 Copilot 模型选择器

这次更新把 Grok 放进 Microsoft 365 应用内的 Copilot。官方演示以 Excel 为例：用户打开 Copilot 侧边栏的模型选择器后，可以看到 Auto、GPT、Claude 和 Grok 四个选项。Auto 会自动选择模型，用户也可手动展开某个模型家族。

微软此前已把 [Claude 引入 Office 工作流](/posts/2026/05/claude-office-integration-cross-app-context/)。Grok 加入后，Copilot 在同一个选择器中提供多个模型家族，用户不必离开正在编辑的文档、表格或演示文稿。

## 首批用户需要进入 Frontier 预览计划

Grok 的首轮推送面向 Microsoft Frontier 项目客户。Frontier 是 Microsoft 365 的可选早期体验计划，功能在正式全面上线前供组织评估。它按租户管理，需要 Microsoft Copilot 许可证。

管理员可以在 Microsoft 365 管理中心进入 `Copilot > Settings > View all > Copilot Frontier`，再选择向所有用户或指定用户开放。用户还需被分配 Microsoft Copilot 许可证。此类预览功能由管理员控制，个人无法只在应用内自行打开。

## 与独立 Grok Office 加载项不同

Microsoft Marketplace 中已有一款名为 Grok for Microsoft 365 的独立加载项。它为 X 和 SuperGrok 付费用户提供对话侧边栏，可以读取和修改 Word、Excel 与 PowerPoint 文档，并可将数据发送到互联网。

新推送的 Grok 则出现在 Microsoft Copilot 自身的模型选择器里，使用条件跟随 Copilot 许可证、组织租户配置和 Frontier 推送。如果已在使用独立加载项，不能据此判断 Copilot 里也已经出现 Grok；企业用户应由管理员检查 Frontier 和 Copilot 授权。
