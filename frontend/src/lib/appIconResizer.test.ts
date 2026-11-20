import { describe, expect, it } from 'vitest';
import { computeDrawRect, generateIosContentsJson, getAppIconManifest } from './appIconResizer';

describe('appIconResizer', () => {
  it('provides comprehensive list of standard app icon sizes', () => {
    const sizes = getAppIconManifest();
    expect(sizes.length).toBeGreaterThan(5);
    expect(sizes.some((s) => s.size === 1024)).toBe(true);
    expect(sizes.some((s) => s.size === 512)).toBe(true);
    expect(sizes.some((s) => s.platform === 'Web')).toBe(true);
  });

  it('computes centered cover and contain draw rectangles', () => {
    expect(computeDrawRect(800, 400, 192, 'cover')).toEqual({
      sx: 200,
      sy: 0,
      sw: 400,
      sh: 400,
      dx: 0,
      dy: 0,
      dw: 192,
      dh: 192,
    });

    expect(computeDrawRect(800, 400, 200, 'contain')).toEqual({
      sx: 0,
      sy: 0,
      sw: 800,
      sh: 400,
      dx: 0,
      dy: 50,
      dw: 200,
      dh: 100,
    });
  });

  it('generates valid Xcode AppIcon Contents.json for iOS icons', () => {
    const parsed = JSON.parse(generateIosContentsJson());
    expect(parsed.info).toEqual({ author: 'xcode', version: 1 });
    expect(parsed.images.length).toBeGreaterThanOrEqual(3);
    expect(
      parsed.images.some((img: { filename: string }) => img.filename === 'iTunesArtwork@2x.png'),
    ).toBe(true);
  });
});
