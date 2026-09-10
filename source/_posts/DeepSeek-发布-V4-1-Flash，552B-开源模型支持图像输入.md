---
title: DeepSeek 发布 V4.1 Flash，552B 开源模型支持图像输入
permalink: posts/2026/09/deepseek-v41-flash-open-source-multimodal/
tags:
  - deepseek
  - deepseek-v4
  - open-source
  - model-release
  - multimodal
sources:
  - name: DeepSeek V4.1 Flash 正式发布页
    url: https://www.deepseek.com/news/deepseek-v4-1-flash/
    note: 核对发布日期、模型结构、API 迁移与开源信息
  - name: DeepSeek-V4.1-Flash 模型卡与开源仓库
    url: https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash
    note: 核对 552B MoE、1M 上下文、多模态架构与 MIT 许可
  - name: DeepSeek API 模型与价格
    url: https://api-docs.deepseek.com/zh-cn/quick_start/pricing/
    note: 核对 deepseek-flash 模型名、上下文、最大输出、并发限制与实时价格
  - name: DeepSeek API 图像理解指南
    url: https://api-docs.deepseek.com/zh-cn/guides/vision/
    note: 核对支持图片格式、三种传图方式与请求限制
  - name: DeepSeek API 更新日志
    url: https://api-docs.deepseek.com/updates/
    note: 核对 2026 年 9 月 10 日上线记录与旧模型路由规则
date: 2026-09-10 20:32:02
categories:
  - 大模型
description: DeepSeek 正式发布 V4.1 Flash。552B MoE 模型已开源，采用 MIT 许可并原生处理文本和图像；API 统一使用 deepseek-flash，支持 1M 上下文和最大 384K 输出。
cover: https://images.51allai.com/blog/deepseek-v41-flash-open-source-multimodal-cover_20260910_204304.png
---
> DeepSeek 于 9 月 10 日正式发布 V4.1 Flash。新模型共有 552B 主干参数，可原生处理文本与图像，已以 MIT 许可开源；API 模型名更换为 `deepseek-flash`，旧 Flash 模型名暂时保留路由兼容。
![DeepSeek V4.1 Flash 552B 开源模型与多模态 API](https://images.51allai.com/blog/deepseek-v41-flash-open-source-multimodal-cover_20260910_204304.png)

## V4.1 Flash 正式进入 API 与开源仓库

DeepSeek V4.1 Flash 已从两天的中间版本测试转为正式版。临时模型名 `deepseek-v4.1-flash-expires-on-0910` 不再是正式入口，开发者应把 `model` 改为 `deepseek-flash`，API 基础地址仍是 `https://api.deepseek.com`。

模型文件、推理代码、提示词编码实现和评测复现说明已放入 [DeepSeek-V4.1-Flash 开源仓库](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)。仓库和模型权重均使用 MIT 许可，文件可直接下载。

## 552B 参数不会在每个阶段全部激活

V4.1 Flash 是一个拥有 552B 主干参数的混合专家模型（MoE）。MoE 会在每次计算时只调用部分参数：读取输入时每个 Token 激活 8B 参数，生成输出时激活 16B。

模型采用 Causal Encoder-Decoder（因果编码器—解码器）结构，由 20 层因果编码器和 20 层解码器组成。它把全局 KV Cache 压缩到每个 Token 890 字节，约为上一代 V4 Flash 的四分之一。KV Cache 是模型为上下文保留的中间数据，这个规格直接决定长对话和智能体任务需要保留多少高速存储。

## `deepseek-flash` 同时接收文本和图像

正式版把图像理解并入主 Flash API。`deepseek-flash` 可以接收 JPEG、PNG、GIF 和 WebP 图片，用于描述图片、读取截图文字或分析图表。图片可以用 Base64 内联、公开 URL 或 Files API 的 `file_id` 三种方式传入。

API 规格同时保留 1M Token 上下文、最大 384K Token 输出和单账号 2500 并发。它支持 JSON Output、Tool Calls、Responses API 和 Anthropic API；使用 OpenAI 兼容的 Chat Completions 接口时，图片只能放在 `user` 消息中。

## 旧 Flash 模型名只剩兼容路由

V4 Flash 与 V4 Flash Vision Exp 已下线。为了避免现有应用立即失效，`deepseek-v4-flash` 和 `deepseek-v4-flash-vision-exp` 两个旧模型名会暂时路由到 V4.1 Flash，账单按 Flash 价格计算。新接入应直接使用 `deepseek-flash`，现有项目也可以把模型名放进配置项，避免继续依赖过渡期别名。

新价格已于 9 月 10 日 12:00 生效：空闲时段每百万 Token 的缓存命中输入、缓存未命中输入和输出分别为 0.02 元、1 元和 4 元，高峰时段价格翻倍。完整的新旧价差和 V4 Pro 过渡路由已在 [V4.1 Flash 发布与 API 降价预告](/posts/2026/09/deepseek-v41-flash-release-plan/) 中单独梳理。
