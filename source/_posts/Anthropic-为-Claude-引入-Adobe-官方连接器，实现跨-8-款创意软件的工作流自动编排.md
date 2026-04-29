---
title: Anthropic 为 Claude 引入 Adobe 官方连接器，实现跨 8 款创意软件的工作流自动编排
permalink: posts/2026/04/anthropic-claude-adobe-connector-creative-workflow-automation/
categories: 多模态
tags:
  - anthropic
  - product-update
  - creative-workflow
  - workflow-automation
  - adobe-firefly
date: 2026-04-30 00:37:18
description: Anthropic 为 Claude 推出 Adobe 官方连接器，打通 Photoshop、Premiere、Firefly 等 8 款创意软件、50 余项专业工具的 API 调用权限。Claude 可通过自然语言跨应用自动编排设计、剪辑、排版管线，从"内容生成器"进化为"工作流调度器"，彻底重构设计师的创意交付流程。
cover: https://images.51allai.com/blog/截图2026-04-30_00.36.28@2x_20260430_003804.png
---
> 大模型在创意管线中的角色由单一的“内容生成器”转向“工作流调度器”，通过自然语言直接调用专业软件底层功能。
![截图2026-04-30_00.36.28@2x](https://images.51allai.com/blog/截图2026-04-30_00.36.28@2x_20260430_003804.png)

## 跨应用自动化编排机制
- **接入范围**：通过新发布的“Adobe for creativity”连接器，Claude 获得了调用 Adobe 旗下 8 款核心应用（Photoshop、Illustrator、Firefly、Express、Premiere、Lightroom、InDesign、Stock）中 50 余项专业工具的权限。
- **运行逻辑**：系统不再依赖单一的 API 生成动作，而是进行管线规划。用户输入自然语言目标（如“人像精修”或“横屏视频转社交媒体竖屏”），Claude 会自主决定多项 Adobe 工具的调用顺序。例如，在视频任务中自动串联 Premiere 的重构图与裁剪功能，并在对话框内输出成品。

## 资产流转与生态协同
- **无缝接力交付**：支持对话框与原生软件间的双向流转。在 Claude 界面中完成的批量调色或初版排版，可一键发送至 Firefly Boards 归档，或导入 Express 及原生软件（如 Photoshop）进行二次像素级修改。
- **账号鉴权限制**：深度绑定 Adobe 商业生态。高频调用额度、算力及全量工具的访问权限，直接挂钩并受限于用户本身的 Adobe 订阅层级（Pro/Team/Enterprise）。