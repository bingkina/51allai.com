---
title: Anthropic 发布 Fable 5.1 提示指南，教你去除 AI 味
permalink: posts/2026/09/claude-fable-5-1-prompting-guide/
tags: [anthropic, claude-fable, ai-agents, product-update]
sources:
  - name: Anthropic — Prompting Claude Fable 5.1
    url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1
    note: 旧提示词兼容性、Agent 行为差异与提示建议
  - name: Anthropic — Effort
    url: https://platform.claude.com/docs/en/build-with-claude/effort
    note: effort 档位、默认值与按轮次调整方式
  - name: Anthropic — Mid-conversation system messages
    url: https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages
    note: 对话中系统消息与 turn-scoped 指令机制
date: 2026-09-03 10:20:30
categories:
  - 智能体
description: Anthropic 发布 Claude Fable 5.1 专用提示指南，确认旧版提示词通常可沿用。本文整理 effort 档位、进度更新、并行工具调用、只追加对话历史和低 effort 搜索等迁移要点。
cover: https://images.51allai.com/blog/claude-fable-5-1-prompting-guide-cover_20260903_103141.png
---

> Anthropic 为 Claude Fable 5.1 发布专用提示指南，明确原有 Fable 5 提示词通常无需重写。开发者应把优化重点放在 effort 档位、进度更新、并行工具调用与只追加对话历史上，并针对低 effort 搜索、长输出和小范围文件修改加入明确指令。
![Claude Fable 5.1 提示工程与 Agent 运行方式](https://images.51allai.com/blog/claude-fable-5-1-prompting-guide-cover_20260903_103141.png)

## 旧提示词通常不用推倒重写

从 Fable 5 切换到 Fable 5.1，原有提示词通常可以继续使用。新指南关注的不是一套全新的提示语法，而是模型在长任务、工具调用、写作和对话历史处理上的行为差异。

这和模型发布本身是两个问题。关于开放范围、API 价格与上下文规格，可先看站内的 [Claude Fable 5.1 与 Mythos 5.1 发布信息](/posts/2026/09/claude-fable-5-1-mythos-5-1/)。本篇只处理开发者怎样调整提示词和 Agent 运行逻辑。

迁移时先保留现有提示词，用真实任务评测定位问题。只有出现工具逐个调用、长时间无进度、过早结束或全文重写等具体行为，再添加对应约束。

## effort 要重新评测，默认从 high 开始

Fable 5.1 提供 `low`、`medium`、`high`、`xhigh` 和 `max` 五档 effort。它控制模型愿意投入多少推理，从而影响任务质量、延迟与 Token 消耗。默认档位是 `high`。

即使团队已经为 Fable 5 测过 effort，也应在自己的评测集上重新跑一遍。不同模型里的同名档位不代表相同的思考量，旧结论不能直接套用。适合的做法是从 `high` 建立基线，再分别测试其他档位，只在质量能够保持时下调。

`low` 更容易减少搜索和检索工具调用。涉及近期产品、政策或开发工具时，可以在系统提示词中明确要求：遇到快速变化的实体先搜索核验，不要只凭记忆回答。`xhigh` 和 `max` 可能在输出长文前思考更久，长交付物需要同时预留推理和最终回答所占的 `max_tokens`。

## 进度更新需要模型和客户端一起配置

Fable 5.1 在长工具链中默认减少面向用户的文字更新，effort 越高、调用链越长，这种情况越明显。只改提示词不一定能解决，因为进度说明会作为 `thinking` 块返回，而默认的 `thinking.display: "omitted"` 会把它们隐藏。

需要展示进度的应用，可以把显示模式设为 `updates`，并启用 `thinking-display-updates-2026-08-18` Beta 请求头；也可以用 `summarized` 同时接收进度和压缩后的推理内容。客户端还要把非空的 `thinking` 块渲染为状态信息。

提示词只需规定更新的时机与内容，例如：

```text
开始前用一句话说明准备做什么；执行期间只在阶段变化时更新；结束时给出可独立阅读的结果、已完成事项和剩余限制。
```

如果产品界面会折叠工具输出，也要告诉模型哪些结果只有它自己可见。否则模型可能以为运行命令已经向用户展示了内容。

## 独立工具并发调用，历史消息只追加

当一个请求明确列出多个目标时，Fable 5.1 通常会并行调用工具。编码 Agent 和电脑操作循环里的后续步骤若只是任务隐含要求，模型可能改成每轮只调用一个工具。可以在每次返回工具结果时加入一条仅当前轮有效的提醒：先判断下一步需要哪些信息，再一次请求所有互不依赖的项目。

这类提醒不应通过删除旧消息、改写早期系统提示词或替换工具列表来实现。每个 assistant 回合都要按 API 原样追加，包含其中的 thinking 块。对于 2026 年 8 月 31 日及之后创建的新 API 账户，thinking 块只在生成它的原对话中有效；改动对话前缀后再次发送，接口会返回 400 错误，或按 Beta 配置丢弃不匹配的块。

需要临时提醒时，可启用 `mid-conversation-system-clear-at-2026-08-21` Beta 请求头，并使用带 `clear_at: "next_user_message"` 的 turn-scoped system message。它会在下一条用户消息出现时对模型隐藏，但历史数组保持不变。需要压缩长对话时，优先使用服务端 compaction 或 context editing；客户端自行压缩时，不要把旧 thinking 块混入新的摘要会话。

## 用症状决定添加哪条约束

Fable 5.1 的提示优化适合按症状处理，而不是把所有规则一次塞进系统提示词。

| 观察到的行为 | 调整方式 |
| --- | --- |
| 长任务中几分钟没有说明 | 开启进度更新显示，并规定阶段性状态行 |
| 独立工具每轮只调用一个 | 要求先判断依赖关系，再批量请求互不依赖的工具 |
| 任务完成前询问是否继续 | 明确授权范围内的可逆步骤直接执行，仅在破坏性操作或范围变化时停下 |
| 顺手修改了任务外代码 | 要求只实现请求范围，旁支问题放到最终说明 |
| 小改动却重写整份文件 | 明确要求优先做定点修改，除非大部分内容都要变化 |
| 普通聊天缺少必要结构 | 删除一刀切的“禁用标题和列表”规则，改为内容复杂时使用结构 |

写作偏密时，可以直接要求使用字面、准确的表达，删除为了修辞而加入的比喻和花哨措辞。处理检索材料时，应提供一份完整的正确示例，示范怎样标记短引文、怎样用自己的话综合多个来源，避免把原文段落当作普通回答直接复现。

## 示例：怎样去除回答里的 AI 味

“写得自然一点”太模糊，模型不知道要删什么。Fable 5.1 指南给出的英文提示词可以直接使用：

```text
Mannered prose substitutes metaphor and flourish for direct statement. Instead of "a parameter worth varying," the mannered writer produces "a dial worth turning." Instead of "this point still matters," they write "this point earns its keep." The phrases exist to display the writer, not to convey the idea, and readers can tell. That is why mannered prose irritates: it makes the reader work harder so the writer can perform. It is also imprecise. Metaphors drag in connotations the writer did not choose and cannot control. The fix is to say what you mean. When a literal phrase is available, use it.
```

这里的 `mannered prose` 指刻意雕琢、用修辞代替直接表达的文风。它不只是要求模型“少用比喻”，还解释了这类写法为什么降低准确性：比喻会带入作者没有选择、也无法控制的额外含义。核心要求是，有字面表达可用时就直接说清楚。

如果希望同时约束中文常见的模板句，并锁定不能改变的事实，可以使用下面这个扩展版：

```text
保持事实、数字和专业术语不变，重写下面的内容。

删除以下写法：
- “随着……发展”等空泛开场；
- “不仅……而且……”“这意味着……”等模板句；
- “重要、显著、强大、颠覆”等没有事实支撑的形容词；
- 为了修辞加入的比喻、对偶和三段式排比；
- 重复结论和价值升华。

先写结论，再补必要解释。每段只说一个重点，长短句混用；能用具体动作、参数或结果表达时，不用抽象评价。
```

例如，原文可能是：

> 随着人工智能技术的快速发展，Claude Fable 5.1 凭借更灵活的 effort 设置，为开发者带来了更强大、更高效的使用体验，这意味着智能体开发进入了新的阶段。

去掉套话后可以写成：

> Claude Fable 5.1 提供 `low`、`medium`、`high`、`xhigh` 和 `max` 五档 effort，默认使用 `high`。开发者可以在质量不下降时调低档位，减少延迟和 Token 消耗。

第二版没有保留“快速发展”“更强大”或“新阶段”，因为这些词没有增加可验证的信息。它直接给出档位、默认值和调整目的。

如果回答的问题是产品介绍，还可以增加一句受众约束：

```text
面向不了解大模型 API 的普通读者。英文术语首次出现时用一句白话解释，但不要重复解释；不要假设读者知道 effort、Token 或工具调用是什么。
```

遇到句子过长、段落太密，可以单独使用一个更短的修订提示：

```text
删除花哨措辞和重复解释。保留全部事实，把超过两个分句的长句拆开；每段只承担一个信息点。
```

这类要求适合放在当前用户消息里，而不是不断扩充全局系统提示词。先让模型完成初稿，再针对已经出现的问题修订，能够避免为了防范所有可能的写作问题而堆出一份过长的规则表。

Fable 5.1 的迁移重点不是继续堆叠提示词，而是让提示词、API 参数和 Agent 客户端保持一致。先用现有任务复现问题，再添加一条能对应症状的规则，更容易判断改动是否有效。
