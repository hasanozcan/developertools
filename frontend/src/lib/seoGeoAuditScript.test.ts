// @vitest-environment node

import { spawn } from 'node:child_process';
import { createServer, type Server } from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

// ---------------------------------------------------------------------------
// Module under test. Loaded through a non-literal specifier so `tsc` does not
// pull the plain-JS script (top-level await) into the TypeScript program.
// ---------------------------------------------------------------------------

type Ctx = Record<string, unknown> & { maxTitleLength: number };
type Page = Record<string, unknown> & { path: string };
type Issue = { severity: string; code: string; count: number; details: unknown };
type Report = {
  summary: Record<string, unknown>;
  issues: Issue[];
  pages: Array<Record<string, unknown>>;
};
type FetchLike = { status: number; contentType: string; text: string; xRobotsTag?: string };
type AuditModule = {
  createContext: (options?: Record<string, unknown>) => Ctx;
  extractPage: (response: FetchLike, path: string, ctx: Ctx) => Page;
  normalizeTitle: (title: string, siteName?: string) => string;
  selectSample: (
    paths: string[],
    ctx: Ctx,
    options?: { sampleSize?: number; forced?: string[] },
  ) => { paths: string[]; strata: Record<string, number> };
  findHtmlLangMismatches: (pages: Page[], ctx: Ctx) => unknown[];
  findLongTitles: (pages: Page[], ctx: Ctx) => Array<{ path: string; length: number }>;
  findDuplicateTitles: (pages: Page[], ctx: Ctx) => unknown[];
  findJsonLdLocaleMismatches: (pages: Page[], ctx: Ctx) => unknown[];
  findNoindexConflicts: (pages: Page[], ctx: Ctx) => unknown[];
  findInvalidHreflangTargets: (
    pages: Page[],
    byPath: Map<string, Page>,
    ctx: Ctx,
  ) => { invalid: unknown[]; unverified: string[] };
  findLocalizedDuplicates: (
    pages: Page[],
    byPath: Map<string, Page>,
    ctx: Ctx,
  ) => { full: unknown[]; partial: unknown[]; unverified: string[] };
  runAudit: (options: Record<string, unknown>) => Promise<Report>;
};

const scriptPath = path.resolve(process.cwd(), 'scripts/seo-geo-audit.mjs');
let audit: AuditModule;
beforeAll(async () => {
  audit = (await import(/* @vite-ignore */ pathToFileURL(scriptPath).href)) as AuditModule;
});

// ---------------------------------------------------------------------------
// HTML fixtures
// ---------------------------------------------------------------------------

const ORIGIN = 'https://devstools.app';

type Fixture = {
  lang?: string;
  title?: string;
  canonical?: string;
  robots?: string;
  alternates?: Array<[hreflang: string, href: string]>;
  h1?: string;
  jsonLd?: unknown[];
  links?: string[];
};

