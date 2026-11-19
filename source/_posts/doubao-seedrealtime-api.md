---
title: 豆包 SeedRealtime 1.0 API 全量上线
permalink: posts/2026/11/doubao-seedrealtime-api/
tags: [doubao-seed, volcengine, multimodal, realtime-api, pricing]
sources:
  - name: IT之家 · 豆包实时音视频通话模型 1.0 API 全量上线
    url: https://www.ithome.com/1/029/406.htm
    note: 2026 年 11 月 19 日的 API 上线消息
  - name: 字节跳动 Seed · SeedRealtime 音视频全双工大模型发布
    url: https://seed.bytedance.com/zh/blog/seedrealtime-audio-visual-full-duplex-llm-released-toward-omni-modal-natural-interaction
    note: 8 月发布、豆包 App 体验入口与音视频交互方式
  - name: 火山引擎 · 端到端实时音视频通话（Seed-Realtime）
    url: https://docs.volcengine.com/docs/doubao-voice/seedrealtime?lang=zh
    note: 视频帧和图片输入、帧率上限、会话协议与示例
  - name: 火山引擎 · 豆包语音模型价格
    url: https://docs.volcengine.com/docs/doubao-voice/billing-instructions?lang=zh
    note: 后付费单价、低帧率计费、资源包和默认并发
date: 2026-11-19 23:35:07
categories: 多模态
description: 火山引擎全量上线豆包实时音视频通话模型 SeedRealtime 1.0 API，支持在语音对话中传入摄像头画面、屏幕画面或图片。画面输入上限为每秒 2 帧，后付费语音通话每分钟 0.2 元、视频通话每分钟 0.4 元。
cover: https://images.51allai.com/blog/doubao-seedrealtime-api-cover_20261119_234016.png
---
> 11 月 19 日，火山引擎全量上线豆包实时音视频通话模型 SeedRealtime 1.0 的 API。开发者可在同一场语音对话里传入摄像头或屏幕画面，最高每秒 2 帧。服务按通话时长计费，后付费语音通话每分钟 0.2 元，视频通话每分钟 0.4 元。
![豆包 SeedRealtime 1.0 实时音视频通话 API 封面](https://images.51allai.com/blog/doubao-seedrealtime-api-cover_20261119_234016.png)

## 语音通话可以带上摄像头或屏幕画面

SeedRealtime 在 8 月 5 日发布时已全量上线豆包 App。11 月 19 日开放的 API 是给开发者用的软件接口，可以把同类音视频交互接到自己的应用里。

SeedRealtime 1.0 在豆包实时语音模型 3.0（Seeduplex）的基础上增加了视频帧和图片输入。模型在同一场会话中处理画面和声音，并用语音回答。全双工指的是模型播报时仍能接收用户的声音，用户中途插话可以打断当前播报。

客户端每秒最多发送 2 张画面，超出上限的帧会被丢弃。做屏幕讲解时，可以让用户停留在需要解释的页面，边展示边提问。快速切换的画面可能落在两次采样之间，这是设计交互时要考虑的限制。

## 后付费语音每分钟 0.2 元，视频每分钟 0.4 元

只传音频时，按语音通话计费。传入画面后，视频计费部分的单价包含语音费用。画面发送频率高于每秒 0.5 帧时，整段通话按视频计费。低于这个频率时，每张图折算 2 秒视频时长，其余时间按语音计费。

例如，一场通话持续 10 分钟，每 5 秒发一张图，共传 120 张。按后付费单价计算，4 分钟算视频、6 分钟算语音，合计 **2.8 元**。同样通话 10 分钟，只传音频是 2 元，以每秒 1 帧持续传画面是 4 元。

预付费资源包中，100 分钟档售价 19.6 元。1 分钟语音抵扣 1 分钟额度，1 分钟视频抵扣 2 分钟额度。服务默认最多支持 5 路同时通话。

## 豆包 App 和开发者示例都能体验

想直接试用，可以更新豆包 App，在对话框里点「打电话」进入视频通话。

开发者可下载 [SeedRealtime 1.0 接入页的网页示例](https://docs.volcengine.com/docs/doubao-voice/seedrealtime?lang=zh)，填入在火山引擎控制台获取的 API Key 运行。自行接入时，音频和图片通过同一条 WebSocket 长连接并行发送，应用可以一边上传麦克风声音和画面，一边接收模型的语音回复。接入页还提供 Python 和 Go 示例。
