#!/usr/bin/env node
'use strict';
/**
 * Submit latest post URL to IndexNow after hexo generate.
 * Reads the key and URL list that hexo-indexnow generator placed in public/.
 */
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const CONFIG_PATH = path.join(__dirname, '../_config.yml');

// Parse the apikey from _config.yml (simple yaml parsing for this one value)
const config = fs.readFileSync(CONFIG_PATH, 'utf8');
const match = config.match(/hexo_indexnow:\s*\n\s*apikey:\s*([^#\n]+)/);
if (!match) {
  console.error('IndexNow: apikey not found in _config.yml');
  process.exit(1);
}
const APIKEY = match[1].trim();

if (APIKEY === 'YOUR_INDEXNOW_KEY') {
  console.error('IndexNow: Please set a real apikey in _config.yml (indexnow section)');
  process.exit(1);
}

// Verify key file exists on the site (Hexo generator adds .txt extension)
const keyFile = path.join(PUBLIC_DIR, APIKEY + '.txt');
if (!fs.existsSync(keyFile)) {
  console.error(`IndexNow: Key file ${APIKEY}.txt not found in public/`);
  process.exit(1);
}

// Read URLs from the generated indexnow.txt (or custom txt_name)
const txtNameMatch = config.match(/txt_name:\s*([^#\n]+)/);
const txtName = txtNameMatch ? txtNameMatch[1].trim() : 'indexnow';
const urlsFile = path.join(PUBLIC_DIR, txtName);
if (!fs.existsSync(urlsFile)) {
  console.error(`IndexNow: URLs file ${txtName} not found in public/`);
  process.exit(1);
}

const urls = fs.readFileSync(urlsFile, 'utf8')
  .split('\n')
  .map(u => u.trim())
  .filter(Boolean);

if (urls.length === 0) {
  console.log('IndexNow: No URLs to submit');
  process.exit(0);
}

const site = 'https://51allai.com';
const payload = {
  host: site,
  key: APIKEY,
  keyLocation: `${site}/${APIKEY}.txt`,
  urlList: urls
};

console.log(`IndexNow: Submitting ${urls.length} URL(s) to indexnow.org`);
urls.forEach(u => console.log(`  - ${u}`));

fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
}).then(res => {
  if (res.ok) {
    console.log('IndexNow: Submitted successfully');
  } else {
    console.error(`IndexNow: Server returned ${res.status} ${res.statusText}`);
    res.text().then(t => console.error(t));
    process.exit(1);
  }
}).catch(err => {
  console.error('IndexNow: Request failed:', err.message);
  process.exit(1);
});
