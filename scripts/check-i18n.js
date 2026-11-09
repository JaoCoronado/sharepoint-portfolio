#!/usr/bin/env node
'use strict';

// Validates the `translations` object in script.js against index.html.
//   1. en and es define the same keys.
//   2. Every key has a matching id="<key>" element in index.html.
//   3. No em dash in any value, except keys that already had one.
//   4. The separate `uiStrings` object has en/es key parity and no em dash.
// Exit 0 on success, 2 on failure (the exit code Claude Code hooks treat as blocking).
// Also usable as a hook: with hook JSON on stdin, it only runs when the edited
// file is script.js or index.html.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const EM_DASH = '—';

// Keys that already contained an em dash before this check existed.
// New copy must not add to this list.
const EM_DASH_ALLOWLIST = new Set([
  'hero-tagline',
  'exp5-b2',
  'project7-desc',
]);

function extractObject(source, name) {
  const marker = 'const ' + name + ' = {';
  const start = source.indexOf(marker);
  if (start === -1) throw new Error('Could not find "' + marker + '" in script.js');
  const open = start + marker.length - 1;

  let depth = 0;
  let quote = null;
  let i = open;
  for (; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (ch === '\\') { i++; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '\'' || ch === '"' || ch === '`') { quote = ch; continue; }
    if (ch === '/' && source[i + 1] === '/') {
      while (i < source.length && source[i] !== '\n') i++;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) throw new Error('Unbalanced braces while reading translations');
  const literal = source.slice(open, i + 1);
  return vm.runInNewContext('(' + literal + ')');
}

function run() {
  const scriptSrc = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const errors = [];

  let translations;
  let uiStrings;
  try {
    translations = extractObject(scriptSrc, 'translations');
    uiStrings = extractObject(scriptSrc, 'uiStrings');
  } catch (err) {
    console.error('i18n check: ' + err.message);
    process.exit(2);
  }

  const en = translations.en || {};
  const es = translations.es || {};
  const enKeys = Object.keys(en);
  const esKeys = Object.keys(es);

  enKeys.filter((k) => !(k in es)).forEach((k) => errors.push('Key "' + k + '" is in en but missing in es'));
  esKeys.filter((k) => !(k in en)).forEach((k) => errors.push('Key "' + k + '" is in es but missing in en'));

  // Placeholder keys live in the separate `placeholders` object, not in
  // `translations`, so every translations key must map to an element id.
  const ids = new Set();
  const idPattern = /\bid="([^"]+)"/g;
  let m;
  while ((m = idPattern.exec(html)) !== null) ids.add(m[1]);
  new Set([...enKeys, ...esKeys]).forEach((k) => {
    if (!ids.has(k)) errors.push('Key "' + k + '" has no element with id="' + k + '" in index.html');
  });

  ['en', 'es'].forEach((lang) => {
    Object.entries(translations[lang] || {}).forEach(([k, v]) => {
      if (typeof v === 'string' && v.includes(EM_DASH) && !EM_DASH_ALLOWLIST.has(k)) {
        errors.push('Key "' + k + '" (' + lang + ') contains an em dash; use an en dash or rephrase');
      }
    });
  });

  // uiStrings: aria-labels, alt text and modal UI with no element id, so only
  // key parity and the em dash rule apply.
  const uiEn = uiStrings.en || {};
  const uiEs = uiStrings.es || {};
  Object.keys(uiEn).filter((k) => !(k in uiEs)).forEach((k) => errors.push('uiStrings key "' + k + '" is in en but missing in es'));
  Object.keys(uiEs).filter((k) => !(k in uiEn)).forEach((k) => errors.push('uiStrings key "' + k + '" is in es but missing in en'));
  ['en', 'es'].forEach((lang) => {
    Object.entries(uiStrings[lang] || {}).forEach(([k, v]) => {
      if (String(v).includes(EM_DASH)) errors.push('uiStrings key "' + k + '" (' + lang + ') contains an em dash');
    });
  });

  if (errors.length) {
    console.error('i18n check failed (' + errors.length + '):');
    errors.forEach((e) => console.error('  - ' + e));
    process.exit(2);
  }
  console.log('i18n check passed (' + enKeys.length + ' keys).');
}

function shouldRun(stdin) {
  if (!stdin.trim()) return true;
  try {
    const payload = JSON.parse(stdin);
    const file = payload && payload.tool_input && payload.tool_input.file_path;
    if (!file) return true;
    const normalized = String(file).replace(/\\/g, '/');
    return normalized.endsWith('script.js') || normalized.endsWith('index.html');
  } catch (_) {
    return true;
  }
}

if (process.stdin.isTTY) {
  run();
} else {
  let data = '';
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    if (shouldRun(data)) run();
  };
  // Guard against a stdin that never closes when run manually.
  const timer = setTimeout(finish, 1500);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => { data += chunk; });
  process.stdin.on('end', () => { clearTimeout(timer); finish(); });
  process.stdin.on('error', () => { clearTimeout(timer); finish(); });
}
