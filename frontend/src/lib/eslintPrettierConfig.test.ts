import { describe, it, expect } from 'vitest';
import { generatePrettierConfig } from './eslintPrettierConfig';

describe('eslintPrettierConfig', () => {
  it('generates valid .prettierrc JSON configuration', () => {
    const jsonStr = generatePrettierConfig({ singleQuote: true, tabWidth: 4 });
    const parsed = JSON.parse(jsonStr);
    expect(parsed.singleQuote).toBe(true);
    expect(parsed.tabWidth).toBe(4);
  });
});
