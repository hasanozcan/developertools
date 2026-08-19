import { describe, it, expect } from 'vitest';
import { calculateDateDifference, convertTimeUnits } from './timeDuration';

describe('timeDuration', () => {
  it('should calculate difference between two timestamps accurately', () => {
    const d1 = new Date('2026-01-01T00:00:00Z');
    const d2 = new Date('2026-01-03T12:30:45Z');

    const res = calculateDateDifference(d1, d2);
    expect(res.breakdown.days).toBe(2);
    expect(res.breakdown.hours).toBe(12);
    expect(res.breakdown.minutes).toBe(30);
    expect(res.breakdown.seconds).toBe(45);
    expect(res.humanReadable).toContain('2 days, 12 hours, 30 minutes, 45 seconds');
  });

  it('should convert time units accurately', () => {
    const res = convertTimeUnits(2, 'd');
    expect(res.hours).toBe(48);
    expect(res.minutes).toBe(2880);
    expect(res.seconds).toBe(172800);
  });
});
