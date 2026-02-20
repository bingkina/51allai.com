---
title: Google 突降 Gemini 3.1 Pro，核心推理指标 ARC-AGI-2 翻倍至 77.1%
categories: AI资讯
tags: [Google, Gemini]
date: 2026-02-20 10:22:25
---
# 标题：Google 突降 Gemini 3.1 Pro，核心推理指标 ARC-AGI-2 翻倍至 77.1%

> Google 将上周 Deep Think 模型的核心推理能力正式下放至 3.1 Pro，主攻复杂逻辑推演与智能体（Agentic）工作流，API 侧大幅优化自定义工具调用。
![iShot_2026-02-20_10.24.05](https://images.51allai.com/blog/iShot_2026-02-20_10.24.05_20260220_102503.png)

# 核心指标与 Benchmark 跃升

Gemini 3.1 Pro 定位为应对复杂任务的增强推理模型（距离 Gemini 3 系列发布仅隔三个月）。

* **流体智力突破**：在专注测试抗记忆化推理的 ARC-AGI-2 榜单中得分 **77.1%**，较上一代 3 Pro 实现翻倍。
* **数理与代码能力**：GPQA Diamond（研究生级科学推理）达 **94.1%**；SWE-Bench Verified（智能体编程）达 **80.6%**。
* **上下文与成本**：原生维持 1M Token 上下文。API 均价下探（输入 $2/M Tokens，输出 $12/M Tokens），在长文本与多模态成本控制上直接对标竞品 Sonnet 4.6。

# 工程实现与工具链更新

* **代码级前端动效**：支持直接通过文本生成复杂动态 SVG 动画。输出形式为纯代码而非像素，解决传统视频体积过大与缩放失真的工程痛点。
* **API 端点分流**：新增 `gemini-3.1-pro-preview-customtools` 独立端点，专门强化开发者在 Bash 环境与自定义工具混合场景下的调用优先级。
* **底层多模态引擎底座**：
* **视觉链路**：图像生成与编辑由 **Nano Banana** 模型驱动，强化高保真文本渲染能力；视频生成基于 **Veo** 架构，支持首尾帧控制与端到端音频。
* **音频链路**：高保真音乐与人声生成由 **Lyria 3** 支撑，强制物理注入 SynthID 水印。


* **Gemini Live 移动端交互**：实装全双工（Full-duplex）实时对话，开放移动端摄像头（Camera Sharing）与屏幕共享（Screen Sharing），支持基于当前屏幕 UI 的实时多模态解析。

# 部署与分发路径

* **开发者侧**：即日起通过 Google AI Studio、Vertex AI、Android Studio，以及全新智能体开发平台 **Google Antigravity** 开放预览。
* **消费端侧**：已接入 Gemini App 与 Chrome 侧边栏；但高频调用额度与 NotebookLM 的独占访问权，被严格限制在 Google AI Pro / Ultra 付费订阅区间。