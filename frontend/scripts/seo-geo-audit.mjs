import { JSDOM } from 'jsdom';

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.split('=');
    return [key.replace(/^--/, ''), value.join('=') || true];
  }),
);

const baseUrl = new URL(String(args.get('base-url') || 'http://localhost:3000'));
const canonicalOrigin = String(args.get('canonical-origin') || 'https://devstools.app').replace(
  /\/$/,
  '',
);
const maxPages = Number(args.get('max-pages') || 250);

function normalizePath(input) {
  const url = new URL(input, baseUrl);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  return path;
}

function canonicalMatchesPage(canonical, path) {
  if (!canonical) return false;
  try {
    const url = new URL(canonical, baseUrl);
    return (
      url.origin === canonicalOrigin && normalizePath(url) === path && !url.search && !url.hash
    );
  } catch {
    return false;
  }
}

function localUrl(path) {
  return new URL(path, baseUrl).toString();
}

function jsonLdNodes(value) {
  if (Array.isArray(value)) return value.flatMap(jsonLdNodes);
  if (!value || typeof value !== 'object') return [];
  return [value, ...Object.values(value).flatMap(jsonLdNodes)];
}

async function fetchText(path, options = {}) {
  try {
    const response = await fetch(localUrl(path), {
      redirect: options.redirect || 'follow',
      headers: { 'user-agent': 'DevsTools-SEO-Audit/1.0' },
    });
    return {
      ok: true,
      status: response.status,
      contentType: response.headers.get('content-type') || '',
      location: response.headers.get('location') || '',
      text: await response.text(),
      finalUrl: response.url,
    };
  } catch (error) {
    return { ok: false, status: 0, contentType: '', text: '', error: String(error) };
  }
}

const robotsResponse = await fetchText('/robots.txt');
const sitemapResponse = await fetchText('/sitemap.xml');
const sitemapUrls = [...sitemapResponse.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
  match[1].trim(),
);
const sitemapEntries = [...sitemapResponse.text.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (match) => {
    const block = match[1];
    return {
      url: block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim() || '',
      lastModified: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() || '',
    };
  },
);
const missingSitemapLastmod = sitemapEntries
  .filter((entry) => !entry.lastModified)
  .map((entry) => entry.url);
const invalidSitemapLastmod = sitemapEntries.filter(
  (entry) =>
    entry.lastModified &&
    (Number.isNaN(Date.parse(entry.lastModified)) ||
      Date.parse(entry.lastModified) > Date.now() + 86_400_000),
);
const invalidSitemapUrls = [];
const sitemapPaths = new Set();
for (const value of sitemapUrls) {
  try {
    const url = new URL(value, baseUrl);
    if (url.origin !== canonicalOrigin || url.search || url.hash) {
      invalidSitemapUrls.push({ url: value, reason: 'noncanonical-url' });
      continue;
    }
    sitemapPaths.add(normalizePath(url));
  } catch {
    invalidSitemapUrls.push({ url: value, reason: 'invalid-url' });
  }
}

const queue = [...new Set(['/', ...sitemapPaths].map(normalizePath))];
const queued = new Set(queue.map(normalizePath));
const pages = [];
const internalTargets = new Set();

