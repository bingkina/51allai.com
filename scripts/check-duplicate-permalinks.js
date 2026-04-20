// 构建前检测 permalink 冲突：两篇文章同路径会导致 Hexo 静默覆盖，只保留其中一篇
// 触发时机：hexo generate / deploy 的 before_generate 阶段（此时 posts/pages 已解析完毕）
// 冲突时直接 throw，让整个构建失败而不是悄悄继续
hexo.extend.filter.register('before_generate', function () {
  const buckets = new Map(); // path -> [{ source, permalink, kind }]

  const collect = (items, kind) => {
    for (const item of items) {
      const path = item.path;
      if (!path) continue;
      if (!buckets.has(path)) buckets.set(path, []);
      buckets.get(path).push({
        source: item.source,
        permalink: item.permalink,
        kind: kind,
      });
    }
  };

  collect(hexo.locals.get('posts').toArray(), 'post');
  collect(hexo.locals.get('pages').toArray(), 'page');

  const conflicts = [];
  for (const [path, entries] of buckets) {
    if (entries.length > 1) conflicts.push({ path, entries });
  }

  if (conflicts.length === 0) return;

  const lines = [
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '检测到 permalink 冲突，构建已中断：',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ];
  for (const { path, entries } of conflicts) {
    lines.push(`  路径 ${path}  被以下 ${entries.length} 篇同时占用：`);
    for (const entry of entries) {
      lines.push(`    - [${entry.kind}] ${entry.source}`);
    }
    lines.push('');
  }
  lines.push('请修改相关文章 frontmatter 的 permalink 字段，保持站内路径唯一。');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  throw new Error(lines.join('\n'));
});
