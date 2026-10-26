---
title: 开源项目WeChatBridge，将微信聊天转发给第三方 AI Agent 与 Obsidian
permalink: posts/2026/10/wechatbridge-ai-obsidian-archive/
tags: [wechatbridge, ai-agents, open-source, workflow-automation]
sources:
  - name: WeChatBridge 项目说明与下载入口
    url: https://github.com/freestylefly/WeChatBridge
    note: 产品定位、平台下载、系统要求、分批收集与源码构建
  - name: WeChatBridge 使用指南
    url: https://github.com/freestylefly/WeChatBridge/blob/main/USAGE.zh-CN.md
    note: 转发操作、场景提示词、归档、权限与分批收集步骤
  - name: WeChatBridge 分享目标定义
    url: https://github.com/freestylefly/WeChatBridge/blob/main/macos/Sources/WeChatBridgeCore/ShareAction.swift
    note: 核对 macOS 的十二个分享入口及目标应用
  - name: WeChatBridge 自动粘贴实现
    url: https://github.com/freestylefly/WeChatBridge/blob/main/macos/Sources/WeChatBridgeApp/AutoPaste.swift
    note: 应用激活、辅助功能授权、模拟粘贴与失败条件
  - name: WeChatBridge 本地归档实现
    url: https://github.com/freestylefly/WeChatBridge/blob/main/macos/Sources/WeChatBridgeApp/KnowledgeDelivery.swift
    note: Markdown 笔记、原始 ZIP 与媒体附件的保存方式
  - name: WeChatBridge Windows 安装包说明
    url: https://github.com/freestylefly/WeChatBridge/blob/main/windows/packaging/README.md
    note: x64 平台、Windows 系统要求与测试安装包签名条件
  - name: WeChatBridge MIT 许可证
    url: https://github.com/freestylefly/WeChatBridge/blob/main/LICENSE
    note: 代码使用、修改与再分发条款
date: 2026-10-26 11:14:27
categories: 智能体
description: WeChatBridge（微信流）开源，将微信主动导出的聊天记录转给 AI 应用，或保存为 Obsidian 笔记与本地文件。本文介绍场景提示词、分批收集、Mac 与 Windows 下载入口，以及自动粘贴所需权限和使用边界。
cover: https://images.51allai.com/blog/wechatbridge-ai-obsidian-archive-cover-v2_20261026_112726.png
---

