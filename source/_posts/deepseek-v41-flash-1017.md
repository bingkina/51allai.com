---
title: DeepSeek 更新 V4.1 Flash 至 1017，API 调用与价格不变
permalink: posts/2026/10/deepseek-v41-flash-1017/
tags: [deepseek, deepseek-v4, model-release, open-source, coding-agent]
sources:
  - name: DeepSeek API 更新日志（2026 年 10 月 17 日）
    url: https://api-docs.deepseek.com/zh-cn/updates/
    note: 核对网页、App 与 API 同步升级、调用及价格不变、Harness 适配版本
  - name: DeepSeek-V4.1-Flash-1017 模型卡
    url: https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017
    note: 核对版本关系、图文输入、MIT 许可与本地推理说明
  - name: DeepSeek API 模型与价格
    url: https://api-docs.deepseek.com/zh-cn/quick_start/pricing/
    note: 核对模型别名、上下文、最大输出、图像理解与峰谷单价
  - name: DeepSeek Harness v0.2.1-rc.1 发布记录
    url: https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.1
    note: 核对候选版本及极简模式图片读取、上下文压缩功能
date: 2026-10-17 16:37:50
categories:
  - 大模型
description: DeepSeek V4.1 Flash 更新至 1017，网页、App 与 API 同步切换，调用方式与价格保持不变。本文梳理 deepseek-flash 接入、峰谷计费、MIT 开源下载，以及 Harness 0.2.1-rc.1 及以上版本的适配要求。
cover: https://images.51allai.com/blog/deepseek-v41-flash-1017-cover_20261017_164217.png
---
> DeepSeek 于 10 月 17 日将 V4.1 Flash 更新至 1017，网页、App 与 API 已同步升级。开发者继续使用 `deepseek-flash`，调用方式与价格不变；新版本已采用 MIT 许可开源，Harness 用户可升级至 0.2.1-rc.1 及以上版本配合使用。
![DeepSeek V4.1 Flash 1017 更新与 API 接入封面](https://images.51allai.com/blog/deepseek-v41-flash-1017-cover_20261017_164217.png)

## 网页、App 和 API 已切换到 1017

DeepSeek-V4.1-Flash-1017 是 V4.1 Flash 的一次小版本更新，可以处理文本和图片并生成文本回答。直接使用 [DeepSeek 网页端](https://chat.deepseek.com/)或 App 的用户，已由服务端切换到新版本。

这次更新延续了 [V4.1 Flash 首发时的多模态能力](/posts/2026/09/deepseek-v41-flash-open-source-multimodal/)。API 当前提供 1M Token 上下文和最大 384K Token 输出，分别约为 100 万和 38.4 万 Token。Token 是模型计量文本长度的单位；上下文决定一次请求能容纳多少内容，最大输出则限制单次生成的长度。

## API 继续使用 `deepseek-flash`

1017 是模型版本号，程序请求中的模型名仍是 `deepseek-flash`。已经使用该名称的项目可以沿用现有调用方式。OpenAI 兼容接口的基础地址为 `https://api.deepseek.com`，Anthropic 兼容接口为 `https://api.deepseek.com/anthropic`。

已有 API Key 的开发者，可以通过 Chat Completions 接口发送一次文本请求：

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
    "model": "deepseek-flash",
    "messages": [{"role": "user", "content": "请解释这段代码的作用。"}],
    "stream": false
  }'
```

旧名称 `deepseek-v4-flash` 和 `deepseek-v4-flash-vision-exp` 仍可调用，但对应的旧模型已经下线。这两个名称的请求也由 1017 提供服务，按 Flash 价格计费。新项目直接采用 `deepseek-flash` 即可。

## Token 单价不变，仍按峰谷时段计费

此次模型更新保持 API 调用价格不变。截至 10 月 17 日，Flash 的人民币价格如下，每项均以每百万 Token 为单位：

| 计费项目 | 空闲时段 | 高峰时段 |
| --- | ---: | ---: |
| 输入，缓存命中 | 0.02 元 | 0.04 元 |
| 输入，缓存未命中 | 1 元 | 2 元 |
| 输出 | 4 元 | 8 元 |

缓存命中指输入内容复用了服务端已保存的计算结果，因此这部分输入单价更低。北京时间周一至周五的 9:00—12:00、14:00—18:00 为高峰时段，中国法定节假日除外；其余时间以及周末、法定节假日全天均按空闲价计费。

例如，一次任务累计使用 100 万未命中缓存的输入 Token，并生成 10 万输出 Token，按上表计算，空闲时段的模型调用费为 **1.4 元**，高峰时段为 **2.8 元**。这是按固定用量计算的模型费用，Search、Fetch 等工具服务另有计费规则。实际账单取决于输入、输出和工具调用量，可以在 [API 价目表](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)中核对。

## Harness 用户同步升级客户端

配合 1017 使用的 DeepSeek Harness 版本为 **0.2.1-rc.1 及以上**。Harness 是让模型读取文件、执行命令并调用工具完成任务的工作环境；模型由服务端更新，客户端也需要使用适配版本。

[0.2.1-rc.1 发布页](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-rc.1)将其标为候选版本。该版本的极简模式支持读取图片和自动压缩长对话，Web 与桌面端可以通过 `/compact` 手动压缩上下文。初次接触的用户，可以先了解 [Harness 官方桌面版的安装方式](/posts/2026/09/deepseek-harness-official-desktop/)，再选择当前适配版本。

## 1017 已采用 MIT 许可开源

DeepSeek-V4.1-Flash-1017 已在 [Hugging Face 模型仓库](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)提供下载，仓库和模型文件采用 MIT 许可。需要自行部署的开发者，可以从仓库内的 `inference` 目录查看模型转换和本地推理说明。

自部署还需要处理模型的对话编码格式。这个版本没有提供 Jinja 格式的聊天模板，仓库的 `encoding` 目录提供 Python 参考实现与测试样例，覆盖多轮对话、工具调用、思考模式和图片内容。只通过网页、App 或托管 API 使用的用户，由服务端处理这些步骤。
