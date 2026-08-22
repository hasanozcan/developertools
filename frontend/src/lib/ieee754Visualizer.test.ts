import { describe, it, expect } from 'vitest';
import { inspectIeee754Float32 } from './ieee754Visualizer';

describe('ieee754Visualizer', () => {
  it('breaks down 32-bit floating point numbers into IEEE-754 components', () => {
    const res = inspectIeee754Float32(1.0);
    expect(res.signBit).toBe('0');
    expect(res.exponentBits).toBe('01111111'); // 127 in binary
    expect(res.fullBinary).toHaveLength(32);
  });
});
