import { describe, it, expect } from 'vitest';
import { buildMediaQuery } from './cssMediaQueryBuilder';

describe('cssMediaQueryBuilder', () => {
  it('generates modern range-syntax CSS media queries', () => {
    const result = buildMediaQuery({ minWidth: 768, maxWidth: 1024, prefersColorScheme: 'dark' });
    expect(result.query).toContain('(768px <= width <= 1024px)');
    expect(result.query).toContain('(prefers-color-scheme: dark)');
  });
});
