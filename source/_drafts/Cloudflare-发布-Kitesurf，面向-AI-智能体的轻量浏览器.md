---
title: Cloudflare 发布 Kitesurf，面向 AI 智能体的轻量浏览器
permalink: posts/2026/08/cloudflare-kitesurf-agent-browser/
tags:
  - cloudflare
  - kitesurf
  - ai-agents
  - browser-run
  - product-update
date: 2026-08-09 10:07:56
categories:
  - 智能体
description: Cloudflare 发布 Kitesurf，一款运行在 Workers 上、面向 AI 智能体的无状态浏览器。它支持网页截图、HTML 提取、PDF 生成和 MCP/CDP 接入，测试版可通过 Browser Run 免费试用，并明确了视频、WebGL、机器人挑战与持久登录等使用边界。产品适合内容提取、截图和短时网页自动化，不是面向普通用户的桌面浏览器。
cover: https://images.51allai.com/blog/cloudflare-kitesurf-agent-browser-cover-v3_20260809_102820.png
---

> Cloudflare 于 2026 年 8 月 6 日发布 Kitesurf，这是一款运行在 Workers 上、专为 AI 智能体设计的无状态浏览器。它支持网页截图、HTML 提取和自动化接入，测试版可通过 Browser Run 免费试用，但不适合视频、WebGL 或需要持久登录状态的任务。
![Cloudflare Kitesurf 面向 AI 智能体的轻量浏览器](https://images.51allai.com/blog/cloudflare-kitesurf-agent-browser-cover-v3_20260809_102820.png)

## Kitesurf 不是给人日常使用的桌面浏览器

Kitesurf 的目标不是替代 Chrome、Firefox 或 Safari，而是给 AI 智能体提供一个能在云端执行网页任务的浏览器引擎。它运行在 Cloudflare Workers 的 V8 Isolates 中，每个任务可以启动一个隔离、无状态的浏览环境，任务结束后即可释放资源。

普通浏览器需要照顾人的使用习惯：标签页、主题、扩展、完整的图形界面和像素级一致的页面渲染都属于常见功能。Kitesurf 把这些部分放到次要位置，优先处理智能体真正会调用的能力，例如加载网页、执行 JavaScript、读取 DOM、提取 HTML、生成截图和 PDF。

这里的“无状态”指浏览器不会把一个任务的长期登录状态、标签页或用户设置作为默认前提。它更适合一次性或短时任务，也适合突然出现大量请求的自动化工作负载。

## 设计重点是降低智能体的资源开销

Kitesurf 使用 WebAssembly 在 Workers 中运行，并组合了用 Rust 编写的 Blitz 渲染组件、Firefox 的 Stylo CSS 解析器和 Boa JavaScript 引擎。页面脚本、DOM 和网络请求被安排在隔离环境中处理；网络访问由专门的 Worker 负责，页面组件不能直接触碰网络。

这种实现方式牺牲了一部分完整浏览器能力，换来更低的 CPU 和内存消耗。在一组 14 个网址、5 次 Quick Actions 测试中，截图任务的 CPU 中位数为 380 毫秒，Chromium 暖池为 1173 毫秒；HTML 提取任务分别为 229 毫秒和 877 毫秒。内存方面，截图任务为 57.8 MiB 对 271.0 MiB，HTML 提取任务为 39.4 MiB 对 273.7 MiB。

这组测试也显示了取舍：Kitesurf 的截图和 HTML 提取墙钟时间更长，截图中位数为 1148 毫秒，Chromium 为 637 毫秒；HTML 提取则是 820 毫秒对 472 毫秒。对于需要同时运行很多短任务的智能体系统，CPU 和内存往往比单次任务的等待时间更直接影响运行成本，因此 Kitesurf 把优化重点放在了前两项。

## 可以通过 Browser Run 接入现有工具

Kitesurf 已接入 Cloudflare Browser Run。开发者可以在 Quick Actions 请求中加入 `browser=kitesurf`，用同一套接口完成截图、HTML 提取、PDF 生成等操作。例如，截图请求可以写成：

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/browser-run/screenshot?browser=kitesurf' \
  -H 'Authorization: Bearer <API_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com"}' \
  --output "screenshot.png"
```

如果项目已经使用 Puppeteer、Playwright 或 Chrome DevTools Protocol（CDP），也可以把连接地址中的浏览器参数改为 `browser=kitesurf`。支持 MCP 和 CDP 的 AI 智能体同样可以通过这个入口接入，不需要为 Kitesurf 另写一套浏览器控制协议。

不想先配置 API 的用户，可以打开 Kitesurf Playground，输入网址查看页面如何被渲染，并通过内置的 Chrome DevTools 检查 DOM、控制台和网络活动。测试版目前免费，但受每个账户的使用限制约束。

## 适合短任务，不适合所有网站

Kitesurf 适合内容提取、截图、生成 PDF，以及能接受非像素级渲染的 AI 智能体。它已经可以处理 Wikipedia、Hacker News、Cloudflare Blog 和 TodoMVC 等页面，也能处理部分 Cloudflare 控制台页面。

需要播放视频、渲染 WebGL、完成依赖真实 TLS 指纹的机器人挑战，或者保持长期认证状态的任务，应继续使用 Browser Run 默认的 Chromium 浏览器。具体网站是否兼容 Kitesurf，可以先在 Playground 中试运行，再决定是否接入生产流程。
