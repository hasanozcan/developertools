import { describe, it, expect } from 'vitest';
import { calculateSupernet } from './ipSupernettingCalculator';

describe('ipSupernettingCalculator', () => {
  it('aggregates subnets', () => {
    expect(calculateSupernet(['192.168.0.0/24', '192.168.1.0/24'])).toBe('192.168.0.0/23');
  });
});
