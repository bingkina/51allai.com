'use strict';

const https = require('https');

const PREVIEW_PREFIX = '/__r2-preview/';
const R2_ORIGIN = 'https://images.51allai.com/';

function isAllowedPath(pathname) {
  return pathname.startsWith('blog/')
    && !pathname.includes('..')
    && !pathname.includes('?')
    && !pathname.includes('#');
}

function proxyR2Image(req, res, next) {
  if (!req.url.startsWith(PREVIEW_PREFIX)) return next();
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();

  let pathname;
  try {
    pathname = decodeURIComponent(req.url.slice(PREVIEW_PREFIX.length));
  } catch {
    res.statusCode = 400;
    res.end('Invalid image path');
    return;
  }

  if (!isAllowedPath(pathname)) {
    res.statusCode = 403;
    res.end('Image path is not allowed');
    return;
  }

  const remoteUrl = new URL(pathname, R2_ORIGIN);
  const upstream = https.get(remoteUrl, {
    headers: {
      'User-Agent': '51allai-local-preview'
    }
  }, upstreamResponse => {
    if (upstreamResponse.statusCode !== 200) {
      res.statusCode = upstreamResponse.statusCode || 502;
      upstreamResponse.resume();
      res.end('Unable to load preview image');
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', upstreamResponse.headers['content-type'] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'private, max-age=3600');

    if (req.method === 'HEAD') {
      upstreamResponse.resume();
      res.end();
      return;
    }

    upstreamResponse.pipe(res);
  });

  upstream.setTimeout(15000, () => {
    upstream.destroy(new Error('Preview image request timed out'));
  });
  upstream.on('error', next);
}

hexo.extend.filter.register('server_middleware', function registerLocalImageProxy(app) {
  app.use(proxyR2Image);
}, 1);

module.exports = {
  isAllowedPath,
  PREVIEW_PREFIX,
  proxyR2Image
};
