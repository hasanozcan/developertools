import { describe, it, expect } from 'vitest';
import { generateApiKey } from './apiKeyGenerator';

describe('apiKeyGenerator', () => {
  it('generates API key with custom prefix and format', () => {
    const key = generateApiKey({ prefix: 'pk_test_', byteLength: 16, format: 'hex' });
    expect(key.startsWith('pk_test_')).toBe(true);
    expect(key.length).toBe('pk_test_'.length + 32);
  });
});
