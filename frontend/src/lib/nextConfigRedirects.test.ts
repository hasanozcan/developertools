// @vitest-environment node

import { createRequire } from 'node:module';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);

interface NextConfig {
  headers: () => Promise<Array<{ source: string; headers: Array<{ key: string; value: string }> }>>;
  poweredByHeader: boolean;
  redirects: () => Promise<
    Array<{
      source: string;
      has?: Array<{ type: string; value: string }>;
      destination: string;
      permanent: boolean;
    }>
  >;
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
  });
});
