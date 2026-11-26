---
title: 微信 AI 小程序成长计划二期提供 10 亿 Token，个人可报名
permalink: posts/2026/11/wechat-mini-program-growth/
tags: [tencent, wechat-ai, mini-program, deepseek]
sources:
  - name: WeChat 官方账号 11 月 25 日更新
    url: https://x.com/Weixin_WeChat/status/2125561667299967170
    note: 核对个人开发者报名、二期 AI 额度和 We 分析权益
  - name: 微信开放文档《小程序成长计划》
    url: https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/billing/ai-inspire-plan.html
    note: 核对报名入口、两期活动时间、资源额度和一期补发
  - name: 腾讯云开发 CloudBase《小程序成长计划》
    url: https://docs.cloudbase.net/ai/ai-inspire-plan
    note: 核对领取条件、环境绑定、代金券、额度有效期及用量入口
  - name: 腾讯云开发 CloudBase《小程序成长计划使用指南》
    url: https://docs.cloudbase.net/ai/ai-inspire-plan-guide
    note: 核对 Hy4、DeepSeek V4.1 Flash、混元生图及用量抵扣方式
  - name: 腾讯云开发 CloudBase《AI 资源包调用来源的治理公告》
    url: https://docs.cloudbase.net/ai/ai-inspire-plan-usage-governance
    note: 核对允许的调用来源和资源点套餐扣费条件
  - name: 腾讯云开发 CloudBase《AI 资源包使用范围的专项治理公告》
    url: https://docs.cloudbase.net/ai/ai-inspire-plan-rules
    note: 页首注明云开发服务端调用范围从 11 月 24 日起收紧
  - name: 腾讯云开发 TCB 二期活动介绍
    url: https://developer.cloud.tencent.com/article/2705075
    note: 核对全行业报名并取得微信公众平台报名界面截图
  - name: 腾讯云开发 TCB 成长计划发布说明
    url: https://developer.cloud.tencent.com/article/2613128
    note: 核对 We 分析专业版一年使用权益
date: 2026-11-26 09:40:59
categories: 行业观察
description: 微信 AI 小程序成长计划二期持续至 12 月 31 日，个人开发者可在微信公众平台报名领取 10 亿文本 Token 和 10 万张 AI 生图额度。本文梳理云开发权益、可抵扣的模型和 11 月 24 日生效的调用规则。
cover: https://images.51allai.com/blog/wechat-mini-program-growth-cover_20261126_095014.png
---
> 微信 AI 小程序成长计划二期报名持续至 2026 年 12 月 31 日，个人开发者也能参加。报名成功可获 10 亿文本 Token 和 10 万张 AI 生图额度，有效期为 6 个月。11 月 24 日起，云函数或云托管须由小程序发起调用，才能抵扣赠送额度。
![微信 AI 小程序成长计划二期开发者资源封面](https://images.51allai.com/blog/wechat-mini-program-growth-cover_20261126_095014.png)

## 个人开发者从微信公众平台报名

个人及企业主体均可报名，活动面向各行业的小程序。用小程序账号登录[微信公众平台](https://mp.weixin.qq.com/)，在左侧「行业能力」下进入「小程序成长计划」，点击「参与计划」。每个小程序账号只能参加一次，领到资源后，绑定的腾讯云账号和云开发环境均无法更换。

![微信公众平台小程序成长计划的行业能力菜单与参与计划按钮](https://images.51allai.com/blog/wechat-mini-program-growth-enrollment_20261126_095017.png)

没有微信云开发环境的开发者可领取 6 个月的个人版环境，使用云端数据库、存储和服务端功能。选择开发阶段的免费体验环境报名，原环境会升级为 6 个月的个人版。选择其他微信云开发环境，可按规则领取 120 元云开发代金券。三种情况均附带 AI 资源包。符合条件的小程序还可免费使用一年 We 分析专业版。

## 10 亿文本 Token 和 10 万张生图额度怎么发

二期报名期为 2026 年 7 月 1 日至 12 月 31 日，资源包有效期从申请成功之日起算。Token 是模型处理文本时使用的计量单位。

一期已报名且保留原环境的小程序，由系统自动补发 9 亿文本 Token 和 9 万张生图额度。补发额度从发放日起算 6 个月。

文本额度可抵扣混元 Hy4、[DeepSeek V4.1 Flash](/posts/2026/09/deepseek-v41-flash-open-source-multimodal/) 等指定模型。生图额度可用于混元 Hy-Image-3.5-preview。领取后，在云开发控制台的「AI 模型用量」可查看文本和生图的额度消耗。

## 11 月 24 日起，服务端调用须由小程序发起

赠送额度可用于小程序端直接调用、由小程序发起的云函数或云托管调用，以及在云开发控制台直接使用 AI 能力。云函数和云托管负责在服务器上运行代码，两者能否抵扣，取决于请求是否由小程序发起。

网页、脚本或第三方系统直接调用云托管，以及在 AI 编程工具中直接调用模型，按云开发套餐扣减文本用量。此类调用需要资源点套餐，仍使用按项目分配额度的旧套餐时，调用会失败。
