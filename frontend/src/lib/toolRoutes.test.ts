import { describe, expect, it } from 'vitest';
import { buildToolPath, getCanonicalToolCategory } from './toolRoutes';

describe('toolRoutes', () => {
  it('returns canonical categories for known aliased tools', () => {
    expect(getCanonicalToolCategory('json-csv', 'converters')).toBe('json');
    expect(getCanonicalToolCategory('image-to-base64', 'converters')).toBe('encoding');
  });

  it('falls back to category when no alias mapping exists', () => {
    expect(getCanonicalToolCategory('sha256-hash', 'crypto')).toBe('crypto');
  });

  it('returns empty category if tool and category are both unknown', () => {
    expect(getCanonicalToolCategory('unknown-tool')).toBe('');
  });

  it('builds canonical tool paths', () => {
    expect(buildToolPath('converters', 'json-csv')).toBe('/tools/json/json-csv');
    expect(buildToolPath('crypto', 'sha512-hash')).toBe('/tools/crypto/sha512-hash');
  });
});
