import { describe, it, expect } from 'vitest';
import { computeGlassmorphism } from './cssGlassmorphism';

describe('cssGlassmorphism', () => {
  it('should compute valid glassmorphism css & tailwind classes', () => {
    const result = computeGlassmorphism({
      blur: 16,
      opacity: 0.25,
      bgColor: '#ffffff',
      borderOpacity: 0.2,
      borderRadius: 20,
      hasShadow: true,
    });

    expect(result.css).toContain('backdrop-filter: blur(16px);');
    expect(result.css).toContain('background: rgba(255, 255, 255, 0.25);');
    expect(result.css).toContain('border-radius: 20px;');
    expect(result.tailwind).toContain('backdrop-blur-[16px]');
    expect(result.styleObject.backdropFilter).toBe('blur(16px)');
  });
});
