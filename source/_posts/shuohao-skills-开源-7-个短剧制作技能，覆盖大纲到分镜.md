---
title: shuohao-skills 开源 7 个短剧制作技能，覆盖大纲到分镜
permalink: posts/2026/10/shuohao-skills-ai-short-drama/
tags: [shuohao-skills, ai-agents, open-source, creative-workflow, video-generation]
sources:
  - name: shuohao-skills 中文项目说明
    url: https://github.com/eternityspring/shuohao-skills/blob/d28a9c539b40523d081794b25ff9113016bd98e0/README.zh.md
    note: 7 个技能的定位、制作流程、环境要求、报告与安装入口
  - name: shuohao-skills 安装脚本
    url: https://github.com/eternityspring/shuohao-skills/blob/d28a9c539b40523d081794b25ff9113016bd98e0/scripts/install.sh
    note: 自动检测目录、软链接安装与按技能选择安装
  - name: novel-staging 使用说明
    url: https://github.com/eternityspring/shuohao-skills/blob/d28a9c539b40523d081794b25ff9113016bd98e0/skills/novel-staging/README.md
    note: 站位输入、可拖动的 HTML 报告与开场走位句交接
  - name: novel-storyboard 分镜与投产包实现
    url: https://github.com/eternityspring/shuohao-skills/blob/d28a9c539b40523d081794b25ff9113016bd98e0/skills/novel-storyboard/scripts/novel-storyboard.mjs
    note: 默认时长约束、质量校验、H3 与 Seedance 提示词和素材清单导出
  - name: novel-storyboard 工作流程与边界
    url: https://github.com/eternityspring/shuohao-skills/blob/d28a9c539b40523d081794b25ff9113016bd98e0/skills/novel-storyboard/SKILL.md
    note: 分镜交付提示词和参考图清单，图片与视频生成由下游完成
  - name: character-refs 角色参考图说明
    url: https://github.com/eternityspring/shuohao-skills/blob/d28a9c539b40523d081794b25ff9113016bd98e0/skills/character-refs/README.md
    note: 锚点与派生视图、图片版本记录及四类出图适配方式
  - name: shuohao-skills 开源许可证
    url: https://github.com/eternityspring/shuohao-skills/blob/d28a9c539b40523d081794b25ff9113016bd98e0/LICENSE
    note: Apache 2.0 许可
date: 2026-10-23 13:33:28
categories:
  - 智能体
description: shuohao-skills 开源 7 个 AI 短剧制作技能，覆盖改编大纲、角色与美术设定、剧本、开场站位、分镜及独立角色参考图生成。本文梳理各环节产物、Claude Code 与 Codex 安装方式，以及模型额度、出图配置和下游视频制作的衔接边界。
cover:
---

> shuohao-skills 是一套开源的 AI 短剧制作技能，包含 6 个制作阶段和独立的角色参考图生成工具。用户可以在 Claude Code、Codex 等 AI 助手中，把小说逐步整理为大纲、设定、剧本、站位和分镜，再将提示词与素材交给图片、视频生成工具。
![shuohao-skills 七个技能组织 AI 短剧大纲、角色、站位与分镜的流程示意](待补图)

## 把小说整理成可检查的制作资料

