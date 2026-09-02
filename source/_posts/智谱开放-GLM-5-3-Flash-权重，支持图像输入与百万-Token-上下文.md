---
title: 智谱开放 GLM-5.3-Flash 权重，支持图像输入与百万 Token 上下文
permalink: posts/2026/08/zhipu-glm-53-flash/
tags: [zhipu, glm-5.3, open-source, multimodal, model-release]
date: 2026-08-27 09:32:34
updated: 2026-09-02 14:10:00
categories: 大模型
description: 智谱开放 GLM-5.3-Flash 模型权重，提供 320B 总参数、18B 激活参数、图像输入和 100 万 Token 上下文。本文梳理 MIT 许可证、API 价格、Coding Plan 和本地部署入口，帮助用户判断试用方式与硬件门槛。
cover: https://images.51allai.com/blog/zhipu-glm-53-flash-cover_20260827_093559.png
sources:
  - name: 智谱 AI 开放文档 — GLM-5.3-Flash
    url: https://docs.bigmodel.cn/cn/guide/models/vlm/glm-5.3-flash
---

> 智谱于 2026 年 8 月 26 日发布 GLM-5.3-Flash，并以 MIT 许可证开放模型权重。该模型有 320B 总参数、18B 激活参数，支持图像输入和 100 万 Token 上下文，同时提供 API、Coding Plan 与本地部署入口。
![智谱 GLM-5.3-Flash 开放权重与多模态能力封面](https://images.51allai.com/blog/zhipu-glm-53-flash-cover_20260827_093559.png)

## 320B 参数中每次激活 18B

GLM-5.3-Flash 采用混合专家模型架构，总参数为 320B，生成每个 Token 时激活 18B 参数。Token 是模型读取和生成内容时的基本计量单位；“激活 18B”表示每次计算只调用部分专家参数，不代表本地运行时只需加载 18B 权重。

模型文件以 Safetensors 格式提供，主分支文件页显示体积约 328 GB，权重分为 62 个分片。这个规模超出多数普通个人电脑的直接加载能力。个人用户先用 API 或 Coding Plan 试用，比下载完整权重更省事；自建推理更适合已经具备多卡服务器和模型部署经验的团队。

## 图像输入进入同一套模型

GLM-5.3-Flash 可以在同一个请求中接收文字与图像，并输出文字。开发者可在 `messages[].content[]` 中添加 `image_url` 内容块，传入公开图片地址或 Base64 数据；一次请求也可包含多张图片。

这个输入方式可用于分析界面截图、文档页面、图表和代码运行结果。100 万 Token 上下文则让一次任务容纳更多代码、长文档、图片和历史步骤。模型还支持函数调用、JSON 结构化输出、流式响应和上下文缓存，可接入需要多步操作的开发工具。

## API 限时半价，本地权重采用 MIT 许可证

GLM-5.3-Flash 的 API 模型代码为 `glm-5.3-flash`。标准单价按每 100 万 Token 计算：输入 0.15 美元、缓存命中输入 0.03 美元、输出 0.50 美元。2026 年 9 月 9 日 24:00（UTC+8）前为五折，对应单价是 0.075、0.015 和 0.25 美元。

Coding Plan 也已经接入该模型，可用额度是 GLM-5.3 的 3 倍。需要自建服务的团队可从模型仓库下载权重，通过 Transformers、vLLM、SGLang、KTransformers 或 Docker Model Runner 部署。MIT 许可证允许使用、修改、再分发和商业使用，再分发时需保留原版权与许可声明。

## 怎么选试用入口

只想比较图像理解、长文档处理或代码任务的用户，可以先用 API，按实际输入和输出量计费。需要在编程工具中连续完成多步任务时，Coding Plan 更容易控制套餐额度。

对数据不能离开自有环境、需要修改模型或已经有推理集群的团队，MIT 权重提供了自主部署路径。部署前需把权重存储、运行时显存、KV 缓存和最大上下文需求分开计算，不能只用 18B 激活参数估算机器配置。
