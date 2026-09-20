---
title: 瑞幸咖啡上线 CLI，支持在终端查询门店并创建订单
permalink: posts/2026/09/luckin-coffee-cli/
tags: [luckin-coffee, ai-agents, product-update]
sources:
  - name: 瑞幸咖啡 AI 开放平台 CLI 服务
    url: https://open.lkcoffee.com/cli
    note: CLI 定位与 macOS、Windows 安装入口
  - name: 瑞幸咖啡 CLI 安装脚本
    url: https://open.lkcoffee.com/install
    note: macOS、Linux 平台检测、版本获取与校验流程
  - name: 瑞幸咖啡 CLI 版本清单
    url: https://open.lkcoffee.com/cli/manifest.json
    note: 0.0.1 版本、发布时间与支持的系统架构
  - name: 瑞幸咖啡 AI 开放平台官方公告
    url: https://www.sina.cn/news/detail/5305753204166624.html
    note: 2026 年 6 月 3 日上线日期与 MCP、CLI、Skill 三种接入方式
date: 2026-09-20 09:29:43
categories: 智能体
description: 瑞幸咖啡上线面向开发者的官方 CLI，可在终端查询门店和商品、预览并创建订单。本文整理 macOS、Linux 与 Windows 安装方式、可用命令和支付边界。
cover: https://images.51allai.com/blog/luckin-coffee-cli-cover_20260920_095302.png
---

> 瑞幸咖啡于 2026 年 6 月 3 日上线 AI 开放平台，同期提供面向开发者的官方 CLI。用户可在终端查询门店与商品、预览和创建订单；安装包覆盖 macOS、Linux 与 Windows 的 x86-64 和 ARM64 设备。
![瑞幸咖啡 CLI 终端点单流程](https://images.51allai.com/blog/luckin-coffee-cli-cover_20260920_095302.png)

## 瑞幸把点单能力做成命令行工具

瑞幸咖啡 CLI 是 AI 开放平台的三种接入方式之一。MCP 用标准协议把点单能力接入 AI 应用，Skill 为智能体提供现成任务步骤，CLI 则让用户和程序直接在终端调用这些功能。它不是新的咖啡商城，而是将门店、商品和订单操作变成可组合的命令。

官方软件包公开了 `luckin` 命令。除了用 `luckin -p "<需求>"` 输入自然语言，它还提供门店、菜单、商品和订单子命令，适合交互使用，也能交给 AI Agent 或脚本调用。

## 官方安装包覆盖三大桌面系统

macOS 和 Linux 使用同一条安装命令：

```bash
curl -fsSL https://open.lkcoffee.com/install | bash
```

Windows 用户需要在 PowerShell 执行：

```powershell
irm https://open.lkcoffee.com/window/install | iex
```

安装脚本会判断操作系统和处理器架构，从官方版本清单下载对应压缩包，再用 SHA-256 值校验文件。截至 2026 年 9 月 20 日，清单中的最新版本为 `0.0.1`，提供 macOS、Linux 和 Windows 的 AMD64 与 ARM64 构建。

管道安装会立即执行远程脚本。想先检查内容的用户，可以先单独下载安装脚本，确认下载域名、校验步骤和安装路径后再执行。

## CLI 可查门店、商品和订单

官方软件包中可确认的命令覆盖以下流程：

| 环节 | 命令范围 | 用途 |
| --- | --- | --- |
| 登录 | `luckin login`、`luckin logout` | 授权或退出瑞幸账号 |
| 门店 | `luckin store`、`luckin menu` | 按位置查询门店，读取指定门店菜单 |
| 商品 | `luckin product` | 查询门店内的商品与可选规格 |
| 订单 | `luckin order preview`、`create`、`detail`、`cancel` | 预览价格与优惠、创建订单、查询状态或取消订单 |

门店查询使用经纬度，创建订单前还要组合门店 ID、商品 ID、SKU 和数量。不想手动拼参数时，可以使用自然语言入口，再在预览订单阶段检查门店、规格、数量和价格。

## 创建订单后仍需用户完成支付

CLI 把商品选择、优惠试算和订单创建放进终端，但不会绕过用户确认与支付。订单创建结果包含微信支付链接和二维码，用户支付后再查询制作状态与取餐码。

对开发者来说，这条路线的价值在于结构化输入和可编排性：同一套门店、商品和订单能力可以由人在终端调用，也可以进入 AI Agent 工作流。如果需要对照另一种“CLI + Skill”开放方式，可参考 [WorkBuddy 开放平台的命令行接入路线](/posts/2026/09/workbuddy-open-platform/)。
