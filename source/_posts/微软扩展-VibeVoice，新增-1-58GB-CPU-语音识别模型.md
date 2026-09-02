---
title: 微软扩展 VibeVoice，新增 1.58GB CPU 语音识别模型
permalink: posts/2026/09/microsoft-vibevoice-asr-bitnet/
tags: [microsoft, vibevoice, speech-recognition, open-source, model-release]
date: 2026-09-02 09:34:17
categories: 多模态
description: 微软扩展 VibeVoice 开源语音家族，新增 1.58GB 的 VibeVoice-ASR-BitNet 语音识别模型和 C++ 运行时。它面向 x86 与 ARM CPU 本地转写，无需 GPU，本文梳理量化方式、安装步骤与已确认限制。
cover: https://images.51allai.com/blog/microsoft-vibevoice-asr-bitnet-cover_20260902_094001.png
---
> 微软为 VibeVoice 新增 VibeVoice-ASR-BitNet，把语音识别模型从 4.62GB 压缩到 1.58GB，并公开 MIT 许可的 C++ 运行时。它可在 x86 和 ARM CPU 上本地转写音频，无需 GPU；当前采用离线批处理，不支持流式识别。
![微软 VibeVoice-ASR-BitNet 本地 CPU 语音识别](https://images.51allai.com/blog/microsoft-vibevoice-asr-bitnet-cover_20260902_094001.png)

## 1.58GB 模型把转写留在本地

VibeVoice-ASR-BitNet 把录音转成文字，运行时针对 x86 和 ARM 处理器编写。完成模型下载和编译后，转写在本机进行，不需要专用 GPU 或调用云端语音接口。

这个版本以 Qwen2.5-1.5B 作为语言模型部分，再分别压缩声音编码器和语言模型。声音编码器使用 8 位量化，语言模型使用 BitNet 三值权重，也就是用更少数字位保存模型参数。两部分合计从 FP16 版的 4.62GB 降到 1.58GB，下载和内存压力都更低。

## 支持七种语言，但不是实时字幕引擎

VibeVoice-ASR-BitNet 覆盖英语、中文、法语、意大利语、韩语、葡萄牙语和越南语。它适合本地处理会议录音、访谈、播客和视频声轨，也可作为开发者自建语音转写工具的底层引擎。

当前实现仅支持离线批处理，不能直接用于视频会议的流式字幕或实时语音助手。

## 用 VibeASR.cpp 在本机运行

项目需要 Python 3.9 或更高版本、CMake 3.14 或更高版本，以及 GCC 或 Clang。代码和量化模型需要约 2GB 磁盘空间。

```bash
git clone --recursive https://github.com/microsoft/VibeASR.cpp.git
cd VibeASR.cpp
pip install -r requirements.txt
python setup_env.py
```

`setup_env.py` 会编译 C++ 运行时并下载预量化模型。完成后，把待转写的音频文件交给命令行程序：

```bash
./build/bin/asr_infer \
  --vae-model models/vibeasr/vibeasr-vae-encoder-i8_s.gguf \
  --lm-model models/vibeasr/vibeasr-lm-i2_s-embed-q6_k.gguf \
  --audio input.wav -t 4
```

需要可视化操作时，仓库还提供 Gradio 网页演示。Windows 版需要 MinGW-w64 等 GCC/Clang 环境，目前不支持直接用 MSVC 构建。

## VibeVoice 同时包含识别和合成模型

VibeVoice 不是单一的语音合成模型，当前仓库同时整理文字转语音（TTS）和语音转文字（ASR）两条产品线。VibeVoice-ASR-BitNet 属于 ASR，只负责识别已有录音，不生成声音。

2025 年 9 月，微软因发现初版 VibeVoice-TTS 被用于与研究意图不符的场景，从主仓库移除了该 TTS 代码。目前仓库仍包含 VibeVoice-Realtime-0.5B 实时语音合成模型的使用路径。按早期教程寻找初版 TTS 文件时，当前目录结构会与旧教程不同。

* 项目地址：https://github.com/microsoft/VibeVoice
