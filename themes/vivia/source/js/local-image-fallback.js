(function () {
  const isLocalPreview = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
  if (!isLocalPreview) return;

  const r2Origin = 'https://images.51allai.com';
  const previewPrefix = '/__r2-preview/';

  function previewUrl(source) {
    try {
      const url = new URL(source, window.location.href);
      if (url.origin !== r2Origin || !url.pathname.startsWith('/blog/')) return '';
      return previewPrefix + url.pathname
        .slice(1)
        .split('/')
        .map(encodeURIComponent)
        .join('/');
    } catch {
      return '';
    }
  }

  function enableFallback(image) {
    const fallback = previewUrl(image.currentSrc || image.src);
    if (!fallback) return;

    const useFallback = function () {
      if (image.dataset.localPreviewFallback === 'true') return;
      image.dataset.localPreviewFallback = 'true';
      image.src = fallback;
    };

    image.addEventListener('error', useFallback, { once: true });
    if (image.complete && image.naturalWidth === 0) useFallback();
  }

  document.querySelectorAll('img[src^="https://images.51allai.com/blog/"]').forEach(enableFallback);
}());
