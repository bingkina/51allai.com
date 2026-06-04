import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const scriptPath = new URL('../themes/vivia/source/js/webmcp.js', import.meta.url);
const script = await readFile(scriptPath, 'utf8');

function createContext({ navigatorModelContext = null, documentModelContext = null } = {}) {
  const fakeDocument = {
    modelContext: documentModelContext,
    querySelector: () => null,
    body: { textContent: '' },
  };
  const fakeWindow = {
    document: fakeDocument,
    location: {
      assign: () => {},
      href: 'https://51allai.com/',
      origin: 'https://51allai.com',
    },
    navigator: {
      modelContext: navigatorModelContext,
    },
  };

  return vm.createContext({
    Array,
    Boolean,
    DOMParser: function DOMParser() {},
    Error,
    Math,
    Number,
    RegExp,
    String,
    URL,
    console: {
      warn: (...args) => {
        throw new Error(`unexpected console warning: ${args.join(' ')}`);
      },
    },
    document: fakeDocument,
    navigator: fakeWindow.navigator,
    window: fakeWindow,
  });
}

let providedContext = null;
vm.runInContext(script, createContext({
  navigatorModelContext: {
    provideContext(payload) {
      providedContext = payload;
    },
  },
}));

assert.ok(providedContext, 'navigator.modelContext.provideContext must be called');
assert.equal(providedContext.tools.length, 4);
const providedToolNames = JSON.parse(JSON.stringify(providedContext.tools.map((tool) => tool.name)));

assert.deepEqual(providedToolNames, [
  'search_51allai_posts',
  'get_latest_51allai_posts',
  'get_current_51allai_page',
  'open_51allai_page',
]);

const registeredTools = [];
vm.runInContext(script, createContext({
  documentModelContext: {
    registerTool(tool) {
      registeredTools.push(tool);
    },
  },
}));

assert.deepEqual(registeredTools.map((tool) => tool.name), providedToolNames);
