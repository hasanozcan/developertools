import { describe, expect, it } from 'vitest';
import { rankToolUsage } from './toolPopularity';

describe('tool popularity ranking', () => {
  it('balances open count with recent usage', () => {
    const now = Date.UTC(2026, 8, 14);
    const ranked = rankToolUsage(
      {
        frequent: { count: 10, lastOpenedAt: now - 20 * 24 * 60 * 60 * 1000 },
        recent: { count: 4, lastOpenedAt: now },
        once: { count: 1, lastOpenedAt: now },
      },
      now,
    );
    expect(ranked[0]).toBe('frequent');
    expect(ranked.indexOf('recent')).toBeLessThan(ranked.indexOf('once'));
  });
});