function html({
  lang = 'en',
  title = 'Page',
  canonical,
  robots,
  alternates = [],
  h1 = title,
  jsonLd = [],
  links = [],
}: Fixture) {
  return [
    `<!doctype html><html lang="${lang}"><head><title>${title}</title>`,
    canonical ? `<link rel="canonical" href="${canonical}">` : '',
    robots ? `<meta name="robots" content="${robots}">` : '',
    ...alternates.map(
      ([hreflang, href]) => `<link rel="alternate" hreflang="${hreflang}" href="${href}">`,
    ),
    ...jsonLd.map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`),
    `</head><body><main><h1>${h1}</h1>`,
    ...links.map((href) => `<a href="${href}">${href}</a>`),
    '</main></body></html>',
  ].join('');
}

function makePage(ctx: Ctx, pathname: string, fixture: Fixture, status = 200) {
  return audit.extractPage(
    { status, contentType: 'text/html; charset=utf-8', text: html(fixture) },
    pathname,
    ctx,
  );
}

/** Self-canonical indexable page on the canonical origin. */
function indexable(ctx: Ctx, pathname: string, fixture: Fixture = {}) {
  return makePage(ctx, pathname, { canonical: `${ORIGIN}${pathname}`, ...fixture });
}

const byPath = (pages: Page[]) => new Map(pages.map((page) => [page.path, page]));

// ---------------------------------------------------------------------------
// Mock site server for end-to-end runs. Each test gets its own server whose
// origin is captured in a closure (no module-level state read lazily by the
// request handler), and every server is force-closed after the test.
// ---------------------------------------------------------------------------

type Route = { status?: number; type?: string; body: string; headers?: Record<string, string> };
type Routes = Record<string, Route>;

const openServers = new Set<Server>();

afterEach(async () => {
  await Promise.all(
    [...openServers].map(
      (server) =>
        new Promise<void>((resolve) => {
          server.closeAllConnections();
          server.close(() => resolve());
        }),
    ),
  );
  openServers.clear();
});

async function startSite(build: (origin: string) => Routes) {
  let routes: Routes = {};
  const server = createServer((request, response) => {
    const route = routes[(request.url || '/').split('?')[0]] || {
      status: 404,
      body: '<h1>Not found</h1>',
    };
    response.writeHead(route.status ?? 200, {
      'content-type': route.type ?? 'text/html; charset=utf-8',
      ...route.headers,
    });
    response.end(route.body);
  });
  openServers.add(server);
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve());
  });
  const origin = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  routes = {
    '/robots.txt': { type: 'text/plain', body: 'User-agent: *\nAllow: /' },
    ...build(origin),
  };
  return origin;
}

function sitemap(origin: string, paths: string[], lastmod = '<lastmod>2026-07-11</lastmod>') {
  return {
    type: 'application/xml',
    body: `<urlset>${paths.map((item) => `<url><loc>${origin}${item}</loc>${lastmod}</url>`).join('')}</urlset>`,
  };
}

async function auditSite(build: (origin: string) => Routes, options: Record<string, unknown> = {}) {
  const origin = await startSite(build);
  return audit.runAudit({ baseUrl: origin, canonicalOrigin: origin, concurrency: 4, ...options });
}

const findIssue = (report: Report, code: string) =>
  report.issues.find((issue) => issue.code === code);

type LegacyMode =
  | 'wrong-canonical'
  | 'wrong-sitemap-origin'
  | 'broken-sitemap-entry'
  | 'missing-lastmod'
  | 'invalid-lastmod'
  | 'future-lastmod'
  | 'duplicate-tool-og';

function legacySite(mode: LegacyMode) {
  return (origin: string): Routes => {
    const lastModified =
      mode === 'missing-lastmod'
        ? ''
        : `<lastmod>${
            mode === 'invalid-lastmod'
              ? 'not-a-date'
              : mode === 'future-lastmod'
                ? '2999-01-01'
                : '2026-07-11'
          }</lastmod>`;
    const routes: Routes = {
      '/gone': { status: 404, body: '<h1>Gone</h1>' },
      '/': {
        body: `<html><head><link rel="canonical" href="${
          mode === 'wrong-canonical' ? 'https://wrong.example/' : origin
        }"></head><body><main><h1>Home</h1></main></body></html>`,
      },
    };
    if (mode === 'duplicate-tool-og') {
      for (const tool of ['/tools/json/first-tool', '/tools/json/second-tool']) {
        routes[tool] = {
          body: `<html><head><link rel="canonical" href="${origin}${tool}"><meta property="og:image" content="${origin}/shared.png"></head><body><main><h1>Tool</h1></main></body></html>`,
        };
      }
      routes['/sitemap.xml'] = sitemap(
        origin,
        ['/tools/json/first-tool', '/tools/json/second-tool'],
        lastModified,
      );
    } else if (mode === 'wrong-sitemap-origin') {
      routes['/sitemap.xml'] = {
        type: 'application/xml',
        body: `<urlset><url><loc>https://wrong.example/</loc>${lastModified}</url></urlset>`,
      };
    } else {
      routes['/sitemap.xml'] = sitemap(
        origin,
        [mode === 'broken-sitemap-entry' ? '/gone' : '/'],
        lastModified,
      );
    }
    return routes;
  };
}

// ---------------------------------------------------------------------------
// Existing end-to-end checks (now in-process: no child process per test)
// ---------------------------------------------------------------------------