> WeChatBridge（微信流）把微信“合并转发”产生的聊天文件送到 AI 应用，也能保存为 Obsidian 笔记或本地文件夹。用户可以附加预设的整理要求，分批收集超过 100 条的消息，再统一交给目标应用。项目采用 MIT 许可证，提供 macOS 和 Windows 下载入口，处理范围限于用户主动分享的文件。
![WeChatBridge 将微信聊天转给 AI 并归档到 Obsidian 的流程示意](https://images.51allai.com/blog/wechatbridge-ai-obsidian-archive-cover-v2_20261026_112726.png)

## 从微信转发菜单，把选中的聊天交给 AI

[WeChatBridge（微信流）](https://github.com/freestylefly/WeChatBridge) 是一个微信聊天记录转发与归档工具。它接在微信原生的“多选 → 合并转发 → 转发到其他应用”之后，接收微信打包的 ZIP 压缩文件，其中可以包含聊天文本、图片和视频。

macOS 版通过系统分享扩展，在转发菜单里增加十二个入口。分享扩展就是让应用出现在系统分享列表中的组件，用户选好消息后，可以直接选择“发给 Codex”“发给 Claude”或“沉淀到 Obsidian”。

内置目标还包括豆包、千问办公、WorkBuddy、WeSight 和 DeepSeek Harness。需要转给其他已安装应用时，可以配置自定义目标；只想手动处理文件，也可以选择复制到剪贴板。

转给 AI 应用时，微信流会激活目标窗口，再把提示词和文件粘贴到输入区域。**这一步完成的是资料投递，后续整理由目标 AI 应用处理。** 自动粘贴依赖目标应用已安装、窗口能进入前台，以及相应的系统权限。

![WeChatBridge 将微信聊天转给 AI 并归档到 Obsidian 的流程示意](https://images.51allai.com/blog/截屏2026-10-26_11.23.07_2_20261026_112807.png)

## 先保存整理要求，长聊天可以分批收集

同一批聊天可以有不同的处理目的。项目群需要提取进度和待办，客户群需要整理需求与承诺，资讯群则适合汇总主题和链接。

微信流用“场景”保存这些要求。场景是一段预设提示词，可以指定适用的 AI 应用，并与群聊绑定。每次转发时选择一个场景，整理要求就会随聊天文件一起送过去，省去重复输入。

例如，用户可以给项目群设置“按负责人整理待办，保留原文中的截止日期”。微信流负责传递这段要求和原始资料，生成结果仍需结合原文核对。

超过 100 条的聊天可以用“分批收集到微信流”处理：每次在微信里手动选取一批，连续分享到同一入口，收齐后点击“完成并发送”，统一选择目标和场景。浮条会显示批次，并提供每批首尾消息的参考，方便继续查找下一段。

**分批收集保留微信的单次多选上限**，用户仍要逐批选取消息。各批原始 ZIP 会保留下来，收集记录也可以恢复或重试。

## 保存为 Obsidian 笔记，同时保留原始附件

选择“沉淀到 Obsidian”前，需要先指定知识库目录。微信流会解析导出的聊天文本，按聊天名生成 Markdown 笔记，并将原始 ZIP 和提取出的媒体文件放进附件目录。Markdown 是可用普通文本编辑器打开的笔记格式，便于后续检索和编辑。

不使用 Obsidian 时，可以选择“沉淀到文件夹”，把笔记与附件保存到指定目录。这条流程由微信流直接写入文件，不要求先让 AI 生成摘要。

它适合保存项目讨论、客户沟通和群内资料中已经选好的片段。需要检索电脑上多段历史、持续生成日报的用户，也可以了解站内介绍过的 [WeChat Intelligence Hub 聊天整理工具](/posts/2026/09/wechat-intelligence-hub/)，其完整历史读取需要本地数据库接入条件。

## Mac 与 Windows 分别下载安装，权限按用途开启

项目提供两端下载入口，提取密码均为 `向明`：

| 平台 | 下载入口与条件 |
| --- | --- |
| macOS | [macOS 安装包](https://wwbsr.lanzout.com/b0umjur8h)，要求 macOS 14 或更高版本；DMG 支持 Apple Silicon 和 Intel Mac |
| Windows | [Windows 安装包](https://wwbsr.lanzout.com/b0umjur4d)，下载后按包内说明运行；自包含 x64 安装包面向 Intel/AMD 电脑，要求 Windows 10 2004 或更高版本，或 Windows 11 |

Windows 的本地测试安装包使用自签名证书，系统可能显示发布者识别或 SmartScreen 提示。安装时应核对包内说明及证书步骤。

Mac 安装后，在“微信流 → 设置 → 入口”中启用需要的分享目标。如果微信菜单中没有出现入口，可以检查“系统设置 → 通用 → 登录项与扩展 → 共享”，必要时重启微信。

自动粘贴需要辅助功能权限；识别微信标题栏中的聊天名、匹配群聊场景，需要屏幕录制权限。聊天名识别的截图只在内存中处理。目标未安装、权限不足或粘贴失败时，还可以通过剪贴板手动粘贴文件。

微信流接收用户主动导出的文件，不读取微信数据库，也不解密或注入微信进程。归档保存在本机；把资料交给联网 AI 应用后，后续处理遵循目标应用的数据规则。

项目代码采用 MIT 许可证，允许在保留版权和许可声明的条件下使用、修改和再分发。需要自己构建 macOS 版的用户，可按以下步骤操作；构建环境需要 Xcode 16 或兼容 Swift 6 的命令行工具：

```bash
git clone https://github.com/freestylefly/WeChatBridge.git
cd WeChatBridge/macos
swift test
CONFIG=release Scripts/make-app.sh
```

构建产物位于 `macos/dist/微信流.app`。随后在 `macos` 目录运行 `Scripts/install-dev-build.sh`，可安装到当前用户的应用程序目录并注册分享扩展。
