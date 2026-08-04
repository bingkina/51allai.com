---
title: Cloudflare 推出 Wallets，先开放 cloudflare.pay 账户标识
permalink: posts/2026/08/cloudflare-wallets-agent-payments/
tags: [cloudflare, cloudflare-wallets, ai-agents, fintech, product-update]
date: 2026-08-04 23:00:23
categories: 智能体
description: Cloudflare 推出 Wallets，现已开放 cloudflare.pay 账户标识认领。后续钱包将支持稳定币收付，并可为 AI Agent 创建带额度、允许名单和单笔上限的虚拟钱包，用于购买 API、MCP 工具和内容。本文说明当前开放范围、两类钱包设计、x402 支付方式和身份机制。
cover: https://images.51allai.com/blog/cloudflare-wallets-agent-payments-cover_20260804_230722.png
---
> Cloudflare 发布 Wallets，并开放 cloudflare.pay 账户标识认领。完整支付功能将随后上线，计划支持稳定币收付，以及供 AI Agent 使用的虚拟钱包；账户所有者可设置额度、允许名单和单笔交易上限。
![Cloudflare Wallets 与 AI Agent 虚拟钱包](https://images.51allai.com/blog/cloudflare-wallets-agent-payments-cover_20260804_230722.png)

## 现在开放的是账户标识认领

Cloudflare Wallets 面向需要在网络上自动购买服务的 AI Agent。8 月 4 日开放的第一项能力，是让 Cloudflare 账户在 `cloudflare.pay` 认领一个唯一的 Wallet handle，也就是容易记忆的账户标识。完整的钱包充值、付款和收款功能将随后提供。

这一区别很重要。用户现在可以前往 `cloudflare.pay` 认领标识，但还不能把 Wallets 当作已经全面开放的稳定币钱包使用。Cloudflare 将标识与账户绑定，未来用户可以选择在与商家交互时公开它，让商家知道请求来自哪个账户授权的 Agent。

## 两类钱包分别交给人和 Agent

Wallets 计划分为 Account Wallets 和 Virtual Wallets 两类。Account Wallets 由 Cloudflare 账户所有者管理，可用于存入、取出资金，并把一部分支出权限交给虚拟钱包。

Virtual Wallets 面向 AI Agent，通过 API 密钥操作。一个账户可以为不同 Agent 创建多个虚拟钱包，让它们购买 API、MCP 工具、内容等网络资源。MCP 是让 AI 调用外部工具和数据的一套通用接口。

资金仍由账户所有者控制。每个虚拟钱包都可以设置可用额度、允许交易的对象以及单笔交易上限。超过限制后，Agent 需要请求有权限的人调整规则或批准额外资金。这种设计让 Agent 不必在每一笔小额购买前等待人工确认，同时给自动支出保留明确边界。

## 用 x402 把付款附在网络请求中

Cloudflare Wallets 计划支持稳定币，并通过 x402 协议购买服务。x402 把 HTTP 的 `402 Payment Required` 状态码用于机器支付：服务端返回价格和收款要求，调用方签署付款信息后再次发起请求，验证和结算完成后取得资源。

它适合金额很小、调用频率高的服务。例如，Agent 可以按次购买一次 API 调用、一个数据集查询或一次 MCP 工具执行，不必先注册每家服务、绑定银行卡并购买整包额度。

Wallets 对应买方一侧。Cloudflare 在 7 月推出的 Monetization Gateway 对应卖方一侧，让网站、API 和 MCP 工具提供者通过 x402 对资源收费。两项能力组合后，卖方可以设置收费规则，Agent 则可以从受限的虚拟钱包完成支付。

## Wallet handle 也承担身份作用

钱包标识不只用于付款。Cloudflare 计划让 Agent 使用类似 `research.example.cloudflare.pay` 的地址声明身份。这个可读地址会对应 Agent 的密钥，让商家能够识别它受哪个账户委托。

是否公开身份由 Agent 一方选择，商家也可以自行决定是否优先与已识别的 Agent 交易。Cloudflare 没有为身份附加一套固定资料格式，而是先把难以阅读的密钥转换成容易记忆和传递的名称。

对于普通用户，现在可执行的操作只有认领 Wallet handle。后续支付能力开放后，账户所有者才可以添加资金、创建虚拟钱包并设置支出规则。这样的上线节奏避免把“已经发布产品”误读成“所有支付功能今天即可使用”。
