import { describe, it, expect } from 'vitest';
import { simulateTiktoken } from './tiktokenVisualizer';

describe('simulateTiktoken', () => {
  it('segments text into colorable tokens', () => {
    const res = simulateTiktoken('const greeting = "Hello World!";');
    expect(res.tokens.length).toBeGreaterThan(5);
    expect(res.tokens[0].colorIndex).toBeDefined();
  });
});