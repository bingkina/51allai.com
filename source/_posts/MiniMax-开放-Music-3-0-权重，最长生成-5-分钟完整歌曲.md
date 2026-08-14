---
title: MiniMax 开放 Music 3.0 权重，最长生成 5 分钟完整歌曲
permalink: posts/2026/08/minimax-music3-open-weights/
tags: [minimax, minimax-music3, audio-generation, open-source, model-release]
date: 2026-08-14 13:41:41
categories: 多模态
description: MiniMax 开放 Music 3.0 模型权重，可依据歌词和音乐描述生成最长 5 分钟的完整歌曲，并输出 32kHz、16 位立体声 WAV。本文说明公开范围、模型结构、本地部署方式、显存门槛与社区许可证的商业使用条件，帮助音乐创作者和开发者判断能否在自己的设备上运行。
cover: https://images.51allai.com/blog/minimax-music3-open-weights-cover_20260814_134810.png
---

> MiniMax 开放 Music 3.0 模型权重。模型接收歌词与音乐描述，可一次生成最长 5 分钟的完整歌曲，输出 32kHz、16 位立体声 WAV。开发者可通过 SGLang-Omni、Diffusers 或 ComfyUI 在 CUDA 显卡上本地运行。
![MiniMax Music 3.0 开放权重与完整歌曲生成](https://images.51allai.com/blog/minimax-music3-open-weights-cover_20260814_134810.png)

## 开放的是模型权重与配套文件

Music 3.0 的权重仓库已经公开，无需提交访问申请。仓库包含模型权重、配置、分词器、示例脚本、参考音频和文档，开发者可以直接下载到本地。代码仓库还提供音乐描述改写 Skill，可把简短想法整理成结构化的曲风、演唱和编曲说明。

相关仓库与文件入口：

- GitHub：[MiniMax-AI/MiniMax-Music3](https://github.com/MiniMax-AI/MiniMax-Music3)
- Hugging Face：[MiniMaxAI/MiniMax-Music3](https://huggingface.co/MiniMaxAI/MiniMax-Music3)
- 许可证：[MiniMax-Music3 Community License](https://huggingface.co/MiniMaxAI/MiniMax-Music3/blob/main/LICENSE)
- 音乐描述改写 Skill：[music-caption-rewriter](https://github.com/MiniMax-AI/MiniMax-Music3/tree/main/skills/music-caption-rewriter)

这次公开采用 MiniMax-Music3 Community License。许可证允许用户使用、复制、修改、发布、分发和再授权模型文件。把模型用于商业产品或服务时，界面需要显著展示 `MiniMax-Music3`；相关产品和服务的合计年收入超过 2000 万美元时，需要事先取得 MiniMax 的书面授权。向第三方提供在线生成服务，还需要设置并持续维护防止违法、侵权和滥用的技术与管理措施。

因此，更准确的说法是“开放权重”，而不是把它等同于没有附加条件的宽松开源协议。个人研究、本地实验和二次开发都可以从公开仓库开始，但产品上线前仍需逐条核对许可证要求。

## 一次生成最长 5 分钟完整歌曲

Music 3.0 接收两类输入。歌词决定要唱的文字，也可以用 `[Intro]`、`[Verse]`、`[Chorus]`、`[Bridge]`、`[Solo]` 和 `[Outro]` 等标签划分段落；音乐描述用来指定流派、速度、调性、情绪变化、演唱方式、乐器和制作风格。模型把两类条件合在一起，输出 32kHz、16 位立体声 WAV 文件。

最长 5 分钟让用户可以直接生成包含前奏、主歌、副歌、桥段、器乐段和尾奏的歌曲，不必先做多个短片段再手工拼接。段落标签和音乐描述属于生成条件，并不是精确的乐谱指令；实际结果不保证逐项符合指定的速度、调性、乐器、歌词或歌曲结构。

仓库附带的 `music-caption-rewriter` 可以把一句简短描述扩写成三部分：全局信息、演唱细节和编曲安排。它在本地使用随附的文字资料完成改写，不需要额外调用外部接口。用户仍可保留歌词中的段落标签，把歌词与音乐描述分别交给模型。

## 全局结构与局部声音分开处理

Music 3.0 使用两层语言模型协作生成音乐。8B Global LLM 负责整首歌的长期结构和语义走向，0.6B Local LLM 负责每一帧里的局部声音细节。Global LLM 以 Qwen3-8B 为初始化基础，再针对音乐 Token 调整并与 Local LLM 联合训练。

声音合成部分不会只依赖离散的音乐 Token。系统融合两层语言模型的连续隐藏状态，再交给 2.4B 参数的 Flow Matching 模块和 1.23 亿参数的 Flow-VAE 还原波形。这里的 Flow Matching 可以理解为把模型内部的音乐表示逐步变成可解码的音频特征，Flow-VAE 再把这些特征输出为最终声音。

训练用音乐分词器采用八层残差向量量化。第一层码本记录歌曲的主要语义和结构，其余七层补充声音细节。推理阶段的最终波形则由连续隐藏状态合成路径生成。

## 本地运行需要 CUDA 显卡

开发者可以从 [Hugging Face 权重仓库](https://huggingface.co/MiniMaxAI/MiniMax-Music3)下载模型，并选择 [SGLang-Omni](https://sgl-project.github.io/sglang-omni/cookbook/minimax_music3.html)、[Diffusers](https://huggingface.co/docs/diffusers/main/en/api/pipelines/minimax_music3) 或 [ComfyUI](https://docs.comfy.org/tutorials/audio/minimax/minimax-music-3) 接入。SGLang-Omni 的示例把歌词放在 `input`，把音乐描述放在 `instructions`，通过本地兼容接口返回 WAV 文件。

不同推理框架的硬件安排不同。GitHub 中的 SGLang-Omni 示例使用两张 CUDA 显卡，一张运行语言模型与八层码本生成，另一张运行声音合成模块。Hugging Face 提供的 Diffusers 示例可在 24GB 以上显存运行完整精度版本；启用 CPU 自动卸载后约占 22GB 显存，继续按层流式卸载可以降到 8GB 显存，但运行速度会变慢。

当前本地推理只支持 CUDA，并采用非流式生成。文字提示在分词后最多 5000 个 Token，音频生成上限为 9000 个声学帧。普通笔记本或没有兼容显卡的电脑不适合直接部署，用户可以先在[官方演示页](https://minimax-ai.github.io/music3-demo/)试听参考结果，再决定是否下载模型和准备本地环境。
