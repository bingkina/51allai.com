---
title: 百度发布文心 5.5 Flash Preview，支持百万上下文，API 限时五折
permalink: posts/2026/11/baidu-ernie-55-flash-preview/
tags: [baidu, ernie, model-release, pricing]
sources:
  - name: ERNIE 5.5 Flash Preview 发布
    url: https://ernie.baidu.com/zh/release/ernie-5-5-flash-preview/
    note: 发布日期、Base 与 Preview 的关系、参数规模、纯文本模型与工具协作范围
  - name: 百度千帆模型列表
    url: https://cloud.baidu.com/doc/qianfan/s/rmh4stp0j
    note: 模型标识、百万上下文、输出口径与默认调用限额
  - name: 百度千帆模型服务计费
    url: https://cloud.baidu.com/doc/qianfan/s/wmh4sv6ya
    note: 高峰与空闲时段、原价与五折活动价、缓存命中价格
  - name: 百度千帆快速开始——模型服务调用
    url: https://cloud.baidu.com/doc/qianfan/s/rmh4stn9m
    note: API Key、请求地址与 OpenAI SDK 兼容方式
date: 2026-11-11 16:52:28
categories: 大模型
description: 百度于 11 月 11 日发布文心 5.5 Flash Preview，支持百万 Token 上下文，API 已上线千帆。本文梳理纯文本与工具协作的能力边界、接入方式、峰谷时段和五折活动价，并用一笔调用示例说明实际费用，帮助开发者评估长文档与代码任务的接入成本。
cover: https://images.51allai.com/blog/baidu-ernie-55-flash-preview-cover_20261111_170554.png
---

> 百度于 11 月 11 日发布文心 5.5 Flash Preview，支持最长 100 万 Token 上下文，开发者可通过千帆 API 调用。API 限时五折，折后每百万 Token 高峰输入 1 元、输出 4 元，空闲时段分别为 0.5 元、2 元。
![百度文心 5.5 Flash Preview 百万上下文与 API 五折主题图](https://images.51allai.com/blog/baidu-ernie-55-flash-preview-cover_20261111_170554.png)

## 从 Base 模型到可调用的 Preview 版本

文心 5.5 Flash Preview（ERNIE 5.5 Flash Preview）是百度的新基础模型，也是此前文心 5.5 Flash Base 的首个后训练版本。后训练是在基础训练之后，继续训练模型按指令回答问题、使用工具和完成任务。

这个版本总参数量为 2800 亿，每处理一个 Token 激活其中 140 亿参数。Token 是模型处理文字的计量单位，不等于汉字数。Preview 属于后训练过程中的中间版本，后续仍会继续优化。

它是纯文本模型。编程、3D 建模和视频创作通过编写代码、调用外部工具与编排素材完成。例如，3D 工作流可以连接 Blender 或 CAD 软件，由代码控制建模；视频工作流则可以结合图片、视频生成工具及剪辑程序。接入这些场景时，需要同时准备工具运行环境和相应素材。

## 百万上下文适合放入更长的材料

文心 5.5 Flash Preview 支持 1M，也就是约 100 万 Token 的上下文。上下文指一次任务中模型能够处理的内容范围，长文档、代码和多轮对话都需要占用容量。

对开发者而言，这提供了把较长资料放在同一请求中处理的空间，例如围绕一组项目文件提问，或对多份材料做交叉整理。准备输入时仍要计算 Token 用量，并为生成内容留出空间。

千帆将它列入文本生成和深度思考模型列表。深度思考模式的最大输出长度包含思考过程和最终回答，设置输出预算时需要同时考虑两部分。

## API 五折后，高峰输入每百万 Token 1 元

API 按高峰和空闲时段分别计费：高峰为 8:00–22:00，空闲为 22:00–次日 8:00。以下均为人民币／百万 Token，活动价已经打过五折。

| 计费项目 | 高峰原价 | 高峰活动价 | 空闲原价 | 空闲活动价 |
| --- | ---: | ---: | ---: | ---: |
| 输入，未命中缓存 | 2 元 | 1 元 | 1 元 | 0.5 元 |
| 输入，命中缓存 | 0.2 元 | 0.1 元 | 0.1 元 | 0.05 元 |
| 输出 | 8 元 | 4 元 | 4 元 | 2 元 |

例如，一次请求使用 10 万个未命中缓存的输入 Token，产生 1 万个可计费输出 Token，按活动价计算，高峰费用为 **0.14 元**，空闲时段为 **0.07 元**。这是模型 Token 费用，外部工具和运行环境的费用另算。

缓存命中指平台复用已经处理过的输入片段，命中部分按更低的输入单价计算。预算应把未命中输入、命中输入和输出分别统计。

对可以延后执行的资料整理、离线评测等任务，空闲单价是高峰活动价的一半。站内此前整理过 [DeepSeek API 的周末与峰谷计费规则](/posts/2026/08/deepseek-api-weekend-off-peak-pricing/)，接入多个平台时应分别设置任务时段。

## 在千帆选择模型，沿用 OpenAI 兼容接口

开发者可从[千帆模型详情页](https://console.bce.baidu.com/qianfan/modelcenter/model/buildIn/detail/am-abe18d298d70)进入。通过 API 接入时，先在千帆控制台创建具有相应服务权限的 API Key，再配置以下参数：

| 配置项 | 值 |
| --- | --- |
| 模型标识 `model` | `ernie-5.5-flash-preview` |
| OpenAI SDK 的 `base_url` | `https://qianfan.baidubce.com/v2` |
| HTTP 对话请求地址 | `https://qianfan.baidubce.com/v2/chat/completions` |
| 身份验证 | 使用千帆 API Key，HTTP 请求头为 `Authorization: Bearer <API Key>` |

已有 OpenAI SDK 项目的开发者，可以调整密钥、服务地址和模型名称进行接入。千帆列出的默认限额为每分钟 60 次请求、每分钟 100 万 Token；前者限制请求次数，后者限制处理量，批量提交长材料时两项都要考虑。

试用时可以先选一份熟悉的文档或一个小型代码任务，检查结果是否满足要求，再记录实际输入、输出用量和工具开销，估算扩大使用后的成本。
