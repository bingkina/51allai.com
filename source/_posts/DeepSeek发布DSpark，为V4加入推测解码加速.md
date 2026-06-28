---
title: DeepSeek发布DSpark，为V4加入推测解码加速
permalink: posts/2026/06/deepseek-dspark-speculative-decoding/
tags: [deepseek, deepseek-v4, open-source, speculative-decoding]
date: 2026-06-28 16:18:29
categories: [大模型]
description: DeepSeek发布DSpark，为DeepSeek-V4 Pro和Flash加入推测解码加速模块。它更像推理链路更新，不是一次新基座模型发布。
cover: https://opengraph.githubassets.com/1/deepseek-ai/DeepSpec
---

> DeepSeek 把 DSpark 放到了 DeepSeek-V4 的发布链路里：它面向 Pro 和 Flash 两个检查点，核心目标是用推测解码压低生成延迟。这不是新基座模型发布，更接近一次推理系统侧的加速更新。
![DeepSeek DSpark 推测解码项目封面](https://opengraph.githubassets.com/1/deepseek-ai/DeepSpec)

## DSpark改的是解码，不是模型定位

DSpark 的位置需要先说清楚：它不是 DeepSeek-V4 之外的新一代大模型，而是给 DeepSeek-V4 Pro 和 DeepSeek-V4 Flash 配套的推测解码模块。

推测解码的基本思路很直接。先让一个更轻的草稿模块连续猜出若干 token，再由主模型批量校验。猜对的 token 可以一次性通过，猜错就回退到主模型正常生成。理想情况下，输出质量不因这个流程改变，用户感知到的是更短的首 token 之后延迟和更高的吞吐。

这类技术真正难的地方不在概念，而在接受率、训练成本和 serving 集成。草稿模块猜得太保守，加速有限；猜得太激进，回退次数增加，吞吐收益会被抵消。DSpark 的价值点就在这里：DeepSeek 把训练和评测代码一并放出，让开发者可以围绕 DeepSeek-V4 系列做推测解码实验，而不是只拿到一个不可拆开的线上能力。

## DeepSpec把训练和评测链路一起放出

DeepSpec 仓库给出的不只是模型权重入口，还包括训练 DSpark、评测推测解码效果的代码。项目目标明确指向 DeepSeek-V4 Pro 和 DeepSeek-V4 Flash，并把 speculative decoding 作为主线。

这对部署方有两个现实意义。

第一，推理加速从“模型参数更小”转向“生成链路更细”。DeepSeek-V4 Flash 本身已经是偏速度和成本的版本，DSpark 继续在解码阶段挖延迟空间。对高并发 API、代码补全、Agent 循环调用这类场景，几十毫秒到数百毫秒的生成差异会直接影响产品手感。

第二，开源代码降低了复现实验门槛。开发者可以看训练脚本、评测方式和 serving 适配，而不是只能引用一个总延迟数字。推测解码的收益高度依赖硬件、batch size、上下文长度、采样参数和任务类型，公开工具链比单个 benchmark 更有参考价值。