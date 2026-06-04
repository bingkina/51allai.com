import {
  acceptsMarkdown,
  convertHtmlToMarkdown,
  isHtmlResponse,
  markdownHeaders,
} from './markdown-negotiation.js';

export async function onRequest(context) {
  const request = context.request;
  const response = await context.next();

  if (!acceptsMarkdown(request.headers.get('accept')) || !isHtmlResponse(response)) {
    return response;
  }

  const html = await response.text();
  const markdown = convertHtmlToMarkdown(html, request.url);
  const headers = markdownHeaders(response.headers, markdown);

  return new Response(markdown, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
