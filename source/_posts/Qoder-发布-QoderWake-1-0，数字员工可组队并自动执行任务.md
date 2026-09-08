---
title: Qoder 发布 QoderWake 1.0，数字员工可组队并自动执行任务
permalink: posts/2026/09/qoderwake-1-0-digital-team/
tags:
  - alibaba
  - qoderwake
  - ai-agents
  - product-update
sources:
  - name: QoderWake 更新日志
    url: https://docs.qoder.com/zh/release-notes/qoderwake
    note: 1.0.0 发布日期、Group、自动触发、WakerFlow 与资源中心
  - name: QoderWake 产品简介
    url: https://docs.qoder.com/zh/qoderwake/overview
    note: Waker、Group、工作入口、资源结构与上线流程
  - name: QoderWake 快速开始
    url: https://docs.qoder.com/zh/qoderwake/installation
    note: 系统要求、安装方式与首次任务验证步骤
date: 2026-09-08 16:08:43
categories:
  - 智能体
description: Qoder 发布 QoderWake 1.0，把单个数字员工扩展为可协作的 Waker 团队。本文梳理 Group、WakerFlow、IM 接入、自动触发方式，以及 macOS、Windows 和 Linux 的安装要求。
cover: https://images.51allai.com/blog/qoderwake-1-0-digital-team-cover_20260908_161413.png
---

> Qoder 于 9 月 3 日发布 QoderWake 1.0。新版支持用自然语言创建 Waker，将多个 Waker 组成 Group，并通过 IM、定时、事件或 API 启动任务；macOS 13+、Windows 10+ 和主流 Linux 均可安装。
![QoderWake 1.0 数字员工组队与自动任务](https://images.51allai.com/blog/qoderwake-1-0-digital-team-cover_20260908_161413.png)

## 从单个 Waker 扩展到固定协作团队

QoderWake 把承担具体职责的数字员工称为 Waker。一个 Waker 对应一个稳定岗位或服务范围，其工作方式由角色配置、运行环境、记忆、Skills、连接器、知识库、项目和权限共同决定。1.0 支持用自然语言描述自定义角色，自动生成配置并保存为模板。

Group 用于把多位职责互补的 Waker 组成长期团队。团队需要指定 Leader 负责分工和汇总，也可以通过 `@` 指定成员参与。每位成员可单独配置模型和工作目录，任务页会集中展示执行进度与产物。遇到共享写入或前后依赖时，仍需明确执行顺序和人工确认点。

这与 [QoderWork Windows 桌面智能体](/posts/2026/03/alibaba-qoderwork-windows/) 的使用重心不同：QoderWake 主要围绕持续岗位、多人协作和自动任务组织工作。

## 群聊、定时与事件都能启动任务

Waker 可以接入钉钉、飞书等即时通信工具，在群聊或单聊中接受任务。长任务运行期间，用户仍可补充要求；系统会统一管理聊天配对、响应 Waker、工作目录和任务记录。

对重复工作，1.0 增加统一的“自主工作”入口。Waker 或 WakerFlow 可由定时、事件和 API 触发，任务看板则用列表或泳道集中展示对话、群聊、工作流和自动任务的状态。日报、巡检、外部事件处理等固定流程可以先手动验证，再切换为自动执行。

## WakerFlow 把多步骤任务固化成流程

WakerFlow 用来编排需要多个阶段或多个 Waker 的任务。用户可以通过自然语言生成可运行流程，也可以手动启动，或交给定时、事件和 API 触发。运行记录会保留各节点的输入、工具调用、输出和错误，流程还支持版本历史与回滚。

技能、连接器、知识库、WakerFlow 和公开项目统一放在“能力与资源”中心。资源安装后还要分配给目标 Waker，并通过新任务验证；给每位 Waker 堆入无关资源，会增加检索和权限风险。

## 三类桌面系统都能安装

QoderWake 支持 macOS 13.0 及以上、Windows 10 及以上和主流 Linux 发行版，建议至少准备 4 GB 内存与 500 MB 磁盘空间。macOS 可下载安装包，Windows 使用 `.exe` 安装程序，macOS 与 Linux 也能通过命令行安装。启动后，控制台默认通过本机浏览器打开。

第一次使用时，先从角色市场选择预置角色或创建自定义 Waker，只绑定首个任务需要的目录、Skills、知识库和连接器。先执行只读任务并检查实际产物，再测试写操作、越界拒绝和高风险确认。单个岗位稳定后，再接入 Group、IM、WakerFlow 或自动触发。
