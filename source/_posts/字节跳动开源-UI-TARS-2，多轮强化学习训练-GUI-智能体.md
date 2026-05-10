---
title: 字节跳动开源 UI-TARS-2，多轮强化学习训练 GUI 智能体
permalink: posts/2026/05/byte-ui-tars-2-gui-agent/
categories:
  - 智能体
tags:
  - UI-TARS
  - GUI Agent
  - 字节跳动
  - 开源
  - desktop-agent
description: 字节跳动 Seed 团队开源 UI-TARS-2，通过端到端多轮强化学习训练 GUI 智能体。Online-Mind2Web 得分 88.2，全面超越 Claude、OpenAI CUA 等基线模型，GitHub 31.8k star。
cover: https://images.51allai.com/blog/截图2026-05-10_21.07.33@2x_20260510_211024.png
date: 2026-05-10 21:14:08
---
> 字节跳动 Seed 团队开源 UI-TARS-2，通过端到端多轮强化学习训练 GUI 智能体。Online-Mind2Web 得分 88.2，全面超越 Claude、OpenAI CUA 等基线模型，GitHub 31.8k star。
![UI-TARS Desktop 操作界面](https://images.51allai.com/blog/截图2026-05-10_21.07.33@2x_20260510_211024.png)

## UI-TARS-2：多轮强化学习训练 GUI 智能体

2025 年 9 月，字节跳动 Seed 团队发布 UI-TARS-2 技术报告（arXiv:2509.02544）。与前代通过监督学习（SFT）+ DPO 的路径不同，UI-TARS-2 采用端到端的多轮强化学习（multi-turn RL）直接训练智能体。

训练管线包含四个组件：数据飞轮（data flywheel）用于规模化生成训练数据、稳定的多轮 RL 框架、集成文件系统与终端的混合 GUI 环境、以及用于大规模 rollout 的统一沙盒平台。官方称该方法解决了数据可扩展性、多轮 RL 训练稳定性、GUI 操作落地精度、环境稳定性四个核心问题。

## 基准测试表现

UI-TARS-2 在主流 GUI 智能体基准上刷新 SOTA：

- **Online-Mind2Web**：88.2（1.5 版为 75.8，提升 12.4 分）
- **AndroidWorld**：73.3（1.5 版为 64.2）
- **WindowsAgentArena**：50.6
- **OSWorld**：47.5（1.5 版为 42.5）
- **Game Suite（15 款游戏均值）**：归一化得分 59.8，约人类水平的 60%

官方报告称在 GUI 基准上超越 Claude 与 OpenAI CUA agent，在游戏任务上与 OpenAI o3 在 LMGame-Bench 上表现接近。目前所有性能数据均来自官方报告，暂无第三方独立复现。

## 版本演进路径

UI-TARS 初版论文（arXiv:2501.12326）于 2025 年 1 月公开，定位原生 GUI Agent 模型，将感知、推理、行动、记忆整合到单一框架。2025 年 4 月发布 UI-TARS-1.5，引入强化学习增强高阶推理能力，开源 7B 参数模型，同步开放 ScreenSpot-V2（94.2）与 ScreenSpotPro（61.6）的 grounding 评估成绩。

UI-TARS-2 在前代基础上进一步将推理能力延伸至信息检索与软件工程任务，官方称其在长周期信息获取任务和软件工程基准上展现出泛化能力。

## UI-TARS Desktop：桌面端应用

配套的桌面应用 UI-TARS Desktop（GitHub: bytedance/UI-TARS-desktop）于 2025 年 11 月发布 v0.3.0，GitHub 获 31.8k star。该应用支持接入多种模型后端，提供浏览器自动化、桌面操作、MCP 集成等能力。

桌面端近期更新包括事件流查看器（event stream viewer）、游戏 Agent 模式、移动端 UI bottom sheet，以及 Runtime Settings API。安全方面修复了开发脚本中的 RCE 漏洞（移除 `DANGEROUSLY_OMIT_AUTH=true` 配置）。

字节跳动已于 2025 年 8 月停止免费的 Remote Operator 服务，用户需自行部署远程计算与浏览器 Agent 基础设施。该技术同时也是豆包手机端的核心支撑技术。
