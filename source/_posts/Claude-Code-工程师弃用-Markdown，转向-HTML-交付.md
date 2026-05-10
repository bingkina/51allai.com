---
title: Claude Code 工程师弃用 Markdown，转向 HTML 交付
permalink: posts/2026/05/claude-code-engineers-switch-html-from-markdown/
tags:
  - Claude Code
  - Markdown
  - HTML
  - Anthropic
  - AI开发工具
date: 2026-05-10 00:39:02
categories:
  - 行业观察
description: Claude Code 团队成员 Thariq Shihipar 公开表示团队已停止使用 Markdown，全面改用 Claude Code 生成 HTML 文件交付内容。本文梳理其 20 个 HTML 示例、Simon Willison 的响应评测，以及 Markdown vs HTML 的适用边界。
cover: https://images.51allai.com/blog/截图2026-05-10_00.37.39@2x_20260510_003856.png
---

> Anthropic 的 Claude Code 团队成员 Thariq Shihipar 公开发布 20 个自包含 HTML 示例，论证 AI Agent 输出 HTML 比 Markdown 更有效。Simon Willison 随即撰文跟进实测。格式之争的底层逻辑：从"人写"到"Agent 生成"的交付范式转移。
![The unreasonable effectiveness of HTML 首页截图](https://images.51allai.com/blog/截图2026-05-10_00.37.39@2x_20260510_003856.png)

2026 年 5 月 8 日前后，Claude Code 团队成员 Thariq Shihipar（X: @trq212）发布推文："HTML is the new markdown. I've stopped writing markdown files for almost everything, and started using Claude Code to generate HTML instead."

他在个人 GitHub Pages 站点（[thariqs.github.io/html-effectiveness](https://thariqs.github.io/html-effectiveness/)）公开了 20 个 `.html` 文件，覆盖 9 大工作场景，每个文件都是自包含的、可直接在浏览器中打开的独立产物。

## 20 个 HTML 示例，覆盖 9 类开发场景

Thariq 的站点按用途将示例分为 9 类：

- **探索与规划**（3 个）：并排对比三种代码方案、可视化设计方向选择、含里程碑和风险表的实施计划
- **代码审查**（3 个）：带颜色标注严重程度的 PR diff 说明、面向审查者的 PR 文档、模块框图
- **设计交付**（2 个）：可复制的 Design Token 色板、组件变体总览
- **交互原型**（2 个）：可调参数的动画沙盒、四屏交互流程演示
- **插图与图表**（2 个）：内联 SVG 图集、可点击展开详情的部署流程图
- **演示文稿**（1 个）：左右键导航的单文件幻灯片
- **研究与学习**（2 个）：含折叠步骤和 FAQ 的功能说明、可交互的一致性哈希环教学
- **报告**（2 个）：带小图表的周状态报告、分钟级事故时间线
- **自定义编辑界面**（3 个）：拖拽工单看板、带依赖警告的功能开关编辑器、实时预览的提示词调试器

核心论点：HTML 是"打开即成品"的格式，浏览器就是运行环境。Markdown 需要平台二次渲染，HTML 自己就是交付物。

## Simon Willison 的响应评测

知名开发者 Simon Willison 在 [simonwillison.net](https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/) 发文跟进。他承认自己从 GPT-4 时代起就默认使用 Markdown，原因是 8192 token 的上下文窗口让 Markdown 的 token 效率优势显著——但这个约束现在已经不存在了。

Willison 用 GPT-5.5 做了一个实测：将 copy.fail 网站的内容（一个 Linux 提权漏洞的混淆 Python 代码）输入 LLM，要求生成带样式和交互的 HTML 解释页面，然后直接托管发布。结论是效果不错，但指出应该优先解释漏洞机制而非周围的 Python 框架代码。

他的关键观察：要求 HTML 输出后，Claude 能直接嵌入 SVG 图、交互式组件和页内导航，生成内容的可读性和可导航性显著提升。

## 性能代价与场景边界

搜狐和网易转载的报道中引用了具体数据：HTML 生成耗时约为 Markdown 的 200%–400%，但版面易读性和信息传递效率的提升被认为值得这个代价。

但场景并非一边倒。实测表明：

- **适合 HTML**：面向终端交付的工作汇报、产品对比表、设计评审、需要视觉层级的正式文档
- **适合 Markdown**：技术文档、内部协作笔记、信息密度优先的轻量场景（如行程规划、书单推荐）

中文社区讨论中也有开发者提出 "html for humans, md for agents" 的分法——面向人类阅读用 HTML，面向 Agent 消费用 Markdown。

## 舆论反应：质疑与跟进并存

中文科技社区的反应呈现两极。53AI 的报道（2026-05-09）同时指出 Claude Code 近期遭遇用户流失——Codex 的 npm 下载量已达 8610 万次，是 Claude Code 720 万次的 12 倍。AMD AI 总监分析了 6852 个会话、23.5 万次工具调用后发现，Claude Code 的推理深度下降了 67%，不良行为增长 173%。Anthropic 官方承认了三个 bug：默认推理等级从 high 降为 medium、缓存 bug 清除了推理历史、响应长度限制导致代码质量下降约 3%。

格式讨论与产品体验问题叠加，使得 "HTML 取代 Markdown" 的叙事在部分开发者眼中变成了 "Claude Code 你又作" 的又一个佐证。
