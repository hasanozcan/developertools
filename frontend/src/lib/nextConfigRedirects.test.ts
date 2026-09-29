// @vitest-environment node

import { createRequire } from 'node:module';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);

type RouteHas = { type: string; key?: string; value?: string };
type RedirectRule = {
  source: string;
  has?: RouteHas[];
  missing?: RouteHas[];
  destination: string;
  permanent: boolean;
};

const { getPathMatch } = require('next/dist/shared/lib/router/utils/path-match') as {
  getPathMatch: (
    source: string,
    options?: Record<string, unknown>,
  ) => (pathname: string) => Record<string, string> | false;
};
const { matchHas, prepareDestination } = require(
  'next/dist/shared/lib/router/utils/prepare-destination',
) as {
  matchHas: (
    req: { headers: Record<string, string> },
    query: Record<string, string>,
    has?: RouteHas[],
    missing?: RouteHas[],
  ) => Record<string, string> | false;
  prepareDestination: (args: {
    appendParamsToQuery: boolean;
    destination: string;
    params: Record<string, string>;
    query: Record<string, string>;
  }) => { parsedDestination: { pathname: string; query: Record<string, string> } };
};

/** Applies the first matching redirect the way Next's router does; null when none match. */
function applyRedirect(rules: RedirectRule[], href: string, host = 'devstools.app'): string | null {
  const url = new URL(href, `https://${host}`);
  const query = Object.fromEntries(url.searchParams);
  for (const rule of rules) {
    const pathParams = getPathMatch(rule.source, { strict: true, removeUnnamedParams: true })(
      url.pathname,
    );
    if (!pathParams) continue;
    const hasParams = matchHas({ headers: { host } }, query, rule.has, rule.missing);
    if (!hasParams) continue;
    const { parsedDestination } = prepareDestination({
      appendParamsToQuery: false,
      destination: rule.destination,
      params: { ...pathParams, ...hasParams },
      query,
    });
    const search = new URLSearchParams(parsedDestination.query).toString();
    return `${parsedDestination.pathname}${search ? `?${search}` : ''}`;
  }
  return null;
}

interface NextConfig {
  headers: () => Promise<Array<{ source: string; headers: Array<{ key: string; value: string }> }>>;
  poweredByHeader: boolean;
  redirects: () => Promise<RedirectRule[]>;
}

function loadConfig(): NextConfig {
  return require(path.resolve(process.cwd(), 'next.config.js')) as NextConfig;
}