一本小说改成短剧，需要先决定保留哪些情节、安排哪些角色，再把故事写成场次、台词和镜头。[shuohao-skills](https://github.com/eternityspring/shuohao-skills) 由开发者 eternityspring 维护，将这些工作拆成可以单独使用的技能目录。

这里的 Skill，是 AI 助手读取的一套任务说明、参考资料和脚本。助手负责理解故事、编写内容，Node.js 脚本负责检查数据、计算时长和生成报告。每个技能都能独立拷贝使用，也可以通过 JSON 文件交接；JSON 是一种结构化文本格式，用来保存人物、场次和镜头等信息。

制作顺序从改编大纲开始。角色、美术和剧本围绕大纲反复调整，之后安排每场开头的人物站位，再进入分镜。用户可以打开各阶段的 HTML 报告检查结果，无需只对着数据文件审稿。

## 7 个技能分别交付什么

| 技能 | 主要工作与产物 |
| --- | --- |
| `novel-outline` | 生成改编说明、人物表、剧情爽点表、分集梗概和资产清单，保存为 `outline.json` |
| `novel-characters` | 整理人物画像、形象与音色提示词等角色资料，保存为 `cast.json` |
| `novel-art` | 整理场景、叙事道具、光照和状态变体，保存为 `art.json` |
| `novel-script` | 把分集梗概展开为场次、动作和台词，保存为 `script.json`，并汇总角色台词本 |
| `novel-staging` | 规划每场开头人物的位置、坐站与朝向，输出 `staging.json` 和可调整的俯视站位报告 |
| `novel-storyboard` | 把剧本拆成视频段与镜头，输出 `storyboard.json`、提示词和投产素材清单 |
| `character-refs` | 从角色描述生成正面全身参考图，再按需生成大头照、侧面、背面及细节图 |

角色参考图工具可以脱离小说改编流程使用。先确认一张正面全身图作为外观基准，再据此生成其他视图；图片有独立标识和版本记录，修改描述或基准图后，受影响的图片会被标为过期，方便逐张检查与重做。

它提供 Qwen Image 的 ComfyUI、本机 Codex 出图、OpenAI Images API 和自定义命令四类接入方式。生成参考图前，需要选定并配置对应的出图方式。

## 用脚本检查时长与上下游引用

剧本和分镜的校验有具体对象：台词能否放进分配的时间、某个角色是否已在上游登记、剧本里的动作和台词是否被镜头完整覆盖。分镜默认将每个视频段限制在 15 秒以内，每个镜头为 2—5 秒，这些参数可以按制作需求调整。

分镜导出支持 H3 和 Seedance 两种提示词与素材组织方式。以 H3 投产包为例，每个视频段有自己的目录，包含提示词、按顺序排列的分镜图，以及记录切点和缺失素材的清单。图片需要由下游工具生成并放入对应位置，之后可以重新渲染报告或导出素材包。

开场站位也有交接步骤：用户在俯视报告中拖动人物，调整坐站和朝向，导出确认后的 JSON，再把 `blocking` 命令生成的开场走位句交给助手，填入该场第一段分镜。这个步骤需要主动传递走位句。

这些检查处理的是结构、时长和引用关系。人物是否符合故事设定、台词是否自然、镜头是否表达清楚，仍需要创作者审看。图片、视频生成与最终剪辑在后续完成；已有视频、音频素材需要排列成剪映草稿时，可再了解 [jianying-editor-skill 的配音、字幕与时间轴整理方式](/posts/2026/10/jianying-editor-skill-video-editing/)。

## 安装到 Claude Code 或 Codex

脚本要求 Node.js 18 或以上版本，使用标准库，无需安装 npm 依赖。安装器采用 Bash，项目的实测环境为 macOS 与 Node.js 24。先在本地下载仓库：

```bash
git clone https://github.com/eternityspring/shuohao-skills.git
cd shuohao-skills
./scripts/install.sh
```

安装器会检查 `~/.claude` 和 `~/.codex` 目录，为检测到的工具创建技能软链接。软链接指向下载的仓库，所以更新仓库后技能内容随之更新，需要保留原目录。只安装到 Codex，可以使用：

```bash
./scripts/install.sh --codex
```

也可以只装一个技能，例如 `./scripts/install.sh novel-outline`。其他能读取 `SKILL.md` 并执行随附脚本的 AI 助手，可以加载对应目录使用。

安装后，先给助手一个范围明确的小任务，例如：

> 使用 novel-outline，把我提供的故事改编为 3 集、每集约 60 秒的短剧。先整理改编说明、角色和分集梗概，运行校验，并输出可阅读的报告。

确认大纲后，再安排角色、美术、剧本和分镜。这样每个阶段都有可审核的资料，修改情节时也能找到受影响的角色、场景和镜头。

## 适合需要管理前期资料的创作者

这套工具适合已有小说或原创故事、希望用 AI 助手管理短剧前期制作的个人创作者和小团队。只需要一套角色参考图时，可以单独使用 `character-refs`；已有剧本时，也可以从站位或分镜环节开始，提供对应结构的输入文件。

项目采用 Apache 2.0 许可证，代码可以免费获取。内容编写使用当前 AI 助手会话的模型额度，出图使用所选服务的额度或本地计算资源，后续视频生成也由相应工具处理。使用前可先选一集短剧，确认大纲、剧本、分镜和素材包能按自己的制作方式衔接，再扩展到更多集数。
