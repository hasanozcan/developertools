import { describe, it, expect } from 'vitest';
import { generateKeyframesCss } from './cssKeyframesGenerator';

describe('cssKeyframesGenerator', () => {
  it('generates valid CSS @keyframes and helper class', () => {
    const steps = [
      { percentage: 0, properties: { transform: 'scale(1)', opacity: '1' } },
      { percentage: 100, properties: { transform: 'scale(1.1)', opacity: '0.8' } },
    ];
    const res = generateKeyframesCss('pulse-custom', steps, { duration: '2s' });

    expect(res.keyframesCss).toContain('@keyframes pulse-custom');
    expect(res.keyframesCss).toContain('0%');
    expect(res.keyframesCss).toContain('100%');
    expect(res.animationClassCss).toContain('animation: pulse-custom 2s');
  });
});
