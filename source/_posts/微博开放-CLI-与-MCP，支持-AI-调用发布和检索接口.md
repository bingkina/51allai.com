---
title: 微博开放 CLI 与 MCP，支持 AI 调用发布和检索接口
permalink: posts/2026/11/weibo-cli-mcp-agent-access/
tags: [weibo, ai-agents, developer-tools, MCP, workflow-automation]
sources:
  - name: 微博开放平台 CLI
    url: https://open.weibo.com/cli
    note: 产品定位、发布与互动及检索能力
  - name: 微博 CLI 使用前提与安装登录手册
    url: https://open.weibo.com/cli/manual/readiness
    note: 开发者认证、服务开通和设备授权流程
  - name: 微博 CLI 常用命令手册
    url: https://open.weibo.com/cli/manual/cli-commands
    note: 命令发现、参数查询与账号状态检查
  - name: 微博 CLI 服务与积分手册
    url: https://open.weibo.com/cli/manual/plans-usage
    note: 7 天体验资格、接口限次、正式积分有效期和写入频率
  - name: 微博 CLI 正式充值包公开接口
    url: https://open.weibo.com/cli/api/billing/recharge-packages
    note: 69、198、398、998 元四档充值价格及对应积分
  - name: 微博开放平台 MCP 接入手册
    url: https://open.weibo.com/cli/manual/mcp
    note: 远程服务地址、客户端配置与浏览器授权流程
  - name: 微博 CLI 微博发布规则说明
    url: https://open.weibo.com/cli/manual/publish-rule
    note: AI 生成博文的声明与标识要求
  - name: 微博 CLI npm 软件包
    url: https://www.npmjs.com/package/@weibo-ai/weibo-cli
    note: 0.9.8 版本、Node.js 要求、命令别名、输出格式与 MIT 许可
date: 2026-11-17 23:13:35
categories: 智能体
description: 微博开放 CLI 与 MCP 接入，可让脚本和 AI 调用发博、评论、内容检索与账号数据接口。本文整理安装登录、开发者认证、命令查询和远程 MCP 配置，并列出 7 天体验服务的范围、69 元起的积分充值档位及调用限制，帮助开发者和内容运营者判断接入方式与实际使用成本。
cover: https://images.51allai.com/blog/weibo-cli-mcp-agent-access-cover_20261117_231736.png
---

