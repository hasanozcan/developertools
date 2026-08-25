import { describe, expect, it } from 'vitest';
import { migrateTailwindV3ToV4 } from './tailwindV3ToV4Migrator';

describe('tailwindV3ToV4Migrator', () => {
  it('transforms custom colors into @theme variables', () => {
    const v3 = `module.exports = { theme: { extend: { colors: { brand: '#3b82f6', accent: '#ec4899' } } } }`;
    const v4 = migrateTailwindV3ToV4(v3);
    expect(v4).toContain('@import "tailwindcss";');
    expect(v4).toContain('--color-brand: #3b82f6;');
    expect(v4).toContain('--color-accent: #ec4899;');
  });
});
