import { describe, it, expect } from 'vitest';
import { simulateProtanopia } from './colorBlindnessSimulator';

describe('colorBlindnessSimulator', () => {
  it('simulates color matrix', () => {
    expect(simulateProtanopia('#ff0000')).toBe('#ff0000');
  });
});
