---
title: Anthropic 在 Claude Code 内置 /radio 命令，推出 Claude FM 编程电台
date: 2026-05-10 00:23:39
permalink: posts/2026/05/anthropic-claude-code-radio-claude-fm/
categories:
  - 行业观察
tags:
  - Claude Code
  - Anthropic
  - 开发者工具
  - 编程电台
  - lo-fi
description: Anthropic 在 Claude Code 中内置 /radio 命令，一键调出 Claude FM lo-fi 编程电台。官方电台、社区音乐插件生态同步活跃，AI 编程工具开始争夺开发者注意力之外的"背景音"场景。
---

> Anthropic 在 Claude Code 终端内置 `/radio` 命令，一键调出 Claude FM lo-fi 编程电台，将 Lofi Girl 式的专注背景音直接嵌入 AI 编程工作流。
![Claude FM 像素风吉祥物，橙色 Claude 角色佩戴耳机](https://images.51allai.com/blog/claude-fm-cover_20260510_002450.jpg)

## /radio 命令：Claude Code 终端内的电台开关

Claude Code 的官方命令文档中注册了 `/radio`：

- 在浏览器中打开 **Claude FM lo-fi 电台**
- 无图形界面的服务器环境下，直接在终端打印流媒体 URL，供外部播放器接入
- 不适用于 Bedrock、Vertex 或 Foundry 部署版本，仅限 Anthropic 直连或付费订阅

命令本身没有任何参数。输入 `/radio`，浏览器弹出 Claude FM 页面，流媒体开始播放。这是 Claude Code 发布以来最轻量、最不需要"解释"的功能——它只做一件事。

## Claude FM：Anthropic 运营的 lo-fi 电台

Claude FM 的 tagline 是 "music for thinking and building"（为思考与构建而放的音乐）。它是一个商业无广告、不间断的 lo-fi 直播流，托管在 YouTube 上，通过 [claude.fm](https://claude.fm) 域名重定向接入。

视觉设计使用 Claude Code 的像素风吉祥物（一个橙色 blob 角色）作为动画主体，佩戴耳机、闭眼沉浸——类似 Lofi Girl 的定位，但品牌人格化更直接。

电台由音乐人策划选曲，Anthropic 明确表示曲目为人工编排而非 AI 生成。

## 社区生态：/radio 不是唯一方案

Claude Code 的插件市场已经存在一套更完整的社区音乐方案。开发者 Kenneth Leung 维护的 **claude-music** 插件（[GitHub](https://github.com/kennethleungty/claude-music)）提供：

- 25+ 电台覆盖 lofi、爵士、古典、氛围、合成器浪潮等风格
- 信号源来自 SomaFM 和 YouTube 24/7 直播流
- AI DJ 根据会话上下文自动选曲（`/vibe` 命令）
- 支持 mpv、ffplay、afplay 自动适配平台
- 专注/番茄钟模式（`/focus`）

社区反馈中，有开发者评价 `claude-music` 是 "/radio 的强化版替代品，适合需要更多曲目控制权的用户"。

## 为什么这件事值得注意

这不是一个功能性的生产力改进。`/radio` 不提供代码补全、不加速构建、不减少权限弹窗。它做的只是让开发者在终端里少开一个浏览器标签。

但从产品信号来看，它透露了两件事：

第一，Anthropic 开始把 Claude Code 从"编程工具"往"开发者工作台"的方向推。电台、终端内通知、像素风吉祥物——这些不是刚需，但构成了"在这个环境里待着更舒服"的体验层。

第二，AI 编程工具的竞争已经从模型能力溢出到工作流周边。当所有主流编码 AI 都能写代码时，差异化会下沉到更细粒度的体验：通知机制、终端美学、甚至背景音。

Claude FM 上线后短暂触及过 YouTube 的并发限制，说明这个"小而轻"的功能切中了相当一部分开发者的使用习惯。
