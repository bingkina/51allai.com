---
title: OpenAI 上架 Codex for Chrome 扩展，可直接操作浏览器
date: 2026-05-08 12:07:56
permalink: posts/2026/05/openai-codex-chrome-extension/
categories:
  - 智能体
tags:
  - codex
  - Chrome
  - OpenAI
  - 浏览器自动化
  - Computer Use
description: OpenAI 正式上架 Codex for Chrome 扩展，支持在已登录态的 Chrome 中操作 Web 应用、测试前端、调用 DevTools。本文整理安装方式、权限机制及与 Claude in Chrome 的对比。
---

> OpenAI 将 Codex 的浏览器操作能力从桌面端 Computer Use 延伸到了 Chrome 扩展，主打已登录态的 Web 应用交互，与 Anthropic "Claude in Chrome" 正面竞争。
![codex_chrome](https://images.51allai.com/blog/codex_chrome_20260508_120628.png)

## 发布信息与安装方式

2026 年 5 月 7 日，OpenAI 在 Chrome Web Store 上架了 Codex 浏览器扩展（扩展 ID: `hehggadaopoacecdllhhajmbjkdcmajg`），版本号 1.1.4。适用于 Mac 和 Windows。

安装路径：打开 Codex 桌面应用 → Plugins → 添加 Chrome 插件 → 完成 Chrome 权限授权。扩展在 Chrome 侧边栏显示"Connected"即为就绪。用户在对话中通过 `@Chrome` 引用即可触发浏览器操作。

## 核心功能

该扩展让 Codex 可以直接在用户的 Chrome 浏览器中执行操作，核心场景：

- **Web 应用测试** — 在真实浏览器环境中测试前端应用，读取页面内容、辅助调试
- **多标签上下文聚合** — 跨多个打开的 Chrome 标签页收集信息
- **Chrome DevTools 集成** — 调用开发者工具进行网络请求分析、控制台错误查看、DOM 检查
- **已登录态操作** — 利用用户已登录的浏览器会话操作 LinkedIn、Salesforce、Gmail 等需要认证的 Web 应用

Codex 的工作内容在 Chrome 中以标签组（Tab Group）形式组织，每个任务的标签页归入独立分组，不干扰用户正在浏览的页面。

## 权限与安全机制

Chrome 扩展请求的权限包括：页面调试器访问、"读取和更改所有网站数据"、浏览历史、通知、书签、下载管理、标签组管理、与本地应用通信。

OpenAI 在文档中声明：不会单独存储用户 Chrome 操作的完整记录，只有进入 Codex 对话的内容（文本、截图、工具调用）会被保存。默认情况下，Codex 每次访问新网站前都会请求用户确认，用户可设置"允许一次""始终允许"或"拒绝"，并在设置中管理白名单/黑名单。

## 与 Anthropic Claude in Chrome 的差异

Anthropic 早在 2025 年 12 月就推出了"Claude in Chrome"的 Beta 版。两者定位不同：

| | Codex for Chrome | Claude in Chrome |
|---|---|---|
| **核心定位** | 开发者工具，侧重 Web 应用测试与 DevTools | 通用浏览器代理，侧重自动化任务执行 |
| **DevTools 集成** | 支持 | 不支持 |
| **定时任务** | 不支持 | 支持 |
| **工作流录制** | 不支持 | 支持 |
| **多标签管理** | 跨标签聚合 | 标签组隔离 + 多标签同时读取 |
| **成熟度** | 刚上架 | Beta 约半年，功能更完整 |

Codex 扩展更偏向开发者的 Web 调试与测试场景；Claude in Chrome 更偏向知识工作者的通用浏览器自动化（竞情收集、表单填写、购物比价等）。

## Codex 平台增长数据

据 OpenAI 官方数据，Codex 平台周活跃用户已超过 400 万，较年初增长 8 倍。定价方面，提供 $20/月的标准计划和 $100/月的高用量计划（用量为标准版的 5 倍）。