while (queue.length > 0 && pages.length < maxPages) {
  const path = normalizePath(queue.shift());
  const response = await fetchText(path);
  const page = {
    path,
    status: response.status,
    contentType: response.contentType,
    finalPath: response.finalUrl ? normalizePath(response.finalUrl) : path,
    title: '',
    description: '',
    robots: '',
    canonical: '',
    ogImage: '',
    hreflangs: [],
    h1: [],
    wordCount: 0,
    internalLinks: [],
    queryStringInternalLinks: [],
    relatedInternalLinks: [],
    externalSources: [],
    schemaTypes: [],
    schemaCitations: [],
    schemaRelatedLinks: [],
    schemaRelatedLinkErrors: [],
    schemaErrors: [],
    faqQuestions: [],
    hiddenFaqQuestions: [],
    searchActions: [],
    answerFirst: false,
    hasToolInterface: false,
  };

  if (response.contentType.includes('text/html')) {
    const dom = new JSDOM(response.text, { url: localUrl(path) });
    const { document } = dom.window;
    const main = document.querySelector('main') || document.body;
    const visibleMain = main.cloneNode(true);
    visibleMain
      .querySelectorAll('script, style, template, noscript')
      .forEach((node) => node.remove());
    const visibleText = (visibleMain.textContent || '').replace(/\s+/g, ' ').trim();

    page.title = document.title.trim();
    page.description =
      document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
    page.robots =
      document.querySelector('meta[name="robots"]')?.getAttribute('content')?.trim() || '';
    page.canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    page.ogImage =
      document.querySelector('meta[property="og:image"]')?.getAttribute('content')?.trim() || '';
    page.hreflangs = [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
      .map((node) => node.getAttribute('href'))
      .filter(Boolean);
    page.h1 = [...document.querySelectorAll('h1')]
      .map((node) => node.textContent.trim())
      .filter(Boolean);
    page.wordCount = visibleText ? visibleText.split(/\s+/).length : 0;

    for (const anchor of document.querySelectorAll('a[href]')) {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
      const target = new URL(href, localUrl(path));
      if (target.origin === baseUrl.origin || target.origin === canonicalOrigin) {
        const targetPath = normalizePath(target);
        if (!targetPath.startsWith('/_next/') && !targetPath.startsWith('/api/')) {
          page.internalLinks.push(targetPath);
          if (target.search) page.queryStringInternalLinks.push(target.toString());
          internalTargets.add(targetPath);
          if (!queued.has(targetPath)) {
            queued.add(targetPath);
            queue.push(targetPath);
          }
        }
      }
    }

    const sourcesSection = document.querySelector('section[aria-labelledby="sources-heading"]');
    if (sourcesSection) {
      for (const anchor of sourcesSection.querySelectorAll('a[href]')) {
        const target = new URL(anchor.getAttribute('href'), localUrl(path));
        if (target.origin !== baseUrl.origin && target.origin !== canonicalOrigin) {
          page.externalSources.push(target.toString());
        }
      }
    }

    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const data = JSON.parse(script.textContent);
        const nodes = jsonLdNodes(data);
        for (const node of nodes) {
          const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
          page.schemaTypes.push(...types.filter(Boolean));
          if (types.includes('FAQPage')) {
            const entities = Array.isArray(node.mainEntity) ? node.mainEntity : [];
            for (const entity of entities) {
              if (entity?.name) page.faqQuestions.push(String(entity.name));
            }
          }
          if (types.includes('SearchAction')) {
            const target = typeof node.target === 'string' ? node.target : node.target?.urlTemplate;
            if (target) page.searchActions.push(String(target));
          }
          if (types.includes('ItemList')) {
            const items = Array.isArray(node.itemListElement) ? node.itemListElement : [];
            for (const item of items) {
              if (!item?.url) continue;
              const relatedUrl = new URL(String(item.url), localUrl(path));
              if (
                (relatedUrl.origin !== canonicalOrigin && relatedUrl.origin !== baseUrl.origin) ||
                relatedUrl.search ||
                relatedUrl.hash
              ) {
                page.schemaRelatedLinkErrors.push(String(item.url));
              } else {
                page.schemaRelatedLinks.push(normalizePath(relatedUrl));
              }
            }
          }
          const citations = Array.isArray(node.citation) ? node.citation : [node.citation];
          page.schemaCitations.push(
            ...citations
              .filter((citation) => typeof citation === 'string')
              .map((citation) => new URL(citation, localUrl(path)).toString()),
          );
        }
      } catch (error) {
        page.schemaErrors.push(String(error));
      }
    }

    page.internalLinks = [...new Set(page.internalLinks)];
    page.queryStringInternalLinks = [...new Set(page.queryStringInternalLinks)];
    page.relatedInternalLinks = [
      ...new Set(
        [...document.querySelectorAll('[data-related-tools] a[href]')]
          .map((anchor) => new URL(anchor.getAttribute('href'), localUrl(path)))
          .filter((url) => url.origin === baseUrl.origin || url.origin === canonicalOrigin)
          .map((url) => normalizePath(url)),
      ),
    ];
    page.externalSources = [...new Set(page.externalSources)];
    page.schemaTypes = [...new Set(page.schemaTypes)];
    page.schemaCitations = [...new Set(page.schemaCitations)];
    page.schemaRelatedLinks = [...new Set(page.schemaRelatedLinks)];
    page.schemaRelatedLinkErrors = [...new Set(page.schemaRelatedLinkErrors)];
    page.faqQuestions = [...new Set(page.faqQuestions)];
    page.searchActions = [...new Set(page.searchActions)];
    page.hiddenFaqQuestions = page.faqQuestions.filter(
      (question) => !visibleText.includes(question),
    );
    const orderedAnswerElements = [
      ...document.querySelectorAll(
        '[data-answer-first], [data-tool-interface], [data-topic-interface]',
      ),
    ];
    page.answerFirst =
      orderedAnswerElements.length >= 2 &&
      orderedAnswerElements[0].hasAttribute('data-answer-first') &&
      (orderedAnswerElements[1].hasAttribute('data-tool-interface') ||
        orderedAnswerElements[1].hasAttribute('data-topic-interface'));
    page.hasToolInterface = Boolean(document.querySelector('[data-tool-interface]'));
  }

  pages.push(page);
}