describe('SEO/GEO audit script', { timeout: 30_000 }, () => {
  it('rejects a canonical on the wrong origin', async () => {
    const report = await auditSite(legacySite('wrong-canonical'));
    expect(findIssue(report, 'invalid-canonical')).toBeTruthy();
    expect(findIssue(report, 'invalid-sitemap-entry')?.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '/', reasons: ['canonical-mismatch'] }),
      ]),
    );
  });

  it('rejects sitemap URLs on the wrong origin', async () => {
    const report = await auditSite(legacySite('wrong-sitemap-origin'));
    expect(findIssue(report, 'invalid-sitemap-url')).toBeTruthy();
  });

  it('rejects a broken sitemap entry', async () => {
    const report = await auditSite(legacySite('broken-sitemap-entry'));
    expect(findIssue(report, 'invalid-sitemap-entry')?.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '/gone', reasons: expect.arrayContaining(['not-200']) }),
      ]),
    );
  });

  it('allows sitemap entries without optional lastmod values', async () => {
    const report = await auditSite(legacySite('missing-lastmod'));
    expect(findIssue(report, 'sitemap-entries-without-lastmod')).toBeUndefined();
  });

  it.each([
    ['invalid-lastmod', 'not-a-date'],
    ['future-lastmod', '2999-01-01'],
  ] as const)('rejects %s sitemap values', async (mode, lastModified) => {
    const report = await auditSite(legacySite(mode));
    expect(findIssue(report, 'invalid-sitemap-lastmod')?.details).toEqual([
      expect.objectContaining({ url: expect.stringMatching(/\/$/), lastModified }),
    ]);
  });

  it('reports tool pages that reuse one Open Graph image', async () => {
    const report = await auditSite(legacySite('duplicate-tool-og'));
    expect(findIssue(report, 'duplicate-tool-og-images')?.details).toEqual([
      expect.objectContaining({
        value: expect.stringMatching(/shared\.png$/),
        paths: ['/tools/json/first-tool', '/tools/json/second-tool'],
      }),
    ]);
  });

  it('runs as a CLI and exits with code 2 when high issues exist', async () => {
    const origin = await startSite(legacySite('wrong-canonical'));
    const result = await new Promise<{ code: number | null; stdout: string; stderr: string }>(
      (resolve, reject) => {
        const child = spawn(
          process.execPath,
          [scriptPath, `--base-url=${origin}`, `--canonical-origin=${origin}`],
          { cwd: process.cwd(), env: { ...process.env, NODE_OPTIONS: '' } },
        );
        // Never leave an orphaned child hitting a server another test may reuse.
        const killTimer = setTimeout(() => child.kill(), 25_000);
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', (chunk) => {
          stdout += chunk;
        });
        child.stderr.on('data', (chunk) => {
          stderr += chunk;
        });
        child.on('error', reject);
        child.on('close', (code) => {
          clearTimeout(killTimer);
          resolve({ code, stdout, stderr });
        });
      },
    );
    expect(result.stderr).toBe('');
    expect(result.code).toBe(2);
    const report = JSON.parse(result.stdout) as Report;
    expect(findIssue(report, 'invalid-canonical')).toBeTruthy();
    expect(report.summary.crawlMode).toBe('sample');
  });
});

// ---------------------------------------------------------------------------
// New checks: unit tests on small HTML fixtures
// ---------------------------------------------------------------------------

