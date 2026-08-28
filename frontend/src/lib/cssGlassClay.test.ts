import { describe, it, expect } from 'vitest';
import { generateGlassClayCss } from './cssGlassClay';

describe('cssGlassClay', () => {
  it('generates backdrop-filter for glassmorphism', () => {
    const css = generateGlassClayCss({
      type: 'glassmorphism',
      blur: 16,
      opacity: 25,
      color: '#ffffff',
      borderRadius: 16,
      borderWidth: 1,
    });
    expect(css).toContain('backdrop-filter: blur(16px)');
  });

  it('generates multi-layer inset box-shadow for claymorphism', () => {
    const css = generateGlassClayCss({
      type: 'claymorphism',
      blur: 0,
      opacity: 100,
      color: '#6366f1',
      borderRadius: 24,
      borderWidth: 0,
    });
    expect(css).toContain('inset -8px -8px 16px');
  });
});
