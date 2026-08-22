import { describe, it, expect } from 'vitest';
import { simulateDnsLookup } from './dnsLookupSimulator';

describe('dnsLookupSimulator', () => {
  it('returns structured DNS records for a domain', () => {
    const records = simulateDnsLookup('devstools.app');
    expect(records.length).toBeGreaterThan(3);
    expect(records.some((r) => r.type === 'A')).toBe(true);
    expect(records.some((r) => r.type === 'TXT')).toBe(true);
  });
});
