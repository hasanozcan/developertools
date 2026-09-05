const BASE_URL = 'https://devstools.app';

let catalogCache = null;

async function loadCatalog() {
  if (catalogCache) return catalogCache;
  try {
    const url = chrome.runtime.getURL('catalog.json');
    const res = await fetch(url);
    catalogCache = await res.json();
    return catalogCache;
  } catch (err) {
    console.error('Failed to load DevsTools catalog:', err);
    return [];
  }
}

// 1. Omnibox Support (Type 'dt <tool-name>' in address bar)
chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
  const query = text.trim().toLowerCase();
  if (!query) return;

  const catalog = await loadCatalog();
  const matched = catalog
    .filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.slug.toLowerCase().includes(query) ||
        tool.categorySlug.toLowerCase().includes(query) ||
        tool.shortDescription.toLowerCase().includes(query),
    )
    .slice(0, 6);

  const suggestions = matched.map((tool) => ({
    content: `${BASE_URL}/tools/${tool.categorySlug}/${tool.slug}`,
    description: `<match>${escapeXml(tool.name)}</match> <dim>(${escapeXml(tool.categoryName)}) - ${escapeXml(tool.shortDescription || '')}</dim>`,
  }));

  suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  let targetUrl = text.trim();
  if (!targetUrl.startsWith('http')) {
    targetUrl = `${BASE_URL}/#search=${encodeURIComponent(targetUrl)}`;
  }

  if (disposition === 'currentTab') {
    chrome.tabs.update({ url: targetUrl });
  } else {
    chrome.tabs.create({ url: targetUrl });
  }
});

// 2. Context Menu (Right-click selected text on web)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'devstools-parent',
    title: 'DevsTools (Developer Utilities)',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'devstools-json',
    parentId: 'devstools-parent',
    title: 'Format JSON in DevsTools',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'devstools-base64',
    parentId: 'devstools-parent',
    title: 'Decode / Inspect Base64',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'devstools-jwt',
    parentId: 'devstools-parent',
    title: 'Inspect JWT Token',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'devstools-hash',
    parentId: 'devstools-parent',
    title: 'Generate Hashes (MD5, SHA-256)',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'devstools-search',
    parentId: 'devstools-parent',
    title: 'Search in DevsTools',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText || '';
  const encoded = encodeURIComponent(selectedText);

  let targetUrl = BASE_URL;

  switch (info.menuItemId) {
    case 'devstools-json':
      targetUrl = `${BASE_URL}/tools/json/json-formatter#input=${encoded}`;
      break;
    case 'devstools-base64':
      targetUrl = `${BASE_URL}/tools/encoding/base64#input=${encoded}`;
      break;
    case 'devstools-jwt':
      targetUrl = `${BASE_URL}/tools/encoding/jwt-decoder#input=${encoded}`;
      break;
    case 'devstools-hash':
      targetUrl = `${BASE_URL}/tools/crypto/sha256-hash#input=${encoded}`;
      break;
    case 'devstools-search':
      targetUrl = `${BASE_URL}/#search=${encoded}`;
      break;
    default:
      targetUrl = BASE_URL;
  }

  chrome.tabs.create({ url: targetUrl });
});

function escapeXml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