describe('SEO/GEO audit localization checks', () => {
  const ctx = () => audit.createContext({ baseUrl: ORIGIN, canonicalOrigin: ORIGIN });

  it('flags <html lang> that does not match the URL locale', () => {
    const c = ctx();
    const pages = [
      indexable(c, '/', { lang: 'en' }),
      indexable(c, '/tr/tools/json/json-formatter', { lang: 'en' }),
      indexable(c, '/de/tools/json/json-formatter', { lang: 'de-DE' }),
      indexable(c, '/zh', { lang: 'zh-CN' }),
      indexable(c, '/fr/about', { lang: '' }),
      // Untranslated noindex pages legitimately render English content.
      makePage(c, '/es/tools/json/json-formatter', {
        lang: 'en',
        robots: 'noindex, follow',
        canonical: `${ORIGIN}/tools/json/json-formatter`,
      }),
    ];
    expect(audit.findHtmlLangMismatches(pages, c)).toEqual([
      { path: '/tr/tools/json/json-formatter', expected: 'tr', actual: 'en' },
      { path: '/fr/about', expected: 'fr', actual: '' },
    ]);
  });

  it('reports titles over the length budget, longest first', () => {
    const c = audit.createContext({ baseUrl: ORIGIN, canonicalOrigin: ORIGIN, maxTitleLength: 60 });
    const long = 'JSON Formatter – Format, Validate and Beautify JSON Online | DevsTools';
    const longer = 'Regex Tester – Test JavaScript Regular Expressions Online Free | DevsTools';
    const pages = [
      indexable(c, '/tools/json/json-formatter', { title: long }),
      indexable(c, '/tools/text/regex-tester', { title: longer }),
      indexable(c, '/tools/json/json-csv', { title: 'JSON to CSV | DevsTools' }),
      makePage(c, '/tools/noindexed', { title: `${longer} extra`, robots: 'noindex' }),
    ];
    expect(audit.findLongTitles(pages, c)).toEqual([
      { path: '/tools/text/regex-tester', length: [...longer].length, title: longer },
      { path: '/tools/json/json-formatter', length: [...long].length, title: long },
    ]);
  });

  it('normalizes the site-name affix before comparing titles within a locale', () => {
    expect(audit.normalizeTitle('JSON Formatter | DevsTools')).toBe('json formatter');
    expect(audit.normalizeTitle('JSON Formatter – DevsTools Türkçe')).toBe('json formatter');
    expect(audit.normalizeTitle('DevsTools – 500 Free Tools')).toBe('500 free tools');
    expect(audit.normalizeTitle('DevsTools')).toBe('devstools');

    const c = ctx();
    const pages = [
      indexable(c, '/tools/json/a', { title: 'JSON Formatter | DevsTools' }),
      indexable(c, '/tools/json/b', { title: 'JSON Formatter – DevsTools' }),
      indexable(c, '/tr/tools/json/a', { title: 'JSON Formatter | DevsTools', lang: 'tr' }),
      indexable(c, '/tr/tools/json/b', { title: 'JSON Biçimlendirici – DevsTools', lang: 'tr' }),
    ];
    expect(audit.findDuplicateTitles(pages, c)).toEqual([
      { locale: 'en', value: 'json formatter', paths: ['/tools/json/a', '/tools/json/b'] },
    ]);
  });

  it('flags JSON-LD url/@id/item values that point at another locale', () => {
    const c = ctx();
    const trPath = '/tr/tools/json/json-formatter';
    const siteEntities = [
      {
        '@type': 'Organization',
        '@id': `${ORIGIN}/#organization`,
        url: ORIGIN,
        logo: `${ORIGIN}/logo.png`,
      },
      { '@type': 'WebSite', url: `${ORIGIN}/` },
    ];
    const bad = indexable(c, trPath, {
      lang: 'tr',
      jsonLd: [
        ...siteEntities,
        {
          '@type': 'WebPage',
          '@id': `${ORIGIN}${trPath}#webpage`,
          url: `${ORIGIN}${trPath}`,
          publisher: { '@id': `${ORIGIN}/#organization` },
          image: {
            '@type': 'ImageObject',
            url: `${ORIGIN}/tools/json/json-formatter/opengraph-image`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, item: `${ORIGIN}/tools/json` },
            {
              '@type': 'ListItem',
              position: 3,
              item: { '@id': `${ORIGIN}/tools/json/json-formatter`, name: 'JSON' },
            },
          ],
        },
      ],
    });
    const good = indexable(c, '/de/tools/json/json-formatter', {
      lang: 'de',
      jsonLd: [
        ...siteEntities,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, item: `${ORIGIN}/de` },
            { '@type': 'ListItem', position: 2, item: `${ORIGIN}/de/tools/json` },
          ],
        },
      ],
    });
    // /en page pointing at a /tr URL is just as wrong.
    const enBad = indexable(c, '/tools/json/json-csv', {
      jsonLd: [{ '@type': 'WebPage', url: `${ORIGIN}/tr/tools/json/json-csv` }],
    });
    expect(audit.findJsonLdLocaleMismatches([bad, good, enBad], c)).toEqual([
      {
        path: trPath,
        locale: 'tr',
        urls: [
          { key: 'item', value: `${ORIGIN}/`, locale: 'en' },
          { key: 'item', value: `${ORIGIN}/tools/json`, locale: 'en' },
          { key: '@id', value: `${ORIGIN}/tools/json/json-formatter`, locale: 'en' },
        ],
      },
      {
        path: '/tools/json/json-csv',
        locale: 'en',
        urls: [{ key: 'url', value: `${ORIGIN}/tr/tools/json/json-csv`, locale: 'tr' }],
      },
    ]);
  });

  it('flags noindex pages that still emit a self canonical or hreflang', () => {
    const c = ctx();
    const pages = [
      makePage(c, '/tools/a', { robots: 'noindex', canonical: `${ORIGIN}/tools/a` }),
      makePage(c, '/tools/b', { robots: 'noindex', alternates: [['en', `${ORIGIN}/tools/b`]] }),
      // Intentional pattern: untranslated locale page → noindex + canonical to EN.
      makePage(c, '/de/tools/c', { robots: 'noindex, follow', canonical: `${ORIGIN}/tools/c` }),
      indexable(c, '/tools/c', { alternates: [['en', `${ORIGIN}/tools/c`]] }),
    ];
    expect(audit.findNoindexConflicts(pages, c)).toEqual([
      {
        path: '/tools/a',
        reasons: ['self-canonical'],
        canonical: `${ORIGIN}/tools/a`,
        hreflangCount: 0,
      },
      { path: '/tools/b', reasons: ['hreflang'], canonical: '', hreflangCount: 1 },
    ]);
  });

  it('flags indexable localized pages identical to EN but not noindex untranslated pages', () => {
    const c = ctx();
    const en = indexable(c, '/tools/json/json-formatter', {
      title: 'JSON Formatter | DevsTools',
      h1: 'JSON Formatter',
    });
    const pages = [
      en,
      // Same title (different suffix) and H1 while indexable → high.
      indexable(c, '/de/tools/json/json-formatter', {
        lang: 'de',
        title: 'JSON Formatter – DevsTools Deutsch',
        h1: 'JSON Formatter',
      }),
      // Only the H1 is untranslated → medium.
      indexable(c, '/fr/tools/json/json-formatter', {
        lang: 'fr',
        title: 'Formateur JSON | DevsTools',
        h1: 'JSON Formatter',
      }),
      // Untranslated but correctly noindex + canonical → EN: OK.
      makePage(c, '/tr/tools/json/json-formatter', {
        title: 'JSON Formatter | DevsTools',
        h1: 'JSON Formatter',
        robots: 'noindex, follow',
        canonical: `${ORIGIN}/tools/json/json-formatter`,
      }),
      // Translated: OK.
      indexable(c, '/es/tools/json/json-formatter', {
        lang: 'es',
        title: 'Formateador JSON | DevsTools',
        h1: 'Formateador JSON',
      }),
      // EN counterpart not crawled → unverified, not flagged.
      indexable(c, '/es/tools/json/json-csv', { lang: 'es', title: 'JSON a CSV' }),
    ];
    const result = audit.findLocalizedDuplicates(pages, byPath(pages), c);
    expect(result.full).toEqual([
      expect.objectContaining({
        path: '/de/tools/json/json-formatter',
        enPath: '/tools/json/json-formatter',
        reasons: ['same-title', 'same-h1'],
      }),
    ]);
    expect(result.partial).toEqual([
      expect.objectContaining({ path: '/fr/tools/json/json-formatter', reasons: ['same-h1'] }),
    ]);
    expect(result.unverified).toEqual(['/es/tools/json/json-csv']);
  });

  it('flags hreflang alternates whose targets are not indexable canonical pages', () => {
    const c = ctx();
    const base = '/tools/json/json-formatter';
    const source = indexable(c, base, {
      alternates: [
        ['en', `${ORIGIN}${base}`],
        ['tr', `${ORIGIN}/tr${base}`],
        ['de', `${ORIGIN}/de${base}`],
        ['fr', `${ORIGIN}/fr${base}`],
        ['es', `${ORIGIN}/es${base}`],
        ['ru', `${ORIGIN}/zh${base}`],
        ['zh', `${ORIGIN}/zh-missing${base}`],
        ['x-default', `${ORIGIN}${base}`],
      ],
    });
    const pages = [
      source,
      indexable(c, `/tr${base}`, { lang: 'tr' }),
      makePage(c, `/de${base}`, { robots: 'noindex', canonical: `${ORIGIN}${base}` }),
      makePage(c, `/fr${base}`, {}, 404),
      makePage(c, `/es${base}`, { canonical: `${ORIGIN}${base}` }),
      indexable(c, `/zh${base}`, { lang: 'zh' }),
    ];
    const result = audit.findInvalidHreflangTargets(pages, byPath(pages), c);
    expect(result.invalid).toEqual([
      expect.objectContaining({ hreflang: 'de', reasons: ['noindex', 'canonicalizes-elsewhere'] }),
      expect.objectContaining({ hreflang: 'fr', reasons: ['not-200'] }),
      expect.objectContaining({ hreflang: 'es', reasons: ['canonicalizes-elsewhere'] }),
      expect.objectContaining({ hreflang: 'ru', reasons: ['locale-mismatch'] }),
      expect.objectContaining({ hreflang: 'zh', reasons: ['locale-mismatch'] }),
    ]);
    expect(result.unverified).toEqual([`/zh-missing${base}`]);
  });

  it('builds a deterministic stratified sample that keeps locale variants together', () => {
    const c = ctx();
    const locales = ['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh'];
    const prefix = (locale: string, base: string) =>
      locale === 'en' ? base : base === '/' ? `/${locale}` : `/${locale}${base}`;
    const bases = [
      '/',
      '/about',
      '/privacy',
      '/tools',
      ...Array.from({ length: 20 }, (_, i) => `/tools/cat-${i}`),
      ...Array.from({ length: 500 }, (_, i) => `/tools/cat-${i % 20}/tool-${i}`),
      ...Array.from({ length: 12 }, (_, i) => `/collections/set-${i}`),
    ];
    const all = bases.flatMap((base) => locales.map((locale) => prefix(locale, base)));
    expect(all.length).toBeGreaterThan(3_700);

    const forced = ['/tools/cat-3/tool-123'];
    const first = audit.selectSample(all, c, { sampleSize: 400, forced });
    const second = audit.selectSample(all, c, { sampleSize: 400, forced });
    expect(first.paths).toEqual(second.paths);
    expect(first.paths.length).toBeGreaterThan(300);
    expect(first.paths.length).toBeLessThan(600);
    for (const path of forced) expect(first.paths).toContain(path);

    const types = new Set(Object.keys(first.strata).map((key) => key.split(':')[1]));
    expect([...types].sort()).toEqual([
      'category',
      'collection',
      'home',
      'static',
      'tool',
      'tools-index',
    ]);
    const sampledLocales = new Set(Object.keys(first.strata).map((key) => key.split(':')[0]));
    expect([...sampledLocales].sort()).toEqual([...locales].sort());

    // Every sampled base path is fetched in all of its locale variants.
    const sampled = new Set(first.paths);
    for (const path of first.paths.filter((item) => /^\/tools\/cat-\d+\/tool-\d+$/.test(item))) {
      for (const locale of locales) expect(sampled).toContain(prefix(locale, path));
    }
    // Tool picks are spread across the list, not just the first N.
    const toolNumbers = first.paths
      .map((item) => item.match(/^\/tools\/cat-\d+\/tool-(\d+)$/)?.[1])
      .filter(Boolean)
      .map(Number);
    expect(Math.max(...toolNumbers)).toBeGreaterThan(400);
  });
});

