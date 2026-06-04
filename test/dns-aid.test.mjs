import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const zonePath = new URL('../dns/dns-aid.zone', import.meta.url);
const descriptorPath = new URL('../source/.well-known/dns-aid', import.meta.url);
const headersPath = new URL('../source/_headers', import.meta.url);
const configPath = new URL('../_config.yml', import.meta.url);

const zone = await readFile(zonePath, 'utf8');
const descriptor = JSON.parse(await readFile(descriptorPath, 'utf8'));
const headers = await readFile(headersPath, 'utf8');
const config = await readFile(configPath, 'utf8');

assert.match(zone, /_index\._agents\s+300\s+IN\s+HTTPS\s+1\s+51allai\.com\./);
assert.match(zone, /alpn="h2,h3"/);
assert.match(zone, /endpoint="\/\.well-known\/dns-aid"/);
assert.match(zone, /_a2a\._agents\s+300\s+IN\s+SVCB\s+0\s+_index\._agents\.51allai\.com\./);
assert.match(zone, /_mcp\._agents\s+300\s+IN\s+SVCB\s+0\s+_index\._agents\.51allai\.com\./);
assert.match(zone, /DNSSEC/);

assert.equal(descriptor.version, 'DNS-AID1');
assert.equal(descriptor.domain, '51allai.com');
assert.equal(descriptor.entrypoints.index, 'https://51allai.com/.well-known/dns-aid');
assert.equal(descriptor.dnssec.required, true);
assert.ok(descriptor.records.some((record) =>
  record.owner === '_index._agents.51allai.com' &&
  record.type === 'HTTPS' &&
  record.params.endpoint === '/.well-known/dns-aid'
));

assert.match(headers, /\/\.well-known\/dns-aid/);
assert.match(headers, /Content-Type: application\/json/);
assert.match(config, /\.well-known\/dns-aid/);
