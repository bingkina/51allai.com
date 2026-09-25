---
title: DeepSeek Harness 推出官方桌面版，支持 Apple Silicon Mac 与 Windows
permalink: posts/2026/09/deepseek-harness-official-desktop/
tags: [deepseek, open-source, desktop-agent, agent-framework, product-update]
sources:
  - name: DeepSeek Harness v0.1.7-rc.2 发布页
    url: https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.7-rc.2
    note: 版本、发布时间、预发布状态与桌面端变更
  - name: DeepSeek Harness 官方桌面端说明
    url: https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.1.7-rc.2/apps/desktop/README.zh.md
    note: Electron 桌面壳、内置运行时、进程通信与桌面端行为
  - name: DeepSeek Harness macOS Apple Silicon 更新源
    url: https://download.deepseek.com/dsh-desk/feeds/mac-arm64/nightly-mac.yml
    note: macOS Apple Silicon 安装包版本、发布时间、下载地址与校验值
  - name: DeepSeek Harness Windows x64 更新源
    url: https://download.deepseek.com/dsh-desk/feeds/win-x64/nightly.yml
    note: Windows x64 安装包版本、发布时间、下载地址与校验值
date: 2026-09-25 08:56:41
categories: [智能体]
description: DeepSeek Harness 官方桌面版已提供 Apple Silicon Mac 与 Windows x64 安装包。本文梳理 0.1.7-rc.2 候选版的下载入口、内置运行时、后台任务和插件能力，并说明它与此前社区桌面端的区别。
cover: https://images.51allai.com/blog/deepseek-harness-official-desktop-cover_20260925_090034.png
---

> DeepSeek Harness 官方桌面版已提供 0.1.7-rc.2 候选版安装包，支持 Apple Silicon Mac 与 Windows x64。应用把 Harness、Web 界面和运行环境装进同一个桌面程序，不再要求用户先安装 Node.js 或通过终端启动。
![DeepSeek Harness 官方桌面版支持 Apple Silicon Mac 与 Windows](https://images.51allai.com/blog/deepseek-harness-official-desktop-cover_20260925_090034.png)

## 官方安装包已开放下载

DeepSeek 已在 Harness 官方仓库中加入桌面应用，并于 2026 年 9 月 24 日发布 0.1.7-rc.2。用户可以直接下载 [Apple Silicon Mac 安装包](https://download.deepseek.com/dsh-desk/bin/mac-arm64/deepseek-harness-0.1.7-rc.2-mac-arm64.dmg)或 [Windows x64 安装包](https://download.deepseek.com/dsh-desk/bin/win-x64/deepseek-harness-0.1.7-rc.2-win-x64.exe)。

这两个安装包都来自 `download.deepseek.com`。Mac 版本面向 M 系列芯片，Windows 版本面向 x64 电脑。当前官方更新源没有提供 Intel Mac 或 Linux 安装包。

版本号中的 `rc` 代表 Release Candidate，也就是正式稳定版之前的候选版本。官方仓库仍把 DeepSeek Harness 定位为开发者预览版，并提醒后续更新可能包含不兼容改动。

## 桌面版把运行环境装进应用

此前的官方使用方式需要先安装 Node.js，再在终端执行 `npx @deepseek-ai/dsh web`，由本地服务打开浏览器界面。桌面版改用 Electron 应用封装同一套 Harness 能力，内置 Node.js 与 pnpm，安装后可以从独立窗口进入工作区。

桌面应用与 Harness 使用完全相同的版本号。0.1.7-rc.2 桌面端搭配的也是 0.1.7-rc.2 运行时，避免桌面外壳、Web 客户端和插件依赖落在不同版本。

应用通过 `dsh-app://` 协议加载打包后的 Web 界面，再把请求转发给经过认证的本地 Host。桌面 Host 默认使用 19387 端口，与命令行 Web 版默认使用的 3080 端口分开。普通用户不需要手动访问这些端口。

## 关闭窗口后任务可以继续运行

桌面版把窗口、应用退出和后台任务的关系交给系统界面处理。Windows 关闭主窗口后，应用会留在系统托盘，正在执行的任务继续运行；macOS 关闭窗口后，应用仍留在 Dock。用户真正退出应用时，如果存在运行中的 Agent 任务或已加载的定时提醒，客户端会先提示影响。

0.1.7-rc.2 还加入了桌面端首次使用引导、快捷键管理和本地 Markdown 图片预览。Web 与桌面版都能安装插件、查看代码差异、预览文件，并在权限策略要求时让用户审批工具操作。

## 它取代的是命令行入口，不是模型服务

安装桌面版后，用户仍需登录支持的账号或配置模型 API Key，再选择一个本地目录作为工作区。Harness 可以在获准范围内读取和修改文件、运行命令、调用工具与子智能体；模型请求会发往用户选择的服务。

第一次使用时，适合先选择一个不含密钥和私人文件的测试目录。查看文件写入、命令执行和审批流程后，再把真实项目加入工作区。客户端减少了环境安装步骤，没有改变 Agent 对工作区的操作权限。

## 官方版与此前社区桌面端不是同一项目

2026 年 8 月出现的[DeepSeek Harness 社区桌面端](/posts/2026/08/deepseek-harness-community-desktop/)由社区账号维护。当时 DeepSeek 官方只提供本地 Web UI，社区项目负责打包 Electron 外壳和安装程序。

这次桌面代码位于 `deepseek-ai/deepseek-harness` 官方仓库的 `apps/desktop` 目录，安装包由 DeepSeek 下载域名分发。已经使用社区版的用户不能只凭产品名称判断升级关系，应分别核对项目维护者、数据目录和版本说明；首次接触 Harness 的读者也可以先了解[开发者预览版的插件架构与使用边界](/posts/2026/08/deepseek-harness-developer-preview/)。
