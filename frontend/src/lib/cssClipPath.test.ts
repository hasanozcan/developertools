import { describe, it, expect } from 'vitest';
import { generateClipPathCss, CLIP_PATH_PRESETS } from './cssClipPath';

describe('cssClipPath', () => {
  it('should generate valid polygon CSS from triangle preset', () => {
    const res = generateClipPathCss(CLIP_PATH_PRESETS.triangle.points);
    expect(res.clipPath).toBe('polygon(50% 0%, 0% 100%, 100% 100%)');
    expect(res.css).toContain('clip-path: polygon(50% 0%, 0% 100%, 100% 100%);');
    expect(res.css).toContain('-webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);');
  });
});
