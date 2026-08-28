import { describe, it, expect } from 'vitest';
import { lookupPort } from './networkPortReference';

describe('networkPortReference', () => {
  it('looks up standard port numbers', () => {
    expect(lookupPort(443).service).toBe('HTTPS');
  });
});
