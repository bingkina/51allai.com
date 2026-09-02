import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const searchScript = await readFile(new URL('../scripts/pagefind-search.js', import.meta.url), 'utf8');
const articleTemplate = await readFile(new URL('../themes/vivia/layout/_partial/article.ejs', import.meta.url), 'utf8');

assert.match(packageJson.scripts.build, /pagefind --site public/);
assert.ok(packageJson.devDependencies.pagefind, 'Pagefind must be installed as a build dependency');
assert.equal(packageJson.dependencies['hexo-algoliasearch'], undefined);
assert.match(searchScript, /import\('\/pagefind\/pagefind\.js'\)/);
assert.doesNotMatch(searchScript, /algoliasearch|instantsearch/i);
assert.match(searchScript, /aria-live="polite"/);
assert.match(articleTemplate, /data-pagefind-body/);
