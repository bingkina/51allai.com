---
title: Anthropic 限制发布高危模型 Claude Mythos，斥资过亿启动防御联盟 Project Glasswing
categories: AI资讯
tags: [Anthropic,Claude,]
date: 2026-04-08 23:59:02
---
# 标题：Anthropic 限制发布高危模型 Claude Mythos，斥资过亿启动防御联盟 Project Glasswing

> Anthropic 内部评估确认其未发布模型 Claude Mythos 具备超越顶尖人类专家的系统漏洞挖掘与利用能力，为规避武器化风险，已决定取消公众发布计划，转而联合核心科技巨头进行防御性内测。
![截图2026-04-08_23.58.39@2x](https://images.51allai.com/blog/截图2026-04-08_23.58.39@2x_20260408_235941.png)

# 跨代际代码能力与自动化漏洞挖掘
Claude Mythos Preview（内部代号 Copybara 级）并非专为安全训练，但因其极高的代理编码与推理能力，展现出顶级的攻防水平。
- **核心数据基准**：在网络安全漏洞复现基准 CyberGym 中得分 83.1%（前代 Opus 4.6 为 66.6%）；在代码基准 SWE-bench Verified 中得分高达 93.9%（Opus 4.6 为 80.8%）。
- **实战漏洞战绩**：自主发现数千个高危零日漏洞（Zero-days），覆盖所有主流操作系统与浏览器。典型案例包括：挖掘出潜伏 27 年的 OpenBSD 远程崩溃漏洞、16 年的 FFmpeg 漏洞，以及通过组合 Linux 内核多个漏洞实现系统完全接管。

# 闭门分发与 Project Glasswing 联盟
鉴于技术外泄的极端风险，Anthropic 决定不对外开放 API，转而启动 Project Glasswing 项目。
- **参与方**：首批接入逾 40 家关键基础设施维护者，包括 AWS、Apple、Google、Microsoft、CrowdStrike 等，仅限于第一方代码和开源系统的防御性扫描。
- **资金支持**：Anthropic 提供 1 亿美元的模型调用额度，并向 Linux 基金会（250 万美元）和 Apache 软件基金会（150 万美元）提供共计 400 万美元直接捐赠，以加固开源代码库。