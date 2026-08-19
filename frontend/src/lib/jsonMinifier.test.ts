import { describe, it, expect } from 'vitest';
import { minifyJson } from './jsonMinifier';

describe('jsonMinifier', () => {
  it('should strip all whitespace and format as single line', () => {
    const raw = `{\n  "name": "Dev",\n  "active": true\n}`;
    expect(minifyJson(raw)).toBe('{"name":"Dev","active":true}');
  });
});
