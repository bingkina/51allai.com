---
title: Codex 可为 GPT-5.6 Sol 配置百万 Token 上下文预算
permalink: posts/2026/08/codex-gpt-56-sol-million-context/
tags: [openai, codex, gpt-5-6, product-update]
date: 2026-08-17 19:45:39
categories: 智能体
description: Codex 支持为 GPT-5.6 Sol 设置百万 Token 上下文预算，并可在约 90 万 Token 时自动压缩历史。本文给出 config.toml 与单次 CLI 配置，说明三个参数的作用、顶级配置位置、验证方法，以及模型规格与会话实际可用上限之间的区别，帮助开发者安全设置长任务所需的上下文容量。
cover: https://images.51allai.com/blog/codex-gpt-56-sol-million-context-cover_20260817_194929.png
---

> GPT-5.6 Sol 的模型上下文窗口为 105 万 Token。Codex 用户可以把会话预算设为 100 万 Token，并在约 90 万 Token 时自动压缩历史。配置既能写入 config.toml 作为默认值，也能通过 CLI 参数只作用于一次新会话。参数只声明客户端预算，最终有效上限仍由客户端与服务端共同决定。
![Codex GPT-5.6 Sol 百万 Token 上下文配置封面](https://images.51allai.com/blog/codex-gpt-56-sol-million-context-cover_20260817_194929.png)

## 在 config.toml 中设置默认值

打开 `~/.codex/config.toml`，在第一个 `[section]` 标题之前添加或更新以下三个顶级设置：

```toml
model = "gpt-5.6-sol"
model_context_window = 1000000
model_auto_compact_token_limit = 900000
```

`model` 选择 GPT-5.6 Sol。`model_context_window` 告诉 Codex 当前模型可使用的上下文预算；上下文包括用户消息、项目说明、读取的文件、工具结果以及模型回复。`model_auto_compact_token_limit` 设置自动压缩阈值，当活动上下文接近 90 万 Token 时，Codex 会压缩较早的会话历史，为后续步骤留出余量。

这些键要放在 TOML 文件的顶级位置。TOML 中写在 `[section]` 标题后的键属于该 section；如果把模型配置误放到某个工具或服务的 section 下，Codex 不会把它们当作全局模型设置。

保存文件后，关闭当前会话，重启 Codex 客户端并创建新会话。新会话启动时会读取新的默认配置。

## 只为一次 CLI 会话启用

不想修改默认配置时，可以在启动 Codex CLI 时传入同样的覆盖值：

```bash
codex -m gpt-5.6-sol \
  -c model_context_window=1000000 \
  -c model_auto_compact_token_limit=900000
```

`-m` 是模型参数，`-c` 用于覆盖一项配置，并且可以重复使用。这些覆盖值只作用于本次 CLI 进程，不会写回 `~/.codex/config.toml`。

## 105 万模型窗口与 100 万会话预算不是同一个数字

GPT-5.6 Sol 的模型规格是 1,050,000 Token 上下文窗口，最大输出为 128,000 Token。配置中的 `1000000` 是给 Codex 的会话预算，没有把模型规格改成 100 万，也不会把不支持长上下文的模型扩展到 100 万。

把自动压缩阈值设为 `900000`，相当于在配置预算内预留约 10 万 Token。预留空间可供后续消息、工具返回和压缩过程使用。自动压缩会把较早的内容整理成更短的历史，并不等同于逐字保留此前的全部消息。

最终有效上限还会受到所用 Codex 版本、认证方式、账户权限和服务端模型目录影响。配置项能声明预算，不能绕过服务端限制。处理大型代码库前，应先确认客户端实际加载的模型和配置。

## 检查配置是否生效

在 Codex 会话中运行 `/debug-config`，可以查看配置层级和最终采用的设置。CLI 用户也可以用只读诊断命令检查配置能否正常加载：

```bash
codex doctor --summary \
  -c 'model="gpt-5.6-sol"' \
  -c model_context_window=1000000 \
  -c model_auto_compact_token_limit=900000
```

如果 `config.toml` 还包含其他 profile、项目级 `.codex/config.toml` 或受管理配置，`/debug-config` 会列出它们的加载顺序。检查最终值比只看某一个配置文件更可靠。
