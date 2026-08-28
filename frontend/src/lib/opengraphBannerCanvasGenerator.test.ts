import { describe, it, expect } from 'vitest';
import { generateOgMetadata } from './opengraphBannerCanvasGenerator';

describe('opengraphBannerCanvasGenerator', () => {
  it('generates OpenGraph metadata', () => {
    expect(generateOgMetadata('Tools', 'Best Tools')).toContain('og:title');
  });
});