const pageByPath = new Map(pages.map((page) => [page.path, page]));
const htmlPages = pages.filter((page) => page.contentType.includes('text/html'));
const canonicalPages = htmlPages.filter((page) => canonicalMatchesPage(page.canonical, page.path));
const indexablePages = canonicalPages.filter((page) => !/noindex/i.test(page.robots));
const toolPages = indexablePages.filter((page) => /^\/tools\/[^/]+\/[^/]+$/.test(page.path));
const canonicalIndexablePaths = new Set(indexablePages.map((page) => page.path));
const inboundInternalSources = new Map(indexablePages.map((page) => [page.path, new Set()]));
for (const source of indexablePages) {
  for (const target of source.internalLinks) {
    if (source.path !== target && inboundInternalSources.has(target)) {
      inboundInternalSources.get(target).add(source.path);
    }
  }
}
const crawlTruncated = queue.length > 0;
const unfetchedInternalTargets = [...internalTargets].filter((path) => !pageByPath.has(path));

const brokenInternalLinks = [...internalTargets]
  .map((path) => pageByPath.get(path))
  .filter((page) => page && (page.status < 200 || page.status >= 400))
  .map((page) => ({ path: page.path, status: page.status }));
const redirectingInternalLinks = indexablePages.flatMap((source) =>
  source.internalLinks
    .map((target) => pageByPath.get(target))
    .filter((target) => target && target.finalPath !== target.path)
    .map((target) => ({ source: source.path, target: target.path, finalPath: target.finalPath })),
);
const queryStringInternalLinks = indexablePages.flatMap((page) =>
  page.queryStringInternalLinks.map((target) => ({ source: page.path, target })),
);

const sitemapMissing = indexablePages
  .filter((page) => !sitemapPaths.has(page.path))
  .map((page) => page.path);

const sitemapChecks = [...sitemapPaths].map((path) => {
  const page = pageByPath.get(path);
  const reasons = [];
  if (!page) reasons.push('not-fetched');
  if (page && page.status !== 200) reasons.push('not-200');
  if (page && page.finalPath !== path) reasons.push('redirected');
  if (page && !page.contentType.includes('text/html')) reasons.push('not-html');
  if (page && /noindex/i.test(page.robots)) reasons.push('noindex');
  if (page && !canonicalMatchesPage(page.canonical, path)) reasons.push('canonical-mismatch');
  return {
    path,
    valid: reasons.length === 0,
    reasons,
    status: page?.status || 0,
    finalPath: page?.finalPath || '',
  };
});