> 微博开放平台提供官方命令行工具 weibo-cli 和远程 MCP 服务，可将发布、互动、检索等接口接入脚本与 AI 工作流。使用前需完成开发者认证并开通服务；新用户可领取限次的 7 天体验服务，正式服务按积分调用，充值包从 69 元起。
![微博 CLI 与 MCP 接入 AI 工作流及积分计费示意](https://images.51allai.com/blog/weibo-cli-mcp-agent-access-cover_20261117_231736.png)

## 把微博操作接入终端和 AI 工具

[微博 CLI](https://open.weibo.com/cli) 把发博、评论互动、内容检索和账号数据查询等操作封装成终端命令。CLI 就是命令行工具：人可以逐条输入指令，程序也可以按流程连续调用。

返回结果支持 JSON、YAML、表格和原始格式。JSON 和 YAML 是便于程序读取的数据格式，因此脚本可以把查询结果交给 AI 整理，再将结果写入自己的报告或运营系统。

微博同时提供远程 MCP 服务。MCP 是让 AI 应用连接外部工具的通用协议；支持相应连接和授权方式的客户端，可以通过它调用微博能力。需要自己编排脚本的开发者可从 CLI 入手，已有 MCP 客户端的用户则可直接配置远程服务。

这种接入方式也出现在 [WorkBuddy 开放平台的 CLI 与连接器方案](/posts/2026/09/workbuddy-open-platform/) 中：先将业务能力做成工具，再由 AI 应用组织调用步骤。

## 安装后，还要完成认证和服务开通

截至 2026 年 11 月 17 日，npm 上的最新版本为 `0.9.8`，要求 Node.js 18 或更高版本。软件包提供 `weibo`、`weibo-cli` 和 `wb` 三个命令名，下面统一使用 `weibo`。

```bash
npm install -g @weibo-ai/weibo-cli
weibo version
```

调用平台接口前，先在微博 CLI 控制台使用微博客户端扫码、完成开发者扫脸认证，再到“我的服务”领取体验服务或购买正式积分包。完成这些步骤后，可创建 CLI 授权并在终端登录：

```bash
weibo auth login
weibo auth whoami
weibo doctor
```

登录采用 OAuth 授权，也就是在微博登录页确认这台工具的访问权限。`auth whoami` 用于确认当前会话，`doctor` 则检查登录、开发者认证和服务状态。

在 SSH、远程服务器或容器里，可以改用设备码登录：

```bash
weibo auth login --device
```

终端会给出授权网址和验证码，用户仍需在浏览器里确认。设备码让远程环境能够登录，不会省略账号授权步骤。

## 用命令清单确认账号能调用什么

平台命令由服务端清单提供。先查看账号可用范围，再查询具体命令的参数，比直接复制旧教程更合适：

```bash
weibo commands list --available
weibo commands show users show_batch/other
weibo me --output table
```

`commands show` 会展示命令说明和必填参数，`me` 用于查看账号、余额和服务信息。常见查询入口包括：

| 任务 | 命令示例 |
| --- | --- |
| 读取首页时间线 | `weibo statuses friends_timeline/biz --count 5 --output json` |
| 按昵称查询用户 | `weibo users show_batch/other --screen_name 来去之间` |
| 按关键词检索微博 | `weibo search statuses/limited --q keyword` |
| 查看收到的评论 | `weibo comments to_me/biz` |

命令是否可用取决于账号的服务状态和接口范围。为 AI 编排工作流时，可以先从读取时间线、检索内容或整理评论开始，再加入发布与回复步骤。

## 7 天体验限次，正式服务按积分调用

7 天体验服务每个账号只能领取一次，领取前需通过开发者认证。已经领取过体验服务、开通过正式服务或曾付费充值的账号，不能再次领取。

体验期只开放白名单内的部分接口，不扣积分，但按接口分别限次：读取类通常为每个接口 5 次，写入类通常为每个接口 3 次。多图发博、统计和趋势等能力不在体验服务范围内。

正式服务通过购买积分包开通，拥有可用积分余额后可调用全部开放接口。当前充值档位如下：

| 积分包 | 价格 | 到账积分 | 每 1,000 积分价格 |
| --- | ---: | ---: | ---: |
| 入门包 | 69 元 | 23,000 | 3 元 |
| 标准包 | 198 元 | 79,200 | 2.5 元 |
| 专业包 | 398 元 | 199,000 | 2 元 |
| 旗舰包 | 998 元 | 998,000 | 1 元 |

这些是积分充值价格。实际调用成本还取决于接口按次或按条扣分的规则，不能直接把积分数当作可调用次数。所购积分自到账起有效期为 365 天，过期未用完的积分会失效；写入类 HTTP POST 接口另有每小时合计 60 次的频率限制。

客户端软件包采用 MIT 许可，平台接口使用则受认证、服务资格、余额和频率限制约束。

## MCP 客户端可直接连接远程服务

支持 OAuth 授权与 Streamable HTTP 传输的 MCP 客户端，可以按自身配置格式添加以下连接。Streamable HTTP 是通过 HTTP 连接远程 MCP 服务的方式。

```json
{
  "mcpServers": {
    "weibo": {
      "type": "streamableHttp",
      "url": "https://cli.weibo.com/mcp"
    }
  }
}
```

连接时，客户端会打开浏览器完成微博授权，无需在这段配置里手填静态 Token。账号仍需通过开发者认证，并处于有效体验期或拥有可用正式积分余额。

发布 AI 生成的博文时，使用者须声明其 AI 生成属性，由系统添加相应标识。将发文、评论或关注等操作接入 AI 工作流时，适合保留执行前的人工确认，核对目标账号、内容和操作范围。
