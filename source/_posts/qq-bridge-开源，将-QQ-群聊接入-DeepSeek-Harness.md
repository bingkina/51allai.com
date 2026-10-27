---
title: qq-bridge 开源，将 QQ 群聊接入 DeepSeek Harness
permalink: posts/2026/10/qq-bridge-deepseek-harness/
tags: [qq, deepseek, ai-agents, open-source]
sources:
  - name: qq-bridge 项目说明
    url: https://github.com/Derpyu520/qq-bridge
    note: 消息链路、会话隔离、运行模式、部署步骤与媒体限制
  - name: qq-bridge v0.2.1-r1 发布说明
    url: https://github.com/Derpyu520/qq-bridge/releases/tag/v0.2.1-r1
    note: 当前发布版本与 DSH 0.2.1-rc.2 适配改动
  - name: qq-bridge 配置模板
    url: https://github.com/Derpyu520/qq-bridge/blob/main/config.example.json
    note: 白名单默认行为、管理员设置、黑话研究开关与本地端口
  - name: qq-bridge QQ 工具实现
    url: https://github.com/Derpyu520/qq-bridge/blob/main/src/mcp-snowluma-safe.js
    note: 消息读取、发送、等待、唤醒与目标白名单校验
  - name: qq-bridge 工具权限守卫
    url: https://github.com/Derpyu520/qq-bridge/blob/main/plugins/qq-agent-presets/qq-tool-restrict.mjs
    note: 聊天预设对本地命令、文件和其他工具的执行限制
  - name: qq-bridge 软件包定义
    url: https://github.com/Derpyu520/qq-bridge/blob/main/package.json
    note: 版本号、Node.js 要求与启动脚本
  - name: qq-bridge MIT 许可证与数据流说明
    url: https://github.com/Derpyu520/qq-bridge/blob/main/LICENSE
    note: 项目许可、第三方组件边界与聊天及搜索数据外发范围
  - name: SnowLuma 源码可见非商业许可
    url: https://github.com/SnowLuma/SnowLuma/blob/main/LICENSE
    note: 网关本体独立的使用条件与商业用途限制
date: 2026-10-27 09:16:16
categories: 智能体
description: qq-bridge 开源，把 QQ 私聊和群聊接入 DeepSeek Harness，支持独立会话、角色设定与自主收发消息。本文介绍四种运行模式、Node.js 与 SnowLuma 接入步骤，以及白名单、工具权限和聊天数据外发边界。
cover: https://images.51allai.com/blog/qq-bridge-deepseek-harness-cover_20261027_092223.png
---

