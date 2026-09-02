---
title: 腾讯上线 WorkBuddy 开放平台，开放 Skill、连接器与 Open API
permalink: posts/2026/09/workbuddy-open-platform/
tags: [tencent, workbuddy, ai-agents, ecosystem, product-update]
sources:
  - name: WorkBuddy 开放平台
    url: https://open.workbuddy.cn/
  - name: WorkBuddy 开放平台概述
    url: https://open.workbuddy.cn/docs/what-is-open-platform
  - name: WorkBuddy Skill 开发文档
    url: https://open.workbuddy.cn/docs/skill
  - name: WorkBuddy 连接器开发文档
    url: https://open.workbuddy.cn/docs/connector
  - name: WorkBuddy 第三方应用接入文档
    url: https://open.workbuddy.cn/docs/third-party-app
date: 2026-09-02 17:47:52
categories: 智能体
description: 腾讯上线 WorkBuddy 开放平台，首期开放 Buddy 应用、专家、Skill、连接器与硬件五类生态能力。开发者可完成资质认证，创建并提交资产审核，还可通过 OAuth 2.1 和 Open API 接入本地助理、云端任务与会话产物。
cover: https://images.51allai.com/blog/workbuddy-open-platform-cover_20260902_192415.png
---

> 腾讯 WorkBuddy 开放平台于 9 月 2 日上线，首期开放 Buddy 应用、专家、Skill、连接器与硬件五类能力。个人和企业开发者完成认证后，可创建生态资产，经过测试与审核后发布到 WorkBuddy。
![WorkBuddy 开放平台五类生态能力封面](https://images.51allai.com/blog/workbuddy-open-platform-cover_20260902_192415.png)

## WorkBuddy 从办公工具扩展到开放平台

这次上线的重点不是增加一种办公任务，而是把 WorkBuddy 的能力开放给外部开发者。开发者可以在同一个工作台管理技能、专家、专家团、连接器和外部应用接入，把已有的行业知识、业务系统或服务做成 WorkBuddy 内可调用的产品。

平台首期提供五类入口。Buddy 应用用于封装垂直行业的完整工作台；专家承载特定领域的角色和工作方法；Skill 把一套任务步骤做成可复用能力；连接器负责接入外部服务与数据；硬件入口则面向需要把设备能力接入 WorkBuddy 的厂商。

对普通用户来说，这些能力会出现在 WorkBuddy 的应用或能力市场中。用户可以安装 Skill，在对话中调用；也可以选择专家或 Buddy 应用，直接进入已经配置好场景、工具和工作方式的工作台。

## 开发者需要经过认证、测试和审核

个人与企业开发者均可从 [WorkBuddy 开放平台](https://open.workbuddy.cn/) 入驻。标准流程包括注册、主体认证、创建业务类型、填写基础信息和能力配置、在测试环境调试、提交审核，以及审核通过后发布。发布后还可以查看运行数据并维护版本。

企业认证支持企业法人实名认证、腾讯云企业账号授权，以及微信公众号或小程序账号授权。个人认证需要完成实名信息和人脸识别。平台把创建、测试和发布分开，生态资产不会在提交后直接面向用户开放。

## Skill、专家和 Buddy 应用分别解决不同问题

Skill 采用 `SKILL.md` 描述用途和执行方法，还可以附带参考资料、脚本与模板。开发者可以把报告生成、数据处理或固定工作流打包为一个技能，用户安装后在对话中调用。

专家使用独立配置文件和 Agent 定义文件，适合封装专业角色、初始化提示词和依赖能力。专家团则把多个专家组合起来处理分工任务。

Buddy 应用的范围更大。它可以配置工作模式、推荐场景、模型、Skill、专家和连接器，把这些组件组合成面向金融、教育、法律等垂直场景的工作台。开发者不必重新制作一套桌面产品，但需要为具体场景配置入口、权限和能力组合。

## 连接器支持 MCP 与命令行两条接入路线

已有网络 API 的服务可以使用 MCP 与 Skill 接入。MCP 是让 AI 调用外部工具的标准协议；WorkBuddy 支持远程 HTTPS 服务，也支持通过标准输入输出启动本地进程。平台要求涉及用户数据的服务提供认证，并按最小权限原则开放能力。

已有成熟命令行工具的开发者可以选择 CLI 与 Skill 方案，由 WorkBuddy 安装并调度命令行程序。命令行工具需要提供非交互式安装方式，并自行管理登录状态和凭证。

第三方应用还有另一条路线：通过 OAuth 2.1 获得用户授权，再调用 Open API。当前接口覆盖个人资料、本地助理消息、云端任务、实时任务通道、会话产物和兑换码核销。应用必须先在开放平台登记回调地址和权限范围，用户确认授权后才能访问对应数据。
