/**
 * SEO/GEO audit for a built/served DevsTools site.
 *
 * Usage: node scripts/seo-geo-audit.mjs [--base-url=http://localhost:3000]
 *   --canonical-origin=https://devstools.app  Origin canonical/hreflang/sitemap URLs must use.
 *   --full                                    Crawl every sitemap URL plus every discovered link.
 *   --crawl=sample|full                       Same as above (default: sample).
 *   --sample-size=400                         Sitemap URLs to fetch in sample mode. The sample is
 *                                             stratified by page type and keeps every locale
 *                                             variant of a sampled path together, so hreflang and
 *                                             localized-duplicate checks can compare siblings.
 *   --max-pages=N                             Full mode: hard crawl cap (hitting it is critical).
 *                                             Sample mode: alias for --sample-size.
 *   --max-extra-pages=500                     Sample mode: cap on non-sitemap link targets and
 *                                             hreflang/canonical targets fetched for verification.
 *   --concurrency=6  --fetch-timeout-ms=20000  --max-title-length=60  --site-name=DevsTools
 *   --locales=en,tr,de,es,fr,ru,zh  --default-locale=en
 *
 * Exit code 2 when any critical/high issue is found. "medium" and "warning" never fail the run.
 * The module also exports its pure helpers so they can be unit-tested in-process.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';

export const DEFAULT_LOCALES = ['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh'];
export const DEFAULT_SAMPLE_SIZE = 400;
export const DEFAULT_MAX_TITLE_LENGTH = 60;

const SITE_ENTITY_TYPES = new Set([
  'Organization',
  'Corporation',
  'WebSite',
  'Person',
  'ImageObject',
  'Brand',
  'SearchAction',
  'EntryPoint',
]);

export const PRIORITY_TARGETS = [
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

const ALIASES = [
  ['/tools/converters/json-csv', '/tools/json/json-csv'],
  ['/tools/converters/yaml-json', '/tools/json/yaml-json'],
  ['/tools/converters/image-to-base64', '/tools/encoding/image-to-base64'],
  ['/tools/text/lorem-ipsum', '/tools/generators/lorem-ipsum'],
  ['/tools/text/slug-generator', '/tools/generators/slug-generator'],
  ['/tools/utilities/qr-code', '/tools/generators/qr-code'],
  ['/tools/utilities/markdown-preview', '/tools/text/markdown-preview'],
];

// ---------------------------------------------------------------------------
// Options / context
// ---------------------------------------------------------------------------

function positiveInt(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : undefined;
}

export function parseArgs(argv) {
  const args = new Map(
    argv.map((arg) => {
      const [key, ...value] = arg.split('=');
      return [key.replace(/^--/, ''), value.join('=') || true];
    }),
  );
  const str = (key) => (typeof args.get(key) === 'string' ? String(args.get(key)) : undefined);
  const list = (key) =>
    str(key)
      ?.split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  return {
    baseUrl: str('base-url'),
    canonicalOrigin: str('canonical-origin'),
    crawlMode: args.get('full') === true || str('crawl') === 'full' ? 'full' : 'sample',
    maxPages: positiveInt(args.get('max-pages')),
    sampleSize: positiveInt(args.get('sample-size')),
    maxExtraPages: positiveInt(args.get('max-extra-pages')),
    concurrency: positiveInt(args.get('concurrency')),
    fetchTimeoutMs: positiveInt(args.get('fetch-timeout-ms')),
    maxTitleLength: positiveInt(args.get('max-title-length')),
    siteName: str('site-name'),
    locales: list('locales'),
    defaultLocale: str('default-locale'),
  };
}

export function createContext(options = {}) {
  const crawlMode = options.crawlMode === 'full' ? 'full' : 'sample';
  const locales = options.locales?.length ? [...options.locales] : [...DEFAULT_LOCALES];
  const defaultLocale = options.defaultLocale || locales[0] || 'en';
  return {
    baseUrl: new URL(String(options.baseUrl || 'http://localhost:3000')),
    canonicalOrigin: String(options.canonicalOrigin || 'https://devstools.app').replace(/\/$/, ''),
    crawlMode,
    // Full mode: optional hard cap. Sample mode: never truncates the (bounded) sample itself.
    maxPages: crawlMode === 'full' ? positiveInt(options.maxPages) || Infinity : Infinity,
    sampleSize:
      positiveInt(options.sampleSize) || positiveInt(options.maxPages) || DEFAULT_SAMPLE_SIZE,
    maxExtraPages: positiveInt(options.maxExtraPages) || 500,
    concurrency: positiveInt(options.concurrency) || 6,
    fetchTimeoutMs: positiveInt(options.fetchTimeoutMs) || 20_000,
    maxTitleLength: positiveInt(options.maxTitleLength) || DEFAULT_MAX_TITLE_LENGTH,
    siteName: options.siteName ?? 'DevsTools',
    locales,
    defaultLocale,
  };
}

// ---------------------------------------------------------------------------
// URL / locale helpers
// ---------------------------------------------------------------------------

export function normalizePath(input, ctx) {
  const url = new URL(input, ctx.baseUrl);
  return url.pathname.replace(/\/+$/, '') || '/';
}

export function isInternalUrl(url, ctx) {
  return url.origin === ctx.baseUrl.origin || url.origin === ctx.canonicalOrigin;
}

/** Internal path for an href, or '' when it is external/invalid. */
export function internalPathOf(href, ctx, base = ctx.baseUrl) {
  try {
    const url = new URL(href, base);
    return isInternalUrl(url, ctx) ? normalizePath(url, ctx) : '';
  } catch {
    return '';
  }
}

