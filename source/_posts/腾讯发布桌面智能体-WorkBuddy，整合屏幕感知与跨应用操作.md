---
title: 腾讯发布桌面智能体 WorkBuddy，整合屏幕感知与跨应用操作
permalink: posts/2026/03/tencent-workbuddy-desktop-agent/
description: "腾讯元宝团队推出独立桌面客户端，主打“零代码/零部署”的开箱即用体验，具备屏幕上下文理解能力，意在通过 OS 层级交互抢占 PC 端办公流量入口。 1. 产品形态与定位 独立客户端架构：不同于网页版 Chatbot，WorkBuddy 以独立桌面应用（Windows/macOS）…"
categories: 智能体
tags: [tencent, workbuddy, desktop-agent]
date: 2026-03-09 20:20:10
---
> 腾讯元宝团队推出独立桌面客户端，主打“零代码/零部署”的开箱即用体验，具备屏幕上下文理解能力，意在通过 OS 层级交互抢占 PC 端办公流量入口。
![iShot_2026-03-09_20.21.57](https://images.51allai.com/blog/iShot_2026-03-09_20.21.57_20260309_202210.png)

## 1. 产品形态与定位

* **独立客户端架构**：不同于网页版 Chatbot，WorkBuddy 以独立桌面应用（Windows/macOS）形式存在。
* **开箱即用（Out-of-the-box）**：核心卖点为“免部署”，直接通过官网下载安装包即可运行。这旨在降低用户门槛，与 GitHub 上需要复杂环境配置（Python/Docker）的开源 Agent 项目形成差异化。

## 2. 核心技术能力

* **屏幕感知（Screen Context）**：具备读取当前屏幕内容的能力。用户无需手动复制粘贴，AI 可基于当前浏览的文档、网页或代码界面直接进行分析、总结或提取数据。
* **跨应用协作**：突破了单一浏览器窗口限制，能够与本地办公软件（Office 套件、钉钉/企微等）进行联动。
* **模型底座**：底层接入腾讯混元大模型（Hunyuan），提供多模态理解与生成能力。

## 3. 功能场景

* **沉浸式辅助**：支持划词解释、侧边栏即时对话，类似微软 Copilot 的系统级集成体验。
* **自动化工作流**：支持一定程度的 GUI 自动化操作（如自动填写表格、整理会议纪要并发送），即向 LAM（Large Action Model）方向演进。

* 官方网站：https://www.codebuddy.cn/work/