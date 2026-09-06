---
title: 智谱开放 ZCode 周末额度，免费领取 3 亿 Token
permalink: posts/2026/09/zhipu-zcode-300m-token-weekend/
tags: [zhipu, glm-5.3, coding-agent, product-update]
sources:
  - name: ZCode 官方账号 — Weekend Build IV 领取说明
    url: https://x.com/zcode_ai/status/2096200020311814304
    note: 登录要求、领取入口与仅限 ZCode 使用
  - name: ZCode 官方账号 — GLM-5.3-Flash 启用说明
    url: https://x.com/zcode_ai/status/2096199950027927698
    note: 模型选择与活动状态确认方式
  - name: ZCode 版本发布与更新
    url: https://zcode.z.ai/cn/changelog
    note: Weekend Plan 领取提醒与当前客户端版本
  - name: ZCode 连接模型与套餐文档
    url: https://zcode.z.ai/cn/docs/configuration
    note: BigModel 账号连接、模型设置入口与额度通道区别
  - name: AI信息Gap — 智谱 ZCode 3 亿 Token 活动
    url: https://finance.sina.com.cn/tech/roll/2026-09-05/doc-iniqtnha0545863.shtml
    note: 活动额度、开放时间、适用用户与截止时间交叉核验
date: 2026-09-06 12:45:29
categories: 智能体
description: 智谱 ZCode 向新老用户开放 3 亿 GLM-5.3-Flash Token 周末额度，9 月 6 日 23:00 截止。本文说明领取入口、启用步骤和仅限 ZCode 使用的额度边界。
cover: https://images.51allai.com/blog/zhipu-zcode-300m-token-cover_20260906_125049.png
---

> 智谱 ZCode 的 WEEKEND BUILD IV 向新老用户开放 3 亿 GLM-5.3-Flash Token。额度于 9 月 5 日 09:00 生效，9 月 6 日 23:00 到期，先到先得；用户需在最新版 ZCode 内领取和使用，这不是 BigModel 通用 API 额度。
![智谱 ZCode 免费领取 3 亿 GLM-5.3-Flash Token 周末额度](https://images.51allai.com/blog/zhipu-zcode-300m-token-cover_20260906_125049.png)

## 在 ZCode 左下角领取活动额度

领取需要使用 ZCode 桌面端。打开最新版 ZCode，登录 BigModel 或 Z.ai 账号，再点击左下角的 Weekend Build 活动卡片完成领取。新用户、老用户和已购买 Coding Plan 的用户都能参加，不需要重新注册账号。

领取后进入“设置 → 模型设置”，选择 `GLM-5.3-Flash`，并确认周末活动卡片已经生效。ZCode 支持 macOS、Windows 和 Linux，安装包可从[官方 ZCode 页面](https://zcode.z.ai/cn)下载。

## 本轮额度在 9 月 6 日 23:00 到期

这 3 亿 Token 的有效窗口是北京时间 2026 年 9 月 5 日 09:00 至 9 月 6 日 23:00。活动采用先到先得方式，活动期间曾追加名额；能否领取应以客户端卡片的实时状态为准。

Token 是模型读取输入和生成输出时使用的计量单位。3 亿 Token 指活动期内可累计消耗的额度，不是模型单次可以装入 3 亿 Token 内容。GLM-5.3-Flash 的单次上下文窗口为 100 万 Token，模型参数、图像输入和 API 价格可查看站内的 [GLM-5.3-Flash 模型说明](/posts/2026/08/zhipu-glm-53-flash/)。

## 额度只能在 ZCode 中使用

活动额度绑定 ZCode，不能当作 BigModel 开放平台的通用 API 余额，也不能复制到其他编程工具中消费。领取后需要在 ZCode 中选中 GLM-5.3-Flash，再把代码目录、任务说明和验收条件交给 Agent。

适合在截止前处理的任务包括跨文件修改、测试补全、代码解释和截图分析。对会改动文件或执行命令的任务，应先保留 Git 状态，并在完成后运行测试或构建；模型给出的完成说明不能代替实际结果。

ZCode 也可通过 Coding Plan 连接 GLM 模型，但 Coding Plan 套餐、开放平台 API 余额和这次周末体验额度是不同通道。此前的 [GLM-5.3 与 ZCode 使用入口](/posts/2026/08/zhipu-glm-53-coding-plan/) 可用于了解长期使用方式。
