---
title: Google 发布 Gemini 3.5 Live Translate，实时语音翻译覆盖 70 多种语言
permalink: posts/2026/06/google-gemini-35-live-translate/
tags: [google, gemini, live-translate, model-release, product-update]
date: 2026-06-10 18:43:37
categories:
  - 多模态
description: Google 发布 Gemini 3.5 Live Translate 音频模型，支持 70 多种语言实时语音翻译，并接入 Gemini Live API、Google Translate 与 Meet。
cover: https://images.51allai.com/blog/3-5_Live_Translate_hero.width-2200.format-webp_20260610_185737.webp
---

> Google 在 6 月 9 日发布 Gemini 3.5 Live Translate，定位为实时语音到语音翻译音频模型。官方称其支持 70 多种语言、2000 多种语言组合，并开始接入 API、Google Translate 和 Meet。
![Gemini 3.5 Live Translate 官方发布主视觉](https://images.51allai.com/blog/3-5_Live_Translate_hero.width-2200.format-webp_20260610_185737.webp)

## 不是翻译按钮，而是连续语音流模型

Google 把 Gemini 3.5 Live Translate 定义为“latest audio model”，不是 Google Translate 里的一个普通 UI 更新。它面向的是 speech-to-speech translation：输入连续语音流，输出另一种语言的语音，同时保留说话人的语调、节奏和音高。

关键差异在延迟策略。传统语音翻译通常等一句话结束后再翻译，质量更稳，但对话节奏容易断。Google 这次强调 3.5 Live Translate 会边听边生成，模型在“等更多上下文”和“尽快同步说话人”之间动态取舍。官方说法是，翻译音频会在整个会话中保持落后说话人几秒。

这个表述需要谨慎读：Google 没有给出公开第三方延迟测试，也没有披露不同语言对、噪声环境、多人抢话场景下的具体延迟分布。可以确认的是，Google 已经把实时语音翻译从“产品功能”推到了独立音频模型层。

## API、Translate、Meet 三条线同时铺开

发布路径分三层。

开发者侧，Gemini 3.5 Live Translate 通过 Gemini Live API 和 Google AI Studio 进入 public preview。官方文档给出的模型 ID 是 `gemini-3.5-live-translate-preview`。它的 mental model 不是通用 Live Agent，而是解释器管线：只做低延迟翻译，输入限制为音频，不支持工具调用、系统指令或多模态输入。开发者配置目标语言和 `echo_target_language` 等参数后，可以接收翻译音频和输入/输出转写。

消费端，Google Translate 在 Android 和 iOS 全球推出 3.5 Live Translate。用户连接任意耳机后，可以在 Live translate 功能里听到目标语言语音。Android 还新增 listening mode：不用耳机时，把手机像接电话一样贴近耳朵，翻译音频从听筒输出。

企业端，Google Meet 的 Speech Translation 将接入 3.5 Live Translate。Google 称新版本会把 Meet 的语音翻译从此前 5 种语言扩展到 70 多种语言，并支持 2000 多种语言组合，不再只围绕英语翻译。这个更新本月先面向部分 Google Workspace 商业客户 private preview，后续再扩大范围。

## 模型卡透露了边界

DeepMind model card 给了几个比发布页更硬的参数：Gemini 3.5 Live Translate 基于 Gemini 3 Pro，输入是音频，上下文窗口最高 128K token；输出为音频和文本，最高 64K token。

评测维度包括翻译质量、延迟和语音自然度。翻译质量使用 AutoMQM 这类错误分类指标；延迟分成初始延迟和词级延迟；语音自然度关注卡顿、声音漂移和音频伪影。问题是，model card 只说明这些评测基于 Google 内部实现和 Gemini Live API 输出，没有给出完整公开分数表。对外部开发者来说，这仍然需要实测。

限制同样值得写清楚。Google 承认模型可能出现声音不一致，长暂停后声音漂移，快速多人说话时卡在某个声音上；语言检测会受非母语口音、相近语言和快速切换影响；背景噪声过滤也不是绝对可靠。Meet 帮助文档也提醒，实时翻译比录音或文本翻译更容易出错，可能出现语法、翻译、口音、性别和网络质量问题。

## 价值在分发，不只在模型

实时翻译模型本身不是新概念。Google 这次真正有分量的地方在分发面：同一个模型能力被放进开发者 API、Translate 移动端和 Meet 企业会议。

API 让实时翻译进入第三方音视频应用。官方示例已经给出 LiveKit 方案：主播音频进 LiveKit room，再由服务端 bot 接 Gemini Live API，为不同目标语言发布独立音轨。示例文档也写明，单房间 demo 适合约 15-20 种并发语言；更大规模场景应拆成“采集、翻译、分发”三层架构。也就是说，Google 没有把工程复杂度藏起来，实时媒体管线仍是部署门槛。

Translate 负责触达普通用户，Meet 负责企业会议。Grab 的测试案例说明它还在进入出行场景：司机和旅客每月超过 1000 万次语音通话，这是近实时翻译最容易产生价值的高频异语沟通场景之一。但这些合作反馈均来自 Google 发布页，暂不能当作独立评测。