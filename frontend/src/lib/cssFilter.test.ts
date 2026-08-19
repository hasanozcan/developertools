import { describe, it, expect } from 'vitest';
import { generateCssFilter, DEFAULT_FILTER_VALUES } from './cssFilter';

describe('cssFilter', () => {
  it('should generate none for default filters', () => {
    const res = generateCssFilter(DEFAULT_FILTER_VALUES);
    expect(res.filterString).toBe('none');
  });

  it('should generate combined CSS filter string for active filters', () => {
    const res = generateCssFilter({
      ...DEFAULT_FILTER_VALUES,
      blur: 5,
      grayscale: 50,
      brightness: 120,
    });

    expect(res.filterString).toContain('blur(5px)');
    expect(res.filterString).toContain('grayscale(50%)');
    expect(res.filterString).toContain('brightness(120%)');
    expect(res.css).toContain('filter:');
  });
});