export function canonicalMatchesPage(canonical, pagePath, ctx) {
  if (!canonical) return false;
  try {
    const url = new URL(canonical, ctx.baseUrl);
    return (
      url.origin === ctx.canonicalOrigin &&
      normalizePath(url, ctx) === pagePath &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}

export function localeOfPath(pagePath, ctx) {
  const segment = pagePath.split('/')[1] || '';
  return segment !== ctx.defaultLocale && ctx.locales.includes(segment)
    ? segment
    : ctx.defaultLocale;
}

export function stripLocale(pagePath, ctx) {
  const locale = localeOfPath(pagePath, ctx);
  if (locale === ctx.defaultLocale) return pagePath;
  return pagePath.slice(locale.length + 1) || '/';
}

export function localizePath(basePath, locale, ctx) {
  if (locale === ctx.defaultLocale) return basePath;
  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
}

export function pageTypeOfPath(pagePath, ctx) {
  const basePath = ctx ? stripLocale(pagePath, ctx) : pagePath;
  if (basePath === '/') return 'home';
  if (/^\/tools\/[^/]+\/[^/]+$/.test(basePath)) return 'tool';
  if (/^\/tools\/[^/]+$/.test(basePath)) return 'category';
  if (basePath === '/tools') return 'tools-index';
  const [, first = '', ...rest] = basePath.split('/');
  if (first === 'collections') return 'collection';
  if (first === 'for') return 'audience';
  if (rest.length === 0) return 'static';
  return 'other';
}

function isAssetPath(pagePath) {
  return (
    pagePath.startsWith('/_next/') ||
    pagePath.startsWith('/api/') ||
    /\.[a-z0-9]{2,5}$/i.test(pagePath) ||
    /(^|\/)(opengraph-image|twitter-image|icon|apple-icon)(-[^/]*)?$/.test(pagePath)
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Normalizes a <title> for duplicate comparison: strips the site name used as a
 * prefix ("DevsTools – …") or suffix ("… | DevsTools", "… – DevsTools Türkçe"),
 * collapses whitespace and lowercases.
 */
export function normalizeTitle(title, siteName = 'DevsTools') {
  const original = String(title || '')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim();
  let value = original;
  if (siteName) {
    const name = escapeRegExp(siteName);
    const separator = '[|\\-–—:·•]';
    const suffix = new RegExp(`\\s*${separator}\\s*${name}(?![\\p{L}\\p{N}]).*$`, 'iu');
    const prefix = new RegExp(`^${name}\\s*${separator}\\s*`, 'iu');
    let previous;
    do {
      previous = value;
      value = value.replace(suffix, '').replace(prefix, '').trim();
    } while (value !== previous);
  }
  return (value || original).toLowerCase();
}

/** Bit-reversal ordering so any prefix of the result is spread across [0, n). */
function spreadOrder(n) {
  let bits = 0;
  while (1 << bits < n) bits += 1;
  const order = [];
  for (let i = 0; i < 1 << bits; i += 1) {
    let reversed = 0;
    for (let bit = 0; bit < bits; bit += 1) {
      if (i & (1 << bit)) reversed |= 1 << (bits - 1 - bit);
    }
    if (reversed < n) order.push(reversed);
  }
  return order;
}

/**
 * Deterministic stratified sample of sitemap paths. Paths are grouped by their
 * locale-less base path so every locale variant of a chosen page is fetched
 * together; base paths are allocated to page types proportionally with a floor
 * so small types (home, static, categories) are always represented.
 */
export function selectSample(paths, ctx, { sampleSize = ctx.sampleSize, forced = [] } = {}) {
  const unique = [...new Set(paths)];
  const groups = new Map();
  for (const pagePath of unique) {
    const base = stripLocale(pagePath, ctx);
    groups.set(base, [...(groups.get(base) || []), pagePath]);
  }
  const selected = new Set();
  const takeBase = (base) => (groups.get(base) || []).forEach((item) => selected.add(item));

  for (const pagePath of forced) {
    const base = stripLocale(pagePath, ctx);
    if (groups.has(base)) takeBase(base);
    else selected.add(pagePath);
  }

  if (unique.length <= sampleSize) {
    unique.forEach((item) => selected.add(item));
  } else {
    const byType = new Map();
    for (const base of [...groups.keys()].sort()) {
      const type = pageTypeOfPath(base);
      byType.set(type, [...(byType.get(type) || []), base]);
    }
    const averageVariants = unique.length / groups.size;
    const baseBudget = Math.max(
      1,
      Math.floor(Math.max(0, sampleSize - selected.size) / averageVariants),
    );
    const minimumPerType = 3;
    for (const [type, bases] of byType) {
      const quota = Math.min(
        bases.length,
        Math.max(minimumPerType, Math.round((baseBudget * bases.length) / groups.size)),
      );
      const order = spreadOrder(bases.length);
      let taken = 0;
      for (const index of order) {
        if (taken >= quota) break;
        takeBase(bases[index]);
        taken += 1;
      }
    }
  }

  const order = new Map(unique.map((item, index) => [item, index]));
  const sampled = [...selected].sort(
    (a, b) => (order.get(a) ?? Infinity) - (order.get(b) ?? Infinity),
  );
  const strata = {};
  for (const pagePath of sampled) {
    const key = `${localeOfPath(pagePath, ctx)}:${pageTypeOfPath(pagePath, ctx)}`;
    strata[key] = (strata[key] || 0) + 1;
  }
  return { paths: sampled, strata };
}

// ---------------------------------------------------------------------------
// Page extraction (pure: HTML in, page record out)
// ---------------------------------------------------------------------------

function collectJsonLdUrls(value, out, inBreadcrumb = false) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectJsonLdUrls(item, out, inBreadcrumb));
    return out;
  }
  if (!value || typeof value !== 'object') return out;
  const types = [value['@type']].flat().filter(Boolean).map(String);
  const breadcrumb = inBreadcrumb || types.includes('BreadcrumbList');
  const siteEntity = types.some((type) => SITE_ENTITY_TYPES.has(type));
  const keys = Object.keys(value);
  const pureReference = keys.length === 1 && keys[0] === '@id';
  if (!siteEntity) {
    for (const key of ['url', '@id', 'item']) {
      const candidate = value[key];
      if (typeof candidate !== 'string') continue;
      // `{"@id": "https://site/#organization"}` references a site-wide entity.
      if (key === '@id' && pureReference && candidate.includes('#')) continue;
      out.push({ key, value: candidate, breadcrumb });
    }
  }
  for (const child of Object.values(value)) {
    if (child && typeof child === 'object') collectJsonLdUrls(child, out, breadcrumb);
  }
  return out;
}

function jsonLdNodes(value) {
  if (Array.isArray(value)) return value.flatMap(jsonLdNodes);
  if (!value || typeof value !== 'object') return [];
  return [value, ...Object.values(value).flatMap(jsonLdNodes)];
}

export function emptyPage(pagePath) {
  return {
    path: pagePath,
    status: 0,
    contentType: '',
    finalPath: pagePath,
    title: '',
    description: '',
    robots: '',
    xRobotsTag: '',
    noindex: false,
    htmlLang: '',
    canonical: '',
    ogImage: '',
    hreflangs: [],
    alternates: [],
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
    jsonLdUrls: [],
    faqQuestions: [],
    hiddenFaqQuestions: [],
    searchActions: [],
    answerFirst: false,
    hasToolInterface: false,
  };
}

/**
 * Builds a page record from a fetch response
 * (`{ status, contentType, finalUrl?, text, xRobotsTag? }`).
 */
export function extractPage(response, rawPath, ctx) {
  const pagePath = normalizePath(rawPath, ctx);
  const page = emptyPage(pagePath);
  page.status = response.status;
  page.contentType = response.contentType || '';
  page.finalPath = response.finalUrl ? normalizePath(response.finalUrl, ctx) : pagePath;
  page.xRobotsTag = response.xRobotsTag || '';
  if (!page.contentType.includes('text/html')) {
    page.noindex = /noindex/i.test(page.xRobotsTag);
    return page;
  }

  const pageUrl = new URL(pagePath, ctx.baseUrl).toString();
  const dom = new JSDOM(response.text, { url: pageUrl, virtualConsole: new VirtualConsole() });
  try {
    const { document } = dom.window;
    const main = document.querySelector('main') || document.body;
    const visibleMain = main ? main.cloneNode(true) : document.createElement('main');
    visibleMain
      .querySelectorAll('script, style, template, noscript')
      .forEach((node) => node.remove());
    const visibleText = (visibleMain.textContent || '').replace(/\s+/g, ' ').trim();

    page.title = document.title.trim();
    page.htmlLang = document.documentElement.getAttribute('lang')?.trim() || '';
    page.description =
      document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
    page.robots =
      document.querySelector('meta[name="robots"]')?.getAttribute('content')?.trim() || '';
    const googlebot =
      document.querySelector('meta[name="googlebot"]')?.getAttribute('content')?.trim() || '';
    page.noindex = /noindex/i.test(`${page.robots} ${googlebot} ${page.xRobotsTag}`);
    page.canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    page.ogImage =
      document.querySelector('meta[property="og:image"]')?.getAttribute('content')?.trim() || '';
    page.alternates = [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
      .map((node) => ({
        hreflang: node.getAttribute('hreflang')?.trim() || '',
        href: node.getAttribute('href') || '',
      }))
      .filter((alternate) => alternate.href);
    page.hreflangs = page.alternates.map((alternate) => alternate.href);
    page.h1 = [...document.querySelectorAll('h1')]
      .map((node) => node.textContent.trim())
      .filter(Boolean);
    page.wordCount = visibleText ? visibleText.split(/\s+/).length : 0;

    for (const anchor of document.querySelectorAll('a[href]')) {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
      let target;
      try {
        target = new URL(href, pageUrl);
      } catch {
        continue;
      }
      if (!isInternalUrl(target, ctx)) continue;
      const targetPath = normalizePath(target, ctx);
      if (targetPath.startsWith('/_next/') || targetPath.startsWith('/api/')) continue;
      page.internalLinks.push(targetPath);
      if (target.search) page.queryStringInternalLinks.push(target.toString());
    }

    const sourcesSection = document.querySelector('section[aria-labelledby="sources-heading"]');
    if (sourcesSection) {
      for (const anchor of sourcesSection.querySelectorAll('a[href]')) {
        try {
          const target = new URL(anchor.getAttribute('href'), pageUrl);
          if (!isInternalUrl(target, ctx)) page.externalSources.push(target.toString());
        } catch {
          // ignore malformed source links
        }
      }
    }

    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const data = JSON.parse(script.textContent);
        collectJsonLdUrls(data, page.jsonLdUrls);
        for (const node of jsonLdNodes(data)) {
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
              const relatedUrl = new URL(String(item.url), pageUrl);
              if (!isInternalUrl(relatedUrl, ctx) || relatedUrl.search || relatedUrl.hash) {
                page.schemaRelatedLinkErrors.push(String(item.url));
              } else {
                page.schemaRelatedLinks.push(normalizePath(relatedUrl, ctx));
              }
            }
          }
          const citations = Array.isArray(node.citation) ? node.citation : [node.citation];
          page.schemaCitations.push(
            ...citations
              .filter((citation) => typeof citation === 'string')
              .map((citation) => new URL(citation, pageUrl).toString()),
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
          .map((anchor) => internalPathOf(anchor.getAttribute('href'), ctx, pageUrl))
          .filter(Boolean),
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
  } finally {
    dom.window.close();
  }
  return page;
}

// ---------------------------------------------------------------------------
// Pure analyses used by the new localization / metadata checks
// ---------------------------------------------------------------------------

const isHtml200 = (page) => page.status === 200 && page.contentType.includes('text/html');
/** 200 HTML, not noindex (canonical not required). */
const isServedIndexable = (page) => isHtml200(page) && !page.noindex;
/** 200 HTML, not noindex, self-referencing canonical. */
export const isIndexable = (page, ctx) =>
  isServedIndexable(page) && canonicalMatchesPage(page.canonical, page.path, ctx);

/** `<html lang>` must match the URL locale (primary subtag, case-insensitive). */
export function findHtmlLangMismatches(pages, ctx) {
  return pages
    .filter(isServedIndexable)
    .map((page) => ({
      path: page.path,
      expected: localeOfPath(page.path, ctx),
      actual: page.htmlLang,
    }))
    .filter((item) => item.actual.split(/[-_]/)[0].toLowerCase() !== item.expected);
}

/** Indexable titles longer than `maxLength` code points, longest first. */
export function findLongTitles(pages, ctx) {
  return pages
    .filter((page) => isIndexable(page, ctx) && page.title)
    .map((page) => ({ path: page.path, length: [...page.title].length, title: page.title }))
    .filter((item) => item.length > ctx.maxTitleLength)
    .sort((a, b) => b.length - a.length || a.path.localeCompare(b.path));
}

/** Duplicate titles within the same locale after stripping the site-name affix. */
export function findDuplicateTitles(pages, ctx) {
  const groups = new Map();
  for (const page of pages) {
    if (!isIndexable(page, ctx) || !page.title) continue;
    const locale = localeOfPath(page.path, ctx);
    const value = normalizeTitle(page.title, ctx.siteName);
    const key = `${locale}\u0000${value}`;
    const group = groups.get(key) || { locale, value, paths: [] };
    group.paths.push(page.path);
    groups.set(key, group);
  }
  return [...groups.values()].filter((group) => group.paths.length > 1);
}

/**
 * JSON-LD `url` / `@id` / `item` values on an indexable page that point at a
 * different locale's URL. Site-wide entities (Organization, WebSite, …), pure
 * `#fragment` references and assets are ignored; the root URL is only checked
 * when used as a BreadcrumbList item.
 */
export function findJsonLdLocaleMismatches(pages, ctx) {
  const results = [];
  for (const page of pages) {
    if (!isServedIndexable(page)) continue;
    const pageLocale = localeOfPath(page.path, ctx);
    const pageUrl = new URL(page.path, ctx.baseUrl);
    const urls = [];
    for (const entry of page.jsonLdUrls || []) {
      let url;
      try {
        url = new URL(entry.value, pageUrl);
      } catch {
        continue;
      }
      if (!isInternalUrl(url, ctx)) continue;
      const targetPath = normalizePath(url, ctx);
      if (isAssetPath(targetPath)) continue;
      if (targetPath === '/' && !entry.breadcrumb) continue;
      const locale = localeOfPath(targetPath, ctx);
      if (locale !== pageLocale) urls.push({ key: entry.key, value: entry.value, locale });
    }
    const unique = [...new Map(urls.map((item) => [`${item.key} ${item.value}`, item])).values()];
    if (unique.length > 0) results.push({ path: page.path, locale: pageLocale, urls: unique });
  }
  return results;
}

/**
 * noindex pages that also emit a self-referencing canonical and/or hreflang
 * alternates. `noindex` + canonical to a *different* URL is the intentional
 * "untranslated locale page → EN" pattern and is not flagged here (its target is
 * validated by findNoindexCanonicalTargetIssues).
 */
export function findNoindexConflicts(pages, ctx) {
  return pages
    .filter((page) => isHtml200(page) && page.noindex)
    .map((page) => {
      const reasons = [];
      if (page.canonical && canonicalMatchesPage(page.canonical, page.path, ctx))
        reasons.push('self-canonical');
      if (page.alternates.length > 0) reasons.push('hreflang');
      return {
        path: page.path,
        reasons,
        canonical: page.canonical,
        hreflangCount: page.alternates.length,
      };
    })
    .filter((item) => item.reasons.length > 0);
}

function describeTargetProblems(target, targetPath, ctx) {
  const reasons = [];
  if (target.status !== 200) reasons.push('not-200');
  if (target.finalPath !== targetPath) reasons.push('redirected');
  if (target.noindex) reasons.push('noindex');
  if (target.canonical && !canonicalMatchesPage(target.canonical, targetPath, ctx))
    reasons.push('canonicalizes-elsewhere');
  return reasons;
}

/** noindex pages canonicalizing to another URL whose target is itself not indexable. */
export function findNoindexCanonicalTargetIssues(pages, pageByPath, ctx) {
  const results = [];
  for (const page of pages) {
    if (!isHtml200(page) || !page.noindex || !page.canonical) continue;
    if (canonicalMatchesPage(page.canonical, page.path, ctx)) continue;
    const targetPath = internalPathOf(page.canonical, ctx);
    if (!targetPath) continue;
    const target = pageByPath.get(targetPath);
    if (!target) continue;
    const reasons = describeTargetProblems(target, targetPath, ctx);
    if (reasons.length > 0)
      results.push({ path: page.path, canonical: page.canonical, target: targetPath, reasons });
  }
  return results;
}

/**
 * hreflang alternates on indexable pages whose targets are non-200, redirected,
 * noindex, canonicalized elsewhere, off the canonical origin, or in a different
 * locale than the hreflang value claims. Targets that were not fetched are
 * counted as unverified.
 */
export function findInvalidHreflangTargets(pages, pageByPath, ctx) {
  const invalid = [];
  const unverified = new Set();
  for (const page of pages) {
    if (!isIndexable(page, ctx)) continue;
    for (const { hreflang, href } of page.alternates) {
      let url;
      try {
        url = new URL(href, ctx.canonicalOrigin);
      } catch {
        invalid.push({ source: page.path, hreflang, href, reasons: ['invalid-url'] });
        continue;
      }
      if (!isInternalUrl(url, ctx)) continue;
      const targetPath = normalizePath(url, ctx);
      const reasons = [];
      if (url.origin !== ctx.canonicalOrigin) reasons.push('noncanonical-origin');
      const language = hreflang.split(/[-_]/)[0].toLowerCase();
      if (
        hreflang.toLowerCase() !== 'x-default' &&
        ctx.locales.includes(language) &&
        localeOfPath(targetPath, ctx) !== language
      ) {
        reasons.push('locale-mismatch');
      }
      const target = pageByPath.get(targetPath);
      if (!target) unverified.add(targetPath);
      else reasons.push(...describeTargetProblems(target, targetPath, ctx));
      if (reasons.length > 0)
        invalid.push({ source: page.path, hreflang, href, target: targetPath, reasons });
    }
  }
  return { invalid, unverified: [...unverified] };
}

/**
 * Indexable localized pages whose title and/or H1 are identical to the EN page
 * for the same path (untranslated but indexable). Untranslated pages marked
 * noindex with canonical → EN are not indexable and therefore never flagged.
 */
export function findLocalizedDuplicates(pages, pageByPath, ctx) {
  const full = [];
  const partial = [];
  const unverified = [];
  const normalizeHeading = (value) =>
    String(value || '')
      .normalize('NFKC')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  for (const page of pages) {
    const locale = localeOfPath(page.path, ctx);
    if (locale === ctx.defaultLocale || !isIndexable(page, ctx)) continue;
    const enPath = localizePath(stripLocale(page.path, ctx), ctx.defaultLocale, ctx);
    const en = pageByPath.get(enPath);
    if (!en || !isHtml200(en)) {
      unverified.push(page.path);
      continue;
    }
    const reasons = [];
    if (
      page.title &&
      normalizeTitle(page.title, ctx.siteName) === normalizeTitle(en.title, ctx.siteName)
    )
      reasons.push('same-title');
    if (page.h1[0] && normalizeHeading(page.h1[0]) === normalizeHeading(en.h1[0]))
      reasons.push('same-h1');
    if (reasons.length === 0) continue;
    const item = { path: page.path, enPath, reasons, title: page.title, h1: page.h1[0] || '' };
    (reasons.length === 2 ? full : partial).push(item);
  }
  return { full, partial, unverified };
}

// ---------------------------------------------------------------------------
// Network
// ---------------------------------------------------------------------------

async function fetchText(ctx, pagePath, options = {}) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(new URL(pagePath, ctx.baseUrl), {
        redirect: options.redirect || 'follow',
        headers: { 'user-agent': 'DevsTools-SEO-Audit/1.0' },
        signal: AbortSignal.timeout(ctx.fetchTimeoutMs),
      });
      return {
        ok: true,
        status: response.status,
        contentType: response.headers.get('content-type') || '',
        location: response.headers.get('location') || '',
        xRobotsTag: response.headers.get('x-robots-tag') || '',
        text: await response.text(),
        finalUrl: response.url,
      };
    } catch (error) {
      lastError = error;
    }
  }
  return {
    ok: false,
    status: 0,
    contentType: '',
    location: '',
    xRobotsTag: '',
    text: '',
    error: String(lastError),
  };
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

