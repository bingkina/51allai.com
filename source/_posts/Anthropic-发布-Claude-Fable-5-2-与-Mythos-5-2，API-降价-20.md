---
title: Anthropic 发布 Claude Fable 5.2 与 Mythos 5.2，API 降价 20%
permalink: posts/2026/11/claude-fable-mythos-5-2/
tags: [anthropic, claude-fable, model-release, pricing]
sources:
  - name: Anthropic — Introducing Claude Fable 5.2 and Claude Mythos 5.2
    url: https://www.anthropic.com/claude-fable-and-mythos-5-2
    note: 发布日期、同一底层模型与安全防护区别
  - name: Claude Platform Docs — Claude Fable 5.2
    url: https://platform.claude.com/docs/en/models/fable-5-2/overview
    note: 模型规格、输入输出类型、接入平台与数据保留要求
  - name: Claude Platform Docs — Claude Mythos 5.2
    url: https://platform.claude.com/docs/en/models/mythos-5-2/overview
    note: Mythos 的访问审核与规格
  - name: Claude Platform Docs — Pricing
    url: https://platform.claude.com/docs/en/about-claude/pricing
    note: 5.1 与 5.2 标准价格、缓存和快速模式价格
  - name: Claude Help Center — Claude Fable 5.2 launch offers
    url: https://support.claude.com/en/articles/17506494-claude-fable-5-2-launch-offers
    note: Pro 和 Team 标准席位一周活动的范围、期限与额度规则
  - name: AWS — Introducing Claude Fable 5.2 on AWS
    url: https://aws.amazon.com/blogs/machine-learning/introducing-claude-fable-5-2-on-aws/
    note: 独立确认上线日期、机构访问与 Bedrock 入口
  - name: Claude Platform Docs — Claude Fable 5.2 and Claude Mythos 5.2 migration guide
    url: https://platform.claude.com/docs/en/models/fable-5-2/migration-guide
    note: 所有账户的思考块校验与开发者迁移要求
date: 2026-11-10 09:07:38
categories:
  - 大模型
description: Anthropic 发布 Claude Fable 5.2 与 Mythos 5.2，标准 API 输入、输出价格均下调 20%，保留 100 万 Token 上下文。本文梳理两个版本的访问区别、快速模式价格、Pro 与 Team 限时活动，以及开发者迁移要求。
cover: https://images.51allai.com/blog/claude-fable-mythos-5-2-cover_20261110_091329.png
---

> Anthropic 于 11 月 9 日发布 Claude Fable 5.2 与 Mythos 5.2。两者使用同一底层模型，标准 API 价格降至每百万输入 Token 8 美元、输出 40 美元，较 5.1 下调 20%。Fable 面向通用用户，Mythos 需要机构审核；Pro 和 Team 标准席位获得一周订阅内 Fable 访问。
![Claude Fable 5.2 与 Mythos 5.2 发布及 API 降价封面](https://images.51allai.com/blog/claude-fable-mythos-5-2-cover_20261110_091329.png)

## 同一底层模型，访问范围不同

Claude Fable 5.2 和 Claude Mythos 5.2 是面向复杂推理与长任务的模型，可用于代码开发、多步研究和文档分析。两者共享底层模型，区别在于安全防护和访问权限。

Fable 5.2 带有网络安全和生物研究领域的防滥用机制，适合通用任务。Mythos 5.2 面向通过审核的机构，网络安全专业人士和生命科学研究者可申请对应的验证计划。购买普通 Claude 订阅并不直接获得 Mythos 访问资格。

两款模型均支持文本和图片输入、文本输出，提供 100 万 Token 上下文和最多 128K Token 输出。Token 是模型处理文字的计量单位；上下文窗口决定一次请求能容纳多少材料，与最终回答的最大长度是两项限制。

## 标准 API 降价 20%，快速模式另行计费

两款 5.2 模型采用相同的 API 定价。以下为 Claude API 的美元价格，单位均为每百万 Token：

| 计费项 | Fable / Mythos 5.1 | Fable / Mythos 5.2 |
| --- | ---: | ---: |
| 标准输入 | 10 | 8 |
| 标准输出 | 50 | 40 |
| 缓存读取 | 0.25 | 0.20 |
| 5 分钟缓存写入 | 12.50 | 10 |
| 1 小时缓存写入 | 20 | 16 |

例如，一项任务累计使用 100 万个普通输入 Token、10 万个输出 Token，按标准价格计算，费用由 15 美元降至 12 美元，节省 3 美元。这个计算固定了 Token 用量，不含缓存、工具和其他附加计费。

与[5.1 主要下调缓存读取价格](/posts/2026/09/claude-fable-5-1-mythos-5-1/)相比，本次标准输入和输出也降价。提示词缓存用于复用重复的项目背景、文档等内容，写入与读取分别计费。

Fable 5.2 与 Mythos 5.2 还提供快速模式，输入为 16 美元、输出为 80 美元，均为标准模式的两倍。开启前需单独核算预算；各云平台的区域与部署计费应按对应价目表计算。

## Pro 与 Team 标准席位获得一周订阅内访问

发布活动从 2026 年 11 月 9 日开始，到太平洋时间 11 月 16 日 23:59 结束，即北京时间 11 月 17 日 15:59。

活动期间，Pro 用户和 Team 标准席位可把每周额度最多 50% 用于 Fable 系列，覆盖 Fable 5.2、5.1 和 5。用户需要在模型选择器中主动选择，默认模型保持原样。活动结束或用完这部分额度后，已启用用量积分的账户改由积分计费。

符合条件的付费账户还可获得 Fable 用量重置。重置恢复已经消耗的额度，不提高原有上限；可在「设置 → 用量」查看并使用。获得重置要求账户或组织在太平洋时间 11 月 9 日上午 10 点前已建立付费账单，团队席位持有人还需在该时间前加入组织。

## 开发者接入需检查对话历史与数据保留

开发者可通过 Claude API 调用 `claude-fable-5-2`，获批机构使用 `claude-mythos-5-2`。Fable 5.2 也已在 Amazon Bedrock、Claude Platform on AWS、Google Cloud 和 Microsoft Foundry 上线。Bedrock 用户可进入控制台的 Test → Playground，选择 Fable 5.2 试用。

从 5.1 迁移时，需要检查自己是否会修改对话历史。5.2 对所有账户执行思考块前缀校验：模型返回的思考块记录其推理状态，与此前的系统提示、工具列表及对话内容绑定。自行修改这些内容后再传回原思考块，会触发 400 错误。由 Claude Code、claude.ai 或 Claude Agent SDK 管理历史的用户无需自行处理这项校验。

两款模型要求保留数据 30 天用于安全监测。已有零数据保留安排的企业，需要获得明确授权或调整对应工作空间的数据保留设置，再接入这两个模型。
