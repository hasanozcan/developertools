import { describe, it, expect } from 'vitest';
import { getAppIconManifest } from './appIconResizer';

describe('appIconResizer', () => {
  it('provides comprehensive list of standard app icon sizes', () => {
    const sizes = getAppIconManifest();
    expect(sizes.length).toBeGreaterThan(5);
    expect(sizes.some((s) => s.size === 1024)).toBe(true);
    expect(sizes.some((s) => s.size === 512)).toBe(true);
  });
});
