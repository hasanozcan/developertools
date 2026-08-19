import { describe, it, expect } from 'vitest';
import { generateTextShadowCss, TEXT_SHADOW_PRESETS } from './cssTextShadow';

describe('cssTextShadow', () => {
  it('should generate text-shadow css for multiple layers', () => {
    const res = generateTextShadowCss([
      { x: 2, y: 2, blur: 4, color: '#ff0000' },
      { x: 4, y: 4, blur: 8, color: '#00ff00' },
    ]);

    expect(res.cssValue).toBe('2px 2px 4px #ff0000, 4px 4px 8px #00ff00');
    expect(res.fullCss).toBe('text-shadow: 2px 2px 4px #ff0000, 4px 4px 8px #00ff00;');
  });

  it('should have standard presets available', () => {
    expect(TEXT_SHADOW_PRESETS.length).toBeGreaterThan(2);
    expect(TEXT_SHADOW_PRESETS[0].name).toBe('Soft Drop');
  });

  it('should return none for empty layers', () => {
    const res = generateTextShadowCss([]);
    expect(res.cssValue).toBe('none');
  });
});
