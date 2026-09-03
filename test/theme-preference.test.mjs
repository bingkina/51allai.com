import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const scriptPath = new URL('../themes/vivia/source/js/load-settings.js', import.meta.url);
const script = await readFile(scriptPath, 'utf8');

function runSettings({ savedTheme = null, systemDark = false } = {}) {
  const attributes = new Map();
  const listeners = new Map();
  const themeColorAttributes = new Map([
    ['content', '#7C3AED'],
    ['data-light-color', '#7C3AED'],
    ['data-dark-color', '#090D18'],
  ]);
  const mediaQuery = {
    matches: systemDark,
    addEventListener(type, listener) {
      listeners.set(type, listener);
    },
  };
  const document = {
    documentElement: {
      setAttribute(name, value) {
        attributes.set(name, String(value));
      },
    },
    querySelector(selector) {
      if (selector !== 'meta[name="theme-color"]') return null;
      return {
        getAttribute: (name) => themeColorAttributes.get(name),
        setAttribute: (name, value) => themeColorAttributes.set(name, value),
      };
    },
    dispatchEvent() {},
  };
  const context = vm.createContext({
    CustomEvent: function CustomEvent() {},
    document,
    localStorage: {
      getItem(key) {
        if (key === 'theme') return savedTheme;
        return null;
      },
      setItem(key, value) {
        if (key === 'theme') savedTheme = value;
      },
      removeItem(key) {
        if (key === 'theme') savedTheme = null;
      },
    },
    window: {
      CustomEvent: function CustomEvent() {},
      matchMedia: () => mediaQuery,
    },
  });

  vm.runInContext(script, context);
  return { attributes, listeners, themeColorAttributes, window: context.window };
}

const systemDark = runSettings({ systemDark: true });
assert.equal(systemDark.attributes.get('theme'), 'dark');
assert.equal(systemDark.themeColorAttributes.get('content'), '#090D18');

const systemLight = runSettings({ systemDark: false });
assert.equal(systemLight.attributes.get('theme'), 'light');

const savedLight = runSettings({ savedTheme: 'light', systemDark: true });
assert.equal(savedLight.attributes.get('theme'), 'light');

const followsSystemChanges = runSettings({ systemDark: false });
followsSystemChanges.listeners.get('change')({ matches: true });
assert.equal(followsSystemChanges.attributes.get('theme'), 'dark');

const savedThemeIgnoresSystemChanges = runSettings({ savedTheme: 'dark', systemDark: true });
savedThemeIgnoresSystemChanges.listeners.get('change')({ matches: false });
assert.equal(savedThemeIgnoresSystemChanges.attributes.get('theme'), 'dark');

const manualTheme = runSettings({ systemDark: false });
manualTheme.window.themeSettings.setPreference('dark');
assert.equal(manualTheme.attributes.get('theme'), 'dark');
assert.equal(manualTheme.attributes.get('theme-mode'), 'dark');

manualTheme.window.themeSettings.setPreference('auto');
assert.equal(manualTheme.attributes.get('theme'), 'light');
assert.equal(manualTheme.attributes.get('theme-mode'), 'auto');
