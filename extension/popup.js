const BASE_URL = 'https://devstools.app';
let allTools = [];
let activeCategory = 'all';

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
chrome.storage.local.get(['theme'], (result) => {
  const isDark = result.theme === 'dark' || (!result.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  setTheme(isDark ? 'dark' : 'light');
});

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  chrome.storage.local.set({ theme: next });
});

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    tabPanes.forEach((p) => p.classList.remove('active'));

    btn.classList.add('active');
    tabButtons.forEach((button) => button.setAttribute('aria-selected', String(button === btn)));
    const targetId = `pane-${btn.getAttribute('data-tab')}`;
    const targetPane = document.getElementById(targetId);
    if (targetPane) targetPane.classList.add('active');
  });
});

// Load Catalog & Search
const searchInput = document.getElementById('tool-search-input');
const searchResults = document.getElementById('search-results');
const clearSearchBtn = document.getElementById('clear-search');
const categoryChips = document.querySelectorAll('.chip');

async function initCatalog() {
  try {
    const res = await fetch('catalog.json');
    allTools = await res.json();
    document.getElementById('tool-count').textContent = `${allTools.length} Tools`;
    searchInput.placeholder = `Search ${allTools.length} tools (e.g. json, jwt, curl)...`;
    document.getElementById('web-suite-link').textContent = `Open Web Suite (${allTools.length} Tools) ↗`;
    renderTools(allTools.slice(0, 20));
  } catch (err) {
    console.error('Failed to load catalog:', err);
    searchResults.innerHTML = '<div style="padding:10px;text-align:center;color:var(--text-muted)">Failed to load catalog.</div>';
  }
}

