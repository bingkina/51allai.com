---
title: DeepSeek 开放 V4.1 Flash 中间版本内测，单账号限流 20 并发
permalink: posts/2026/09/deepseek-v41-flash-beta/
tags:
  - deepseek
  - deepseek-v4
  - product-update
  - model-release
sources:
  - name: DeepSeek V4.1 Flash 中间版本内测通知截图与调用信息
    url: https://www.ithome.com/0/999/795.htm
    note: 核对内测日期、临时模型名、计费方式与并发限制
  - name: DeepSeek API 首次调用文档
    url: https://api-docs.deepseek.com/zh-cn/
    note: 核对 API 基础地址与常规模型目录
  - name: DeepSeek API 模型与价格
    url: https://api-docs.deepseek.com/zh-cn/quick_start/pricing/
    note: 核对 V4 Flash 峰谷价格与常规并发上限
  - name: DeepSeek API 更新日志
    url: https://api-docs.deepseek.com/updates/
    note: 核对 V4 Flash 0731 正式版 API 状态
date: 2026-09-08 17:07:17
categories:
  - 大模型
description: DeepSeek 开放 V4.1 Flash 中间版本内测，临时模型名为 deepseek-v4.1-flash-expires-on-0910，价格沿用 V4 Flash，单账号限流 20 并发。本文给出调用配置、峰谷单价和使用边界。
cover: https://images.51allai.com/blog/deepseek-v41-flash-beta-cover_20260908_171235.png
---
> DeepSeek 于 9 月 8 日开放 V4.1 Flash 中间版本内测。内测用户无需更换 API 基础地址，只需使用临时模型名 `deepseek-v4.1-flash-expires-on-0910`；价格沿用 V4 Flash，单账号限流 20 并发。
![DeepSeek V4.1 Flash 中间版本内测与 20 并发限制](https://images.51allai.com/blog/deepseek-v41-flash-beta-cover_20260908_171235.png)

## 内测使用临时模型名

这次内测没有替换现有的 `deepseek-v4-flash`。收到内测通知的 API 用户需要保持 `https://api.deepseek.com` 不变，把请求中的模型名改为：

```text
deepseek-v4.1-flash-expires-on-0910
```

使用 OpenAI Python SDK 时，只需要替换 `model` 参数：

```python
from openai import OpenAI

client = OpenAI(
    api_key="<your DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4.1-flash-expires-on-0910",
    messages=[{"role": "user", "content": "请解释这段代码的作用。"}],
)

print(response.choices[0].message.content)
```

临时模型名包含 `expires-on-0910`。接入时应把它放在独立配置项中，不要直接替换生产环境的长期默认模型；内测入口变化后，只需改配置，不必重新修改业务代码。

## 价格沿用 V4 Flash

V4.1 Flash 中间版本按 V4 Flash 现行价格计费。每 100 万 Token 的人民币单价如下：

| 计费项目 | 空闲时段 | 高峰时段 |
| --- | ---: | ---: |
| 缓存命中输入 | 0.05 元 | 0.10 元 |
| 缓存未命中输入 | 1.5 元 | 3.0 元 |
| 输出 | 4.5 元 | 9.0 元 |

Token 是模型处理文字时使用的计量单位。账单需要分别统计缓存命中输入、未命中输入和输出，不能只按请求次数估算。

## 20 并发限制决定了测试范围

中间版本对每个账号限制 20 个并发请求；常规 V4 Flash 的官方并发上限为 2500。这个差距使中间版本更适合验证提示词、接口兼容性和小规模任务，不适合直接承接现有生产流量或高并发压测。

已有项目不会自动切换到本次内测。常规模型名 `deepseek-v4-flash` 仍对应 [DeepSeek-V4-Flash-0731 正式版 API](/posts/2026/07/deepseek-v4-flash-0731-codex/)；只有主动改用临时模型名的请求才会进入 V4.1 Flash 中间版本。

## 测试时保留回退路径

接入时可以把常规模型名和临时模型名分别写入配置，并保留一键回退。先用固定测试集检查返回格式、工具调用和业务输出，再逐步增加并发；需要长期运行的服务继续把 `deepseek-v4-flash` 作为稳定入口。
