(function () {
  'use strict';

  const SITE_NAME = '51AllAI';
  const MAX_LIMIT = 10;

  function clampLimit(limit, fallback) {
    const value = Number.parseInt(limit, 10);
    if (!Number.isFinite(value) || value < 1) return fallback;
    return Math.min(value, MAX_LIMIT);
  }

  function textContent(node, selector) {
    const match = node.querySelector(selector);
    return match ? match.textContent.trim() : '';
  }

  function absoluteUrl(value) {
    return new URL(value || '/', window.location.origin).href;
  }

  async function fetchXml(path) {
    const response = await fetch(path, {
      headers: { Accept: 'application/xml, text/xml;q=0.9, */*;q=0.1' },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }
    const xml = await response.text();
    return new DOMParser().parseFromString(xml, 'application/xml');
  }

  function normalizeSearchText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function getMetaContent(selector) {
    const match = document.querySelector(selector);
    return match ? match.getAttribute('content') || '' : '';
  }

  async function searchPosts({ query, limit }) {
    const normalizedQuery = normalizeSearchText(query).toLowerCase();
    if (!normalizedQuery) {
      throw new Error('query is required');
    }

    const maxResults = clampLimit(limit, 5);
    const doc = await fetchXml('/search.xml');
    const entries = Array.from(doc.querySelectorAll('entry'));

    const results = entries
      .map((entry) => {
        const title = textContent(entry, 'title');
        const url = absoluteUrl(textContent(entry, 'url'));
        const content = normalizeSearchText(textContent(entry, 'content'));
        const haystack = `${title} ${content}`.toLowerCase();

        if (!haystack.includes(normalizedQuery)) return null;

        const index = haystack.indexOf(normalizedQuery);
        const excerptStart = Math.max(0, index - 60);
        const excerpt = content.slice(excerptStart, excerptStart + 180);

        return { title, url, excerpt };
      })
      .filter(Boolean)
      .slice(0, maxResults);

    return {
      query,
      count: results.length,
      results,
    };
  }

  async function getLatestPosts({ limit } = {}) {
    const maxResults = clampLimit(limit, 5);
    const doc = await fetchXml('/atom.xml');
    const entries = Array.from(doc.querySelectorAll('entry')).slice(0, maxResults);

    return {
      count: entries.length,
      results: entries.map((entry) => ({
        title: textContent(entry, 'title'),
        url: absoluteUrl(textContent(entry, 'link[rel="alternate"]') || entry.querySelector('link')?.getAttribute('href')),
        updated: textContent(entry, 'updated') || textContent(entry, 'published'),
        summary: normalizeSearchText(textContent(entry, 'summary') || textContent(entry, 'content')).slice(0, 220),
      })),
    };
  }

  async function getCurrentPage() {
    const article = document.querySelector('article') || document.querySelector('#content-body') || document.body;
    const rawText = article ? article.textContent : document.body.textContent;
    const text = normalizeSearchText(rawText).slice(0, 2000);

    return {
      title: document.title,
      url: window.location.href,
      description: getMetaContent('meta[name="description"]'),
      image: getMetaContent('meta[property="og:image"]') || getMetaContent('meta[name="twitter:image"]'),
      text,
    };
  }

  async function openSitePage({ url }) {
    if (!url) {
      throw new Error('url is required');
    }

    const target = new URL(url, window.location.origin);
    if (target.origin !== window.location.origin) {
      throw new Error(`Only ${SITE_NAME} same-origin URLs can be opened`);
    }

    window.location.assign(target.href);
    return null;
  }

  const tools = [
    {
      name: 'search_51allai_posts',
      title: 'Search 51AllAI Posts',
      description: 'Search public 51AllAI articles by keyword and return matching titles, URLs, and short excerpts.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            minLength: 1,
            maxLength: 120,
            description: 'Keyword or phrase to search for in 51AllAI public articles.',
          },
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: MAX_LIMIT,
            default: 5,
            description: 'Maximum number of matching articles to return.',
          },
        },
        required: ['query'],
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: true,
      },
      execute: searchPosts,
    },
    {
      name: 'get_latest_51allai_posts',
      title: 'Get Latest 51AllAI Posts',
      description: 'Return the latest public 51AllAI articles from the Atom feed.',
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'integer',
            minimum: 1,
            maximum: MAX_LIMIT,
            default: 5,
            description: 'Maximum number of recent articles to return.',
          },
        },
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: true,
      },
      execute: getLatestPosts,
    },
    {
      name: 'get_current_51allai_page',
      title: 'Get Current 51AllAI Page',
      description: 'Return metadata and a short text excerpt from the currently visible 51AllAI page.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: true,
      },
      execute: getCurrentPage,
    },
    {
      name: 'open_51allai_page',
      title: 'Open 51AllAI Page',
      description: 'Navigate this browser tab to a same-origin 51AllAI URL or path.',
      inputSchema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            minLength: 1,
            maxLength: 300,
            description: 'A same-origin 51AllAI absolute URL or root-relative path.',
          },
        },
        required: ['url'],
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: false,
        untrustedContentHint: false,
      },
      execute: openSitePage,
    },
  ];

  function registerWithModelContext(modelContext) {
    if (!modelContext) return false;

    if (typeof modelContext.provideContext === 'function') {
      modelContext.provideContext({ tools });
      return true;
    }

    if (typeof modelContext.registerTool === 'function') {
      tools.forEach((tool) => {
        try {
          modelContext.registerTool(tool);
        } catch (error) {
          if (!/already|exist|duplicate/i.test(String(error && error.message))) {
            throw error;
          }
        }
      });
      return true;
    }

    return false;
  }

  function registerWebMcpTools() {
    const candidates = [];
    if (window.navigator && window.navigator.modelContext) {
      candidates.push(window.navigator.modelContext);
    }
    if (document.modelContext && !candidates.includes(document.modelContext)) {
      candidates.push(document.modelContext);
    }

    candidates.forEach((modelContext) => {
      try {
        registerWithModelContext(modelContext);
      } catch (error) {
        console.warn(`${SITE_NAME} WebMCP tool registration failed`, error);
      }
    });
  }

  registerWebMcpTools();
})();
