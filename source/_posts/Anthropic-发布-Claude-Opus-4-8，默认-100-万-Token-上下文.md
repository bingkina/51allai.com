---
title: Anthropic 发布 Claude Opus 4.8，默认 100 万 Token 上下文
permalink: posts/2026/05/anthropic-claude-opus-4-8/
tags: [anthropic, claude-opus, model-release, product-update]
date: 2026-05-29 09:42:34
categories: 大模型
description: "Anthropic 发布 Claude Opus 4.8，默认支持100万Token上下文，API价格维持Opus 4.7水平，并同步推出fast mode、动态工作流与中途系统消息能力。"
cover: https://images.51allai.com/blog/截图2026-05-29_09.43.51@2x_20260529_094551.png
---
> Anthropic 在 2026 年 5 月 28 日发布 Claude Opus 4.8。它不是 Mythos 级别的新旗舰，而是面向编码 Agent、长上下文知识工作和企业部署的 Opus 线更新：默认 100 万 Token 上下文、API 价格不变、fast mode 加价换速度，并把 Claude Code 的动态工作流推到研究预览。
![Claude Opus 4.8 发布页截图](https://images.51allai.com/blog/截图2026-05-29_09.43.51@2x_20260529_094551.png)

## 发布状态：Opus 4.8 已全量可用

Anthropic 官方发布页显示，Claude Opus 4.8 于 2026 年 5 月 28 日上线，开发者可通过 Claude API 使用 `claude-opus-4-8`。官方称它是当前“generally available”范围内能力最强的 Claude 模型，但同时明确：Mythos 级别模型仍在后面，预计“未来几周”才会面向更广客户开放。

API 价格没有跟随版本号上涨：

| 模式 | 输入价格 | 输出价格 |
| --- | ---: | ---: |
| 常规模式 | $5 / 百万 Token | $25 / 百万 Token |
| fast mode | $10 / 百万 Token | $50 / 百万 Token |

fast mode 目前是 Claude API 的研究预览能力。Anthropic 文档称，它可让同一模型的输出速度最高提升至 2.5 倍，但价格按常规模式的 2 倍计费。Axios 的报道则把这条线索解读为：Anthropic 正在把模型更新和成本控制放在同一叙事里，而不是只讲能力排名。

## API 变化：100 万上下文、128K 输出、中途 system 消息

Claude API 文档把 Opus 4.8 的开发者变化列得很清楚：

- **模型 ID**：`claude-opus-4-8`
- **上下文窗口**：Claude API、Amazon Bedrock、Vertex AI 默认支持 100 万 Token；Microsoft Foundry 为 200K。
- **最大输出**：128K Token。
- **prompt cache 门槛**：最低可缓存 prompt 长度降至 1,024 Token。
- **中途系统消息**：Messages API 现在允许在 `messages` 数组里追加 `role: "system"`，用于在长任务中更新权限、预算或环境上下文，同时保留前文 prompt cache 命中。
- **拒绝响应细节**：`stop_details` 的拒绝类别公开文档化，便于应用区分不同拒绝原因。

两个约束也被继承下来：Opus 4.8 与 Opus 4.7 一样，不支持非默认 `temperature`、`top_p`、`top_k`；也不支持手工设置 extended thinking budget。开发者需要使用 adaptive thinking 和 `effort` 参数控制推理深度。

这不是小改动。中途 system 消息直接服务长链路 Agent：任务跑到一半，权限变化、预算变化、环境变化，不再必须把完整系统提示重塞一遍。对依赖 prompt cache 的 Agent harness，这会影响实际成本。

## Claude Code 同步上新：dynamic workflows

和 Opus 4.8 一起发布的，是 Claude Code 的 dynamic workflows。Anthropic 的定义是：Claude 可以把一个大任务拆成多个子任务，在同一会话中运行数十到数百个并行 subagents，再做交叉验证后汇总。

官方给出的典型场景包括：

- 大代码库 bug hunt、性能审计、安全审计。
- 框架迁移、API 废弃迁移、语言迁移。
- 高风险改动前的多路独立验证。

这项能力目前是研究预览，面向 Claude Code CLI、Desktop、VS Code 扩展，以及 API、Bedrock、Vertex AI、Microsoft Foundry 等通道。计划层面，Max、Team 默认可用；Enterprise 默认关闭，需要管理员开启。Claude Code 里还新增了 `ultracode` 设置：把 effort 拉到 `xhigh`，并允许 Claude 自动判断是否启用 workflow。

官方也给了成本提示：dynamic workflows 会明显消耗更多 tokens。第一次触发时，Claude Code 会展示即将执行的内容并要求确认。这个设计很现实。多 Agent 并行不是免费能力，适合代码库级迁移和审计，不适合日常小修小补。

## 能力叙事：不是 Mythos，但补 Opus 4.7 的短板

Anthropic 对 Opus 4.8 的官方定位比较克制：相比 Opus 4.7，是“modest but tangible improvement”。重点不在参数规模或新模态，而在三个方向：

- 长周期 agentic coding：更好的长上下文处理、更少 compaction 后跑偏。
- 推理 effort 校准：不同 effort 档位下表现更稳定。
- 工具触发：减少该调用工具却跳过工具的情况。

这些说法目前主要来自 Anthropic 官方口径和早期客户引述。Cognition 在官方发布页中表示，Opus 4.8 修复了 Opus 4.7 的注释冗长和工具调用问题；Cursor、Harvey、Databricks、Hebbia 等也给出正面反馈。但这些都是发布页里的客户证言，不等同于独立基准复现。

官方还特别强调“honesty”。Anthropic 称，内部评估显示 Opus 4.8 比前代“约四倍更少”让自己写出的代码缺陷未经提示地通过；alignment 团队则认为其支持用户自主性、维护用户利益等 prosocial traits 达到新高，misaligned behavior 低于 Opus 4.7，接近 Claude Mythos Preview。

这里需要分清两层：模型是否更少胡说，是官方评测结论；真实工程项目里是否减少返工，还需要外部长期使用数据。

## 分发：AWS、GitHub Copilot 同步接入

AWS 在 5 月 28 日同步宣布 Claude Opus 4.8 可通过 Amazon Bedrock 和 Claude Platform on AWS 使用。Bedrock 路径强调数据留在 AWS 基础设施内，并可结合 Guardrails、Knowledge Bases 和区域数据驻留能力。对企业客户来说，这比直接 API 更像采购和合规入口。

GitHub 也在同日宣布 Claude Opus 4.8 进入 GitHub Copilot，覆盖 Copilot Pro+、Business、Enterprise 用户，可在 VS Code、Visual Studio、Copilot CLI、Copilot cloud agent、github.com、GitHub Mobile、JetBrains、Xcode、Eclipse 中选择。上线初期采用逐步 rollout；在 2026 年 6 月 1 日 Usage Based Billing 上线前，Opus 4.8 按 15X premium request multiplier 计量。

这说明 Opus 4.8 的核心战场仍是开发者工作流。Anthropic 自己推 Claude Code dynamic workflows，GitHub 则把它接入 Copilot Agent 体系，AWS 提供企业部署入口。模型升级和渠道分发是同一天发生的。

## 看点：Opus 线在给 Mythos 铺路

Opus 4.8 的关键不是“最强模型”这个标签，而是 Anthropic 公开承认：更高智能的 Mythos-class 模型尚未普遍开放，原因是网络安全防护要求更高。现在的小范围 Claude Mythos Preview 已在 Project Glasswing 下用于网络安全工作。

这让 Opus 4.8 更像一个过渡版本：把可商用、可广泛部署的 Opus 线继续打磨，同时把动态工作流、effort 控制、fast mode、中途 system 消息这些 Agent 基础设施补上。真正的分水岭可能不在 4.8，而在 Mythos-class 模型是否能带着足够安全边界进入公开市场。

对开发者而言，短期需要看的不是发布页排名，而是三个可验证问题：

- 迁移到 `claude-opus-4-8` 后，长任务 compaction 后是否更少跑偏。
- adaptive thinking + effort 控制是否降低无效思考 token。
- dynamic workflows 在大代码库审计和迁移中，是否能稳定产出可合并结果。

这些问题要靠真实项目跑出来。发布日能确定的事实只有一个：Anthropic 正在把 Opus 线从“更会回答”继续推向“更会长期执行”。
