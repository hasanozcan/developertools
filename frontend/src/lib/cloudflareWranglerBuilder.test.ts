import { describe, it, expect } from 'vitest';
import { generateWranglerConfig } from './cloudflareWranglerBuilder';

describe('generateWranglerConfig', () => {
  it('generates wrangler.json configuration', () => {
    const res = generateWranglerConfig({
      name: 'my-worker',
      main: 'src/index.ts',
      compatibilityDate: '2026-01-01',
      enableD1: true,
    });
    const parsed = JSON.parse(res);
    expect(parsed.name).toBe('my-worker');
    expect(parsed.d1_databases).toBeDefined();
  });
});