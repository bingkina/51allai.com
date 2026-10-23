---
title: 蚂蚁数科上线 LingDT-Decision-1.0，支持原生多选与 DAG 决策编排
permalink: posts/2026/10/lingdt-decision-system-one/
tags: [ant-digital, lingdt, model-release, ai-agents]
sources:
  - name: DTMaaS LingDT-Decision-1.0 模型详情
    url: https://maas.antdigital.com/models/modelservice-1792325631780001741
    note: 模型定位、决策模式、请求规模、System One 协议与当前价格
  - name: DTMaaS LingDT-Decision-1.0 公开模型数据与调用示例
    url: https://maas.antdigital.com/api/v1/model-service/public/get/modelservice-1792325631780001741
    note: API 地址、请求字段、DAG 依赖声明、分层返回结构及协议兼容性
date: 2026-10-23 10:53:24
categories:
  - 大模型
description: 蚂蚁数科上线 LingDT-Decision-1.0，原生支持多选，并通过 DAG 编排有依赖关系的决策问题。本文解释它如何处理工单分类与任务分流，梳理 System One API 的请求字段、问题数量限制和当前体验入口。
cover: https://images.51allai.com/blog/lingdt-decision-system-one-cover_20261023_105759.png
---

> 蚂蚁数科自研决策模型 LingDT-Decision-1.0 已上线 DTMaaS，支持单选、判断、打分和原生多选，也能按问题之间的依赖关系组织多步决策。开发者可通过 System One API 提交业务信息、候选选项和依赖规则，单次最多提交 32 个问题。
![蚂蚁数科 LingDT-Decision-1.0 原生多选与 DAG 决策编排示意](https://images.51allai.com/blog/lingdt-decision-system-one-cover_20261023_105759.png)

## LingDT-Decision 用给定选项回答业务问题

[LingDT-Decision-1.0](https://maas.antdigital.com/models/modelservice-1792325631780001741) 是蚂蚁数科研发的 System One 决策模型，面向软件系统中的判断任务：一张工单交给哪个部门、一段请求包含哪些意图、某项条件是否满足，或一条记录应该评为哪个等级。

使用时，开发者先提供业务信息，再定义问题和候选答案。模型在这些选项中作出判断，业务程序可以读取返回结果，决定后续流程。这里的 System One 是其采用的决策接口协议，调用入口为 `/v1/systemone`。

它支持的任务可以分为四类：

| 决策方式 | 适合处理的问题 |
| --- | --- |
| 单选 | 从账单、物流、账号等部门中选择一个处理方 |
| 判断 | 判断输入是否满足给定条件 |
| 打分 | 按预设等级评估严重程度等属性 |
| 多选 | 同时识别多个标签、用户意图或所需工具 |

多选适用于一段输入同时包含多个需求的情况。例如，用户要求处理退款和关闭续费，业务系统需要保留两个意图，再分别交给对应流程。候选项和判定标准仍由开发者定义。

## DAG 把多个判断按依赖关系连接起来

有些问题可以直接回答，有些问题需要先拿到其他判断的结果。DAG 是“有向无环图”，用有方向、不会循环回到原点的连线，表示任务之间的先后依赖。

LingDT-Decision 的请求可以通过 `options.dag.edges` 声明这种关系。以重复扣款、退款超时的工单为例，可以先判断处理部门和严重程度，再综合这两个答案判断紧急度，最后确定处理队列。

这条流程对应三个层次：

1. 判断处理部门、评估严重程度，两者没有前置依赖。
2. 结合部门和严重程度，判断是否需要优先处理。
3. 结合紧急度和部门，选择快速处理、人工复核或常规跟进队列。

返回数据中的 `answers` 汇总所有问题的答案，`layers` 记录每层的问题、注入的上游答案、子请求、延迟和调用次数；`usage` 汇总各层的 Token 用量。开发者可以沿着这些记录检查某一步判断使用了哪些前置结果。

这类编排输出的是决策结果。实际退款、修改账户或转交工单，需要业务系统读取结果后调用对应工具。

## 通过 System One API 接入

开发者可从 [DTMaaS 模型广场](https://maas.antdigital.com/models) 进入模型详情，查看调用示例。接口使用 Bearer API Key 鉴权，请求地址是：

```text
POST https://maas-api.antdigital.com/v1/systemone
```

请求由四部分组成：`model` 指定模型，`state` 放入待判断的业务信息，`questions` 定义问题及判定标准，`options.dag` 描述依赖关系。下面是将工单分类与队列选择连接起来的精简请求体示例：

```json
{
  "model": "lingdt-decision-1.0",
  "state": {
    "situation": "订单被重复扣款，退款超过承诺时限仍未到账。"
  },
  "questions": {
    "department": {
      "type": "choice",
      "instructions": "应该由哪个部门处理该工单？",
      "criteria": {
        "billing": "账单、扣款、退款相关问题",
        "shipping": "物流与配送问题",
        "other": "其他问题"
      }
    },
    "queue": {
      "type": "choice",
      "instructions": "结合 department 的结果选择处理队列。",
      "criteria": {
        "billing_review": "账单相关问题交账单复核队列",
        "general": "其他部门的问题交常规队列"
      }
    }
  },
  "options": {
    "dag": {
      "edges": {
        "queue": { "depends": ["department"] }
      }
    }
  }
}
```

将请求体保存为 `request.json`，并在本地设置 `API_KEY` 环境变量后，可按以下形式调用：

```bash
curl 'https://maas-api.antdigital.com/v1/systemone' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $API_KEY" \
  --data-binary @request.json
```

`edges` 的键是下游问题 ID，`depends` 列出它依赖的上游问题 ID；没有出现在 `edges` 中的问题视为无依赖。上例只声明了 `queue` 依赖 `department`，便于先验证两步流程。

## 适合有明确候选项的分类与分流任务

模型支持单次请求最多 32 个问题，最多 255 个选项。模型条目标明兼容 System One 协议，OpenAI Chat Completions 和 Responses 协议标记为不兼容，接入时应使用对应的决策请求结构。

截至 2026 年 10 月 23 日，模型详情中的输入、输出单价均显示为每百万 Token 0 元。体验和接入入口均在 DTMaaS，使用时可直接查看模型详情中的当期价格。

对客服系统、业务流程和智能体开发者，适合先尝试的任务是候选范围明确的分类、多标签识别和工具选择。可以从一段业务输入、少量候选项开始，检查单步答案，再加入上下游依赖，核对 `layers` 中的执行顺序与传入信息。
