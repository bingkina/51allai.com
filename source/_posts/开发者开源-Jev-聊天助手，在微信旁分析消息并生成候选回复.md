---
title: 开发者开源 Jev 聊天助手，在微信旁分析消息并生成候选回复
permalink: posts/2026/09/jev-chat-assistant-wechat/
tags: [jev-chat-assistant, open-source, ai-agents, mobile]
sources:
  - name: Jev 聊天助手 GitHub 仓库
    url: https://github.com/Finderchangchang/jev-chat-JARVIS
    note: 项目定位、已验证平台、构建方式、已知限制与 MIT 许可证
  - name: ChatCaptureService 源码
    url: https://github.com/Finderchangchang/jev-chat-JARVIS/blob/091f1a6a442496c9b1849f72d5225c5d4eca0c0a/app/src/main/java/com/jev/probe/capture/ChatCaptureService.kt
    note: 消息触发、悬浮窗、回复填入与不自动发送的实现
  - name: JevClient 与 JevQuestions 源码
    url: https://github.com/Finderchangchang/jev-chat-JARVIS/tree/091f1a6a442496c9b1849f72d5225c5d4eca0c0a/app/src/main/java/com/jev/probe/jev
    note: OpenRouter 请求、Jev 1.13、生成模型与 3 条候选回复流程
  - name: Jev 1.13 on OpenRouter
    url: https://openrouter.ai/typesafe/jev-1.13/api
    note: Jev 的结构化决策定位、32K 上下文与 API 计价
date: 2026-09-21 21:35:34
categories: 智能体
description: 开发者开源 Jev 聊天助手，Android 用户可让它读取微信当前会话，判断对方意图并生成 3 条候选回复。本文说明运行流程、构建条件、数据去向与已知限制。
cover: https://images.51allai.com/blog/jev-chat-assistant-wechat-cover_20260921_214328.png
---
> 开发者 Finderchangchang 于 9 月 21 日开源 Jev 聊天助手。Android 用户可让它读取微信当前会话，判断对方意图、危险等级与回复动作，再生成并排序 3 条候选回复。助手只把选中内容填入输入框，发送仍由用户完成。
![Jev 聊天助手微信消息分析与候选回复](https://images.51allai.com/blog/jev-chat-assistant-wechat-cover_20260921_214328.png)

## 它是悬浮在聊天界面上的回复辅助层

Jev 聊天助手不是新的通讯软件。它在 Android 上通过无障碍服务读取当前聊天窗口，把消息整理成“我”与“对方”的对话，再用悬浮窗展示分析结果和候选回复。

当前代码为微信和飞书分别实现了采集适配器。微信适配器读取聊天气泡文字，再按气泡的水平位置判断发言方。仓库记录的实测环境是 Android 版微信 8.0.78。

飞书适配器已能识别聊天窗口、会话标题、气泡位置和输入框，但普通消息正文使用自绘控件，没有出现在无障碍节点中。所以飞书当前只能读到部分带 TextView 的卡片内容，普通消息的截图和本地 OCR 链路还没有接入。

## Jev 负责判断，生成模型负责写回复

助手会取最近 10 条消息，连同用户设置的人际关系描述一起发给 Jev 1.13。Jev 不直接写文案，而是回答一组结构化问题：对方的意图、关系冲突危险、需求、最佳动作、是否需要具体回复，以及紧张状态是否结束。

另一次模型请求会生成 3 条不同策略的中文回复，每条最多 40 字。Jev 再对这 3 条回复排序，悬浮窗中的占比来自这一步。默认回复模型是 `deepseek/deepseek-chat-v3.1`，用户可在设置页更换。

## 选中回复后只填入，不会点击发送

用户在悬浮窗点击“填入”后，程序会先尝试用 Android 的 `ACTION_SET_TEXT` 向当前输入框写入文本。如果写入失败，则复制到剪贴板并执行粘贴。代码没有点击发送按钮的步骤，用户可以在输入框里继续修改或直接删除。

这个设计保留了发送前的人工确认，但无障碍和悬浮窗仍是高权限。项目会监听窗口内容，再按前台 App 的包名选择微信或飞书适配器。安装前应先阅读源码，并只给自己信任的构建授权。

## 对话内容会发往 OpenRouter

这不是全本地工具。进入分析流程后，最近 10 条消息会通过 OpenRouter 分别发给 Jev 和用户选择的回复生成模型。对话白名单可以限制助手处理哪些会话；白名单为空时，所有能被适配器读取的会话都允许触发分析。

OpenRouter API Key 保存在 App 私有的 `SharedPreferences` 中，不会写入日志或仓库；当前实现没有使用 `EncryptedSharedPreferences`。这些数据边界比“密钥保存在本机”更值得关注，因为真正发往模型服务的是聊天文本。

## Android 11 及以上用户可从源码构建

项目最低支持 Android 11（API 30），源码采用 Kotlin 和传统 View 实现，许可证为 MIT。构建需要 JDK 17、Android SDK Platform 35 和 Build Tools 35：

```bash
./gradlew assembleDebug
```

生成的调试 APK 位于 `app/build/outputs/apk/debug/app-debug.apk`。安装后需在设置页填写自己的 OpenRouter API Key，并开启无障碍、悬浮窗和前台保活所需权限。小米或 HyperOS 设备还需配置自启动和省电白名单，否则后台服务可能被冻结。