function renderTools(tools) {
  if (!tools.length) {
    searchResults.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:12px;">No tools found matching your search.</div>';
    return;
  }

  searchResults.replaceChildren(...tools.map((tool) => {
    const link = document.createElement('a');
    link.href = `${BASE_URL}/tools/${encodeURIComponent(tool.categorySlug)}/${encodeURIComponent(tool.slug)}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'tool-item';
    const info = document.createElement('div');
    info.className = 'tool-info';
    for (const [className, text] of [['tool-title', tool.name], ['tool-desc', tool.shortDescription || '']]) {
      const span = document.createElement('span');
      span.className = className;
      span.textContent = text;
      info.append(span);
    }
    const category = document.createElement('span');
    category.className = 'tool-cat-badge';
    category.textContent = tool.categoryName || tool.categorySlug;
    link.append(info, category);
    return link;
  }));
}

function filterTools() {
  const query = searchInput.value.trim().toLowerCase();
  clearSearchBtn.style.display = query ? 'block' : 'none';

  let filtered = allTools;

  if (activeCategory !== 'all') {
    filtered = filtered.filter((t) => t.categorySlug === activeCategory);
  }

  if (query) {
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.slug.toLowerCase().includes(query) ||
        t.shortDescription.toLowerCase().includes(query) ||
        t.categorySlug.toLowerCase().includes(query),
    );
  }

  renderTools(filtered.slice(0, 30));
}

searchInput.addEventListener('input', filterTools);

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterTools();
  searchInput.focus();
});

categoryChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    categoryChips.forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeCategory = chip.getAttribute('data-cat');
    filterTools();
  });
});

// Offline Quick Tools Tab
const quickNavBtns = document.querySelectorAll('.quick-nav-btn');
const quickToolViews = document.querySelectorAll('.quick-tool-view');

quickNavBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    quickNavBtns.forEach((b) => b.classList.remove('active'));
    quickToolViews.forEach((v) => v.classList.remove('active'));

    btn.classList.add('active');
    const toolId = `tool-${btn.getAttribute('data-tool')}`;
    const targetTool = document.getElementById(toolId);
    if (targetTool) targetTool.classList.add('active');
  });
});

// 1. Quick JSON Tool
const jsonInput = document.getElementById('json-input');
const jsonMsg = document.getElementById('json-msg');

document.getElementById('btn-json-prettify').addEventListener('click', () => {
  try {
    const val = jsonInput.value.trim();
    if (!val) return;
    const parsed = JSON.parse(val);
    jsonInput.value = JSON.stringify(parsed, null, 2);
    showStatus(jsonMsg, 'Formatted JSON successfully!', 'success');
  } catch (err) {
    showStatus(jsonMsg, `Invalid JSON: ${err.message}`, 'error');
  }
});

document.getElementById('btn-json-minify').addEventListener('click', () => {
  try {
    const val = jsonInput.value.trim();
    if (!val) return;
    const parsed = JSON.parse(val);
    jsonInput.value = JSON.stringify(parsed);
    showStatus(jsonMsg, 'Minified JSON successfully!', 'success');
  } catch (err) {
    showStatus(jsonMsg, `Invalid JSON: ${err.message}`, 'error');
  }
});

document.getElementById('btn-json-copy').addEventListener('click', () => {
  copyToClipboard(jsonInput.value, jsonMsg, 'JSON copied to clipboard!');
});

document.getElementById('btn-json-clear').addEventListener('click', () => {
  jsonInput.value = '';
  jsonMsg.textContent = '';
});

// 2. Quick Base64 Tool
const b64Input = document.getElementById('b64-input');
const b64Msg = document.getElementById('b64-msg');

document.getElementById('btn-b64-encode').addEventListener('click', () => {
  try {
    const val = b64Input.value;
    if (!val) return;
    b64Input.value = btoa(unescape(encodeURIComponent(val)));
    showStatus(b64Msg, 'Encoded to Base64!', 'success');
  } catch (err) {
    showStatus(b64Msg, `Encoding error: ${err.message}`, 'error');
  }
});

document.getElementById('btn-b64-decode').addEventListener('click', () => {
  try {
    const val = b64Input.value.trim();
    if (!val) return;
    b64Input.value = decodeURIComponent(escape(atob(val)));
    showStatus(b64Msg, 'Decoded from Base64!', 'success');
  } catch (err) {
    showStatus(b64Msg, 'Invalid Base64 string', 'error');
  }
});

document.getElementById('btn-b64-copy').addEventListener('click', () => {
  copyToClipboard(b64Input.value, b64Msg, 'Copied to clipboard!');
});

document.getElementById('btn-b64-clear').addEventListener('click', () => {
  b64Input.value = '';
  b64Msg.textContent = '';
});

// 3. Quick UUID Tool
const uuidOutput = document.getElementById('uuid-output');
const uuidMsg = document.getElementById('uuid-msg');

document.getElementById('btn-uuid-gen').addEventListener('click', () => {
  uuidOutput.value = crypto.randomUUID();
  showStatus(uuidMsg, 'New UUID v4 generated!', 'success');
});

document.getElementById('btn-uuid-batch').addEventListener('click', () => {
  const list = Array.from({ length: 5 }, () => crypto.randomUUID()).join('\n');
  uuidOutput.value = list;
  showStatus(uuidMsg, 'Generated 5 UUIDs!', 'success');
});

document.getElementById('btn-uuid-copy').addEventListener('click', () => {
  copyToClipboard(uuidOutput.value, uuidMsg, 'UUIDs copied to clipboard!');
});

// 4. Quick Hash Tool
const tabHashText = document.getElementById('tab-hash-text');
const tabHashFile = document.getElementById('tab-hash-file');
const viewHashText = document.getElementById('view-hash-text');
const viewHashFile = document.getElementById('view-hash-file');

tabHashText.addEventListener('click', () => {
  tabHashText.classList.add('active');
  tabHashFile.classList.remove('active');
  viewHashText.classList.add('active');
  viewHashFile.classList.remove('active');
});

tabHashFile.addEventListener('click', () => {
  tabHashFile.classList.add('active');
  tabHashText.classList.remove('active');
  viewHashFile.classList.add('active');
  viewHashText.classList.remove('active');
});

// Text Hash
const hashInput = document.getElementById('hash-input');
const hashSha256 = document.getElementById('hash-sha256');
const hashMd5 = document.getElementById('hash-md5');

hashInput.addEventListener('input', async () => {
  const text = hashInput.value;
  if (!text) {
    hashSha256.value = '';
    hashMd5.value = '';
    return;
  }

  // SHA-256 via SubtleCrypto
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  hashSha256.value = hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');

  // MD5
  hashMd5.value = simpleMd5(text);
});

// File Checksum (Offline)
const fileDropzone = document.getElementById('file-dropzone');
const fileInput = document.getElementById('file-input');
const dropzoneLabel = document.getElementById('dropzone-label');
const fileProgress = document.getElementById('file-hash-progress');
const fileResults = document.getElementById('file-hash-results');
const fileSha256 = document.getElementById('file-sha256');
const expectedChecksum = document.getElementById('expected-checksum');
const verifyBadge = document.getElementById('verify-badge');

fileDropzone.addEventListener('click', () => fileInput.click());

fileDropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropzone.classList.add('dragover');
});

fileDropzone.addEventListener('dragleave', () => {
  fileDropzone.classList.remove('dragover');
});

fileDropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  fileDropzone.classList.remove('dragover');
  if (e.dataTransfer.files.length) {
    processFile(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length) {
    processFile(fileInput.files[0]);
  }
});

async function processFile(file) {
  dropzoneLabel.textContent = `${file.name} (${formatBytes(file.size)})`;
  fileProgress.style.display = 'block';
  fileProgress.textContent = 'Computing 100% offline SHA-256...';
  fileResults.style.display = 'none';

  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuf = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArr = Array.from(new Uint8Array(hashBuf));
    const hex = hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');

    fileSha256.value = hex;
    fileProgress.style.display = 'none';
    fileResults.style.display = 'flex';
    checkMatch();
  } catch (err) {
    fileProgress.textContent = `Error: ${err.message}`;
  }
}

expectedChecksum.addEventListener('input', checkMatch);

function checkMatch() {
  const expected = expectedChecksum.value.trim().toLowerCase();
  const computed = fileSha256.value.trim().toLowerCase();

  if (!expected) {
    verifyBadge.style.display = 'none';
    return;
  }

  verifyBadge.style.display = 'block';
  if (expected === computed) {
    verifyBadge.className = 'verify-badge match';
    verifyBadge.textContent = '✓ Checksum Matches! File is authentic & intact.';
  } else {
    verifyBadge.className = 'verify-badge mismatch';
    verifyBadge.textContent = '✗ Checksum Mismatch! File is corrupted or altered.';
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

document.querySelectorAll('.copy-icon-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (input && input.value) {
      navigator.clipboard.writeText(input.value);
      btn.textContent = '✓';
      setTimeout(() => (btn.textContent = '📋'), 1500);
    }
  });
});

// 5. Quick Timestamp Tool
const timeSecEl = document.getElementById('time-current-sec');
const timeIsoEl = document.getElementById('time-current-iso');

function updateClock() {
  const now = new Date();
  timeSecEl.textContent = Math.floor(now.getTime() / 1000);
  timeIsoEl.textContent = now.toISOString();
}
setInterval(updateClock, 1000);
updateClock();

document.getElementById('btn-time-now-copy').addEventListener('click', () => {
  navigator.clipboard.writeText(timeSecEl.textContent);
});

document.getElementById('btn-iso-now-copy').addEventListener('click', () => {
  navigator.clipboard.writeText(timeIsoEl.textContent);
});

// Utilities
function showStatus(el, msg, type) {
  el.textContent = msg;
  el.className = `status-msg ${type}`;
  setTimeout(() => {
    if (el.textContent === msg) el.textContent = '';
  }, 3000);
}

function copyToClipboard(text, msgEl, successMsg) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    if (msgEl) showStatus(msgEl, successMsg, 'success');
  });
}

// Minimal MD5 Implementation
function simpleMd5(s) {
  function md5cycle(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }
  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
  function add32(a, b) { return (a + b) & 0xffffffff; }

  var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
  tail[i >> 2] |= 0x80 << ((i % 4) << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) tail[i] = 0;
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  var hex = '0123456789abcdef', res = '';
  for (i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var b = (state[i] >>> (j * 8)) & 0xff;
      res += hex.charAt((b >> 4) & 0x0f) + hex.charAt(b & 0x0f);
    }
  }
  return res;
}
function md5blk(s) {
  var md5blks = [], i;
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

// Start
initCatalog();
