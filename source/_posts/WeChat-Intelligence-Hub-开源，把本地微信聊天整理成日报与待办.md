---
title: 开源项目 WeChat Intelligence Hub，把本地微信聊天整理成日报与待办
permalink: posts/2026/09/wechat-intelligence-hub/
tags:
  - wechat-intelligence-hub
  - codex
  - ai-agents
  - open-source
sources:
  - name: Rion-Wu-tech/wechat-intelligence-hub GitHub 仓库
    url: https://github.com/Rion-Wu-tech/wechat-intelligence-hub
    note: 项目定位、版本、安装方式、功能范围与使用限制
  - name: WeChat Intelligence Hub v0.9.2-preview.2 发布说明
    url: https://github.com/Rion-Wu-tech/wechat-intelligence-hub/blob/v0.9.2-preview.2/docs/releases/v0.9.2-preview.2.md
    note: 首发版本内容、测试记录与数据库读取条件
  - name: Rion WeChat CLI 说明
    url: https://github.com/Rion-Wu-tech/wechat-intelligence-hub/blob/main/projects/rion-wechat-reader/README.md
    note: Reader 只读边界、降级模式与完整数据库接入条件
  - name: WeChat Intelligence Hub 安全说明
    url: https://github.com/Rion-Wu-tech/wechat-intelligence-hub/blob/main/SECURITY.md
    note: 实验性接入助手、敏感数据与用户确认边界
  - name: WeChat Intelligence Hub AGPL-3.0-only 许可证
    url: https://github.com/Rion-Wu-tech/wechat-intelligence-hub/blob/main/LICENSE
    note: 开源许可条款
date: 2026-09-07 09:32:18
categories:
  - 智能体
description: 开源项目 WeChat Intelligence Hub 把本人电脑上的微信记录接入 Codex，整理成日报、待回复、承诺、商机和复联线索。本文说明两个 Skill 的分工、安装方法、实测结果及完整历史读取条件。
cover: https://images.51allai.com/blog/wechat-intelligence-hub-cover-v2_20260907_094302.png
---
> 开源项目 WeChat Intelligence Hub 由 Rion Wu 独立开发，把本人电脑上的微信聊天接入两个 Codex Skill，可检索联系人和群聊，并生成日报、待回复、承诺、商机与复联线索。首发版本为 v0.9.2-preview.2，完整历史读取需要本人授权的本地数据库和访问材料。
![WeChat Intelligence Hub 微信个人情报库](https://images.51allai.com/blog/wechat-intelligence-hub-cover-v2_20260907_094302.png)

## 两个 Skill 分别负责读取和整理

WeChat Intelligence Hub 是 Rion Wu 独立开发的社区项目，不属于腾讯或微信官方。项目在 2026 年 9 月 4 日发布 `v0.9.2-preview.2`，把数据读取与情报整理拆成两个 Codex Skill。

项目地址：[github.com/Rion-Wu-tech/wechat-intelligence-hub](https://github.com/Rion-Wu-tech/wechat-intelligence-hub)

`wechat-cli` 是只读数据入口，负责会话、联系人、聊天时间线、关键词搜索、上下文、未读消息、群成员和本地媒体索引等查询。`wechat-intelligence-hub` 在这些记录之上生成联系人进展、群聊主题、待回复事项、未完成承诺、商机候选和复联提醒。

这里的“只读”指不会发送、删除、转发或修改微信消息，也不会自动操作微信界面。回复建议只生成草稿，金额、日期和承诺仍由用户核对。

## 日报可同时输出 Markdown 和交互式 HTML

用户可以指定过去 24 小时、一周、一个月或明确的起止日期。完整多会话报告会保留 Markdown 和 HTML 两种版本：Markdown 适合归档和继续编辑，HTML 提供搜索、分区导航、群聊筛选、明暗主题、打印与当前分区下载。

除了日报，这套工具也能围绕某个人、群聊、微信标签、项目或关键词定向检索。系统先定位消息和相邻上下文，再按会话与时间整理；商机线索先进入待审核候选，用户确认后才会进入持续跟进的机会列表。

项目还允许用户建立本地 Profile，把当前计划、重点联系人标签和关注主题用于日报排序。Profile、聊天数据库和生成报告被配置为留在本机工作目录，不应提交到公开仓库。

## 可以先用虚构数据验证完整流程

手动安装需要先克隆仓库，再运行安装脚本：

```bash
git clone https://github.com/Rion-Wu-tech/wechat-intelligence-hub.git
cd wechat-intelligence-hub
./scripts/install.sh --with-sqlcipher
```

安装脚本会部署 `wechat-cli`、`wechat-intelligence-hub` 及其本地引擎。没有真实数据库接入条件时，可以先运行全虚构 Demo：

```bash
bash projects/wechat-intelligence-hub/scripts/run_demo.sh
```

本次在当前仓库提交上复现了这条 Demo，完成 8 条虚构消息的文件扫描和 3 条虚构 vault 消息的处理。Hub 的 119 项测试执行通过，其中 1 项 SQLCipher 加密集成测试因本机未安装驱动而跳过；Reader 的 81 项测试执行通过，其中 5 项 SQLCipher 或 Zstandard 相关测试跳过。能力对照脚本列出的 29 个只读工具均有对应实现。

## 安装完成不等于已经读到完整历史

完整聊天历史和持续数据库读取只覆盖已经同步到本人电脑、且用户有权访问的数据。它需要本地数据库和相应访问材料；Reader 核心不会从微信进程提取密钥，也不执行重签名、注入或 Hook。

macOS 用户在没有完整数据库条件时，可以读取系统仍保留的微信通知预览。这个模式只包含部分入站通知，不包括静音聊天、完整历史、附件或自己发出的消息，不能当作完整记录。

项目另有实验性接入助手。它与日常只读 Reader 分开，只有在用户审核并确认后才会调用外部本地工具；相关操作可能需要 macOS 管理员授权，并可能重启微信或重签名影子副本。普通安装和日报不会自动触发这条流程。

代码采用 AGPL-3.0-only 许可证。遵守许可证时可以运行、修改和用于商业活动；闭源集成、专有发行、OEM 或白标需要单独商业授权。
