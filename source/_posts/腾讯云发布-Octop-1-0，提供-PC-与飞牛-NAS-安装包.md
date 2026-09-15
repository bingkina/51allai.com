---
title: 腾讯云发布 Octop 1.0，提供 PC 与飞牛 NAS 安装包
permalink: posts/2026/09/tencentcloud-octop-1-ga/
tags: [tencent, octop, open-source, ai-agents, desktop-agent]
sources:
  - name: Octop v1.0.0 Release
    url: https://github.com/TencentCloud/Octop/releases/tag/v1.0.0
    note: GA 发布时间、稳定版更新策略与各平台安装包
  - name: TencentCloud Octop
    url: https://github.com/TencentCloud/Octop
    note: 产品定位、MIT 许可证、功能范围与快速安装方式
  - name: Octop Architecture
    url: https://github.com/TencentCloud/Octop/blob/main/docs/architecture.md
    note: 单进程架构、存储方式与多用户隔离
  - name: Octop ACP
    url: https://github.com/TencentCloud/Octop/blob/main/docs/acp.md
    note: ACP 双向接入方式与内置编程智能体 Runner
  - name: octop on PyPI
    url: https://pypi.org/project/octop/
    note: 1.0.0 软件包、Python 版本要求与安装入口
date: 2026-09-15 09:37:54
categories: 智能体
description: 腾讯云发布 Octop 1.0 GA 版，这款采用 MIT 许可证的自托管多用户 AI 助手提供 Windows、macOS、Linux 与飞牛 NAS 安装包，并支持 Web 控制台、即时通信、定时任务和 ACP 编程智能体接入。
cover: https://images.51allai.com/blog/tencentcloud-octop-1-ga-cover_20260915_094105.png
---
> 腾讯云发布 Octop 1.0 GA 版。用户可以在自己的电脑或服务器上运行这款多用户、多智能体助手，官方已提供 Windows、macOS、Linux 与飞牛 NAS 安装包，源代码采用 MIT 许可证。
![腾讯云 Octop 1.0 自托管多用户 AI 助手](https://images.51allai.com/blog/tencentcloud-octop-1-ga-cover_20260915_094105.png)

## 一台机器承载控制台、通信和定时任务

Octop 是一套自托管 AI 助手平台，不包含固定的大模型。用户配置自己的模型服务后，一个 Python 进程会同时提供 Web 控制台、命令行、HTTP/WebSocket API、即时通信通道和定时任务。

默认配置使用 SQLite 保存用户、智能体、会话和审计信息，也可以切换到 PostgreSQL。每个智能体有独立工作区；每位用户可以分别设置模型提供商、通信通道和定时任务。对家庭或小团队来说，同一套服务可以建立多个账号，不必让所有人共用一段对话记录和一份工作目录。

飞书、钉钉、QQ、Discord 和企业微信可以作为消息入口。浏览器自动化、知识库、插件和远程桌面也放在同一控制台管理，部署者仍需要按实际任务为模型、搜索服务或外部连接器配置凭据。

## ACP 可接入编辑器，也能委派编程任务

ACP（Agent Client Protocol）用于让编辑器、终端工具和智能体交换任务。Octop 支持两个方向：运行 `octop acp --agent main` 后，Zed、OpenCode 等客户端可以使用本机的 Octop 智能体；在控制台启用 `acp_runner` 后，Octop 又能把编程任务交给外部工具执行。

内置 Runner 覆盖 OpenCode、CodeBuddy、Claude Code、Codex、Kimi Code、Cursor CLI 和 Pi。外部编程工具仍需安装在运行 Octop 的主机上，并完成各自的登录或 API 配置。想了解另一种 ACP 开源实现，可以对照 [Grok Build 的终端智能体架构](/posts/2026/07/grok-build-open-source/)。

## PC、服务器和飞牛 NAS 都有对应入口

不想处理命令行环境的用户，可以直接下载桌面安装包。Windows 同时提供 x64 与 ARM64 版本，macOS 覆盖 Apple 芯片和 Intel，Linux 提供 x64 与 ARM64 压缩包。飞牛 NAS 用户可选 Docker 版或原生 FPK 包，通过应用中心安装。

项目代码、发行包与安装说明集中在 [TencentCloud/Octop GitHub 仓库](https://github.com/TencentCloud/Octop)。

已经管理 Python 环境的用户可以执行 `pip install octop`，然后用 `octop run` 启动服务。默认地址是 `http://127.0.0.1:8088`，首次设置向导会创建数据库、JWT 密钥和管理员账号。用于长期运行时，项目也提供 Docker Compose 与系统服务方式。

软件代码和安装包可免费下载。实际使用成本取决于部署机器、所选模型服务以及接入的外部工具；Octop 负责组织账号、智能体、工作区和工具调用，不替代这些服务本身。

## 1.0 成为首个 GA 稳定版

Octop 1.0 于 2026 年 9 月 14 日发布。GA 是 General Availability 的缩写，表示项目从 0.9 系列进入面向日常使用的稳定发布阶段。更新检查默认只查找稳定版，用户也可以自行选择是否接收预发布版本。

这一版本没有重新包装一批新功能，主要完成发布状态切换，并修复大体积备份列表扫描和中文语音探测错误提示。它与前一天发布的 0.9.35 保持连续升级关系，现有用户可以按稳定版通道更新。

Octop 的源代码采用 MIT 许可证，1.0.0 软件包已同步到 PyPI。项目要求 Python 3.12 或更高版本；官方安装脚本会用 uv 在 `~/.octop/` 内建立隔离环境，用户无需预先配置系统 Python。