const invalidContextualLinks = toolPages.flatMap((page) =>
  page.relatedInternalLinks
    .filter((target) => target === page.path || !canonicalIndexablePaths.has(target))
    .map((target) => ({
      source: page.path,
      target,
      reason: target === page.path ? 'self-link' : 'noncanonical-or-nonindexable',
    })),
);
const contextualInboundSources = new Map(toolPages.map((page) => [page.path, new Set()]));
for (const source of toolPages) {
  for (const target of source.relatedInternalLinks) {
    if (source.path !== target && contextualInboundSources.has(target)) {
      contextualInboundSources.get(target).add(source.path);
    }
  }
}
const relatedSchemaMismatches = toolPages
  .filter((page) => {
    const visible = new Set(page.relatedInternalLinks);
    const schema = new Set(page.schemaRelatedLinks);
    if (visible.size === 0 && schema.size === 0) return false;
    return visible.size !== schema.size || [...visible].some((target) => !schema.has(target));
  })
  .map((page) => ({
    path: page.path,
    visible: page.relatedInternalLinks,
    schema: page.schemaRelatedLinks,
  }));

const duplicateGroups = (field) => {
  const groups = new Map();
  for (const page of indexablePages) {
    const value = page[field];
    if (!value) continue;
    groups.set(value, [...(groups.get(value) || []), page.path]);
  }
  return [...groups.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([value, paths]) => ({ value, paths }));
};

const duplicateToolOgImages = (() => {
  const groups = new Map();
  for (const page of toolPages) {
    if (!page.ogImage) continue;
    groups.set(page.ogImage, [...(groups.get(page.ogImage) || []), page.path]);
  }
  return [...groups.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([value, paths]) => ({ value, paths }));
})();

const actionChecks = [];
for (const template of [...new Set(htmlPages.flatMap((page) => page.searchActions))]) {
  const concrete = template.replace(/\{[^}]+\}/g, 'seo-audit');
  const path = normalizePath(concrete);
  const result = await fetchText(path, { redirect: 'manual' });
  actionChecks.push({ template, path, status: result.status });
}

const aliases = [
  ['/tools/converters/json-csv', '/tools/json/json-csv'],
  ['/tools/converters/yaml-json', '/tools/json/yaml-json'],
  ['/tools/converters/image-to-base64', '/tools/encoding/image-to-base64'],
  ['/tools/text/lorem-ipsum', '/tools/generators/lorem-ipsum'],
  ['/tools/text/slug-generator', '/tools/generators/slug-generator'],
  ['/tools/utilities/qr-code', '/tools/generators/qr-code'],
  ['/tools/utilities/markdown-preview', '/tools/text/markdown-preview'],
];
const aliasChecks = [];
for (const [path, expectedPath] of aliases) {
  const result = await fetchText(path, { redirect: 'manual' });
  const actualPath = result.location ? normalizePath(result.location) : '';
  aliasChecks.push({ path, expectedPath, status: result.status, actualPath });
}

