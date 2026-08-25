import { describe, expect, it } from 'vitest';
import { cssBoxShadowToTailwind } from './cssBoxShadowToTailwind';

describe('cssBoxShadowToTailwind', () => {
  it('converts multi-layer shadow to arbitrary Tailwind class', () => {
    const css = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    const tw = cssBoxShadowToTailwind(css);
    expect(tw).toContain('shadow-[');
    expect(tw).not.toContain(' ');
  });
});
