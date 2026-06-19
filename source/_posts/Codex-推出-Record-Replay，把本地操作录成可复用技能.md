---
title: Codex 推出 Record & Replay，把本地操作录成可复用技能
permalink: posts/2026/06/codex-record-replay-skill/
tags: [openai, codex, product-update, desktop-agent, agent-framework]
date: 2026-06-19 22:03:09
categories:
  - 智能体
description: Codex Record & Replay 让用户把 macOS 本地操作示范录成可复用 skill，适合重复工作流，但受地区、Computer Use 和隐私边界限制。
cover: https://images.51allai.com/blog/截图2026-06-19_21.41.25@2x_20260619_221043.png
---

> Codex 的 Record & Replay 不是简单录屏回放，而是把一次本地工作流示范转成可复用 skill。它适合稳定、重复、偏个人偏好的 macOS 操作；当前可用性受地区、Computer Use 开关和组织策略限制。
![Codex Record & Replay 本地工作流录制示意](https://images.51allai.com/blog/截图2026-06-19_21.41.25@2x_20260619_221043.png)

## 录一次操作，产物是 skill

Record & Replay 的核心产物不是视频，也不是按坐标重放的宏脚本，而是一份 Codex skill。

用户先在 Mac 上示范一个已经知道怎么完成的流程。Codex 观察完成任务所需的操作和窗口内容，录制停止后再把这段流程整理成 skill：什么时候触发、需要哪些输入、按什么步骤执行、最后怎么验证结果。

这和普通提示词的差别在于，skill 会变成可复用上下文。下一次遇到相似任务，用户只需要给变化项，比如文件、日期范围、表单字段或目标项目，Codex 再调用当前环境里的 Computer Use、浏览器动作、已安装插件，或几种工具组合完成同类流程。

更直接地说，它解决的是“这件事我说不清，但我可以做一遍给你看”的问题。

## 适合稳定流程，不适合模糊探索

最适合录制的任务有几个共同点：步骤稳定、判断标准清楚、重复频率高，而且里面包含个人偏好。

例如报销、预约车位、创建带固定字段的 issue、发布视频、下载周期性报表。这些流程不一定难，但每次都要打开同一批页面或应用、填同一批默认值、检查同一类结果。用自然语言反复描述，成本反而高。

Record & Replay 把这类流程从“临时委托”推进到“可沉淀工作流”。Codex 不只是记住你刚才说了什么，而是把你刚才怎么做转成可再次调用的技能说明。

但边界也很窄。流程如果每次入口不同、页面状态经常变化、成功标准无法明确，录一次并不能自动变成可靠自动化。示范里出现的隐藏偏好，例如命名规则、默认字段、需要跳过的清理步骤，也要在录制前后补充清楚。

当前 Record & Replay 面向 macOS。初始可用范围不包括欧洲经济区、英国和瑞士；同时还要求 Computer Use 可用并已启用。

这说明它不是纯云端 Codex 功能。它依赖 Codex 看见并操作本地应用窗口，因此权限、系统平台、组织管理策略都会影响是否能看到入口。团队如果用 `requirements.toml` 管理 Codex，`[features].computer_use` 会同时控制 Computer Use 和 Record & Replay；关掉 Computer Use，录制能力也会不可用。

从产品定位看，这一限制合理。Record & Replay 的价值来自本地应用和跨工具流程，而不是单仓库代码编辑。它让 Codex 从“读文件、改代码、跑测试”进一步进入开发者真实桌面：浏览器、企业系统、发布后台、文档工具、内部报表，都可能成为 workflow 的一部分。