// ---------------------------------------------------------------------------
// New checks end-to-end: sampling semantics and wiring into the report
// ---------------------------------------------------------------------------

describe('SEO/GEO audit crawl modes', { timeout: 30_000 }, () => {
  function localizedSite(origin: string): Routes {
    const tool = '/tools/json/json-formatter';
    const alternates: Array<[string, string]> = [
      ['en', `${origin}${tool}`],
      ['tr', `${origin}/tr${tool}`],
      ['de', `${origin}/de${tool}`],
      ['x-default', `${origin}${tool}`],
    ];
    const page = (fixture: Fixture) => ({ body: html(fixture) });
    return {
      '/sitemap.xml': sitemap(origin, ['/', tool, `/tr${tool}`, '/tools/json/a', '/tools/json/b']),
      '/': page({
        canonical: `${origin}/`,
        title: 'Home | DevsTools',
      }),
      [tool]: page({
        canonical: `${origin}${tool}`,
        title: 'JSON Formatter – Format, Validate and Beautify JSON Online Now | DevsTools',
        h1: 'JSON Formatter',
        alternates,
      }),
      // Hard-coded lang, untranslated title/H1, EN breadcrumb items.
      [`/tr${tool}`]: page({
        lang: 'en',
        canonical: `${origin}/tr${tool}`,
        title: 'JSON Formatter – Format, Validate and Beautify JSON Online Now – DevsTools Türkçe',
        h1: 'JSON Formatter',
        alternates,
        jsonLd: [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [{ '@type': 'ListItem', position: 1, item: `${origin}${tool}` }],
          },
        ],
      }),
      // hreflang target not in the sitemap: noindex but still emitting hreflang.
      [`/de${tool}`]: page({
        lang: 'de',
        robots: 'noindex',
        canonical: `${origin}/de${tool}`,
        alternates,
      }),
      '/tools/json/a': page({ canonical: `${origin}/tools/json/a`, title: 'Same | DevsTools' }),
      '/tools/json/b': page({ canonical: `${origin}/tools/json/b`, title: 'Same – DevsTools' }),
    };
  }

  it('wires the localization checks into the report with the expected severities', async () => {
    const report = await auditSite(localizedSite);
    const severityOf = (code: string) => findIssue(report, code)?.severity;
    expect(severityOf('html-lang-mismatch')).toBe('high');
    expect(severityOf('json-ld-locale-mismatch')).toBe('high');
    expect(severityOf('noindex-with-canonical-or-hreflang')).toBe('high');
    expect(severityOf('hreflang-target-invalid')).toBe('high');
    expect(severityOf('localized-page-duplicates-en')).toBe('high');
    expect(severityOf('duplicate-titles')).toBe('medium');
    expect(findIssue(report, 'titles-too-long')).toEqual({
      severity: 'warning',
      code: 'titles-too-long',
      count: 2,
      details: {
        maxLength: 60,
        worst: [
          expect.objectContaining({ path: '/tr/tools/json/json-formatter' }),
          expect.objectContaining({ path: '/tools/json/json-formatter' }),
        ],
      },
    });
    expect(findIssue(report, 'duplicate-titles')?.details).toEqual([
      { locale: 'en', value: 'same', paths: ['/tools/json/a', '/tools/json/b'] },
    ]);
    // The non-sitemap hreflang target was fetched for verification.
    expect(findIssue(report, 'hreflang-target-invalid')?.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          target: '/de/tools/json/json-formatter',
          reasons: ['noindex'],
        }),
      ]),
    );
    expect(report.summary.warningIssues).toBe(1);
  });

  it('does not treat an intentional sample as a truncated crawl', async () => {
    const report = await auditSite(
      (origin) => {
        const paths = Array.from({ length: 30 }, (_, i) => `/tools/cat/tool-${i}`);
        const routes: Routes = { '/sitemap.xml': sitemap(origin, ['/', ...paths]) };
        for (const item of ['/', ...paths]) {
          routes[item] = {
            body: html({
              canonical: `${origin}${item}`,
              title: item,
              links: item === '/' ? paths : [],
            }),
          };
        }
        return routes;
      },
      { sampleSize: 5 },
    );
    expect(report.summary).toEqual(
      expect.objectContaining({ crawlMode: 'sample', crawlComplete: false, crawlTruncated: false }),
    );
    expect(report.summary.sampledSitemapUrls).toBeLessThan(31);
    expect(findIssue(report, 'crawl-truncated')).toBeUndefined();
    expect(findIssue(report, 'unfetched-internal-targets')).toBeUndefined();
    // Link-graph checks need the full crawl, so they are skipped rather than wrong.
    expect(findIssue(report, 'orphaned-indexable-pages')).toBeUndefined();
    expect(report.summary.skippedChecks).toContain('orphaned-indexable-pages');
    expect(findIssue(report, 'invalid-sitemap-entry')).toBeUndefined();
  });

  it('still reports truncation as critical when a full crawl hits --max-pages', async () => {
    const report = await auditSite(
      (origin) => {
        const paths = Array.from({ length: 10 }, (_, i) => `/p-${i}`);
        const routes: Routes = { '/sitemap.xml': sitemap(origin, ['/', ...paths]) };
        for (const item of ['/', ...paths]) {
          routes[item] = { body: html({ canonical: `${origin}${item}`, title: item }) };
        }
        return routes;
      },
      { crawlMode: 'full', maxPages: 3 },
    );
    expect(findIssue(report, 'crawl-truncated')).toEqual(
      expect.objectContaining({ severity: 'critical' }),
    );
    expect(report.summary.crawledUrls).toBe(3);
  });
});