const priorityTargets = [
  { query: 'json formatter', path: '/tools/json/json-formatter', kind: 'tool' },
  { query: 'jwt decoder', path: '/tools/encoding/jwt-decoder', kind: 'tool' },
  { query: 'regex tester', path: '/tools/text/regex-tester', kind: 'tool' },
  { query: 'uuid generator', path: '/tools/generators/uuid-generator', kind: 'tool' },
  { query: 'user agent parser online', path: '/tools/utilities/user-agent-parser', kind: 'tool' },
  { query: 'sha256 generator', path: '/tools/crypto/sha256-hash', kind: 'tool' },
  { query: 'md5 hash generator', path: '/tools/crypto/md5-hash', kind: 'tool' },
  { query: 'unicode escape decoder', path: '/tools/encoding/unicode-escape', kind: 'tool' },
  { query: 'encoder online', path: '/tools/encoding', kind: 'category' },
];
const priorityQueryChecks = priorityTargets.map(({ query, path, kind }) => {
  const page = pageByPath.get(path);
  const reasons = [];
  if (!page || page.status !== 200) reasons.push('target-not-200');
  if (!canonicalMatchesPage(page?.canonical, path)) reasons.push('canonical-mismatch');
  const intentText =
    `${page?.title || ''} ${page?.description || ''} ${(page?.h1 || []).join(' ')}`.toLowerCase();
  if (!query.split(/\s+/).every((term) => intentText.includes(term)))
    reasons.push('intent-not-explicit');
  if ((page?.wordCount || 0) < 300) reasons.push('thin-server-readable-copy');
  if (!page?.answerFirst) reasons.push('answer-not-first');
  if (kind === 'category' && !page?.hasToolInterface) reasons.push('missing-query-interface');
  if ((page?.relatedInternalLinks.length || 0) < 3)
    reasons.push('insufficient-contextual-internal-links');
  if (
    page &&
    (page.relatedInternalLinks.length !== page.schemaRelatedLinks.length ||
      page.relatedInternalLinks.some((target) => !page.schemaRelatedLinks.includes(target)))
  ) {
    reasons.push('contextual-link-schema-mismatch');
  }
  if (kind === 'tool' && (contextualInboundSources.get(path)?.size || 0) < 2)
    reasons.push('weak-contextual-inbound-links');
  if ((page?.faqQuestions.length || 0) < 2) reasons.push('insufficient-faq-answers');
  if ((page?.hiddenFaqQuestions.length || 0) > 0) reasons.push('schema-answers-not-visible');
  if ((page?.externalSources.length || 0) < 1) reasons.push('no-visible-source');
  if (page) {
    const visibleSources = new Set(page.externalSources);
    const schemaSources = new Set(page.schemaCitations);
    if (
      visibleSources.size !== schemaSources.size ||
      [...visibleSources].some((url) => !schemaSources.has(url))
    ) {
      reasons.push('citation-schema-mismatch');
    }
  }
  return { query, path, kind, answerReady: reasons.length === 0, reasons };
});

const issues = [];
const addIssue = (severity, code, count, details) => {
  if (count > 0) issues.push({ severity, code, count, details });
};

