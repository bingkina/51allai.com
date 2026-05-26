---
title: 阿里QoderWork上线Design Desk，AI设计稿直出React代码
permalink: posts/2026/05/alibaba-qoderwork-design-desk-release/
tags:
  - alibaba
  - qoderwork
  - desktop-agent
  - design-desk
  - ai-design
date: 2026-05-21 19:08:11
categories:
  - 智能体
description: 阿里 QoderWork 在桌面 AI Agent 基础上推出 Design Desk，支持语音和自然语言生成可编辑设计稿，代码直接导出 React + Vite 工程，打通设计到开发的完整链路。
cover:
---

> 阿里 QoderWork 在桌面 Agent 基础上追加 AI Native 设计工作台，一句话生成可编辑设计稿，代码直接导出 React + Vite 工程，对标 Figma + Claude Design 的工作流。
![QoderWork桌面应用界面](https://images.51allai.com/blog/qoderwork-design-desk_20260521_190755.jpg)

## 一、Design Desk 是什么

5 月 18 日，QoderWork 上线 Design Desk（设计工作台），将 AI 能力从编码和办公场景延伸到设计领域。核心交互界面是**无限画布**：用户用自然语言或语音描述需求，AI 在画布上直接生成高保真设计稿，包含完整的界面元素、组件布局和基础交互动效。

生成产物可在画布内直接点选编辑、拖拽调整、框选修改，操作逻辑与 Figma 一致。完成后 AI 同步生成可运行代码，支持导出 React + Vite 工程，可一键唤醒 Cursor 等 IDE 继续迭代。

## 二、从桌面 Agent 到设计工作台

回顾 QoderWork 的迭代路径：

- **2026 年 1 月**：QoderWork 1.0 首发 macOS，定位桌面 AI Agent——用户用自然语言下达指令，AI 自主拆解任务、调用本地应用完成文件整理、数据处理、文档生成等操作。执行环境在本地，MCP 协议支持连接外部 API。
- **2026 年 3 月**：Windows 版本上线，Mac/Windows 双端全面开放。打通钉钉、微信、飞书，手机端可调度桌面 AI。
- **2026 年 5 月**：Design Desk 上线，增加设计能力。

Qoder 同一团队此前已发布 Qoder 智能编码平台（agentic coding platform），Design Desk 是该能力向设计侧的延伸。

## 三、技术细节

- **本地执行**：文件处理全程在本地完成，设计素材可直接读取本地文件夹。未经用户授权，文件不离开本机。
- **代码生成**：导出的是真实前端工程（React + Vite），非静态图片或 HTML 片段。
- **设计编辑**：支持点选修改、原型交互、画板复制、适配缩放、标注绘制。全局微调品牌主色、组件圆角、模块间距。
- **画圈批注 + 对话双通道修改**：在画布上画圈标记需修改的区域，同时在侧边栏与 Agent 对话调整。
- **视觉模板**：成品生成后可切换百余种预设视觉模板。

## 四、定价

QoderWork 与 Qoder 编码平台共用 Credits 体系：

- **免费版**：含基础功能和每月有限任务额度
- **Pro**：$20/月（约 142 元），2,000 Credits/月
- **Pro+**：$60/月
- **Ultra**：$200/月

模型分级选择器区分标准档（国内 SOTA 模型，轻量任务）和旗舰档（海外 SOTA 模型，复杂推理），用户可根据任务复杂度自行切换以控制成本。

## 五、竞争格局

AI 设计工具赛道此前已有 Claude Design（Anthropic）、v0（Vercel）、Figma AI 等产品。QoderWork Design Desk 的差异化在于：它不是一个独立的 AI 设计工具，而是桌面 Agent 生态中的一个能力模块——用户可以在同一个应用内完成"需求描述 → 设计稿 → 前端代码 → 编码迭代"的完整链路，无需在多个工具间切换。

目前所有报道均基于官方通稿，暂无第三方量化评测数据（生成质量、代码可用率、与 Figma/Claude Design 的直接对比）。
