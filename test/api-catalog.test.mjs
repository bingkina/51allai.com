import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const catalogPath = new URL('../source/.well-known/api-catalog', import.meta.url);
const headersPath = new URL('../source/_headers', import.meta.url);

const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));

assert.ok(Array.isArray(catalog.linkset), 'api catalog must contain a linkset array');
assert.ok(catalog.linkset.length > 0, 'api catalog must list at least one API');

for (const entry of catalog.linkset) {
  assert.match(entry.anchor, /^https:\/\/51allai\.com\//);
  assert.ok(Array.isArray(entry['service-desc']), 'entry must include service-desc links');
  assert.ok(Array.isArray(entry['service-doc']), 'entry must include service-doc links');
  assert.ok(Array.isArray(entry.status), 'entry must include status links');
}

const contentTypes = catalog.linkset.flatMap((entry) =>
  entry['service-desc'].map((link) => link.type)
);
assert.ok(contentTypes.includes('application/openapi+json'));

const headers = await readFile(headersPath, 'utf8');
assert.match(headers, /\/\.well-known\/api-catalog/);
assert.match(headers, /Content-Type: application\/linkset\+json/);
