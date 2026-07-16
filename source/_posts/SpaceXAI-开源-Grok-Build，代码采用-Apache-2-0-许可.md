---
title: SpaceXAI 开源 Grok Build，代码采用 Apache 2.0 许可
permalink: posts/2026/07/grok-build-open-source/
tags: [xai, grok, open-source, coding-agent]
date: 2026-07-16 22:36:25
categories: 智能体
description: SpaceXAI 开源 Grok Build，公开以 Rust 编写的终端编程智能体、工具调用和工作区运行时。代码采用 Apache 2.0 许可，支持交互界面、脚本模式、ACP 接入及自定义模型配置。本文说明开源范围、安装方式、源码构建条件和官方仓库的协作限制。
cover: https://images.51allai.com/blog/grok-build-open-source-cover-with-title_20260716_225115.png
---
> SpaceXAI 已公开 Grok Build 的终端客户端、智能体运行时和工具层，第一方代码采用 Apache 2.0 许可。开发者可以阅读、修改和自行构建这套 Rust 工程，但此次开放不包含 Grok 4.5 模型权重。
![Grok Build 开源终端编程智能体](https://images.51allai.com/blog/grok-build-open-source-cover-with-title_20260716_225115.png)

## 开源的是编程智能体框架

Grok Build 是一款运行在终端里的编程智能体。用户输入任务后，它可以读取项目文件、修改代码、执行命令、搜索网页，并在长任务中持续管理执行进度。除了全屏交互界面，它还支持无界面运行，可以放进脚本和持续集成流程；ACP（Agent Client Protocol）则让编辑器和其他应用接入同一套智能体。

这次公开的是 `grok` 命令背后的 CLI、TUI 和智能体运行时。CLI 是命令行程序，TUI 是在终端中显示的全屏交互界面。代码还包括文件编辑、终端执行、搜索、版本控制、检查点、沙盒、MCP、技能和插件等模块。

Grok 4.5 仍作为单独的模型服务提供。开源仓库让开发者看到智能体如何整理上下文、调用模型和执行工具，但不包含训练 Grok 4.5 所需的模型权重。把这次发布理解为“开放编程智能体外壳”更准确。

## Rust 源码采用 Apache 2.0 许可

仓库中的第一方代码采用 Apache License 2.0。开发者可以使用、修改和分发代码，也可以把它集成进自己的产品；仓库内的第三方代码继续沿用各自原有许可。

项目主体使用 Rust。代码按功能拆成多个组件：`xai-grok-shell` 负责智能体运行和无界面入口，`xai-grok-tools` 提供终端、文件编辑与搜索工具，`xai-grok-workspace` 管理本地文件系统、版本控制、命令执行和检查点，`xai-grok-pager` 负责终端界面。

公开这些模块后，开发者可以直接检查智能体拥有哪些工具、工具如何访问工作区，以及交互界面如何展示计划和代码差异。需要审查数据流向或权限边界的团队，也多了一份可以自行阅读和编译的客户端代码。

## 可以安装成品，也可以从源码构建

普通用户仍可安装官方提供的 macOS、Linux 和 Windows 版本。安装后进入项目目录运行 `grok`，首次启动会打开浏览器完成登录；服务器或其他没有浏览器的环境可以使用 xAI API Key。

开发者从源码构建时需要 Rust 和 `protoc`。macOS 与 Linux 是仓库明确支持的构建环境，Windows 源码构建属于尽力支持。构建完成的二进制文件名为 `xai-grok-pager`，官方安装包会以 `grok` 命令提供。

Grok Build 也允许在 `~/.grok/config.toml` 中配置自定义模型，包括模型名称、接口地址和密钥环境变量。用户可以把它接到自建或其他兼容接口上，再通过终端界面或无界面模式运行。

## 公开代码不等于社区共同维护

这个仓库由 SpaceXAI 内部单体仓库定期同步，公开仓库暂不接受外部贡献。开发者可以按照 Apache 2.0 许可自行分叉和修改，但不能把它当成一个通过公开 Pull Request 共同维护的社区项目。

公开仓库也不能代替对实际安装包和远端模型服务的检查。企业在处理私有代码时，仍需要核对使用的客户端版本、模型接口、网络请求、沙盒设置和数据策略。开源带来的直接变化，是客户端的智能体循环、工具实现和工作区处理逻辑可以被外部阅读与审查。
