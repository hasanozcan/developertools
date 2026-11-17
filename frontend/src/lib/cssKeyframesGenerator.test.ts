import { describe, it, expect } from 'vitest';
import {
  generateKeyframesCss,
  sanitizeAnimationDuration,
  sanitizeAnimationName,
} from './cssKeyframesGenerator';

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

  it('falls back to customAnimation for invalid or CSS/HTML breakout animation names', () => {
    expect(sanitizeAnimationName('')).toBe('customAnimation');
    expect(sanitizeAnimationName('123bad')).toBe('customAnimation');
    expect(sanitizeAnimationName('foo</style><script>alert(1)</script>')).toBe('customAnimation');
    expect(sanitizeAnimationName('foo { } body { color: red; }')).toBe('customAnimation');

    const res = generateKeyframesCss('evil</style><script>alert(1)</script>', [
      { percentage: 0, properties: { opacity: '1' } },
    ]);
    expect(res.animationName).toBe('customAnimation');
    expect(res.fullCss).not.toContain('</style>');
    expect(res.fullCss).not.toContain('<script>');
    expect(res.fullCss).toContain('@keyframes customAnimation');
    expect(res.fullCss).toContain('.customAnimation');
  });

  it('validates duration and falls back to 1s on breakout payloads', () => {
    expect(sanitizeAnimationDuration('1.5s')).toBe('1.5s');
    expect(sanitizeAnimationDuration('350ms')).toBe('350ms');
    expect(sanitizeAnimationDuration('1s; } body { display: none; }')).toBe('1s');
    expect(sanitizeAnimationDuration('</style><script>alert(1)</script>')).toBe('1s');

    const res = generateKeyframesCss(
      'fadeIn',
      [{ percentage: 0, properties: { opacity: '0' } }],
      { duration: '2s;</style><script>alert(1)</script>' },
    );
    expect(res.animationClassCss).toContain('animation: fadeIn 1s ease-in-out infinite;');
    expect(res.fullCss).not.toContain('<script>');
  });

  it('strips unsafe keyframe property names and values', () => {
    const res = generateKeyframesCss('safe-anim', [
      {
        percentage: 0,
        properties: {
          opacity: '0',
          'bad;prop': '1',
          transform: 'scale(1); } body { color: red; }',
          color: '</style><img src=x onerror=alert(1)>',
        },
      },
    ]);

    expect(res.keyframesCss).toContain('opacity: 0;');
    expect(res.keyframesCss).not.toContain('bad;prop');
    expect(res.keyframesCss).not.toContain('color: red');
    expect(res.keyframesCss).not.toContain('</style>');
    expect(res.keyframesCss).not.toContain('onerror');
  });
});