describe('Next.js configuration', () => {
  it('permanently redirects the www host to the apex while preserving the path', async () => {
    const redirects = await loadConfig().redirects();

    expect(redirects).toContainEqual({
      source: '/:path*',
      has: [{ type: 'host', value: 'www.devstools.app' }],
      destination: 'https://devstools.app/:path*',
      permanent: true,
    });
  });

  it('permanently redirects legacy ?lang=xx URLs to the locale-prefixed path', async () => {
    const redirects = await loadConfig().redirects();
    const legacyRules = redirects.filter((rule) =>
      rule.has?.some((item) => item.type === 'query' && item.key === 'lang'),
    );

    expect(legacyRules.length).toBeGreaterThan(0);
    expect(legacyRules.every((rule) => rule.permanent)).toBe(true);

    expect(applyRedirect(redirects, '/?lang=tr')).toBe('/tr?lang=tr');
    expect(applyRedirect(redirects, '/tools/json/json-formatter?lang=de')).toBe(
      '/de/tools/json/json-formatter?lang=de',
    );
    expect(applyRedirect(redirects, '/collections?lang=fr')).toBe('/fr/collections?lang=fr');
    expect(applyRedirect(redirects, '/collections/json-toolkit?lang=es')).toBe(
      '/es/collections/json-toolkit?lang=es',
    );
    expect(applyRedirect(redirects, '/for/frontend?lang=ru')).toBe('/ru/for/frontend?lang=ru');
    expect(applyRedirect(redirects, '/about?lang=zh')).toBe('/zh/about?lang=zh');
    expect(applyRedirect(redirects, '/contact?lang=tr&ref=x')).toBe('/tr/contact?lang=tr&ref=x');
  });

  it('never re-redirects locale-prefixed, non-localized, or unsupported ?lang URLs', async () => {
    const redirects = await loadConfig().redirects();

    // Already-prefixed targets must not match again (no loop).
    expect(applyRedirect(redirects, '/tr?lang=tr')).toBeNull();
    expect(applyRedirect(redirects, '/de/tools/json/json-formatter?lang=de')).toBeNull();
    expect(applyRedirect(redirects, '/tr/about?lang=fr')).toBeNull();
    // `lang=en` cannot drop the query server-side, so it is left to the client.
    expect(applyRedirect(redirects, '/tools/json/json-formatter?lang=en')).toBeNull();
    // Unsupported values and paths without locale variants are untouched.
    expect(applyRedirect(redirects, '/?lang=xx')).toBeNull();
    expect(applyRedirect(redirects, '/?lang=trx')).toBeNull();
    expect(applyRedirect(redirects, '/seo-opportunities?lang=tr')).toBeNull();
    expect(applyRedirect(redirects, '/api/contact?lang=tr')).toBeNull();
    expect(applyRedirect(redirects, '/_next/static/chunk.js?lang=tr')).toBeNull();
    expect(applyRedirect(redirects, '/tools?lang=tr')).toBeNull();
  });

  it('resolves legacy tool paths combined with ?lang without looping', async () => {
    const redirects = await loadConfig().redirects();
    let href = '/tools/converters/json-csv?lang=tr';
    const seen = new Set<string>();
    for (let next = applyRedirect(redirects, href); next; next = applyRedirect(redirects, href)) {
      expect(seen.has(next)).toBe(false);
      seen.add(next);
      href = next;
    }

    expect(href).toBe('/tr/tools/json/json-csv?lang=tr');
    expect(seen.size).toBeLessThanOrEqual(2);
  });

  it('permanently redirects merged duplicate tools to their primary page in every locale', async () => {
    const redirects = await loadConfig().redirects();
    const merged: Array<[string, string]> = [
      ['/tools/converters/docker-compose-to-kubernetes', '/tools/converters/docker-compose-to-k8s'],
      ['/tools/converters/json-to-csharp-class', '/tools/converters/json-to-csharp'],
      ['/tools/converters/json-to-kotlin-class', '/tools/converters/json-to-kotlin'],
      ['/tools/converters/json-to-swift-struct', '/tools/converters/json-to-swift'],
      ['/tools/converters/json-to-python-pydantic', '/tools/converters/json-to-pydantic'],
      ['/tools/converters/json-to-golang-models', '/tools/converters/json-to-go-struct'],
      ['/tools/converters/json-to-rust-types', '/tools/converters/json-to-rust-serde'],
      ['/tools/json/json-path-query-tester', '/tools/json/jsonpath-tester'],
      ['/tools/encoding/html-entities-converter', '/tools/encoding/html-entity'],
      ['/tools/encoding/url-safe-base64-converter', '/tools/encoding/base64url-encoder'],
    ];

    for (const [oldPath, primaryPath] of merged) {
      expect(applyRedirect(redirects, oldPath)).toBe(primaryPath);
      for (const locale of ['tr', 'de', 'es', 'fr', 'ru', 'zh']) {
        expect(applyRedirect(redirects, `/${locale}${oldPath}`)).toBe(`/${locale}${primaryPath}`);
      }
      // The primary page itself is never redirected.
      expect(applyRedirect(redirects, primaryPath)).toBeNull();
      expect(applyRedirect(redirects, `/tr${primaryPath}`)).toBeNull();
    }

    // Any category segment the old slug is requested under resolves to the primary page.
    expect(applyRedirect(redirects, '/tools/utilities/json-to-csharp-class')).toBe(
      '/tools/converters/json-to-csharp',
    );
    // A legacy ?lang link to a merged tool resolves without looping.
    let href = '/tools/converters/json-to-kotlin-class?lang=tr';
    for (let i = 0, next = applyRedirect(redirects, href); next; next = applyRedirect(redirects, href)) {
      expect(++i).toBeLessThanOrEqual(3);
      href = next;
    }
    expect(href).toBe('/tr/tools/converters/json-to-kotlin?lang=tr');
    expect(
      redirects.filter((rule) => /json-to-csharp-class/.test(rule.source)).every((rule) => rule.permanent),
    ).toBe(true);
  });

  it('applies baseline security headers to every route', async () => {
    const config = loadConfig();
    const headerRules = await config.headers();
    const headers = Object.fromEntries(
      headerRules[0].headers.map(({ key, value }) => [key, value]),
    );

    expect(config.poweredByHeader).toBe(false);
    expect(headerRules[0].source).toBe('/:path*');
    expect(headers['Content-Security-Policy']).toContain("frame-ancestors 'none'");
    expect(headers['Content-Security-Policy']).toContain("object-src 'none'");
    expect(headers['Content-Security-Policy-Report-Only']).toBeUndefined();
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['Permissions-Policy']).toContain('camera=()');
    // Must not contradict the preconnect / dns-prefetch hints emitted by the root layout.
    expect(headers['X-DNS-Prefetch-Control']).toBeUndefined();
  });
});
