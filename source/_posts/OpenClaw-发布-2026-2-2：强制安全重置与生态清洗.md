---
title: OpenClaw 发布 2026.2.2：强制安全重置与生态清洗
date: 2026-02-04 20:32:48
tags:
---

>  OpenClaw 2026.2.2 是针对近期 **CVE-2026-25253 RCE 漏洞**的强制性安全修复版本。该版本**废除所有旧版 Token**（Classic Tokens），引入了隔离的浏览器环境，并对充斥着恶意插件的 ClawHub 生态启动了清洗机制。建议所有自托管用户立即更新。
![iShot_2026-02-04_20.31.35](https://images.51allai.com/blog/iShot_2026-02-04_20.31.35_20260204_203456.png)


* **安全重置**
* **Token 强制撤销**: 2026.2.2 版本宣布**所有旧版“Classic Tokens”失效**。这是对 CVE-2026-25253 的彻底响应，该漏洞曾允许攻击者通过恶意链接劫持 WebSocket 连接，实现单次点击远程代码执行 (1-click RCE)。
* **WebSocket 来源验证**: 修复了 Gateway 的 WebSocket Origin 验证逻辑，封堵了跨站 WebSocket 劫持 (CSWSH) 攻击面。
* **权限收束**: 新增了针对 `/elevated` 权限的会话级开关，默认禁止 Agent 获取宿主机 Root/Admin 权限，除非用户显式开启。

* **隔离浏览器环境**
* **沙盒化自动化**: 引入 `openclaw-managed` 浏览器配置。Agent 现在可以在一个完全隔离的 Chrome/Brave 配置文件中运行，与用户的个人浏览器数据（Cookie、密码）物理隔离。
* **功能**: 支持确定性的标签页控制、AI 截图 (Snapshot) 及无头模式运行，解决了此前 Agent 直接操作用户主浏览器导致的数据泄露风险。

* **生态治理**
* **ClawHub 恶意插件**: 安全审计公司 Koi Security 在 ClawHub 市场中发现了 **341 个恶意 Skill**（窃取 SSH 密钥、AWS凭证）。
* **新机制**: 2026.2.2 内置了针对 Skill 的举报与签名验证机制，任何未经验证的 Skill 在安装时将触发高风险警报。

* **企业级部署**
* **NEAR AI 集成**: 官方宣布支持 NEAR AI Cloud 的机密计算环境 (TEE)，允许在加密隔离区运行 OpenClaw，解决了企业用户对数据隐私的顾虑。