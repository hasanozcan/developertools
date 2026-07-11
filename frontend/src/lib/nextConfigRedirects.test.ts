// @vitest-environment node

import { createRequire } from 'node:module';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);

describe('Next.js redirects', () => {
  it('permanently redirects the www host to the apex while preserving the path', async () => {
    const config = require(path.resolve(process.cwd(), 'next.config.js')) as {
      redirects: () => Promise<Array<{
        source: string;
        has?: Array<{ type: string; value: string }>;
        destination: string;
        permanent: boolean;
      }>>;
    };

    const redirects = await config.redirects();

    expect(redirects).toContainEqual({
      source: '/:path*',
      has: [{ type: 'host', value: 'www.devstools.app' }],
      destination: 'https://devstools.app/:path*',
      permanent: true,
    });
  });
});
