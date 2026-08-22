import { describe, it, expect } from 'vitest';
import { computeNextCronRuns } from './cronNextRunsVisualizer';

describe('computeNextCronRuns', () => {
  it('returns list of future runs', () => {
    const runs = computeNextCronRuns('0 * * * *', 5);
    expect(runs.length).toBe(5);
  });
});