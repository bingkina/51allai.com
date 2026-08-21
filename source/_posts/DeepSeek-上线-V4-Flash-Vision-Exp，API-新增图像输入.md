---
title: DeepSeek 上线 V4-Flash-Vision-Exp，API 新增图像输入
permalink: posts/2026/08/deepseek-v4-flash-vision-exp/
tags:
  - deepseek
  - deepseek-v4
  - model-release
  - multimodal
date: 2026-08-21 22:32:36
categories:
  - 大模型
description: DeepSeek-V4-Flash-Vision-Exp 已上线 API，支持图片与文本混合输入，价格与 V4 Flash 相同。本文梳理模型调用方式、三种图片传入方法、单图 384 Token 计费上限、文件格式与请求限制，帮助开发者快速评估图像理解、截图识别和图表分析场景的接入成本。
cover: https://images.51allai.com/blog/deepseek-v4-flash-vision-exp-cover-5x2_20260821_223449.png
---
> DeepSeek-V4-Flash-Vision-Exp 已上线 DeepSeek API。开发者把模型名设为 `deepseek-v4-flash-vision-exp`，即可在请求中同时发送文字与图片；图片按输入 Token 计费，单张最多折算 384 Token，价格与 V4 Flash 相同。
![DeepSeek V4 Flash Vision Exp 图像输入 API 封面](https://images.51allai.com/blog/deepseek-v4-flash-vision-exp-cover-5x2_20260821_223449.png)

## 实验模型把图像输入接入 V4 Flash

DeepSeek-V4-Flash-Vision-Exp 是面向 API 的实验性视觉理解模型。它可以接收图片和文字，用于描述图片、读取截图中的文字、分析图表等任务。调用地址仍为 `https://api.deepseek.com`，模型参数需要写成 `deepseek-v4-flash-vision-exp`。

模型支持 100 万 Token 上下文和 38.4 万 Token 最大输出，同时提供思考与非思考模式。JSON 输出、工具调用、Responses API 和 Anthropic API 均可使用；FIM 补全不在支持范围内。FIM 是根据光标前后内容补写中间文本或代码的接口能力。

对于已经通过 OpenAI 兼容接口调用 DeepSeek 的项目，这次接入不需要更换基础地址。下面的 Chat Completions 请求通过公开图片 URL 传入一张图片：

```python
from openai import OpenAI

client = OpenAI(
    api_key="<your DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash-vision-exp",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "请描述这张图片。"},
            {
                "type": "image_url",
                "image_url": {"url": "https://example.com/image.jpg"},
            },
        ],
    }],
)

print(response.choices[0].message.content)
```

## 图片可以通过三种方式传入

本地图片可以转成 Base64 后直接放进请求，公开图片可以使用 HTTP 或 HTTPS 地址，也可以先上传到 Files API，再通过 `file_id` 引用。重复分析同一张图片时，Files API 能避免每次请求都重新传输完整文件。

支持的格式包括 JPEG、PNG、GIF 和 WebP。服务会根据文件实际内容判断格式，不依赖文件扩展名或请求中声明的 MIME 类型。通过 Base64 或外部 URL 传入时，单张图片上限为 32 MiB；使用 Files API 的 `file_id` 时，单张上限为 64 MiB。

图片只能放在 `user` 消息中。把图片放进 `system` 或 `assistant` 消息会返回 400 错误，其他不支持视觉输入的 DeepSeek 模型也会拒绝图片请求。

## 单张图片最多计入 384 Token

图片会先按尺寸缩放，再转换成输入 Token。较大的图片会保持宽高比缩小到总像素量约等于 800×800，因此单张图片最多计入 384 Token。一个请求包含多张图片时，每张图分别计算，没有额外的多图合并计费公式。

计费单价与 V4 Flash 相同。按每 100 万 Token 计算，非高峰期缓存命中输入为 0.007 美元、未命中输入为 0.22 美元、输出为 0.66 美元；高峰期分别为 0.014 美元、0.44 美元和 1.32 美元。图片 Token 与文字输入 Token 合并计费。

对不需要细节的图片，可以把 `detail` 设为 `low`。服务会先把图片缩放到 512×512，以减少处理时间和输入成本；需要读取小字或观察细节时，可使用保留原图的 `original` 模式。

## 请求规模取决于传图方式

Base64 图片会占用 48 MiB 的请求体限额。外部图片 URL 最长为 8192 个字符，下载必须在 60 秒内完成。单次请求最多可以包含 600 张图片；不含 Files API 图片时，图片总大小上限为 64 MiB，包含 `file_id` 图片后总上限可以达到 200 MiB。

单张图片每边最长为 8192 像素。当一次请求包含 15 张或更多图片时，每边上限降至 4096 像素。批量处理截图、扫描件或图表时，需要在客户端先检查数量、尺寸和总文件大小，避免请求在模型处理前被接口拒绝。
