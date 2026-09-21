---
title: Kimi Code 发布桌面客户端，macOS 与 Windows 同步上线
permalink: posts/2026/09/kimi-code-desktop/
tags:
  - moonshot
  - kimi
  - coding-agent
  - desktop-agent
  - product-update
sources:
  - name: Kimi Code 官方页面
    url: https://www.kimi.com/code
    note: Desktop、CLI 与 IDE 官方入口
  - name: Kimi Code Desktop 快速开始
    url: https://www.kimi.com/code/docs/kimi-code-desktop/getting-started.html
    note: 安装包、工作区、任务模式、权限模式与 CLI 关系
  - name: Kimi Code Desktop 使用文档
    url: https://www.kimi.com/code/docs/kimi-code-desktop/using-desktop.html
    note: 改动审阅、内置终端、浏览器、Git 状态与插件
  - name: Kimi Code Desktop 变更记录
    url: https://www.kimi.com/code/docs/kimi-code-desktop/changelog.html
    note: 1.0.0 发布日期、支持平台与 1.0.2 更新内容
  - name: Kimi Code 会员权益
    url: https://www.kimi.com/code/docs/kimi-code/membership.html
    note: 官方模型使用门槛与多客户端共享额度规则
date: 2026-09-21 22:15:40
categories:
  - 智能体
description: Kimi Code 发布 macOS 与 Windows 桌面客户端，把本地项目、代码改动、终端、浏览器和 Git 状态收进同一界面。本文梳理安装入口、任务与权限模式，以及它与 CLI、Kimi Work 的区别。
cover: https://images.51allai.com/blog/kimi-code-desktop-cover_20260921_222833.png
---
> Kimi Code Desktop 已上线 macOS 和 Windows，Mac 同时提供 Apple Silicon 与 Intel 版本。它把 Kimi Code CLI 的 Agent 核心搬进图形界面，集中管理本地项目、代码改动、终端验证和网页预览。
![Kimi Code Desktop macOS 与 Windows 桌面编程客户端](https://images.51allai.com/blog/kimi-code-desktop-cover_20260921_222833.png)

## 本地项目、改动和验证集中在一个窗口

Kimi Code Desktop 使用本地项目文件夹作为工作区。新建会话并选择工作区后，用户可以直接描述任务，也可以用 `@` 引用具体文件或目录。Agent 能够读取和修改代码、执行命令，并根据运行结果继续调整。

右侧改动面板会按文件和回合展示 diff，顶部同时显示当前分支、同步状态、改动文件数和 PR 状态。内置终端以当前工作区为运行目录，可以直接执行构建、测试和格式化命令。网页项目还能在右侧打开内置浏览器，页面标签与当前会话绑定，方便检查实际效果。

官方变更记录将 1.0.0 标记为 9 月 17 日发布，支持 macOS Apple Silicon、macOS Intel 和 Windows。9 月 19 日的 1.0.2 已经重做内置浏览器的操作反馈，并修复了页面截图、下载对话框和 subagent 审批提示等问题。

## Plan、Goal 和 Swarm 对应不同任务

桌面端提供普通任务、Plan、Goal 和 Swarm 四种工作方式。普通任务适合范围清晰、容易验证的修改；Plan 会先分析并提交计划，确认后才改文件；Goal 用于需要多轮执行和检查的长任务；Swarm 则把可拆分的工作分配给多个 subagent。

涉及命令、文件修改或计划时，客户端会以审批卡片展示具体范围。权限分为“始终询问”“必要时询问”和“完全自动”三档。首次打开不熟悉的仓库时，可以先用“始终询问”限定写文件和运行命令的范围。

## 桌面端与 CLI 共用 Agent 核心

Kimi Code Desktop 不是另一套编程服务。它延续 Kimi Code CLI 的 Agent 核心，两者可以安装在同一台电脑上，并共享账号、模型、模型供应商和插件等部分本地设置。CLI 用户可以运行 `/desktop` 或 `kimi install-desktop`，在浏览器中打开桌面端下载页。

两种界面服务于不同习惯：桌面端把项目、会话、文件改动、终端和浏览器放到图形界面中；CLI 适合终端优先和脚本化工作流。它也不是 [Kimi Work](/posts/2026/06/moonshot-kimi-work-local-agent/) 的改名版：Kimi Code Desktop 围绕代码工程和开发验证设计，Kimi Work 面向本地文件、网页和办公交付等知识工作。

## 下载后选择账号或第三方模型

用户可以前往 [Kimi Code 官方下载页面](https://www.kimi.com/code)，选择 Apple Silicon Mac、Intel Mac 或 Windows 安装包。首次启动时可以选择界面语言和主题，然后通过 Kimi OAuth 登录。中国内地账号使用 `kimi.com`，其他地区使用 `kimi.ai`。

登录后，客户端会列出当前账号可用的 Kimi 官方模型。新版 Kimi 会员中，Plus 及以上档位可使用 Kimi Code，Desktop、CLI、VS Code 和第三方工具的请求计入同一套额度。用户也可以在设置中填入 API Key、Base URL 和模型信息，接入其他模型供应商。
