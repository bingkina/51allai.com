---
title: 腾讯正式发布 Hy4 flash，百万 Token 输入价 0.5 元
permalink: posts/2026/11/tencent-hy4-flash/
tags: [tencent, hunyuan, model-release, pricing, open-source]
sources:
  - name: 腾讯 Hy4 flash 发布公告
    url: https://www.tencent.com/zh-cn/tencent-launches-hy4-flash-to-power-high-speed-cost-efficient-ai-deployment-for-everyday-workflows/
    note: 11 月 16 日正式发布、首批使用入口与目录价对比
  - name: 腾讯 Hy4 flash 英文发布公告
    url: https://www.tencent.com/tencent-launches-hy4-flash-to-power-high-speed-cost-efficient-ai-deployment-for-everyday-workflows/
    note: WorkBuddy 限免活动
  - name: 腾讯云 TokenHub 模型价格
    url: https://cloud.tencent.com/document/product/1823/130055
    note: Hy4 flash 和 Hy4 的目录价、在线推理五折期限
  - name: 腾讯云 TokenHub 模型列表
    url: https://cloud.tencent.com/document/product/1823/130051
    note: 模型 ID、上下文、输入输出上限、功能及 Hy4 preview 下线日期
  - name: 腾讯云 TokenHub Hy4 flash 模型详情
    url: https://cloud.tencent.com/tokenhub/hy4-flash
    note: 图文输入、文本输出、三种 API 协议和折后价格
  - name: OpenRouter Hy4 flash 模型页
    url: https://openrouter.ai/tencent/hy4-flash
    note: 国际 API 入口和模型 ID
  - name: 腾讯混元 Hy4 flash 开源公告
    url: https://x.com/TencentHunyuan/status/2122912575302119554
    note: 11 月 18 日公布可下载版本
  - name: 腾讯混元 Hy4 flash 模型仓库
    url: https://github.com/Tencent-Hunyuan/Hy4-flash
    note: 三个版本的下载入口、FP8 含义与部署说明
  - name: Tencent Hy License 1.0
    url: https://github.com/Tencent-Hunyuan/Hy4-flash/blob/main/LICENSE
    note: 模型许可及对大型模型即服务业务的附加条款
  - name: 腾讯云 ADP Hy4 flash 接入说明
    url: https://adp.tencent.com/zh/blog/tencent-hy4-flash-on-adp
    note: Hy4 flash 与 Hy4 API 目录价原图
date: 2026-11-18 21:57:31
categories:
  - 大模型
description: 腾讯正式发布混元 Hy4 flash，支持图文输入和约百万 Token 上下文。腾讯云 TokenHub 每百万 Token 目录价为输入 0.5 元、输出 2 元，在线推理限时五折。本文梳理 WorkBuddy 试用、API 接入和三个开源版本的区别。
cover: https://images.51allai.com/blog/tencent-hy4-flash-cover_20261118_220354.png
---

> 腾讯混元于 11 月 16 日正式发布 Hy4 flash，支持图文输入和约 100 万 Token 上下文。腾讯云 TokenHub 的 API 目录价为每百万 Token 输入 0.5 元、输出 2 元，在线推理限时五折。11 月 18 日，腾讯推出三个可下载版本，供开发者自行部署。
![腾讯混元 Hy4 flash 发布与百万 Token 输入价格封面](https://images.51allai.com/blog/tencent-hy4-flash-cover_20261118_220354.png)

## WorkBuddy 可试用，API 支持图文输入

Hy4 flash 是腾讯混元面向日常办公和高频调用推出的语言模型。它可以同时接收文字和图片，再用文字回答。例如，用户可以上传一张表格截图，让模型提取其中的数字，再按指定格式整理。

普通用户可以在 [WorkBuddy](https://www.workbuddy.cn/) 的模型选项中选择 Hy4 flash，免费体验活动持续到 11 月 30 日。模型也已接入元宝、企业微信、QQ、ima 和 Marvis。

在腾讯云 TokenHub，Hy4 flash 的上下文窗口约为 100 万 Token，单次最大输入和输出分别为 960K 和 64K Token。Token 是模型处理文本等内容时使用的计量单位，上下文窗口会容纳本次输入、历史内容和模型生成的回答。

## TokenHub 在线推理五折持续到 11 月 30 日中午

按每百万 Token 计算，Hy4 flash 的目录价为未命中缓存的输入 0.5 元、缓存命中的输入 0.02 元、输出 2 元。与 Hy4 的目录价相比，三项价格分别是原来的 1/12、1/15 和 1/9。缓存价适用于重复输入中实际命中缓存的部分。
![腾讯混元 Hy4 flash 与 Hy4 的 API 目录价对比图](待补图)

TokenHub 的在线推理五折活动持续至 2026 年 11 月 30 日 12:00（北京时间）。活动期内，每百万 Token 的未缓存输入、缓存命中输入和输出分别为 **0.25 元、0.01 元、1 元**。一批请求累计使用 100 万未缓存输入 Token、生成 10 万输出 Token，按活动价合计 0.35 元，按目录价合计 0.70 元。

## 开发者可接 API，也可下载部署

在 [腾讯云 TokenHub](https://cloud.tencent.com/tokenhub/hy4-flash) 接入时，模型 ID 为 `hy4-flash`，可选 OpenAI Chat Completions、Responses 或 Anthropic Messages 兼容接口。模型也已在 [OpenRouter](https://openrouter.ai/tencent/hy4-flash) 上线，ID 为 `tencent/hy4-flash`。仍在 TokenHub 调用 `hy4-preview` 的开发者可以提前测试迁移，平台计划在 12 月 7 日下线该模型。此前的版本规格与价格可参阅 [Hy4 preview 发布时的接入说明](/posts/2026/08/tencent-hy4-preview/)。

腾讯于 11 月 18 日开源 Hy4 flash 系列。[混元模型仓库](https://github.com/Tencent-Hunyuan/Hy4-flash#model-links) 汇总了 Hugging Face、ModelScope 和 GitCode 的下载入口。三个版本面向不同用法。

- **Hy4 flash** 是完成指令微调的版本，可直接用于对话和执行指令。
- **Hy4 flash-FP8** 是指令版的低精度版本，通过减少参数的存储精度降低显存占用。
- **Hy4 flash-base** 是预训练基础版，适合在此基础上继续训练。

三个版本采用 Tencent Hy License 1.0。许可第 10 节列有针对大型模型即服务业务的附加商用条款。
