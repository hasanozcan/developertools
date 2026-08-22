import { describe, it, expect } from 'vitest';
import { calculateTransferTime } from './bandwidthCalculator';

describe('bandwidthCalculator', () => {
  it('calculates file download durations over connection speeds', () => {
    const res = calculateTransferTime(100 * 1024 * 1024, 100); // 100MB at 100Mbps
    expect(res.seconds).toBeGreaterThan(5);
    expect(res.formattedTime).toBeDefined();
  });
});
