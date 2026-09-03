---
title: Anthropic 发布 Fable 5.1 提示指南，教你去除 AI 味
permalink: posts/2026/09/claude-fable-5-1-prompting-guide/
tags: [anthropic, claude-fable, ai-agents, product-update]
sources:
  - name: Anthropic — Prompting Claude Fable 5.1
    url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1
    note: Fable 5.1 的行为差异与提示方法
date: 2026-09-03 10:20:30
updated: 2026-09-03 10:44:05
categories:
  - 智能体
description: Anthropic 发布 Claude Fable 5.1 提示指南，给出一段可直接使用的英文提示词，专门删除用比喻和辞藻替代直白表达的 AI 味，并说明 effort、工具调用、对话历史等调优方法。
cover: https://images.51allai.com/blog/claude-fable-5-1-prompting-guide-cover-v2_20260903_105004.png
---

> Anthropic 在 Claude Fable 5.1 提示指南中专门讨论了文字过密和刻意雕琢的问题，并给出一段可直接复制的英文提示词，用来删除以比喻和辞藻代替直白表达的 AI 味。指南还说明了 effort、工具调用、对话历史与长任务的调整方法。
![Claude Fable 5.1 提示工程与 Agent 运行方式](https://images.51allai.com/blog/claude-fable-5-1-prompting-guide-cover-v2_20260903_105004.png)

## 旧提示词通常可以继续使用

Fable 5.1 的提示方法同时适用于 Mythos 5.1。原有 Fable 5 提示词通常无需修改，开发者应先运行现有任务，再针对实际出现的行为调整。指南讨论的是提示与 Agent 运行方式，不涉及模型能力、API 变化、价格和开放范围。

需要关注的现象包括：effort 与任务不匹配、工具调用之间没有进度说明、独立工具每轮只调用一个、历史消息被改写、文字过密、聊天缺少结构、摘要直接复现原文、任务提前结束、压缩摘要丢失约束、修改范围扩大、低 effort 不主动搜索、小改动重写整份文件，以及复杂图表识别不完整。

## 用一段提示词去除 AI 味

Fable 5.1 减少了套话和未解释的术语，但部分回答会比 Fable 5 更密，表现为长句增多、段落减少。指南把需要避免的文风称为 `mannered prose`：用比喻和辞藻代替直白表达，让文字更像在展示作者，而不是传递信息。

完整提示词可以直接复制使用：

```text
Mannered prose substitutes metaphor and flourish for direct statement. Instead of "a parameter worth varying," the mannered writer produces "a dial worth turning." Instead of "this point still matters," they write "this point earns its keep." The phrases exist to display the writer, not to convey the idea, and readers can tell. That is why mannered prose irritates: it makes the reader work harder so the writer can perform. It is also imprecise. Metaphors drag in connotations the writer did not choose and cannot control. The fix is to say what you mean. When a literal phrase is available, use it.
```

这段提示词没有笼统要求“写得自然”，而是指出问题出在哪里：比喻会带入作者没有选择、也无法控制的额外含义，读者还要花更多精力理解。修改原则只有一个——有字面表达可用时，直接说清楚。

如果不需要解释，也可以使用更短的版本：

```text
Please remove all mannered prose.
```

## 从 high 开始重新评测 effort

Fable 5.1 提供 `low`、`medium`、`high`、`xhigh` 和 `max` 五档 effort，默认值是 `high`。effort 是平衡能力、延迟和成本的主要参数。

已经为 Fable 5 测过 effort 的团队也要重新评测。不同模型中的同名档位不代表相同的思考量。可以先用 `high` 建立基线，再把其他档位放进同一套评测，确认质量能够保持后再降低 effort。

`low` 档位更少调用搜索和检索工具。`xhigh` 和 `max` 则可能在输出长内容前思考更久，使用这两档时需要给推理过程和最终回答同时预留足够的 `max_tokens`。

## 进度更新需要客户端显示 thinking 块

Fable 5.1 在长工具链里给用户的进度说明比 Fable 5 少，effort 越高、工具链越长，这种情况越明显。进度更新会放在 `thinking` 块中返回，而默认的 `thinking.display: "omitted"` 会隐藏这些内容。

需要显示进度时，可以设置 `display: "updates"`，启用 `thinking-display-updates-2026-08-18` Beta 请求头，并把非空的 `thinking` 块渲染成状态行。设置为 `summarized` 时，可以同时获得进度更新和压缩后的推理内容。

提示词中若有“所有信息留到最终回答”一类禁止过程说明的规则，应先删除。仍需要更多状态信息时，再明确要求模型在开始前说明要做什么、工作期间给出简短更新，并在结束时提供可以独立阅读的完整结果。若产品会折叠工具输出，也要告诉模型用户看不到完整的命令结果。

## Agent 循环要批量调用独立工具

请求明确列出多个目标时，Fable 5.1 通常会并行调用工具。编码和电脑操作循环中的后续步骤若只是隐含在任务里，模型可能改为每轮只调用一个工具，增加 Token、往返次数和等待时间。

解决方法是在每轮工具结果之后提醒模型：先判断下一步需要哪些信息，再一次请求所有互不依赖的项目。提醒可以使用带 `clear_at: "next_user_message"` 的 turn-scoped system message，并启用 `mid-conversation-system-clear-at-2026-08-21` Beta 请求头。未使用该 Beta 功能时，可把提醒放在同一条用户消息的 `tool_result` 块之后。

每一轮都追加一份新的提醒，旧消息保持原样。提醒在下一条用户消息出现后会对模型隐藏，不再计算输入 Token，但仍留在历史数组中。

## 对话历史必须只追加、不改写

每个 assistant 回合都要按照 API 返回的原始内容追加到历史记录，thinking 块也要保留。不要在两次请求之间删除旧消息、修改系统提示词、替换工具列表或就地改写早期对话。

对于 2026 年 8 月 31 日及之后创建的新 API 账户，Fable 5.1 的 thinking 块只在生成它的原对话中有效。系统提示词、工具列表或早期消息被修改后，再发送原来的 thinking 块会返回 400；启用 `thinking.block_binding.prefix_mismatch_behavior: "drop_block"` 和 `thinking-binding-controls-2026-08-01` Beta 请求头时，接口可以丢弃不匹配的块。

改写历史也会从改动位置重新计算提示缓存，并让后续 thinking 块失效。需要改变指令或工具时，应使用对话中的系统消息；需要裁剪上下文时，可使用服务端 compaction 或 context editing。客户端自行压缩时，可以用一条摘要消息加新的用户消息建立新对话，不要继续带入旧 thinking 块。

## 格式和引用要通过示例校准

早期模型容易滥用粗体和列表，一些系统提示词因此完全禁止格式。Fable 5.1 更少使用粗体、标题、列表和引号。若回答缺少必要结构，应删除一刀切的禁用规则，改为只在内容复杂、用户明确要求或结构确实有助于理解时使用标题和列表；个人或情绪对话则保持普通段落。

Fable 5.1 在总结检索材料时，更容易复现来源原句却不标记引用。解决方法是在系统提示词里加入一个完整的正确示例，包含用户请求、工具调用、最终回答，以及说明该回答为何正确的 rationale。示例应展示怎样综合多个来源、怎样用间接引语改写，以及怎样标记少量直接引文。

## 明确要求完成任务，同时限制范围

复杂的异步任务中，Fable 5.1 可能只说明下一步准备做什么，或者询问是否执行用户已经授权的步骤。提示词可以明确：授权范围内的可逆操作直接完成；只有破坏性操作或真正改变范围的决定才停下来询问；结束前检查最后一段，如果仍是计划、问题或尚未兑现的承诺，就继续调用工具完成工作。

用户若只是在描述问题或询问判断，交付物就是分析结果，不能擅自实施修复。用户提出的是修改任务时，则要完整交付请求范围，不能悄悄缩小、扩大或替换目标。中途遇到阻塞，也应先完成不依赖缺失信息的部分。

开放式开发任务还要明确限制额外改动。发现既有缺陷、性能问题或任务未提到的行为时，不要顺手修复；除非请求的功能无法在不修复它的情况下工作。测试应与仓库惯例和任务范围相称，临时验证脚本不必转成永久测试文件。

## 小改动优先定点编辑

Fable 5.1 比 Fable 5 更容易为了小改动重写整份文本文件。可以在系统提示词或第一条用户消息中说明：在不影响结果的前提下，尽量减少编辑文件所需的 Token；除非文件很短或大部分内容都要改变，否则优先做局部修改。

这个要求只改变编辑方式，不应削减用户要求的功能或遗漏必要修改。

## 长输出、压缩和搜索需要单独处理

在 `xhigh` 和 `max` effort 下，模型可能先在思考阶段形成很长的草稿，再把它写进最终回答，造成等待时间变长或触及 `max_tokens`。长文、完整代码、大表格等任务可以先使用 `high`；只有评测确认质量提升后，再使用 `xhigh` 或 `max`。确需使用高档位时，应提醒模型把推理空间用于理解输入、验证依赖和确定结构，不要先完整写一遍交付物再重复输出。

客户端生成压缩摘要时，要保留六类信息：遇到的问题及处理方法；尝试或放弃的方案及原因；用户提出和确认的要求、决定与边界；当前完成状态；仍未解决或承诺继续处理的事项；名称、数字、日期、原话和链接等难以重建的细节。用户提供的信息要尽量接近原话，模型自己的解释可以压缩。

`low` effort 下，模型更容易凭记忆回答而不调用搜索或检索工具。可以只提高需要检索的回合的 effort，也可以在系统提示词中要求：遇到不熟悉的名称，或 AI 模型、开发工具等变化很快的实体时，先按用户提供的原名搜索，再结合改写后的查询核验。

## 减少安全误判

Fable 5.1 的安全分类器会以 `stop_reason: "refusal"` 返回拒绝。三类输入更容易出现误判：询问程序能否无错误编译、使用较少见的编程语言，以及工具输出中包含 Base64 数据。

检查代码时，可以把“能否无错误编译”改成“程序是否存在错误”。处理少见语言时，应提供该语言的说明或文档。工具输出中的 Base64 内容可能触发分类器，推荐从模型上下文中移除。

## 主 Agent 不必等待子智能体

支持子智能体的编码系统不应强制主 Agent 启动子任务后立即等待。启动工具应快速返回，子智能体完成后再通过后续用户消息把结果交给主 Agent，同时提供一个需要时主动等待结果的工具。

模型仍可能选择等待，但让主 Agent 在子任务运行时继续处理其他工作，可以减少部分任务的完成时间。

## 复杂视觉任务要提供裁剪和放大工具

处理密集图表等复杂视觉输入时，Fable 5.1 需要反复分析、裁剪和检查局部区域。适合的运行环境应能访问原始图片或视频，并提供 PIL、OpenCV 等基础图像处理库。

如果完整容器的成本过高，单独提供图片裁剪工具也能覆盖大部分需求。模型可以选择一个区域，将其裁剪并放大后重新检查，从而看清图表中的文字、刻度和数据点。
