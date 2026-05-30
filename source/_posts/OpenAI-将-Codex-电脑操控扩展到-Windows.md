---
title: Codex「电脑操控」功能现已支持 Windows
permalink: posts/2026/05/openai-codex-computer-use-windows/
tags: [openai, codex, product-update, desktop-agent]
date: 2026-05-30 08:44:40
categories: 智能体
description: "OpenAI 将 Codex Computer Use 扩展到 Windows，Codex 现在可在前台操作 Windows 桌面应用，并支持从 ChatGPT 手机端或 Mac 远程查看和控制 Windows 设备上的任务。"
cover: https://images.51allai.com/blog/codex-mobile_20260515_104234.png
---
> OpenAI 在 2026 年 5 月 29 日更新 Codex app 26.527，把 Computer Use 带到 Windows。这次更新的是 OpenAI Codex，不是 Apple Xcode。Windows 版现在能让 Codex 在前台看屏幕、点击、输入，并把手机端远程控制接到 Windows 设备上。
![ChatGPT 应用与 Codex 应用图标并排](https://images.51allai.com/blog/codex-mobile_20260515_104234.png)

## 更新内容：Windows 终于补上 Computer Use

OpenAI 的 Codex changelog 把这次更新列在 2026 年 5 月 29 日，版本号为 26.527，标题是 “Computer use and mobile access on Windows”。三项变化很直接：

- Computer Use 现在可用于 Windows，Codex 可以在前台操作 Windows 桌面应用。
- 远程控制支持 Windows 设备，可从 ChatGPT iOS / Android 应用，或另一台运行 Codex 的 Mac，启动或查看 Windows 设备上的 Codex 工作。
- Profile 区域新增个人资料、用量统计和 token 活动信息。

这不是模型发布，也不是 IDE 插件更新。它补的是 Codex 从“代码代理”走向“桌面代理”的平台覆盖。4 月 16 日 OpenAI 发布 Codex 桌面操控能力时，Computer Use 先落在 macOS；5 月中旬手机端远程控制上线时，官方仍写着 Windows 支持“coming soon”。现在这条线补上了。

## Windows 版的关键限制：只能前台操作

OpenAI 文档对 Windows 的边界写得很明确：Codex 在 Windows 上运行 Computer Use 时，目标应用需要保持在当前活动桌面可见。它会移动鼠标、输入内容、接管前台窗口，不能像 macOS 背景电脑操控那样在同一个桌面会话里与你并行工作。

这决定了 Windows 版的第一批真实场景：

- 让 Codex 打开桌面应用，复现只能在 GUI 中出现的 bug。
- 在浏览器或本地客户端里跑一段必须手动点击的流程。
- 检查应用设置、安装向导、登录后页面、桌面端数据源。
- 通过手机端远程查看进度，必要时给 Codex 追加指令。

不适合的场景也很清楚：你想一边在同一个 Windows 桌面继续工作，一边让 Codex 在后台点击别的窗口。官方建议是，要么让设备保持解锁并联网后离开桌面，要么把 Codex 放进 Windows 虚拟机，让它接管 VM 而不是主桌面。

## 和 macOS 的差异：没有 Locked Use

此前 macOS 版的一个强功能是 locked computer use：Mac 锁屏后，Codex 仍可在受控窗口里临时解锁并继续操作应用。OpenAI 文档把这项能力限定为 macOS。Windows 目前没有对应机制，文档直接写明：Locked use is for macOS；Windows 上 Computer Use 是前台能力。

这不是小差异。对个人开发者，Windows 版已经足够处理“我不想自己点 UI”的任务；对企业或长任务自动化，它仍需要更谨慎的运行环境设计。远程控制能让手机端介入，但不能改变 Windows 前台接管的物理事实。

## 可用范围：部分地区暂不可用

OpenAI 文档还给出区域限制：Codex app 的 Computer Use 现在支持 macOS 和 Windows，但在发布时不面向欧洲经济区、英国和瑞士开放。使用前需要在 Codex 设置中安装 Computer Use 插件；macOS 需要授权屏幕录制和辅助功能，Windows 侧重点则是保持目标窗口可见。

权限模型仍然重要。Computer Use 会处理屏幕内容、截图、窗口、菜单、键盘输入和剪贴板状态。OpenAI 建议用户把任务范围收窄，对敏感流程保持在场，审批应用权限，不要让 Codex 在错误窗口里继续操作。

这套提示不是合规套话。桌面操控类 Agent 的失败模式和代码补全不同：它可能点错按钮、改错设置、把敏感内容带入上下文。Windows 用户拿到能力之后，第一步不是把所有软件都交给 Codex，而是用一个可回滚、低风险的窗口验证它的可靠性。

Codex 过去几个月的路线很清晰：先做独立桌面 app，再加 Computer Use、in-app browser、插件、远程 SSH、手机端远程控制。Windows Computer Use 上线后，OpenAI 把开发者主机覆盖从 Mac 扩到更大的 PC 基盘。

这会改变 Codex 的定位。它不再只是终端里的代码执行器，也不是只在 GitHub PR 上工作的云代理。它开始接近一个可以跨代码、浏览器、桌面应用执行任务的本地工作台。

但能力边界也要看清：

- Windows 上是前台操控，不是后台并行。
- 远程手机端是控制与监督入口，不是在手机上本地执行代码。
- 图形界面任务适合 Computer Use；本地 Web 应用验证仍应优先用 Codex in-app browser。
- 敏感账户、支付、隐私、网络与安全设置仍需要人工在场。

这次更新的实质信号是：OpenAI 正在把 Codex 从“会写代码”推进到“能操作开发环境”。Windows 支持让这个方向不再只属于 Mac 用户。真正要验证的是后续两个问题：前台操控的稳定性够不够做日常 QA，以及远程控制能不能让长任务在 Windows 设备上持续跑完。
