import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const cardPath = new URL('../source/.well-known/agent-card.json', import.meta.url);
const headersPath = new URL('../source/_headers', import.meta.url);
const configPath = new URL('../_config.yml', import.meta.url);
const dnsAidPath = new URL('../source/.well-known/dns-aid', import.meta.url);

const card = JSON.parse(await readFile(cardPath, 'utf8'));

assert.equal(typeof card.name, 'string');
assert.ok(card.name.length > 0, 'agent card must include a name');
assert.equal(typeof card.version, 'string');
assert.match(card.version, /^\d+\.\d+\.\d+$/);
assert.equal(typeof card.description, 'string');
assert.ok(card.description.length > 0, 'agent card must include a description');

assert.ok(Array.isArray(card.supportedInterfaces));
assert.ok(card.supportedInterfaces.length > 0, 'agent card must expose an interface');
for (const serviceInterface of card.supportedInterfaces) {
  assert.match(serviceInterface.url, /^https:\/\//);
  assert.ok(
    ['JSONRPC', 'GRPC', 'HTTP+JSON'].includes(serviceInterface.protocolBinding),
    `unsupported A2A protocol binding: ${serviceInterface.protocolBinding}`
  );
  assert.match(serviceInterface.protocolVersion, /^\d+\.\d+$/);
}

assert.equal(typeof card.capabilities, 'object');
assert.ok(!Array.isArray(card.capabilities));
assert.ok(Array.isArray(card.defaultInputModes));
assert.ok(card.defaultInputModes.length > 0);
assert.ok(Array.isArray(card.defaultOutputModes));
assert.ok(card.defaultOutputModes.length > 0);

assert.ok(Array.isArray(card.skills));
assert.ok(card.skills.length > 0, 'agent card must list at least one skill');
for (const skill of card.skills) {
  assert.equal(typeof skill.id, 'string');
  assert.ok(skill.id.length > 0);
  assert.equal(typeof skill.name, 'string');
  assert.ok(skill.name.length > 0);
  assert.equal(typeof skill.description, 'string');
  assert.ok(skill.description.length > 0);
  assert.ok(Array.isArray(skill.tags));
  assert.ok(skill.tags.length > 0, `skill ${skill.id} must include tags`);
}

const headers = await readFile(headersPath, 'utf8');
assert.match(headers, /\/\.well-known\/agent-card\.json/);
assert.match(headers, /Content-Type: application\/json/);

const config = await readFile(configPath, 'utf8');
assert.match(config, /\.well-known\/agent-card\.json/);

const dnsAid = JSON.parse(await readFile(dnsAidPath, 'utf8'));
assert.equal(
  dnsAid.entrypoints.a2aAgentCard,
  'https://51allai.com/.well-known/agent-card.json'
);
