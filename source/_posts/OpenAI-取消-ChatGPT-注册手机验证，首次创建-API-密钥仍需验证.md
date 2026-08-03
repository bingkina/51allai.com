---
title: OpenAI 取消 ChatGPT 注册手机验证，首次创建 API 密钥仍需验证
permalink: posts/2026/08/openai-chatgpt-phone-verification/
tags: [openai, chatgpt, product-update, security]
date: 2026-08-04 00:19:41
categories: 行业观察
description: OpenAI 已取消创建新账号和使用 ChatGPT 时的手机验证要求，但开发者在 API 平台首次生成密钥时仍需验证手机号。本文说明普通用户、API 开发者和已开启多因素身份验证的账户分别会遇到哪些验证步骤，避免把政策变化误解为所有登录验证码都已取消。
cover: https://images.51allai.com/blog/openai-chatgpt-phone-verification-cover_20260804_002418.png
---

> OpenAI 已取消创建新账号和使用 ChatGPT 时的手机验证要求。这项变化不适用于所有场景：开发者在 API 平台首次生成密钥时仍需验证手机号，账户安全触发的登录验证和用户自行开启的 MFA 也没有被取消。
![OpenAI 取消 ChatGPT 注册手机验证](https://images.51allai.com/blog/openai-chatgpt-phone-verification-cover_20260804_002418.png)

## 注册和使用 ChatGPT 不再强制验证手机号

新用户创建 OpenAI 账号时，不再需要先提交手机号并输入短信验证码。只使用 ChatGPT 聊天、保存对话或管理账号的普通用户，不会因为这项基础手机验证要求而被卡在注册流程中。

已有账号的用户仍应按原来的方式登录。例如，通过 Google、Microsoft、Apple 或企业 SSO 注册的账号，需继续使用对应的登录入口。取消手机验证并不会自动改变账号的登录方式。

## 首次生成 API 密钥仍需手机验证

开发者使用 API 平台时，规则不同。新账号在 `platform.openai.com` 首次生成 API 密钥时，仍必须完成手机验证。该账号以后再创建其他 API 密钥，不需要重复这一步。

手机验证通过 SMS 短信完成；在支持的国家和地区，页面也可能提供 WhatsApp 接收一次性验证码的选项。这类手机验证不能改用电子邮件或语音电话完成。

同一手机号最多可用于 3 次这类验证。如果一个号码已用于 3 个 OpenAI 账号的首枚 API 密钥验证，不能继续用它为更多账号完成同类验证。

## 取消手机验证不等于取消所有登录验证

账号在新设备、未识别设备或异常位置发起登录时，仍可能触发额外的身份确认。这类验证可能是发送到注册邮箱的六位一次性密码，也可能是 ChatGPT 手机应用中的推送确认。它们用于判断登录者是否为账号本人，与过去注册时强制提交手机号是两套机制。

用户主动开启的多因素身份验证（MFA）也会继续生效。MFA 可选择身份验证器应用、推送通知、短信、WhatsApp 或通行密钥等方式，而且会同时适用于 ChatGPT 和 API 平台。取消注册手机验证后，不必因此关闭 MFA。

## 不同用户需要准备什么

| 使用场景 | 是否仍需手机号 | 需要注意的验证 |
| --- | --- | --- |
| 创建新账号、使用 ChatGPT | 不再强制 | 新设备或异常登录仍可能收到邮箱 OTP 或推送确认 |
| 首次生成 API 密钥 | 需要 | 通过 SMS 或支持地区的 WhatsApp 完成 |
| 同一账号后续生成 API 密钥 | 不需重复 | 仍要保管好账号和 API 密钥 |
| 已主动开启 MFA | 取决于用户选择的方式 | 登录时继续完成已启用的第二步验证 |

如果只使用 ChatGPT，现在不需要为基础注册流程额外准备手机号。如果计划调用 OpenAI API，则应在创建第一枚密钥前准备可接收 SMS 或 WhatsApp 验证码的号码。这是当前政策的实际分界。
