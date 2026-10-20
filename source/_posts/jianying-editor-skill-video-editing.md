---
title: jianying-editor-skill 自动生成剪映草稿，支持配音和字幕
permalink: posts/2026/10/jianying-editor-skill-video-editing/
tags: [jianying-editor-skill, ai-agents, open-source, workflow-automation]
sources:
  - name: jianying-editor-skill 项目说明
    url: https://github.com/luoluoluo22/jianying-editor-skill
    note: 项目定位、平台支持、安装方式与功能边界
  - name: jianying-editor-skill 使用指南
    url: https://github.com/luoluoluo22/jianying-editor-skill/blob/32c56928ded4f9e2c2b80e099dc7abb793d2c30b/usage.md
    note: 环境检查、自然语言指令与草稿刷新方式
  - name: 配音与字幕生成实现
    url: https://github.com/luoluoluo22/jianying-editor-skill/blob/32c56928ded4f9e2c2b80e099dc7abb793d2c30b/scripts/core/text_ops.py
    note: 文案按标点拆句、语音合成与字幕时长对齐
  - name: 素材导入与草稿内复制实现
    url: https://github.com/luoluoluo22/jianying-editor-skill/blob/32c56928ded4f9e2c2b80e099dc7abb793d2c30b/scripts/core/media_ops.py
    note: 本地素材导入、格式处理与草稿内部素材副本
  - name: 自动导出平台检查实现
    url: https://github.com/luoluoluo22/jianying-editor-skill/blob/32c56928ded4f9e2c2b80e099dc7abb793d2c30b/scripts/auto_exporter.py
    note: Windows UI 自动化导出及 macOS 手动导出要求
  - name: jianying-editor-skill 开源许可证
    url: https://github.com/luoluoluo22/jianying-editor-skill/blob/32c56928ded4f9e2c2b80e099dc7abb793d2c30b/LICENSE
    note: MIT 许可与内嵌 pyJianYingDraft 的 Apache 2.0 许可
date: 2026-10-20 21:42:32
categories:
  - 智能体
description: jianying-editor-skill 将自然语言剪辑需求转成桌面剪映草稿，可安排素材、生成配音并对齐字幕。本文介绍工作流程、安装入口与适用场景，区分 Windows 自动导出和 macOS 手动导出的使用边界。
cover: https://images.51allai.com/blog/jianying-editor-skill-video-editing-cover_20261020_214844.png
---

> jianying-editor-skill 是一套开源的剪映自动化 Skill，能让 AI 编程助手调用脚本，把视频、配音、字幕和转场组织成可继续编辑的剪映草稿。它面向国内桌面版剪映专业版，Windows 提供自动导出能力，macOS 生成草稿后需在剪映内手动导出。
![jianying-editor-skill 自动搭建剪映视频、配音与字幕时间轴示意](https://images.51allai.com/blog/jianying-editor-skill-video-editing-cover_20261020_214844.png)

## 把自然语言需求转成可编辑草稿

给 AI 一组旅行视频，要求按顺序拼接、配上旁白和字幕，最终得到一个能在剪映里打开的工程。这是 [jianying-editor-skill](https://github.com/luoluoluo22/jianying-editor-skill) 的主要用途。项目由开发者 luoluoluo22 维护，把剪映草稿操作封装成了 AI 可以调用的 Python 脚本。

这里的 Skill，可以理解为交给 AI 助手的一套操作说明、参考资料和工具。用户在 Claude Code、Cursor、Trae 等环境中加载它，再用自然语言提出剪辑需求，助手负责组织脚本调用。

它的工作重点是搭建时间轴：把素材放在哪一轨、从哪里开始播放、持续多久，以及字幕和声音如何对齐。工程保存后，用户仍可在剪映里调整画面、字幕、音量和转场，预览与最终渲染由剪映完成。

## 配音、字幕和素材可以一起安排

对于已有素材的创作者，这套工具提供了几类可组合的操作：

| 任务 | 可以完成的处理 |
| --- | --- |
| 素材剪辑 | 导入视频、音频和图片，指定片段起点、时长与轨道位置 |
| 文案配音 | 将文本送入语音合成流程，生成旁白音频 |
| 字幕制作 | 按标点拆分文案，为每句旁白添加对应时长的字幕 |
| 画面调整 | 添加转场、滤镜、特效，以及缩放、位移等关键帧动画 |
| 网页动效 | 录制 HTML、JavaScript 或 Canvas 动画，再作为视频素材导入 |

配音与字幕的衔接有具体实现：脚本先拆分句子，再逐句生成语音，读取实际音频时长来设置字幕的显示区间。用户提供一段旁白文案后，可以把声音与字幕作为一组任务处理。

导入本地素材时，脚本还会尝试把文件复制到草稿内部目录，让工程引用这些副本。这能减少临时文件被清理、外部路径访问受限带来的素材丢失问题；复制失败时，代码会回退到原路径。

## Windows 和 Mac 的导出方式不同

草稿生成与视频导出是两个步骤。前者写入剪映工程数据，后者需要剪映把时间轴渲染成视频文件。

| 使用环境 | 草稿生成 | 最终导出 |
| --- | --- | --- |
| Windows 桌面剪映专业版 | 支持 | 提供基于 Windows UI Automation 的自动导出；适配重点为剪映 5.9 及更早版本 |
| macOS 桌面剪映专业版 | 支持 | 打开剪映后手动导出 |
| CapCut 国际版、手机端剪映 | 不支持 | 不适用 |

Windows 自动导出会操作剪映界面，执行时需要保持软件处于可操作状态，避免同时使用鼠标键盘。新版剪映的弹窗和控件变化也会影响这一步。

Mac 用户可以让 AI 完成素材排列、配音和字幕草稿，再进入剪映检查并导出。项目的导出脚本在非 Windows 系统上会直接返回手动导出提示。

工具也有明确的功能边界：剪映的智能抠图、美颜，以及“一键成片”等内置 AI 按钮，不在这套脚本的可调用范围内。按文案生成配音字幕，与调用剪映的语音识别字幕功能，是不同的处理方式。

## 如何开始使用

先准备桌面版剪映专业版，以及能够加载本地 Skill 的 AI 编程工具。以 Claude Code 的项目目录为例，可以把仓库下载到：

```bash
git clone https://github.com/luoluoluo22/jianying-editor-skill.git .claude/skills/jianying-editor
```

随后让助手按项目安装说明配置 Python 依赖，并检查 FFmpeg 和剪映草稿目录。需要网页动效录制时，还要配置 Playwright 及 Chromium 浏览器。完成后，可先输入：

> 检查一下剪映自动化的环境是否正常，再新建一个测试草稿，放入一段演示素材和测试字幕。

项目提供的 `api_validator.py` 用于检查环境。草稿目录探测失败时，需要手动提供剪映实际使用的路径。生成后若剪映首页没有显示新工程，可以重启剪映，或进入一个旧草稿再返回。

正式任务可以写得更具体，例如：

> 把素材文件夹里的三个片段依次拼接，片段之间加叠化转场。使用我提供的文案生成旁白和对应字幕，保存为一个新的剪映草稿。

这类流程适合整理 Vlog 素材、制作带旁白的产品介绍，或给软件教程添加字幕与动效。需要频繁重复“导入素材—排时间轴—配音—加字幕”的创作者，可以把这些步骤交给脚本，再在剪映内完成画面和声音检查。

项目以 MIT 许可证开源，内嵌并改造的 pyJianYingDraft 组件采用 Apache 2.0 许可。代码许可不等于视频、音乐或字体素材的使用授权，制作成片时仍需分别确认所用素材的权限。
