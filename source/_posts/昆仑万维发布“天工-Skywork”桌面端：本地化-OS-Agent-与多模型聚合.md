---
title: 昆仑万维发布“天工 Skywork”桌面端：本地化 OS Agent 与多模型聚合
date: 2026-02-04 21:02:01
tags:
---
> 此举标志着昆仑万维从单一模型厂商向“AI 操作系统（OS Agent）”平台转型，主打“本地沙盒隐私安全”与“Claude/Gemini 模型聚合”，意在抢占 Windows 生态的系统级办公入口。
![20260204-210008](https://images.51allai.com/blog/20260204-210008_20260204_210345.jpeg)


* **本地化 OS Agent 架构**：
与传统的网页端对话不同，Skywork Desktop 强调 **“不上传云端”** 的隐私处理机制。通过本地虚拟机隔离环境（Local VM Isolation），应用可直接读取并解析本地硬盘中的海量文件（Word/PDF/Excel/代码），建立持久化的语义索引，而非单次会话的临时上传。
* **多模型聚合策略 (Model Aggregation)**：
打破了单一自研模型的限制，该客户端集成了 **Claude Opus/Sonnet 4.5** 和 **Gemini 3 Pro** 等外部 SOTA 模型（注：基于2026年时间线的模型版本）。提供 "Auto" 模式，根据任务复杂度自动路由选择最适合的模型，或由用户手动指定，实现了“模型自由”。
* **跨格式工作流自动化**：
重点突破了单一文档处理的局限，支持跨文件格式的任务链。例如：
* **Doc to Excel**：从需求文档自动提取要素生成任务追踪表。
* **Excel to PPT**：基于数据表格自动生成周报演示文稿。
* **Doc/PPT to Website**：直接将文档内容转换为网页代码。


* **商业模式**：
采用订阅制（Basic/Plus 会员），直接对标海外的 Claude Cowork，但在 Windows 生态适配上更深入，被官方定位为“Windows 版 Claude Cowork”。