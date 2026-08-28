import { describe, it, expect } from 'vitest';
import { countSpfLookups } from './dnsSpfRecordFlattener';

describe('dnsSpfRecordFlattener', () => {
  it('counts DNS lookups in SPF record', () => {
    const res = countSpfLookups('v=spf1 include:_spf.google.com include:mailgun.org ~all');
    expect(res.totalLookups).toBe(2);
    expect(res.isValid).toBe(true);
  });
});
