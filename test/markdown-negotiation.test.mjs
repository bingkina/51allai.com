import assert from 'node:assert/strict';
import {
  acceptsMarkdown,
  convertHtmlToMarkdown,
  markdownHeaders,
} from '../functions/markdown-negotiation.js';
import { onRequest } from '../functions/_middleware.js';

const html = `<!doctype html>
<html>
<head>
  <title>51AllAI</title>
  <meta name="description" content="AI news and analysis">
  <meta property="og:image" content="https://example.com/cover.png">
  <script type="application/ld+json">{"@context":"https://schema.org"}</script>
</head>
<body>
  <nav>Navigation should be stripped</nav>
  <article>
    <h1>Agent Ready</h1>
    <p>Hello <strong>Markdown</strong> agents.</p>
    <a href="/about/">About</a>
  </article>
  <footer>Footer should be stripped</footer>
</body>
</html>`;

assert.equal(acceptsMarkdown('text/html, text/markdown;q=0.9'), true);
assert.equal(acceptsMarkdown('text/html,application/xhtml+xml'), false);

const markdown = convertHtmlToMarkdown(html, 'https://51allai.com/posts/agent-ready/');
assert.match(markdown, /^---\ntitle: 51AllAI\ndescription: AI news and analysis\nimage: https:\/\/example.com\/cover\.png\n---/);
assert.match(markdown, /# Agent Ready/);
assert.match(markdown, /Hello \*\*Markdown\*\* agents\./);
assert.match(markdown, /\[About\]\(https:\/\/51allai.com\/about\/\)/);
assert.doesNotMatch(markdown, /Navigation should be stripped/);
assert.match(markdown, /```json\n{"@context":"https:\/\/schema.org"}\n```/);

const headers = markdownHeaders(new Headers({ 'content-type': 'text/html; charset=utf-8' }), markdown, 'Accept');
assert.equal(headers.get('content-type'), 'text/markdown; charset=utf-8');
assert.equal(headers.get('vary'), 'Accept');
assert.match(headers.get('x-markdown-tokens'), /^\d+$/);

const htmlResponse = new Response(html, {
  headers: { 'content-type': 'text/html; charset=utf-8' },
});
const browserResponse = await onRequest({
  request: new Request('https://51allai.com/posts/agent-ready/'),
  next: () => htmlResponse.clone(),
});
assert.equal(browserResponse.headers.get('content-type'), 'text/html; charset=utf-8');

const agentResponse = await onRequest({
  request: new Request('https://51allai.com/posts/agent-ready/', {
    headers: { accept: 'text/markdown' },
  }),
  next: () => htmlResponse.clone(),
});
assert.equal(agentResponse.headers.get('content-type'), 'text/markdown; charset=utf-8');
assert.match(agentResponse.headers.get('x-markdown-tokens'), /^\d+$/);
assert.match(await agentResponse.text(), /# Agent Ready/);
