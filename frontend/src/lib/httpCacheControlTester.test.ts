import { describe, it, expect } from 'vitest';
import { analyzeCacheControl } from './httpCacheControlTester';

describe('httpCacheControlTester', () => {
  it('parses cache control directives', () => {
    const res = analyzeCacheControl('public, max-age=86400, immutable');
    expect(res.isPublic).toBe(true);
    expect(res.maxAgeSeconds).toBe(86400);
    expect(res.immutable).toBe(true);
  });
});
