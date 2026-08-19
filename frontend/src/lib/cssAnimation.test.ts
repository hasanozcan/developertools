import { describe, it, expect } from 'vitest';
import { generateCssAnimation } from './cssAnimation';

describe('cssAnimation', () => {
  it('should generate pulse animation with keyframes and class', () => {
    const res = generateCssAnimation({
      type: 'pulse',
      duration: 1.5,
      delay: 0,
      iterationCount: 'infinite',
      timingFunction: 'ease-in-out',
    });

    expect(res.className).toBe('animated-pulse');
    expect(res.css).toContain('animation: pulse 1.5s ease-in-out 0s infinite;');
    expect(res.keyframes).toContain('@keyframes pulse');
    expect(res.keyframes).toContain('transform: scale(1.1);');
  });

  it('should generate bounce animation keyframes', () => {
    const res = generateCssAnimation({
      type: 'bounce',
      duration: 1,
      delay: 0.2,
      iterationCount: 'infinite',
      timingFunction: 'ease',
    });

    expect(res.css).toContain('animation: bounce 1s ease 0.2s infinite;');
    expect(res.keyframes).toContain('@keyframes bounce');
  });
});
