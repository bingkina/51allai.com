---
title: Cherry Studio 移动端开启公测，Android APK 与 iOS TestFlight 提供测试入口
permalink: posts/2026/09/cherry-studio-mobile-public-beta/
tags: [cherry-studio, ai-agents, open-source, product-update]
sources:
  - name: Cherry Studio Mobile v0.1.0-beta.1 发布页
    url: https://github.com/CherryHQ/cherry-studio-app/releases/tag/v0.1.0-beta.1
    note: 发布时间、预发布状态、Android 安装包、iOS 分发方式与校验文件
  - name: Cherry Studio Mobile 官方仓库
    url: https://github.com/CherryHQ/cherry-studio-app
    note: 移动端功能范围、桌面端配对边界、技术栈与开源许可
  - name: Cherry Studio APP TestFlight 公测入口
    url: https://testflight.apple.com/join/Mdd3bqvT
    note: iOS 公开测试邀请链接
  - name: Apple TestFlight 使用说明
    url: https://testflight.apple.com/
    note: TestFlight 公开邀请、安装和测试版更新机制
date: 2026-09-17 10:19:06
categories: 智能体
description: Cherry Studio 移动端开启 v0.1.0-beta.1 公测，Android 通过 ARM64 APK 安装，iOS 通过 TestFlight 参与。本文整理两端测试入口、多模型与智能体功能，以及与桌面端配对的已知边界。
cover: https://images.51allai.com/blog/cherry-studio-mobile-public-beta-cover-v2_20260917_102557.png
---

> Cherry Studio 于 2026 年 9 月 16 日发布移动端 v0.1.0-beta.1，Android 用户可下载 ARM64 APK，iPhone 和 iPad 用户可通过 TestFlight 公开邀请参与测试。新客户端覆盖多模型对话、智能体、插件与 MCP 工具，并公开 AGPL-3.0 源码。
![Cherry Studio 移动端 Android 与 iOS 公测](https://images.51allai.com/blog/cherry-studio-mobile-public-beta-cover-v2_20260917_102557.png)

## Android 与 iOS 提供不同测试入口

v0.1.0-beta.1 已标记为预发布版本。Android 用户可在 [GitHub 发布页](https://github.com/CherryHQ/cherry-studio-app/releases/tag/v0.1.0-beta.1) 下载名为 `cherry-studio-0.1.0-2026-09-16-android.apk` 的 ARM64 安装包，文件大小约 126 MB。同页提供 `SHA256SUMS`，可用于检查下载文件是否完整。

iPhone 和 iPad 用户需要先安装 Apple TestFlight，再打开 [Cherry Studio APP 公测邀请](https://testflight.apple.com/join/Mdd3bqvT) 接受测试。加入后可在 TestFlight 内安装开发者提供的构建，并接收后续测试版更新。iOS 构建由独立的发布工作流处理，不会以 IPA 附件的方式出现在 Android APK 的 GitHub 发布页中。

## 多模型对话和智能体进入手机

Cherry Studio Mobile 可连接多个 AI 服务商，管理模型，并在不同对话中选择合适的模型。对话支持 Markdown 格式的流式回复，也能添加文本和图片附件；具体能否处理图片，取决于当前选择的模型。

用户还可以创建独立智能体，为它设置指令、默认模型和可用工具。客户端支持插件与 MCP 服务器；MCP 是让 AI 连接外部工具和数据的通用协议。配置相应服务后，智能体可使用联网搜索和网页读取等能力，工具操作需要审批时会在客户端内展示。

移动端也提供图像生成、附件与生成文件管理，并可将选中的对话内容导出为 Markdown、HTML 或图片。

## 与桌面端的配对不等于全量同步

手机端可与 Cherry Studio Desktop 配对，导入受支持的模型服务商配置和模型。当前配对范围不包含对话历史同步，也不能用手机远程控制桌面端智能体。如果用户的主要需求是在手机继续电脑上的现有对话，这个边界会直接影响当前的使用方式。

## 公测前先准备模型服务

Cherry Studio Mobile 是 AI 工作台，不是自带所有模型用量的聊天服务。用户选择的模型和外部服务可能需要账号或 API Key，调用费用由对应服务商决定。

项目源码已在 [CherryHQ/cherry-studio-app](https://github.com/CherryHQ/cherry-studio-app) 公开，采用 AGPL-3.0 许可证。开发者可以直接检查移动端的 Expo、React Native 实现，或通过 Issue 和代码贡献参与测试。