> qq-bridge 把 QQ 私聊和群聊接入 DeepSeek Harness，让 AI 在独立会话中处理消息，再将回复发回 QQ。它提供普通聊天、管理员远程操作和两代群聊仿真模式，可设置角色与发言策略。当前发布版为 v0.2.1-r1，适配 DSH 0.2.1-rc.2；运行需要另行准备 SnowLuma 网关。
![qq-bridge 将 QQ 群聊接入 DeepSeek Harness 的消息往返流程](https://images.51allai.com/blog/qq-bridge-deepseek-harness-cover_20261027_092223.png)

## 把 QQ 变成 DeepSeek Harness 的聊天入口

[qq-bridge](https://github.com/Derpyu520/qq-bridge) 是一个社区开源桥接工具。QQ 好友或群里的消息先经过 SnowLuma 网关，再由桥接进程送进 DeepSeek Harness（简称 DSH）；AI 的回复、提问和工具审批请求可以沿这条链路发回 QQ。

DeepSeek Harness 是运行 AI 智能体的应用环境，负责模型调用、会话和工具执行。想先了解这个环境，可以看站内的 [DeepSeek Harness 官方桌面版介绍](/posts/2026/09/deepseek-harness-official-desktop/)。qq-bridge 负责把它与 QQ 连接起来。

每个私聊或群聊对应一个独立的 DSH 会话，统一归入“QQ 聊天”工作区。不同群的对话上下文分开保存，用户也能在 DSH 中查看对应会话。

这套接法适合已经运行 DSH、希望在 QQ 中与 AI 对话的个人用户，以及愿意自行维护网关的群聊机器人开发者。使用时需要保持 DSH、SnowLuma 和桥接进程运行。

## 四种模式，分别控制发言方式和工具权限

本地控制台提供模式切换入口，默认地址为 `http://127.0.0.1:3100`。

| 模式 | 可以做什么 | 接入范围 |
| --- | --- | --- |
| `chat` 普通聊天 | 将消息交给聊天预设，回复回传 QQ | 白名单私聊和群聊 |
| `reserved` 一代仿真 | 通过观望、活跃等状态选择性参与对话，可保持静默 | 白名单私聊和群聊 |
| `reserved2` 二代仿真 | AI 通过工具读取未读消息、发送回复、等待或设置唤醒条件 | 白名单私聊和群聊 |
| `closed-agent` 封闭 Agent | 管理员从 QQ 私聊操作 DSH，使用所选预设的工具 | 仅配置的 `ownerQQ` 私聊 |

全新安装并运行 DSH 配置脚本后，默认采用二代仿真模式。这个模式下，AI 的文本输出不会直接自动转发，发言通过 QQ 发送工具完成。用户可以修改角色提示词，也能为某个群预先填写主题、氛围等环境说明。

例如，兴趣群可以配置一个参与讨论的角色，由 AI 按策略查看消息、选择回复或等待。**这些功能提供了参与群聊的控制方式，回复内容仍由模型生成。**

普通聊天和仿真模式使用受限预设，限制本地命令、文件读写和子智能体等工具，并校验发送目标。`closed-agent` 则用于管理员远程操作，可以使用包含本地能力的 DSH 预设。开启前需要明确自己选中的工具权限。

## 接入需要 DSH、SnowLuma 和 Node.js

桥接要求 Node.js **22.13 或更高版本**，以及已经运行的 DSH Web 服务。当前发布版 `v0.2.1-r1` 针对 DSH `0.2.1-rc.2` 做了适配，移除了失效的提示词变量，并补充了工具限制名单。

QQ 侧需要自行安装、启动 SnowLuma，完成 QQ 登录，再开启 OneBot v11 的 WebSocket 和 HTTP API。OneBot 是机器人程序交换消息和操作指令的接口规范；这里的两个接口分别用于接收事件和调用操作，端口要分开填写。桥接本身不负责部署或启停 SnowLuma。

获取桥接并准备配置文件：

```bash
git clone https://github.com/Derpyu520/qq-bridge.git
cd qq-bridge
npm install
```

将 `config.example.json` 复制为 `config.json`。Windows CMD 可用 `copy config.example.json config.json`，其他常见终端可用 `cp config.example.json config.json`。

配置时重点填写以下项目：

- `dsh.baseUrl`：DSH Web 地址，默认 `http://127.0.0.1:3080`。
- `snowluma.wsUrl`、`httpUrl` 和 `accessToken`：填写网关实际开启的接口地址与凭据。
- `allow.private`、`allow.groups`：允许接入的 QQ 号和群号。
- `ownerQQ`：管理命令、审批和封闭 Agent 模式使用的管理员 QQ 号。

**示例配置的白名单为空，且 `allowAllWhenEmpty` 为 `false`，因此直接启动不会响应任何 QQ 消息。** 先加入自己的测试私聊或测试群，再安装 DSH 端预设与工具连接：

```bash
node scripts/setup-dsh.mjs
```

执行后重启 DSH，让新增配置加载，再启动桥接：

```bash
npm start
```

看到 SnowLuma 已连接后，可以从白名单内发送测试消息。接入出现问题时，分别检查 DSH 是否可访问、网关是否收到 QQ 事件，以及白名单是否匹配。

## 图片、语音和数据外发各有边界

图片和部分表情可以下载后交给支持图像输入的模型。收到的语音、视频，以及无法取得图片数据的消息，会以占位文本进入上下文；收到语音不会自动转写。

AI 发送语音默认关闭，开启后使用预先放入语音库的音频。普通回复会将 Markdown 转为 QQ 纯文本，保留链接；自动回传的回复在回合结束时发送，不逐字流式推送。

聊天内容会经过 DSH 交给所选模型提供方，范围包括群里其他成员的消息和可处理的图片。黑话学习默认开启，其中的自动研究会将提取的词条作为搜索关键词发出；默认优先使用 DeepSeek 搜索，不可用时回退到 Bing。需要关闭自动研究时，可将 `slang.autoResearch` 设为 `false`。

群聊启用前，应让成员了解消息的处理范围。白名单控制允许接入和发送的对象，模型仍可能在允许的会话内生成不合适的回复，实际运行需要管理员检查。

qq-bridge 自身代码采用 MIT 许可证；SnowLuma 网关另行采用源码可见非商业许可，其商业用途需要事先取得书面授权。两者的使用条件分别适用，桥接代码的 MIT 许可不覆盖网关本体。
