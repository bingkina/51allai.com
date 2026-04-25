// Cloudflare Pages Function: 老 WordPress `/archives/<id>` URL → 410 Gone
//
// 背景：站点从 WordPress 迁移到 Hexo 后，老文章 ID 在新站没有任何对应内容。
// GSC 数据显示 126 个老 ID URL 共积累 ~3000 展示但 0 点击，过去通过 _redirects
// 兜底 301 跳首页，被 Google 视为「软 404」拖累首页评级。改为 410 让 Google
// 明确知道这些 URL 永久消失，加速从索引剔除。
//
// 路由匹配：functions/archives/[id].js 仅匹配 `/archives/<单段>`。
//   - 1-3 位纯数字（老 WP 文章 ID，范围 11-904） → 返回 410
//   - 其他（如 4 位年份 2024/2025/.../tag/category 单段、Hexo 归档索引）
//     → 走 env.ASSETS.fetch() 让 _redirects + 静态资源管道接管
//
// 多段路径如 `/archives/tag/<slug>` 不会进入此 Function，由 _redirects 处理。

const GONE_BODY = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>该内容已下线 | 51AllAI</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif;max-width:600px;margin:80px auto;padding:0 20px;color:#1a1a2e;line-height:1.6}
h1{font-size:1.6em;margin-bottom:0.5em}
p{color:#555}
a{color:#5e5ce6;text-decoration:none}
a:hover{text-decoration:underline}
.actions{margin-top:2em;display:flex;gap:0.8em;flex-wrap:wrap}
.btn{display:inline-block;padding:0.55em 1.1em;background:#5e5ce6;color:#fff;border-radius:6px;font-size:0.95em}
.btn:hover{background:#4a48d4;text-decoration:none;color:#fff}
.btn.secondary{background:transparent;color:#5e5ce6;border:1px solid #5e5ce6}
.code{font-size:0.8em;color:#aaa;margin-top:3em}
</style>
</head>
<body>
<h1>该内容已下线</h1>
<p>这篇文章来自旧版网站，目前已不再提供。我们已将内容方向调整为最新的 AI 资讯报道。</p>
<div class="actions">
  <a class="btn" href="/">回到首页</a>
  <a class="btn secondary" href="/archives/">查看全部文章</a>
</div>
<p class="code">HTTP 410 Gone</p>
</body>
</html>`;

export async function onRequest(context) {
  const id = String(context.params.id || '');

  // 1-3 位纯数字 = 老 WP 文章 ID（最大值是 904）
  if (/^\d{1,3}$/.test(id)) {
    return new Response(GONE_BODY, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex',
      },
    });
  }

  // 其他单段路径（年份归档、tag/category 关键字单段、其他文字 slug）
  // 转交给静态资源 + _redirects 管道处理
  return context.env.ASSETS.fetch(context.request);
}
