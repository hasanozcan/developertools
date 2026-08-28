import { describe, it, expect } from 'vitest';
import { inspectGlyph } from './unicodeGlyphCategoryInspector';

describe('unicodeGlyphCategoryInspector', () => {
  it('inspects character code point', () => {
    expect(inspectGlyph('A').codePoint).toBe('U+0041');
  });
});
