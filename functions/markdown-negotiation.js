const CONTENT_TAG_RE = /<(article|main)\b[^>]*>[\s\S]*?<\/\1>/i;
const JSON_LD_RE = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

export function acceptsMarkdown(acceptHeader) {
  if (!acceptHeader) return false;

  return acceptHeader
    .split(',')
    .map((part) => part.trim().toLowerCase())
    .some((part) => {
      const [type, ...params] = part.split(';').map((value) => value.trim());
      if (type !== 'text/markdown') return false;

      const q = params.find((param) => param.startsWith('q='));
      return !q || Number(q.slice(2)) > 0;
    });
}

export function isHtmlResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  return contentType.toLowerCase().includes('text/html');
}

export function convertHtmlToMarkdown(html, baseUrl) {
  const jsonLdBlocks = extractJsonLd(html);
  const frontmatter = buildFrontmatter(html);
  const contentHtml = extractContentHtml(html);
  const body = htmlToMarkdown(contentHtml, baseUrl);
  const jsonLd = jsonLdBlocks.length
    ? `\n\n\`\`\`json\n${jsonLdBlocks.join('\n')}\n\`\`\``
    : '';

  return [frontmatter, body].filter(Boolean).join('\n\n').trim() + jsonLd + '\n';
}

export function markdownHeaders(sourceHeaders, markdown, existingVary) {
  const headers = new Headers(sourceHeaders);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('Vary', mergeVary(existingVary || headers.get('vary'), 'Accept'));
  headers.set('x-markdown-tokens', String(estimateTokens(markdown)));
  headers.delete('Content-Length');
  return headers;
}

function extractJsonLd(html) {
  const blocks = [];
  let match;

  while ((match = JSON_LD_RE.exec(html))) {
    const json = decodeHtml(match[1]).trim();
    if (json) blocks.push(json);
  }

  return blocks;
}

function buildFrontmatter(html) {
  const fields = [
    ['title', getMeta(html, 'name', 'title') || getMeta(html, 'property', 'og:title') || getTitle(html)],
    ['description', getMeta(html, 'name', 'description') || getMeta(html, 'property', 'og:description')],
    ['image', getMeta(html, 'property', 'og:image')],
  ].filter(([, value]) => value);

  if (!fields.length) return '';

  const lines = fields.map(([key, value]) => `${key}: ${yamlScalar(value)}`);
  return ['---', ...lines, '---'].join('\n');
}

function getTitle(html) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtml(stripTags(match[1])).trim() : '';
}

function getMeta(html, attrName, attrValue) {
  const tag = findMetaTag(html, attrName, attrValue);
  if (!tag) return '';

  const content = getAttribute(tag, 'content');
  return content ? decodeHtml(content).trim() : '';
}

function findMetaTag(html, attrName, attrValue) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  return metaTags.find((tag) => (getAttribute(tag, attrName) || '').toLowerCase() === attrValue);
}

function getAttribute(tag, name) {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i');
  const quoted = tag.match(pattern);
  if (quoted) return quoted[2];

  const unquoted = tag.match(new RegExp(`\\b${name}\\s*=\\s*([^\\s>]+)`, 'i'));
  return unquoted ? unquoted[1] : '';
}

function extractContentHtml(html) {
  const contentMatch = html.match(CONTENT_TAG_RE);
  if (contentMatch) return contentMatch[0];

  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

function htmlToMarkdown(html, baseUrl) {
  let text = html
    .replace(JSON_LD_RE, '')
    .replace(/<(nav|footer|header|aside|script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p\b[^>]*>/gi, '')
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_match, level, content) => {
      return `\n\n${'#'.repeat(Number(level))} ${inlineMarkdown(content, baseUrl)}\n\n`;
    })
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_match, content) => {
      return `\n- ${inlineMarkdown(content, baseUrl).replace(/\n+/g, ' ')}\n`;
    })
    .replace(/<\/?(ul|ol)\b[^>]*>/gi, '\n')
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_match, content) => {
      return `\n\n> ${inlineMarkdown(content, baseUrl).replace(/\n+/g, '\n> ')}\n\n`;
    })
    .replace(/<pre\b[^>]*><code\b[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_match, content) => {
      return `\n\n\`\`\`\n${decodeHtml(content).trim()}\n\`\`\`\n\n`;
    });

  text = inlineMarkdown(text, baseUrl);
  text = stripTags(text);
  return normalizeWhitespace(decodeHtml(text));
}

function inlineMarkdown(html, baseUrl) {
  return html
    .replace(/<img\b[^>]*>/gi, (tag) => {
      const src = absolutizeUrl(getAttribute(tag, 'src'), baseUrl);
      const alt = getAttribute(tag, 'alt') || '';
      return src ? `![${escapeMarkdown(alt)}](${src})` : '';
    })
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_match, href, label) => {
      const text = decodeHtml(stripTags(label)).trim();
      const url = absolutizeUrl(href, baseUrl);
      return text && url ? `[${escapeMarkdown(text)}](${url})` : text;
    })
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_match, _tag, content) => {
      return `**${decodeHtml(stripTags(content)).trim()}**`;
    })
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_match, _tag, content) => {
      return `*${decodeHtml(stripTags(content)).trim()}*`;
    })
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_match, content) => {
      return `\`${decodeHtml(stripTags(content)).trim()}\``;
    });
}

function absolutizeUrl(url, baseUrl) {
  if (!url) return '';

  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return url;
  }
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, '');
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeWhitespace(value) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function escapeMarkdown(value) {
  return value.replace(/[[\]\\]/g, '\\$&');
}

function yamlScalar(value) {
  const clean = normalizeWhitespace(value).replace(/"/g, '\\"');
  return /:\s|#|\n|^\s|\s$/.test(clean) ? `"${clean}"` : clean;
}

function mergeVary(vary, value) {
  const parts = (vary || '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.some((part) => part.toLowerCase() === value.toLowerCase())) {
    parts.push(value);
  }

  return parts.join(', ');
}

function estimateTokens(markdown) {
  const asciiWords = markdown.match(/[A-Za-z0-9_]+/g) || [];
  const cjkChars = markdown.match(/[\u3400-\u9fff]/g) || [];
  return Math.max(1, Math.ceil(asciiWords.length * 1.3 + cjkChars.length));
}
