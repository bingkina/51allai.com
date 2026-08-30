---
title: WorkBuddy 国际版接入 Hy4 preview，770B 开源模型限免两周
permalink: posts/2026/08/workbuddy-hy4-preview-global/
tags: [tencent, workbuddy, hunyuan, model-release, product-update]
date: 2026-08-30 13:52:23
categories: 智能体
description: WorkBuddy 国际版接入腾讯混元 Hy4 preview，全球用户可直接选择这款 770B 总参数、49B 激活参数和 1M 上下文的开源模型。本文梳理两周限免、产品入口，以及它对文档、表格和演示文稿任务的实际使用方式，帮助办公用户判断是否值得在限免期内切换模型试用。
cover: https://images.51allai.com/blog/workbuddy-hy4-preview-global-cover-original_20260830_135459.png
---

> WorkBuddy 国际版已接入腾讯混元 Hy4 preview。该模型总参数 770B、每次推理激活 49B，支持超过 100 万 Token 上下文；全球用户可直接在 WorkBuddy 中使用，首发两周免费，不必自行下载和部署模型。
![WorkBuddy 国际版接入 Hy4 preview 模型封面](https://images.51allai.com/blog/workbuddy-hy4-preview-global-cover-original_20260830_135459.png)

## WorkBuddy 国际版新增 Hy4 preview

Hy4 preview 已进入 WorkBuddy 国际版的模型阵容。全球用户可以通过 [WorkBuddy 国际版](https://www.workbuddy.ai/) 直接使用，不需要先下载模型文件、配置推理框架或接入 API。

WorkBuddy 是面向办公任务的智能体工作台，可以根据自然语言要求处理研究、数据分析、文档、演示文稿和表格等任务。接入 Hy4 preview 后，用户仍在同一个工作台里发起任务，只是多了一个可选模型。

## 770B 总参数，每次激活 49B

Hy4 preview 采用混合专家架构（MoE），总参数为 770B，处理每个 Token 时激活 49B 参数。MoE 会根据当前输入调度部分“专家”参与计算，因此 49B 描述的是每一步推理调用的参数量，不等于模型文件只有 49B。

模型支持超过 100 万 Token 的上下文。上下文决定模型在一次任务中能读取多少文字、代码和历史步骤；对 WorkBuddy 用户来说，这项规格适合处理较长文档、多个文件和持续多轮的工作任务。

Hy4 preview 已开源。需要自己部署的团队可以选择开源版本，但只想完成办公任务的用户可以直接从 WorkBuddy 使用托管服务。

## Hy4 preview 首发免费两周

Hy4 preview 在 WorkBuddy 和 CodeBuddy 上提供两周免费体验，限免从模型发布时开始。两款产品中的 Hy3 免费使用期同时延长至 9 月 30 日，用户可以在相同任务上比较两个模型的输出与执行过程。

免费体验适合先测试长文档整理、跨文件分析、报告与演示文稿制作等现有工作流。比较时可以记录任务是否完成、耗时、需要人工修改的次数和最终产物质量，再决定后续使用哪个模型。