addIssue('critical', 'robots-unavailable', robotsResponse.status !== 200 ? 1 : 0, {
  status: robotsResponse.status,
  error: robotsResponse.error || null,
});
addIssue('critical', 'sitemap-unavailable', sitemapResponse.status !== 200 ? 1 : 0, {
  status: sitemapResponse.status,
  error: sitemapResponse.error || null,
});
addIssue(
  'critical',
  'site-blocked-by-robots',
  /^\s*Disallow:\s*\/\s*$/im.test(robotsResponse.text) ? 1 : 0,
  /^\s*Disallow:\s*\/\s*$/im.test(robotsResponse.text) ? ['Disallow: /'] : [],
);
addIssue(
  'critical',
  'crawl-truncated',
  crawlTruncated ? 1 : 0,
  crawlTruncated ? { maxPages, remainingQueue: queue.length } : {},
);
addIssue(
  'critical',
  'unfetched-internal-targets',
  unfetchedInternalTargets.length,
  unfetchedInternalTargets,
);
addIssue('critical', 'broken-internal-links', brokenInternalLinks.length, brokenInternalLinks);
addIssue(
  'critical',
  'indexable-pages-without-canonical',
  htmlPages.filter(
    (page) => page.status === 200 && !/noindex/i.test(page.robots) && !page.canonical,
  ).length,
  htmlPages
    .filter((page) => page.status === 200 && !/noindex/i.test(page.robots) && !page.canonical)
    .map((page) => page.path),
);
addIssue(
  'high',
  'invalid-canonical',
  htmlPages.filter(
    (page) =>
      page.status === 200 && page.canonical && !canonicalMatchesPage(page.canonical, page.path),
  ).length,
  htmlPages
    .filter(
      (page) =>
        page.status === 200 && page.canonical && !canonicalMatchesPage(page.canonical, page.path),
    )
    .map((page) => ({ path: page.path, canonical: page.canonical })),
);
addIssue('high', 'invalid-sitemap-url', invalidSitemapUrls.length, invalidSitemapUrls);
addIssue(
  'high',
  'invalid-sitemap-entry',
  sitemapChecks.filter((item) => !item.valid).length,
  sitemapChecks.filter((item) => !item.valid),
);
addIssue('high', 'invalid-sitemap-lastmod', invalidSitemapLastmod.length, invalidSitemapLastmod);
addIssue(
  'high',
  'orphaned-indexable-pages',
  indexablePages.filter(
    (page) => page.path !== '/' && (inboundInternalSources.get(page.path)?.size || 0) === 0,
  ).length,
  indexablePages
    .filter((page) => page.path !== '/' && (inboundInternalSources.get(page.path)?.size || 0) === 0)
    .map((page) => page.path),
);
addIssue(
  'high',
  'tool-pages-without-contextual-internal-links',
  toolPages.filter((page) => page.relatedInternalLinks.length < 3).length,
  toolPages
    .filter((page) => page.relatedInternalLinks.length < 3)
    .map((page) => ({ path: page.path, relatedLinks: page.relatedInternalLinks })),
);
addIssue(
  'high',
  'tool-pages-with-weak-contextual-inbound',
  toolPages.filter((page) => (contextualInboundSources.get(page.path)?.size || 0) < 2).length,
  toolPages
    .filter((page) => (contextualInboundSources.get(page.path)?.size || 0) < 2)
    .map((page) => ({
      path: page.path,
      sources: [...(contextualInboundSources.get(page.path) || [])],
    })),
);
addIssue(
  'high',
  'invalid-contextual-internal-links',
  invalidContextualLinks.length,
  invalidContextualLinks,
);
addIssue(
  'high',
  'contextual-link-schema-mismatch',
  relatedSchemaMismatches.length,
  relatedSchemaMismatches,
);
addIssue(
  'high',
  'invalid-contextual-link-schema-url',
  toolPages.filter((page) => page.schemaRelatedLinkErrors.length > 0).length,
  toolPages
    .filter((page) => page.schemaRelatedLinkErrors.length > 0)
    .map((page) => ({ path: page.path, urls: page.schemaRelatedLinkErrors })),
);
addIssue('high', 'sitemap-missing-indexable-pages', sitemapMissing.length, sitemapMissing);
addIssue(
  'high',
  'faq-schema-not-visible',
  toolPages.filter((page) => page.hiddenFaqQuestions.length > 0).length,
  toolPages
    .filter((page) => page.hiddenFaqQuestions.length > 0)
    .map((page) => ({ path: page.path, questions: page.hiddenFaqQuestions })),
);
addIssue(
  'high',
  'invalid-search-action-target',
  actionChecks.filter((item) => item.status !== 200).length,
  actionChecks.filter((item) => item.status !== 200),
);
addIssue(
  'high',
  'query-string-hreflang',
  indexablePages.filter((page) =>
    page.hreflangs.some((href) => new URL(href, canonicalOrigin).search),
  ).length,
  indexablePages
    .filter((page) => page.hreflangs.some((href) => new URL(href, canonicalOrigin).search))
    .map((page) => page.path),
);
addIssue(
  'high',
  'noncanonical-alias-not-redirected',
  aliasChecks.filter((item) => item.status !== 308 || item.actualPath !== item.expectedPath).length,
  aliasChecks.filter((item) => item.status !== 308 || item.actualPath !== item.expectedPath),
);
addIssue(
  'high',
  'priority-query-not-answer-ready',
  priorityQueryChecks.filter((item) => !item.answerReady).length,
  priorityQueryChecks.filter((item) => !item.answerReady),
);
addIssue(
  'high',
  'invalid-json-ld',
  htmlPages.filter((page) => page.schemaErrors.length > 0).length,
  htmlPages.filter((page) => page.schemaErrors.length > 0).map((page) => page.path),
);
addIssue(
  'high',
  'tool-pages-without-og-image',
  toolPages.filter((page) => !page.ogImage).length,
  toolPages.filter((page) => !page.ogImage).map((page) => page.path),
);
addIssue(
  'high',
  'citation-schema-mismatch',
  toolPages.filter((page) => {
    const visible = new Set(page.externalSources);
    const schema = new Set(page.schemaCitations);
    return (
      visible.size === 0 ||
      visible.size !== schema.size ||
      [...visible].some((url) => !schema.has(url))
    );
  }).length,
  toolPages
    .filter((page) => {
      const visible = new Set(page.externalSources);
      const schema = new Set(page.schemaCitations);
      return (
        visible.size === 0 ||
        visible.size !== schema.size ||
        [...visible].some((url) => !schema.has(url))
      );
    })
    .map((page) => ({
      path: page.path,
      visible: page.externalSources,
      schema: page.schemaCitations,
    })),
);
addIssue('medium', 'duplicate-titles', duplicateGroups('title').length, duplicateGroups('title'));
addIssue(
  'medium',
  'missing-or-multiple-h1',
  indexablePages.filter((page) => page.h1.length !== 1).length,
  indexablePages
    .filter((page) => page.h1.length !== 1)
    .map((page) => ({ path: page.path, h1: page.h1 })),
);
addIssue(
  'medium',
  'missing-meta-description',
  indexablePages.filter((page) => !page.description).length,
  indexablePages.filter((page) => !page.description).map((page) => page.path),
);
addIssue('medium', 'duplicate-tool-og-images', duplicateToolOgImages.length, duplicateToolOgImages);
addIssue(
  'medium',
  'tool-pages-without-sources',
  toolPages.filter((page) => page.externalSources.length === 0).length,
  toolPages.filter((page) => page.externalSources.length === 0).map((page) => page.path),
);
addIssue(
  'medium',
  'query-string-internal-links',
  queryStringInternalLinks.length,
  queryStringInternalLinks,
);
addIssue(
  'medium',
  'internal-links-to-redirects',
  redirectingInternalLinks.length,
  redirectingInternalLinks,
);

