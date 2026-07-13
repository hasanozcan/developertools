import { describe, expect, it } from 'vitest';
import { formatCacheControl, parseCacheControl, validateCacheControl } from './cacheControl';

describe('Cache-Control helpers', () => {
  it('parses and normalizes a response header', () => {
    const parsed = parseCacheControl('Public, max-age=3600, stale-while-revalidate=60');
    expect(parsed).toEqual([
      { name: 'public', value: null },
      { name: 'max-age', value: '3600' },
      { name: 'stale-while-revalidate', value: '60' },
    ]);
    expect(formatCacheControl(parsed)).toBe('public, max-age=3600, stale-while-revalidate=60');
  });

  it('preserves commas inside quoted extension values', () => {
    expect(parseCacheControl('private="Authorization, Cookie", max-age=0')).toEqual([
      { name: 'private', value: 'Authorization, Cookie' },
      { name: 'max-age', value: '0' },
    ]);
  });

  it('reports conflicting and malformed semantics', () => {
    expect(validateCacheControl(parseCacheControl('public, private, max-age=soon'))).toEqual([
      'public and private conflict; choose one cache visibility directive.',
      'max-age should use non-negative delta-seconds.',
    ]);
  });

  it.each(['max age=1', 'private="unclosed', 'max-age='])('rejects malformed input %j', (input) => {
    expect(() => parseCacheControl(input)).toThrow();
  });
});
