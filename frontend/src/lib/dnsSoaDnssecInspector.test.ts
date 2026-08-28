import { describe, it, expect } from 'vitest';
import { inspectDnsSoa } from './dnsSoaDnssecInspector';

describe('dnsSoaDnssecInspector', () => {
  it('parses standard SOA serial date', () => {
    const res = inspectDnsSoa('2026082801');
    expect(res.serialDate).toBe('2026-08-28');
    expect(res.revision).toBe(1);
  });
});
