---
title: 腾讯 WorkBuddy 开放电脑操控公测，支持 macOS 和 Windows
permalink: posts/2026/11/workbuddy-computer-use/
tags: [tencent, workbuddy, desktop-agent, product-update]
sources:
  - name: 腾讯云 WorkBuddy Enterprise 客户端功能管理
    url: https://cloud.tencent.com/document/product/1831/140758
    note: 客户端设置入口、企业版默认策略及成员和部门的权限配置
  - name: WorkBuddy 历史版本下载
    url: https://www.codebuddy.cn/docs/workbuddy/Download-History
    note: 5.11.x 系列的 macOS 和 Windows 安装包
  - name: 凤凰网科技 WorkBuddy 电脑操控上线报道
    url: https://original.ifeng.com/c/8yDF3Mhunqm
    note: 11 月 20 日公测消息、最低客户端版本、执行流程和应用限制设置截图
  - name: 人人都是产品经理 WorkBuddy 电脑操控体验
    url: https://www.woshipm.com/ai/6491707.html
    note: 实际客户端截图中的安装入口、macOS 授权提示和停止操作说明
date: 2026-11-23 10:05:15
categories: 智能体
description: 腾讯 WorkBuddy 开放电脑操控公测，可在没有开放接口的桌面软件里点击、输入和滚动。macOS 和 Windows 用户需使用 5.11.0 或更高版本，在「设置 → 智能体」安装并授权。企业版由管理员控制使用范围。
cover: https://images.51allai.com/blog/workbuddy-computer-use-cover_20261123_101027.png
---

> 11 月 20 日，腾讯 WorkBuddy 开放电脑操控公测。这个功能可以识别桌面软件的界面并执行点击、输入和滚动，即使软件没有向外部开放接口。macOS 和 Windows 用户需更新到 5.11.0 或更高版本，在客户端设置中安装并授权。
![WorkBuddy 电脑操控公测与桌面应用操作示意图](https://images.51allai.com/blog/workbuddy-computer-use-cover_20261123_101027.png)

## 直接在桌面软件里点击、输入和滚动

WorkBuddy 是腾讯的[桌面办公智能体](/posts/2026/03/tencent-workbuddy-desktop-agent/)。这次公测的电脑操控（Computer Use）通过读取软件界面来执行任务。即使目标软件没有 API，也就是供其他程序调用的接口，WorkBuddy 仍可尝试在已有的搜索框、按钮和表单里操作。

例如，要在仓储客户端里核对一笔入库记录，可以在对话里指定软件、入库单号和需要返回的字段。执行时可以在侧边小窗查看进度，也可以随时停止任务。界面识别效果因软件而异，同时操作目标软件也可能改变输入焦点或页面状态，中断任务。

## 在「设置 → 智能体」安装并授权

macOS 和 Windows 用户先将桌面客户端更新至 5.11.0 或更高版本，再打开「设置 → 智能体 → 电脑操控」，安装「电脑应用操控」并按提示授权。

在 Mac 上，「屏幕录制」权限用于截图判断点击位置，「辅助功能」权限用于模拟鼠标和键盘输入。两项权限都可以在系统设置中收回。客户端的电脑操控设置也提供「禁止 WorkBuddy 操作的应用」列表，可把指定软件排除在操作范围外。

涉及登录、授权、支付、提交或删除时，腾讯建议用户在场核对。任务完成后，可以回到原软件检查查询结果或填入的内容。

## 企业版默认关闭，由管理员放行

WorkBuddy Enterprise 的电脑操控默认对所有成员关闭。管理员可在企业控制台的「客户端配置 → 客户端功能管理」中开放给全体成员，也可以按成员或部门设置允许名单或屏蔽名单。策略改为禁止后，成员即使已安装并完成系统授权，也会立即失去使用权限。
