import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const script = await readFile(new URL('../themes/vivia/source/js/light-dark-switch.js', import.meta.url), 'utf8');

function setup() {
  let selectedMode;
  function node() {
    const attributes = new Map();
    const listeners = new Map();
    return {
      children: [],
      dataset: {},
      classList: { toggle() {} },
      setAttribute: (key, value) => attributes.set(key, value),
      getAttribute: key => attributes.get(key),
      addEventListener: (type, listener) => listeners.set(type, listener),
      emit(type, event = {}) { listeners.get(type)?.(event); },
      contains(target) { return target === this || this.children.some(child => child.contains(target)); },
      focus() { document.activeElement = this; },
    };
  }
  const document = node();
  const btn = node();
  const menu = node();
  const selector = node();
  const options = ['light', 'dark', 'auto'].map(mode => {
    const option = node();
    option.dataset.themeOption = mode;
    return option;
  });
  selector.children = [btn, menu];
  menu.children = options;
  menu.querySelectorAll = () => options;
  document.documentElement = node();
  document.documentElement.setAttribute('theme-mode', 'auto');
  document.activeElement = null;
  document.getElementById = id => ({ 'theme-btn': btn, 'theme-menu': menu, 'theme-selector': selector })[id];
  btn.setAttribute('aria-expanded', 'false');
  vm.runInNewContext(script, {
    document,
    window: { themeSettings: { setPreference(mode) { selectedMode = mode; } } },
    setTimeout,
  });
  return {
    document, btn, menu, selector, options,
    get selectedMode() { return selectedMode; },
    isOpen: () => btn.getAttribute('aria-expanded') === 'true',
  };
}

test('only click opens the menu; pointer movement never closes it', () => {
  const ui = setup();
  ui.selector.emit('pointerenter', { pointerType: 'mouse' });
  assert.equal(ui.isOpen(), false);
  ui.btn.emit('click');
  assert.equal(ui.isOpen(), true);
  ui.selector.emit('pointerleave', { pointerType: 'mouse' });
  assert.equal(ui.isOpen(), true);
  ui.btn.emit('click');
  assert.equal(ui.isOpen(), false);
});

test('outside click and Escape dismiss the menu', () => {
  const ui = setup();
  ui.btn.emit('click');
  ui.document.emit('click', { target: ui.document });
  assert.equal(ui.isOpen(), false);
  ui.btn.emit('click');
  ui.document.emit('keydown', { key: 'Escape' });
  assert.equal(ui.isOpen(), false);
  assert.equal(ui.document.activeElement, ui.btn);
});

test('selecting an option applies it and closes the menu', () => {
  const ui = setup();
  ui.btn.emit('click');
  ui.options[2].emit('click');
  assert.equal(ui.selectedMode, 'auto');
  assert.equal(ui.isOpen(), false);
  assert.equal(ui.document.activeElement, ui.btn);
});

test('keyboard navigation still opens the menu and focuses an option', () => {
  const ui = setup();
  ui.btn.emit('keydown', { key: 'ArrowDown', preventDefault() {} });
  assert.equal(ui.isOpen(), true);
  assert.equal(ui.document.activeElement, ui.options[0]);
});
