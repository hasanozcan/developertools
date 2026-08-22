import { describe, it, expect } from 'vitest';
import { generateShadcnCssVariables } from './shadcnThemeGenerator';

describe('generateShadcnCssVariables', () => {
  it('generates shadcn css layer variables', () => {
    const css = generateShadcnCssVariables({
      primary: '221.2 83.2% 53.3%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      muted: '210 40% 96.1%',
      border: '214.3 31.8% 91.4%',
      radius: '0.5rem',
    });
    expect(css).toContain('--primary: 221.2 83.2% 53.3%');
    expect(css).toContain('--radius: 0.5rem');
  });
});