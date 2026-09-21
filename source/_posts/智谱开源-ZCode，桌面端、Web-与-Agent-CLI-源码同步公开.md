---
title: 智谱开源 ZCode，桌面端、Web 与 Agent CLI 源码同步公开
permalink: posts/2026/09/zhipu-zcode-open-source/
tags: [zhipu, open-source, coding-agent, desktop-agent, security]
sources:
  - name: ZCode 官方开源仓库
    url: https://github.com/zai-org/ZCode
    note: 开源范围、开发入口、构建条件与 Apache-2.0 许可证
  - name: ZCode 开源首次提交
    url: https://github.com/zai-org/ZCode/commit/872ad960de7ec172591f7e1952f7849229f94521
    note: 2026 年 9 月 21 日开源提交时间与提交标题
  - name: ZCode 功能说明与第三方组件声明
    url: https://github.com/zai-org/ZCode/blob/main/NOTICE.md
    note: 执行权限、网络请求、模型网关与开源范围边界
  - name: ZCode 版本发布与更新
    url: https://zcode.z.ai/cn/changelog
    note: v3.14.0 发布日期与仓库百科异常上传修复记录
date: 2026-09-21 10:19:37
categories: 智能体
description: 智谱开源 ZCode，公开 Electron 桌面端、Web、后端服务、共享 UI、Agent CLI 与运行时源码，采用 Apache-2.0 许可证。本文梳理可审计范围、本地构建入口与云端服务边界。
cover: https://images.51allai.com/blog/zhipu-zcode-open-source-cover-v2_20260921_104550.png
---

> 智谱于 2026 年 9 月 21 日开源 ZCode。官方仓库公开桌面应用、Web、后端服务、共享 UI、Agent CLI 与运行时源码，第一方代码采用 Apache-2.0 许可证。开发者可以从源码检查本地执行、网络请求和权限处理逻辑。
![智谱 ZCode 桌面端、Web 与 Agent CLI 开源范围](https://images.51allai.com/blog/zhipu-zcode-open-source-cover-v2_20260921_104550.png)

## 公开的不只是桌面客户端

ZCode 是一个 AI 编程工作台。这次公开的是一个多包仓库，覆盖 Electron 桌面应用、Web 客户端、HTTP 与 WebSocket 后端、共享 React 组件、Provider 适配层，以及 Agent CLI、终端界面和运行时。

| 入口 | 开源仓库中的用途 | 开发命令 |
| --- | --- | --- |
| Desktop | Electron 桌面应用 | `pnpm dev:desktop` |
| Web / ZCode 命令行版 | 组合 Web、后端、终端界面和 Agent | `pnpm dev:web` |
| Agent CLI | 在终端使用 `zcode`，同时为 Desktop 和 Web 提供运行时 | `pnpm --filter @zcode/cli dev` |

这个范围让开发者能够追踪从界面交互、权限判断到工具调用的完整路径，也可以检查桌面端、Web 与 CLI 是否复用同一套 Agent 能力。

## 源码可以本地构建

仓库指定 Node.js 24.14.0 和 pnpm 10.33.2。克隆代码后，可在根目录执行：

```bash
pnpm bootstrap
```

该命令会安装 workspace 依赖、准备桌面端本地运行资源，再执行初始构建。桌面版还可以针对 macOS、Windows 和 Linux 选择打包目标；命令行版则可生成包含 TUI、Web、后端和 Agent 的独立运行包。

第一方代码使用 Apache-2.0 许可证。依赖包、原生二进制文件、字体、图标和其他第三方资源仍遵循各自条款，不能只根据根目录许可证判断所有内容的再分发范围。

## 现在可以直接检查数据与执行边界

开源仓库的 `NOTICE.md` 把模型请求、工具执行、账号与 API 凭据、插件、MCP、附件、会话分享和远程环境的处理路径集中列出。其中几个边界会直接影响开发者如何审计和部署：

- 共享 Agent 执行适配器不默认提供操作系统沙箱。文件、终端、Git 和外部进程能在当前系统账号的权限范围内运行。
- 模型与辅助模型请求可能携带提示词、历史、代码、diff、工具结果或附件，实际接收方由模型端点、网关转发与代理配置共同决定。
- 命中指定官方模型端点的请求会改发 ZCode 网关。客户端转发逻辑已公开，网关接收请求后的内部处理不在客户端源码可核验范围内。

对个人项目，可以先检查实际使用的 Provider 端点、权限模式和插件配置。对公司代码库，还应在隔离环境中运行，限制账号、凭据和网络权限，再审查外发请求。

## v3.14.0 与开源仓库保持同一版本号

ZCode v3.14.0 于 9 月 19 日发布，版本日志把“修复仓库百科异常上传的问题”列入修复项。9 月 21 日公开的仓库根 `package.json` 同样标记为 3.14.0，开发者可以围绕这个版本检查客户端实现。

开源代码本身不代表官方云服务已全部可自行复制。仓库声明明确写明，不承诺公开源码与构建产物包含官方产品的全部功能和活动政策。想了解官方模型入口的读者，可继续查看 [GLM-5.3 与 ZCode 的使用方式](/posts/2026/08/zhipu-glm-53-coding-plan/)。
