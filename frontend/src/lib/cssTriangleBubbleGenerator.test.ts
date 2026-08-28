import { describe, it, expect } from 'vitest';
import { generateCssTriangle } from './cssTriangleBubbleGenerator';

describe('cssTriangleBubbleGenerator', () => {
  it('generates top-pointing CSS triangle', () => {
    const res = generateCssTriangle({ direction: 'top', size: 12, color: '#3b82f6', type: 'triangle' });
    expect(res.css).toContain('border-width: 0 12px 12px 12px');
    expect(res.css).toContain('#3b82f6');
  });

  it('generates speech bubble with pseudo-element tail', () => {
    const res = generateCssTriangle({ direction: 'bottom', size: 10, color: '#10b981', type: 'bubble' });
    expect(res.css).toContain('.speech-bubble::after');
    expect(res.css).toContain('border-top-color: #10b981');
  });
});