const report = {
  auditedAt: new Date().toISOString(),
  baseUrl: baseUrl.toString(),
  canonicalOrigin,
  summary: {
    robotsStatus: robotsResponse.status,
    sitemapStatus: sitemapResponse.status,
    sitemapUrls: sitemapPaths.size,
    sitemapUrlsWithLastmod: sitemapEntries.length - missingSitemapLastmod.length,
    crawledUrls: pages.length,
    htmlPages: htmlPages.length,
    canonicalIndexablePages: indexablePages.length,
    canonicalToolPages: toolPages.length,
    priorityQueries: priorityQueryChecks.length,
    answerReadyPriorityQueries: priorityQueryChecks.filter((item) => item.answerReady).length,
    criticalIssues: issues.filter((issue) => issue.severity === 'critical').length,
    highIssues: issues.filter((issue) => issue.severity === 'high').length,
    mediumIssues: issues.filter((issue) => issue.severity === 'medium').length,
    crawlTruncated,
  },
  issues,
  actionChecks,
  aliasChecks,
  sitemapChecks,
  priorityQueryChecks,
  pages: pages.map(({ internalLinks, ...page }) => ({
    ...page,
    internalLinkCount: internalLinks.length,
    inboundInternalLinkCount: inboundInternalSources.get(page.path)?.size || 0,
    contextualInboundLinkCount: contextualInboundSources.get(page.path)?.size || 0,
  })),
};

console.log(JSON.stringify(report, null, 2));
process.exitCode = report.summary.criticalIssues > 0 || report.summary.highIssues > 0 ? 2 : 0;
