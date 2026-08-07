---
title: Cloudflare 推出 WebMCP 开发者预览，网站无需改代码即可开放智能体工具
permalink: posts/2026/08/cloudflare-webmcp-developer-preview/
tags:
  - cloudflare
  - webmcp
  - ai-agents
  - agent-framework
  - product-update
date: 2026-08-07 14:50:27
categories: 
  - 智能体
description: Cloudflare 推出 WebMCP 开发者预览，为接入 Cloudflare 的网站在边缘注入桥接脚本，无需修改源站代码即可向兼容浏览器中的 AI 智能体开放结构化工具。本文说明两个现有工具包、启用步骤、浏览器限制及 C2PA 元数据暂不验签的边界。
cover: https://images.51allai.com/blog/cloudflare-webmcp-developer-preview-cover-5x2_20260807_145811.png
---

> Cloudflare 推出 WebMCP 开发者预览。接入 Cloudflare 的网站可在控制台开启功能，由边缘自动注入桥接脚本，把启用的工具包注册成浏览器 AI 智能体可调用的工具，无需修改源站代码。当前预览提供两个工具包，浏览器支持仍处于实验阶段。
![Cloudflare WebMCP 开发者预览与浏览器 AI 智能体工具](https://images.51allai.com/blog/cloudflare-webmcp-developer-preview-cover-5x2_20260807_145811.png)

## 开启开关后，Cloudflare 在边缘给网页加入工具入口

WebMCP 是一项面向浏览器的接口提案。网站可以把搜索、筛选、填写表单等操作声明为带名称、说明和参数格式的工具，支持该接口的 AI 智能体进入页面后，可以先发现这些工具，再按规定的参数调用。它不必只靠截图、页面结构和模拟点击猜测下一步操作。

Cloudflare 的开发者预览把接入工作放到了边缘。站长在控制台为域名开启 WebMCP 后，Cloudflare 使用 HTMLRewriter 在每个 HTML 响应中加入一条脚本引用，脚本与网页保持同源，源站代码和原始 HTML 文件不需要修改。静态网站和单页应用使用的是同一套方式，也不需要为了启用或调整工具包重新部署网站。

这段桥接脚本会寻找浏览器提供的 WebMCP 接口，再把已启用工具包中的工具注册到页面。如果浏览器没有对应接口，脚本会直接结束，网页继续按原来的方式工作。普通访客仍然看到网站原有界面；只有运行在兼容浏览器里的智能体能发现新增的结构化工具。

## 当前预览提供两个工具包

第一个是 Site MCP Server。它面向已经部署 MCP 服务的网站，默认连接同源的 `/mcp` 端点，也允许站点指定其他同源路径。桥接脚本会先读取服务公开的工具列表，再把每项工具注册到网页。智能体调用时，请求从访客浏览器直接发回站点，并携带该访客已有的同源会话，因此网站原有的登录状态和权限边界仍参与处理。

MCP 是一套让 AI 客户端调用外部工具和数据的通用协议。这里不是把远程 MCP 服务搬进浏览器，而是为它加一层网页内的代理：服务继续处理原有工具，浏览器负责让页面中的智能体发现和调用它们。

第二个是 Content Credentials，用于读取图片中的 C2PA 内容凭证。C2PA 是记录数字内容来源和编辑信息的一套技术规范。工具可以扫描页面图片，列出哪些图片带有凭证，也可以读取单张图片的清单、声明作者、编辑记录和签名证书等字段。解析发生在访客浏览器中，只读取图片开头的一小段元数据。

这里有一条明确限制：当前工具只读取并报告凭证，没有对签名做密码学验证。返回结果会标记 `signatureVerified: false`。因此，智能体可以知道图片携带了哪些声明，但不能把这些声明当成已经验证过的真实性结论。

## 两个工具包目前都在访客浏览器中运行

当前预览中的工具执行都发生在访客浏览器内，不需要把每次工具调用发往 Cloudflare 的服务器。Content Credentials 在本地读取图片元数据；Site MCP Server 则由页面直接访问站点自己的同源 MCP 端点。桥接代码本身由 Cloudflare 边缘提供。

这种安排没有绕过站点已有权限。Site MCP Server 使用访客当前会话，工具能做什么仍取决于站点端点允许该用户做什么。WebMCP 规范也把页面界面保留为主要交互面，工具用于辅助用户和智能体协作，而不是替代网站或默认交给智能体完全自主操作。

## 在控制台开启，并用 BrowserRun Lab 测试

站长可以进入 Cloudflare Dashboard 的 `Agent Readiness > Labs`，为域名开启 WebMCP，并选择要启用的工具包。开发者预览中，Content Credentials 和 Site MCP Server 默认开启。设置完成后，无需部署新代码；下一次返回 HTML 时，页面就会包含 Cloudflare 注入的桥接脚本。

最直接的检查方法是请求站点任意 HTML 页面并搜索 `webmcp`，确认响应中出现 `/.webmcp/bridge.js`。随后可以使用 Cloudflare BrowserRun 的 Lab 会话打开网站，查看页面公开的工具并执行测试。BrowserRun 文档中的 Lab 会话使用 Chrome 146 beta，WebMCP 接口只在 Lab 会话中可用，不能作为生产浏览器工作负载使用。

WebMCP 仍处于早期预览。站点开启 Cloudflare 开关，只是完成了工具提供端的接入；访客使用的浏览器和 AI 智能体也必须支持 WebMCP，才能发现并调用这些工具。对于准备试用的开发者，合适的起点是先在测试域名开启功能，检查公开了哪些工具、每项工具继承了哪些用户权限，再用需要人工确认的操作验证完整流程。
