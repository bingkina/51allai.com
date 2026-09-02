function normalizeArticleSources(value) {
  if (!Array.isArray(value)) return [];

  return value.map(function (source, index) {
    if (!source || typeof source !== 'object') {
      throw new Error(`第 ${index + 1} 个来源必须包含 name 和 url`);
    }
    const name = String(source.name || '').trim();
    const rawUrl = String(source.url || '').trim();
    let parsedUrl;
    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      throw new Error(`来源“${name || index + 1}”的 URL 无效`);
    }
    if (!name || !['http:', 'https:'].includes(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password) {
      throw new Error(`来源“${name || index + 1}”必须使用无凭据的 HTTP(S) URL`);
    }
    return {
      name: name,
      url: parsedUrl.href,
      note: source.note ? String(source.note).trim() : ''
    };
  });
}

if (typeof hexo !== 'undefined') {
  hexo.extend.helper.register('article_sources', function (post) {
    return normalizeArticleSources(post && post.sources);
  });

  hexo.extend.filter.register('before_post_render', function (data) {
    if (!Object.prototype.hasOwnProperty.call(data, 'sources')) return data;
    const sources = normalizeArticleSources(data.sources);
    if ((data.layout === 'post' || data.layout === 'draft') && sources.length === 0) {
      throw new Error(`[文章来源] ${data.source || data.title} 的 sources 不能为空；请添加至少一个已核对的来源，旧文章可暂不设置该字段。`);
    }
    data.sources = sources;
    return data;
  });
}

module.exports = { normalizeArticleSources };
