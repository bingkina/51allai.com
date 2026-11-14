---
title: OpenAI 更新使用政策，模型中转服务须事先审批
permalink: posts/2026/11/openai-usage-policy-model-access/
tags: [openai, chatgpt, security, product-update]
sources:
  - name: OpenAI — Usage policies
    url: https://openai.com/policies/usage-policies/
    note: 10 月 21 日更新记录、11 月 20 日生效日期、模型访问中介审批、训练用途限制与应用集成边界
  - name: OpenAI — We're updating our Usage Policies
    url: https://help.openai.com/en/articles/12092907-were-updating-our-usage-policies
    note: 交叉核对生效日期、更新范围、旧版本及现有协议的适用安排
  - name: OpenAI — Terms of Use
    url: https://openai.com/policies/terms-of-use/
    note: 2026 年 1 月 1 日版本已有账号共享、安全措施与竞争模型限制
  - name: ChatGPT 支持的国家和地区
    url: https://help.openai.com/en/articles/7947663-chatgpt-supported-countries
    note: 网页端和移动端的地区名单，以及不支持地区的访问后果
  - name: OpenAI API 支持的国家和地区
    url: https://help.openai.com/en/articles/5347006-openai-api-supported-countries-and-territories
    note: API 地区名单及名单外地区不受支持的规则
  - name: ChatGPT 和 API 在不支持地区的服务与付款限制
    url: https://help.openai.com/en/articles/9131992-chatgpt-and-api-services-in-unsupported-countries-and-territories
    note: 使用地、提供访问及不支持地区付款方式的限制
  - name: OpenAI — Why was my credit card declined?
    url: https://help.openai.com/en/articles/7232916-why-was-my-credit-card-declined
    note: 付款卡须由受支持地区的银行发行
  - name: OpenAI 账号共享政策
    url: https://help.openai.com/en/articles/10471989-openai-account-sharing-policy
    note: 个人账号使用范围与本人多设备登录的区别
  - name: OpenAI 账号警告、安全停用与关闭说明
    url: https://help.openai.com/en/articles/10562188-openai-account-warnings-safety-suspensions-and-closures
    note: 警告、临时停用、账号关闭、违规共享密钥及复核渠道
date: 2026-11-14 21:47:34
categories: 行业观察
description: OpenAI 新版使用政策将于 11 月 20 日生效，要求提供模型直接访问的中转服务事先获批，并细化替代模型训练限制。本文说明普通应用集成与中转服务的区别，以及 ChatGPT 和 API 的地区、付款与账号共享规则。
cover: 待补图
---

> OpenAI 新版《使用政策》将于 2026 年 11 月 20 日生效，要求向第三方提供模型直接访问的中转服务事先获批，并细化替代模型训练材料与反馈的使用限制。普通应用接入模型功能，有不同的审批适用条件；个人用户还需核对现行的地区、付款与账号共享规则。
![OpenAI 使用政策更新与模型中转服务事先审批示意](待补图)

## 11 月 20 日起，提供模型直接访问须事先获批

OpenAI 于 10 月 21 日更新[《使用政策》](https://openai.com/policies/usage-policies/)，新版本将于 11 月 20 日生效。在此之前，旧版本继续适用；现有协议及其他适用条款仍然有效。

新版本要求：运营模型访问中介平台，或通过其他服务让第三方直接访问 OpenAI 模型，需要事先获得 OpenAI 审核与批准。这里的中介服务，可以理解为在用户与模型之间提供访问通道的服务。

**仅仅把 OpenAI 模型接入应用、用于支撑应用功能，不会因此触发这项审批要求。** 开发者需要按实际业务模式区分，产品是在提供自己的应用功能，还是在向第三方提供模型的直接访问；同时核对已有协议中的明确许可，并遵守其他使用政策要求。

## 替代模型的训练材料、打分与筛选均受限制

新版政策限制使用 OpenAI 模型及其输出，为旨在替代 OpenAI 模型或服务的模型生成、准备、筛选或提供训练材料和训练信号。范围覆盖制作训练数据与任务、给样本打分或排序，以及筛选和验证训练数据。

这项限制也覆盖为他人准备材料、委托他人操作，以及把产品使用或评估中的输出随后用于上述训练。即使没有亲自训练最终模型，也在适用范围内。通过未经授权的访问、逆向工程或绕过防护提取受保护的推理内容，同样受到禁止。

在这些边界内，研究、软件开发、模型评估、基准测试和产品开发仍可使用 OpenAI 模型；适用协议明确准许的用途继续按协议执行。

限制竞争模型训练已有条款基础：2026 年 1 月 1 日生效的个人《使用条款》已禁止用输出开发与 OpenAI 竞争的模型。此次更新进一步列出了参与训练的数据制作、反馈和筛选环节。

## 中国大陆及港澳的使用资格，按现行地区名单核对

截至 11 月 14 日，ChatGPT 网页端、移动端及 OpenAI API 的支持地区名单均不包含中国大陆、香港和澳门，中国台湾在名单内。在名单以外地区访问服务，或向这些地区提供访问，可能导致账号被阻止访问或暂停。

付款也有地区要求。使用来自不支持地区的付款方式会被阻止使用服务；银行卡须由受支持地区的银行发行。核对订阅资格时，需要同时看实际使用地和发卡地区。

这些地区与付款条件已适用，不能把 11 月 20 日理解为它们统一开始执行的日期。跨平台使用者还可对照本站的 [Claude 支持地区政策说明](/posts/2026/11/claude-supported-regions-policy/)，分别核对各家服务的规则。

## 个人账号不能共用，本人多设备登录可以

个人 OpenAI 账号供创建者本人使用，不能把登录凭证交给他人，或把账号开放给其他人使用。本人在多台设备上登录属于允许的使用方式，但仍受账号活动和订阅额度限制。

绕过安全过滤、内容限制或安全控制，以及违反条款的账号或 API 密钥共享，都可能导致限制或账号关闭。API 密钥是软件调用服务的访问凭证，应按适用条款管理。

处理方式包括警告、临时安全停用和永久关闭，具体以通知为准。收到警告不等于账号已经关闭；持续违规可能带来进一步限制。遇到停用或关闭，可按通知中的链接申请复核，操作入口可参阅 [ChatGPT 账号停用与申诉处理说明](/posts/2026/11/chatgpt-account-deactivation-appeal/)。
