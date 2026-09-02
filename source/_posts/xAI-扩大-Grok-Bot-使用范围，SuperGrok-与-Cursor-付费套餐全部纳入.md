---
title: Grok Bot 扩大使用范围，SuperGrok 与 Cursor Pro 均可使用
permalink: posts/2026/08/grok-bot-paid-plans/
tags: [xai, grok, cloud-agent, product-update]
date: 2026-08-28 10:13:12
updated: 2026-09-02 14:10:00
categories: 智能体
description: Grok Bot 已扩展到 SuperGrok 三档个人套餐、Cursor 三档付费个人套餐和自助 Teams。本文说明它如何借助共享云电脑跨应用持续执行任务、桌面与 iOS 使用入口、独立周用量机制，以及登录凭证、审批与数据存储边界。
cover: https://images.51allai.com/blog/grok-bot-paid-plans-cover_20260828_102109.png
sources:
  - name: SpaceXAI Docs — Grok Bot Get started
    url: https://docs.x.ai/grok-bot/get-started
---

> Grok Bot 于 8 月 11 日进入测试，8 月 26 日扩展到 SuperGrok、SuperGrok Plus、SuperGrok Heavy、Cursor Pro、Cursor Pro+、Cursor Ultra 和 Cursor Teams 付费套餐。每个账号获得一台持续运行的云电脑，多个 Bot 可以共享登录状态并并行处理任务。
![Grok Bot 云电脑智能体与付费套餐扩展](https://images.51allai.com/blog/grok-bot-paid-plans-cover_20260828_102109.png)

## 从聊天窗口变成持续运行的云端工作环境

Grok Bot 不只在对话里返回文字。它运行在持续存在的云端虚拟机中，可以使用浏览器、文件系统和终端，也能通过连接器或 MCP 访问已授权的工具。MCP 是让 AI 工具连接外部服务的通用协议；没有合适接口的网站，Bot 则可直接操作页面。

一个账号下的所有 Bot 共用同一台云电脑，共享文件、浏览器会话和应用登录状态。每个 Bot 有独立的屏幕和对话，可以并行执行工作，也能在线程或群聊中传递上下文和交接任务。用户关闭笔记本或手机后，已开始的后台任务和例行任务仍可继续运行。

## 所有付费个人 Cursor 套餐和自助团队席位都已包含访问权限

8 月 26 日的调整把 Grok Bot 纳入了 SuperGrok、SuperGrok Plus、SuperGrok Heavy，以及 Cursor Pro、Pro+、Ultra 和 Cursor Teams 套餐。已有这些订阅的用户不需再购买单独的 Grok Bot 订阅。SuperGrok 用户可以把个人订阅链接到 Cursor 账号；Cursor 用户直接用同一账号登录。

Grok Bot 的用量每周重置，与用户在 Grok 或 Cursor 中的原有用量分开计算。不同套餐对应不同的每周额度，Pro、Pro+ 和 Ultra 依次提供更高的 Grok Bot 用量。自助购买的 Cursor Teams 中，每个成员都有访问权限，管理员无需额外分配 Premium 席位。

## 桌面端负责初始配置，iPhone 可以接续同一对话

Grok Bot 桌面应用支持 Apple 芯片和 Intel 芯片的 macOS，也支持 x64 和 Arm64 架构的 Windows。iPhone 客户端需要 iOS 18 或更高版本。同一 Bot 的对话和状态会在已登录设备间同步，用户可以在电脑上创建任务，再用手机查看进度或处理审批。

初次使用时，先创建一个职责明确的 Bot，再给它一项有明确交付物的真实任务。稳定的处理步骤可以保存成 skill，也就是可重用的任务说明；需要定时执行时，再把它设为 routine。示范式教学可记录最长 10 分钟的可见操作，生成的流程仍应先用安全样例测试。

## 多个 Bot 共用登录状态，不能当作权限隔离

云电脑按用户账号分配，而不是按 Bot 分配。在其中登录的网站、放入的文件和命令行凭证，会对同一账号下的其他 Bot 可用。因此，把财务、客户资料和普通调研分成多个 Bot，并不会自动形成安全边界。

密码、通行密钥、二次验证码、验证码和支付确认应由用户接管云电脑后亲自完成，不应发到普通聊天中。发送消息、发布内容、付款、删除数据、修改权限和生产环境变更可以设为必须审批的动作。Grok Bot 需要云端数据存储，无法在 Cursor 的 Legacy Privacy Mode 下运行；绑定工作账号前，应先核对组织的数据设置和安全要求。
