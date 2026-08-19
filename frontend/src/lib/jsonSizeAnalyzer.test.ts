import { describe, it, expect } from 'vitest';
import { analyzeJsonSize } from './jsonSizeAnalyzer';

describe('jsonSizeAnalyzer', () => {
  it('should analyze JSON depth, keys, and byte sizes', () => {
    const json = JSON.stringify(
      {
        user: {
          id: 1,
          name: 'Developer',
          roles: ['admin', 'editor'],
          meta: null,
        },
      },
      null,
      2
    );

    const metrics = analyzeJsonSize(json);
    expect(metrics.totalKeys).toBe(5);
    expect(metrics.totalObjects).toBe(2);
    expect(metrics.totalArrays).toBe(1);
    expect(metrics.maxDepth).toBe(4);
    expect(metrics.nullCount).toBe(1);
    expect(metrics.minifiedBytes).toBeLessThan(metrics.rawBytes);
  });
});