export async function runAudit(options = {}) {
  const ctx = createContext(options);
  const { baseUrl, canonicalOrigin } = ctx;
  const np = (input) => normalizePath(input, ctx);

  const robotsResponse = await fetchText(ctx, '/robots.txt');
  const sitemapResponse = await fetchText(ctx, '/sitemap.xml');
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
      sitemapPaths.add(np(url));
    } catch {
      invalidSitemapUrls.push({ url: value, reason: 'invalid-url' });
    }
  }

  // ---- Crawl ---------------------------------------------------------------
  const sampleMode = ctx.crawlMode === 'sample';
  const forcedPaths = ['/', ...PRIORITY_TARGETS.map((target) => target.path)];
  const sample = sampleMode
    ? selectSample([...sitemapPaths], ctx, { forced: forcedPaths })
    : { paths: [...new Set(['/', ...sitemapPaths].map(np))], strata: null };

  const queue = [];
  const queued = new Set();
  const skippedExtras = new Set();
  let extrasQueued = 0;
  const enqueue = (targetPath, kind) => {
    if (!targetPath || queued.has(targetPath)) return;
    if (sampleMode) {
      // Unsampled sitemap pages reached via links are covered by the sitemap
      // itself; verification targets (hreflang/canonical) are always fetched.
      if (kind === 'link' && sitemapPaths.has(targetPath)) return;
      if (extrasQueued >= ctx.maxExtraPages) {
        skippedExtras.add(targetPath);
        return;
      }
      extrasQueued += 1;
    }
    queued.add(targetPath);
    queue.push(targetPath);
  };
  for (const seed of sample.paths) {
    if (queued.has(seed)) continue;
    queued.add(seed);
    queue.push(seed);
  }

  const pages = [];
  const pageByPath = new Map();
  const internalTargets = new Set();
  while (queue.length > 0 && pages.length < ctx.maxPages) {
    const batch = queue.splice(0, Math.min(ctx.concurrency, ctx.maxPages - pages.length));
    const results = await Promise.all(
      batch.map(async (pagePath) => extractPage(await fetchText(ctx, pagePath), pagePath, ctx)),
    );
    // Enqueue in batch order so the crawl stays deterministic.
    for (const page of results) {
      pages.push(page);
      pageByPath.set(page.path, page);
      for (const target of page.internalLinks) {
        internalTargets.add(target);
        enqueue(target, 'link');
      }
      for (const alternate of page.alternates)
        enqueue(internalPathOf(alternate.href, ctx), 'verify');
      if (page.noindex && page.canonical) {
        const canonicalPath = internalPathOf(page.canonical, ctx);
        if (canonicalPath !== page.path) enqueue(canonicalPath, 'verify');
      }
    }
  }
  const crawlTruncated = queue.length > 0;
  const sitemapFetched = [...sitemapPaths].filter((item) => pageByPath.has(item)).length;
  const crawlComplete =
    !crawlTruncated && skippedExtras.size === 0 && sitemapFetched === sitemapPaths.size;
  const skippedChecks = crawlComplete
    ? []
    : [
        'orphaned-indexable-pages',
        'tool-pages-with-weak-contextual-inbound',
        'weak-contextual-inbound-links',
      ];

  // ---- Classic checks --------------------------------------------------------
  const htmlPages = pages.filter((page) => page.contentType.includes('text/html'));
  const canonicalPages = htmlPages.filter((page) =>
    canonicalMatchesPage(page.canonical, page.path, ctx),
  );
  const indexablePages = canonicalPages.filter((page) => !page.noindex);
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
  const unfetchedInternalTargets = [...internalTargets].filter((item) => !pageByPath.has(item));
  // In sample mode, links to unsampled sitemap URLs are expected to be unfetched.
  const unexpectedUnfetchedTargets = unfetchedInternalTargets.filter(
    (item) => !(sampleMode && sitemapPaths.has(item)) && !skippedExtras.has(item),
  );

  const brokenInternalLinks = [...internalTargets]
    .map((item) => pageByPath.get(item))
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

  const sitemapChecks = [...sitemapPaths]
    .filter((item) => !sampleMode || pageByPath.has(item))
    .map((item) => {
      const page = pageByPath.get(item);
      const reasons = [];
      if (!page) reasons.push('not-fetched');
      if (page && page.status !== 200) reasons.push('not-200');
      if (page && page.finalPath !== item) reasons.push('redirected');
      if (page && !page.contentType.includes('text/html')) reasons.push('not-html');
      if (page && page.noindex) reasons.push('noindex');
      if (page && !canonicalMatchesPage(page.canonical, item, ctx))
        reasons.push('canonical-mismatch');
      return {
        path: item,
        valid: reasons.length === 0,
        reasons,
        status: page?.status || 0,
        finalPath: page?.finalPath || '',
      };
    });

  const invalidContextualLinks = toolPages.flatMap((page) =>
    page.relatedInternalLinks
      .filter(
        (target) =>
          target === page.path ||
          (pageByPath.has(target)
            ? !canonicalIndexablePaths.has(target)
            : !sitemapPaths.has(target)),
      )
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
    const actionPath = np(concrete);
    const result = await fetchText(ctx, actionPath, { redirect: 'manual' });
    actionChecks.push({ template, path: actionPath, status: result.status });
  }

  const aliasChecks = [];
  for (const [aliasPath, expectedPath] of ALIASES) {
    const result = await fetchText(ctx, aliasPath, { redirect: 'manual' });
    const actualPath = result.location ? np(result.location) : '';
    aliasChecks.push({ path: aliasPath, expectedPath, status: result.status, actualPath });
  }

  const priorityQueryChecks = PRIORITY_TARGETS.map(({ query, path: targetPath, kind }) => {
    const page = pageByPath.get(targetPath);
    const reasons = [];
    if (!page || page.status !== 200) reasons.push('target-not-200');
    if (!canonicalMatchesPage(page?.canonical, targetPath, ctx)) reasons.push('canonical-mismatch');
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
    if (
      crawlComplete &&
      kind === 'tool' &&
      (contextualInboundSources.get(targetPath)?.size || 0) < 2
    )
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
    return { query, path: targetPath, kind, answerReady: reasons.length === 0, reasons };
  });

  // Readiness coverage across every canonical tool page, not just the priority
  // queries. Reported as metrics so content-coverage gaps stay visible without
  // turning the audit red while the copy catch-up is still in progress.
  const toolPageCoverage = {
    total: toolPages.length,
    answerFirst: toolPages.filter((page) => page.answerFirst).length,
    thinServerReadableCopy: toolPages.filter((page) => (page.wordCount || 0) < 300).length,
    sufficientContextualInternalLinks: toolPages.filter(
      (page) => page.relatedInternalLinks.length >= 3,
    ).length,
    strongContextualInbound: crawlComplete
      ? toolPages.filter((page) => (contextualInboundSources.get(page.path)?.size || 0) >= 2).length
      : null,
    sufficientFaqAnswers: toolPages.filter((page) => (page.faqQuestions.length || 0) >= 2).length,
    faqAnswersFullyVisible: toolPages.filter((page) => page.hiddenFaqQuestions.length === 0).length,
    withVisibleSource: toolPages.filter((page) => (page.externalSources.length || 0) >= 1).length,
    citationSchemaParity: toolPages.filter((page) => {
      const visible = new Set(page.externalSources);
      const schema = new Set(page.schemaCitations);
      return (
        visible.size > 0 &&
        visible.size === schema.size &&
        [...visible].every((url) => schema.has(url))
      );
    }).length,
  };

  // ---- Localization / metadata checks ---------------------------------------
  const htmlLangMismatches = findHtmlLangMismatches(pages, ctx);
  const longTitles = findLongTitles(pages, ctx);
  const duplicateTitles = findDuplicateTitles(pages, ctx);
  const jsonLdLocaleMismatches = findJsonLdLocaleMismatches(pages, ctx);
  const noindexConflicts = findNoindexConflicts(pages, ctx);
  const noindexCanonicalTargetIssues = findNoindexCanonicalTargetIssues(pages, pageByPath, ctx);
  const hreflangTargets = findInvalidHreflangTargets(pages, pageByPath, ctx);
  const localizedDuplicates = findLocalizedDuplicates(pages, pageByPath, ctx);

  // ---- Issues ----------------------------------------------------------------
  const issues = [];
  const addIssue = (severity, code, count, details) => {
    if (count > 0) issues.push({ severity, code, count, details });
  };
  const listIssue = (severity, code, items) => addIssue(severity, code, items.length, items);

  addIssue('critical', 'robots-unavailable', robotsResponse.status !== 200 ? 1 : 0, {
    status: robotsResponse.status,
    error: robotsResponse.error || null,
  });
  addIssue('critical', 'sitemap-unavailable', sitemapResponse.status !== 200 ? 1 : 0, {
    status: sitemapResponse.status,
    error: sitemapResponse.error || null,
  });
  const blocked = /^\s*Disallow:\s*\/\s*$/im.test(robotsResponse.text);
  addIssue('critical', 'site-blocked-by-robots', blocked ? 1 : 0, blocked ? ['Disallow: /'] : []);
  // Only an unintended cap in full mode is a failure; a sample is partial by design.
  addIssue('critical', 'crawl-truncated', !sampleMode && crawlTruncated ? 1 : 0, {
    maxPages: ctx.maxPages,
    remainingQueue: queue.length,
  });
  addIssue('medium', 'sample-extras-truncated', skippedExtras.size, {
    maxExtraPages: ctx.maxExtraPages,
    skipped: [...skippedExtras].slice(0, 50),
  });
  listIssue('critical', 'unfetched-internal-targets', unexpectedUnfetchedTargets);
  listIssue('critical', 'broken-internal-links', brokenInternalLinks);
  listIssue(
    'critical',
    'indexable-pages-without-canonical',
    htmlPages
      .filter((page) => page.status === 200 && !page.noindex && !page.canonical)
      .map((page) => page.path),
  );
  listIssue(
    'high',
    'invalid-canonical',
    htmlPages
      .filter(
        (page) =>
          page.status === 200 &&
          page.canonical &&
          !page.noindex &&
          !canonicalMatchesPage(page.canonical, page.path, ctx),
      )
      .map((page) => ({ path: page.path, canonical: page.canonical })),
  );
  listIssue('high', 'invalid-sitemap-url', invalidSitemapUrls);
  listIssue(
    'high',
    'invalid-sitemap-entry',
    sitemapChecks.filter((item) => !item.valid),
  );
  listIssue('high', 'invalid-sitemap-lastmod', invalidSitemapLastmod);
  if (crawlComplete) {
    listIssue(
      'high',
      'orphaned-indexable-pages',
      indexablePages
        .filter(
          (page) => page.path !== '/' && (inboundInternalSources.get(page.path)?.size || 0) === 0,
        )
        .map((page) => page.path),
    );
  }
  listIssue(
    'high',
    'tool-pages-without-contextual-internal-links',
    toolPages
      .filter((page) => page.relatedInternalLinks.length < 3)
      .map((page) => ({ path: page.path, relatedLinks: page.relatedInternalLinks })),
  );
  if (crawlComplete) {
    listIssue(
      'high',
      'tool-pages-with-weak-contextual-inbound',
      toolPages
        .filter((page) => (contextualInboundSources.get(page.path)?.size || 0) < 2)
        .map((page) => ({
          path: page.path,
          sources: [...(contextualInboundSources.get(page.path) || [])],
        })),
    );
  }
  listIssue('high', 'invalid-contextual-internal-links', invalidContextualLinks);
  listIssue('high', 'contextual-link-schema-mismatch', relatedSchemaMismatches);
  listIssue(
    'high',
    'invalid-contextual-link-schema-url',
    toolPages
      .filter((page) => page.schemaRelatedLinkErrors.length > 0)
      .map((page) => ({ path: page.path, urls: page.schemaRelatedLinkErrors })),
  );
  listIssue('high', 'sitemap-missing-indexable-pages', sitemapMissing);
  listIssue(
    'high',
    'faq-schema-not-visible',
    toolPages
      .filter((page) => page.hiddenFaqQuestions.length > 0)
      .map((page) => ({ path: page.path, questions: page.hiddenFaqQuestions })),
  );
  listIssue(
    'high',
    'invalid-search-action-target',
    actionChecks.filter((item) => item.status !== 200),
  );
  listIssue(
    'high',
    'query-string-hreflang',
    indexablePages
      .filter((page) =>
        page.hreflangs.some((href) => {
          try {
            return Boolean(new URL(href, canonicalOrigin).search);
          } catch {
            return false;
          }
        }),
      )
      .map((page) => page.path),
  );
  listIssue(
    'high',
    'noncanonical-alias-not-redirected',
    aliasChecks.filter((item) => item.status !== 308 || item.actualPath !== item.expectedPath),
  );
  listIssue(
    'high',
    'priority-query-not-answer-ready',
    priorityQueryChecks.filter((item) => !item.answerReady),
  );
  listIssue(
    'high',
    'invalid-json-ld',
    htmlPages.filter((page) => page.schemaErrors.length > 0).map((page) => page.path),
  );
  listIssue(
    'high',
    'tool-pages-without-og-image',
    toolPages.filter((page) => !page.ogImage).map((page) => page.path),
  );
  listIssue(
    'high',
    'citation-schema-mismatch',
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
  listIssue('high', 'html-lang-mismatch', htmlLangMismatches);
  listIssue('high', 'json-ld-locale-mismatch', jsonLdLocaleMismatches);
  listIssue('high', 'noindex-with-canonical-or-hreflang', noindexConflicts);
  listIssue('high', 'noindex-canonical-target-invalid', noindexCanonicalTargetIssues);
  listIssue('high', 'hreflang-target-invalid', hreflangTargets.invalid);
  listIssue('high', 'localized-page-duplicates-en', localizedDuplicates.full);
  listIssue('medium', 'localized-page-partially-duplicates-en', localizedDuplicates.partial);
  listIssue('medium', 'duplicate-titles', duplicateTitles);
  listIssue(
    'medium',
    'missing-or-multiple-h1',
    indexablePages
      .filter((page) => page.h1.length !== 1)
      .map((page) => ({ path: page.path, h1: page.h1 })),
  );
  listIssue(
    'medium',
    'missing-meta-description',
    indexablePages.filter((page) => !page.description).map((page) => page.path),
  );
  listIssue('medium', 'duplicate-tool-og-images', duplicateToolOgImages);
  listIssue(
    'medium',
    'tool-pages-without-sources',
    toolPages.filter((page) => page.externalSources.length === 0).map((page) => page.path),
  );
  listIssue('medium', 'query-string-internal-links', queryStringInternalLinks);
  listIssue('medium', 'internal-links-to-redirects', redirectingInternalLinks);
  addIssue('warning', 'titles-too-long', longTitles.length, {
    maxLength: ctx.maxTitleLength,
    worst: longTitles.slice(0, 10),
  });

  const bySeverity = (severity) => issues.filter((issue) => issue.severity === severity).length;
  return {
    auditedAt: new Date().toISOString(),
    baseUrl: baseUrl.toString(),
    canonicalOrigin,
    summary: {
      robotsStatus: robotsResponse.status,
      sitemapStatus: sitemapResponse.status,
      sitemapUrls: sitemapPaths.size,
      sitemapUrlsWithLastmod: sitemapEntries.length - missingSitemapLastmod.length,
      crawlMode: ctx.crawlMode,
      sampleSize: sampleMode ? ctx.sampleSize : null,
      sampledSitemapUrls: sitemapFetched,
      sitemapCoverage: sitemapPaths.size ? sitemapFetched / sitemapPaths.size : 1,
      sampleStrata: sample.strata,
      crawlComplete,
      skippedChecks,
      crawledUrls: pages.length,
      htmlPages: htmlPages.length,
      canonicalIndexablePages: indexablePages.length,
      canonicalToolPages: toolPages.length,
      unverifiedHreflangTargets: hreflangTargets.unverified.length,
      unverifiedLocalizedDuplicateChecks: localizedDuplicates.unverified.length,
      priorityQueries: priorityQueryChecks.length,
      answerReadyPriorityQueries: priorityQueryChecks.filter((item) => item.answerReady).length,
      criticalIssues: bySeverity('critical'),
      highIssues: bySeverity('high'),
      mediumIssues: bySeverity('medium'),
      warningIssues: bySeverity('warning'),
      crawlTruncated: !sampleMode && crawlTruncated,
    },
    issues,
    actionChecks,
    aliasChecks,
    sitemapChecks,
    priorityQueryChecks,
    toolPageCoverage,
    pages: pages.map(({ internalLinks, jsonLdUrls, ...page }) => ({
      ...page,
      internalLinkCount: internalLinks.length,
      jsonLdUrlCount: jsonLdUrls.length,
      inboundInternalLinkCount: inboundInternalSources.get(page.path)?.size || 0,
      contextualInboundLinkCount: contextualInboundSources.get(page.path)?.size || 0,
    })),
  };
}

export function exitCodeFor(report) {
  return report.summary.criticalIssues > 0 || report.summary.highIssues > 0 ? 2 : 0;
}

function isMainModule() {
  if (!process.argv[1]) return false;
  const self = fileURLToPath(import.meta.url);
  const invoked = path.resolve(process.argv[1]);
  return process.platform === 'win32'
    ? self.toLowerCase() === invoked.toLowerCase()
    : self === invoked;
}

if (isMainModule()) {
  const report = await runAudit(parseArgs(process.argv.slice(2)));
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = exitCodeFor(report);
}
