import { describe, it, expect } from 'vitest';
import { generateGridTemplateAreasCss } from './cssGridAreaBuilder';

describe('cssGridAreaBuilder', () => {
  it('generates CSS grid-template-areas declarations from grid matrix', () => {
    const matrix = [
      ['header', 'header', 'header'],
      ['sidebar', 'main', 'main'],
      ['footer', 'footer', 'footer'],
    ];

    const result = generateGridTemplateAreasCss(matrix, '20px');
    expect(result.css).toContain('grid-template-areas:');
    expect(result.css).toContain('"header header header"');
    expect(result.detectedAreas).toEqual(['header', 'sidebar', 'main', 'footer']);
  });
});
