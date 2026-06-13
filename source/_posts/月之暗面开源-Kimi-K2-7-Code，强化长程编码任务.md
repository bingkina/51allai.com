---
title: 月之暗面开源 Kimi K2.7 Code，强化长程编码任务
permalink: posts/2026/06/kimi-k27-code-open-source/
tags: [moonshot, kimi, model-release, open-source, coding-agent]
date: 2026-06-13 18:35:32
categories:
  - 大模型
description: Kimi K2.7 Code 已开放权重，定位长程编码智能体模型。本文梳理 1T MoE、256K 上下文、Kimi Code 接入、官方 benchmark 与独立复现缺口。
cover: https://images.51allai.com/blog/20260613-183818_20260613_183904.jpeg
---

> Kimi K2.7 Code 已开放权重，定位长程编码智能体模型。它沿用 K2.6 架构，给出 1T 总参数、32B 激活参数、256K 上下文和 MoonViT 视觉编码器；性能数据仍缺少独立复现，需要开发者在真实仓库里长测。
![Kimi K2.7 Code 模型开源标识](https://images.51allai.com/blog/20260613-183818_20260613_183904.jpeg)

## K2.7 Code 把更新焦点压到编码 Agent

月之暗面这次不是只给 Kimi K2 系列补一个小版本号。Kimi K2.7 Code 的定位很窄：coding-focused agentic model，面向端到端软件工程任务，而不是通用聊天。

模型建立在 Kimi K2.6 之上，架构仍是 MoE。当前公开规格是：1T 总参数、32B 激活参数、61 层、384 个专家、每 token 选择 8 个专家、160K 词表、256K 上下文。它还保留 MoonViT 视觉编码器，视觉编码器参数量为 400M，因此形态不是纯文本生成。

这组参数最值得注意的不是 1T，而是 256K 上下文和强制 thinking。编码 Agent 的瓶颈通常不在“能不能写一个函数”，而在能不能连续读项目、保留中间推理、跨文件修改、运行命令后修正计划。K2.7 Code 把 preserve thinking 设为默认且不可关闭，说明它更偏向长会话工程执行，而不是短问答响应。

## 开源的是权重，也是 Kimi Code 的底座

Kimi K2.7 Code 的模型权重以 Modified MIT License 发布。许可文本保留 MIT 的使用、复制、修改、发布、分发、再授权和销售权利，但加入一个商业归因条件：如果衍生产品或服务月活超过 1 亿，或月收入超过 2000 万美元，需要在用户界面显著展示 “Kimi K2.7 Code”。

这不是传统意义上完全无条件的 MIT。对个人开发者、研究者和绝大多数公司，门槛足够远；对超大规模 AI 产品，它要求品牌归因。写进文章里比单说“开源”更有用，因为这会影响模型能否被 IDE、云端 Agent、推理服务商和企业内部平台直接采用。

模型已经接入 Kimi Code。Kimi Code 当前由 K2.7 Code 驱动，安装方式是一条脚本命令；Kimi Code CLI 本身是 MIT 许可，形态是终端编码 Agent，能读写代码、执行 shell 命令、搜索文件、抓取网页，也支持 ACP 接入编辑器。K2.7 Code 和 Kimi Code 的关系更接近“模型底座 + Agent 外壳”，而不是单独发一个 checkpoint 等社区自配工具链。

## Benchmark 数字要看口径

现有 benchmark 口径给出了一组对比数字。Kimi Code Bench v2 从 K2.6 的 50.9 提到 62.0；Program Bench 从 48.3 提到 53.6；MLS Bench Lite 从 26.7 提到 35.1。Agentic 任务里，Kimi Claw 24/7 Bench 从 42.9 到 46.9，MCP Atlas 从 69.4 到 76.0，MCP Mark Verified 从 72.8 到 81.1。

这些数字可以说明一个方向：K2.7 Code 相比 K2.6 更偏真实工程和工具调用任务。它没有在所有项目上超过闭源前沿模型。表格里 GPT-5.5 在 Kimi Code Bench v2、Program Bench、MCP Atlas、MCP Mark Verified 上仍更高；Claude Opus 4.8 在 MLS Bench Lite 和 MCP Atlas 上更高。K2.7 Code 的看点不是“全面第一”，而是开放权重模型继续逼近闭源编码 Agent 的工作区间。

标称 token 效率也值得单独看。相比 K2.6，K2.7 Code 的 thinking-token 使用量约减少 30%。如果这个数字在真实任务中成立，它会直接影响 Agent 成本：长程编码任务的账单往往不是最终回答，而是中间计划、工具调用、错误修复和多轮推理。现在还缺少独立复现，不能把 30% 当作通用节省比例。

## 真正的验证在连续使用

K2.7 Code 支持 vLLM、SGLang、KTransformers 部署，也能通过兼容 OpenAI / Anthropic 的 API 调用。第三方自部署时，推荐温度为 1.0、top_p 为 0.95；Instant mode 不支持。视频内容目前仍属于实验能力，并且只在第一方 API 中支持。

这几个限制决定了它短期更适合两类用户：一类是愿意直接使用 Kimi Code 的开发者，省掉部署和 Agent 框架整合；另一类是有推理基础设施、愿意自己接 vLLM 或 SGLang 的团队。1T MoE 权重不是随便一台工作站就能舒服跑起来，开源降低的是许可和可控性门槛，不是推理硬件门槛。

后续判断点很明确。第一，看真实仓库里的 issue 修复、跨文件重构、测试失败修复能否稳定跑完。第二，看 thinking-token 下降是否真的转化为成本下降，而不是把思考压缩到更高失败率。第三，看 Kimi Code 之外的 Agent 框架接入是否顺滑，包括工具调用协议、reasoning 内容保留、上下文恢复和长会话审计。

Kimi K2.7 Code 的信号足够清楚：月之暗面正在把 K2 系列从“开放大模型”推向“开放编码 Agent 底座”。但这类模型不能只看一次 benchmark。编码 Agent 的质量，最后会暴露在脏仓库、旧依赖、失败测试和半夜跑不完的 CI 里。
