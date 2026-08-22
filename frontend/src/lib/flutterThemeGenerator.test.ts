import { describe, it, expect } from 'vitest';
import { generateFlutterColorScheme } from './flutterThemeGenerator';

describe('flutterThemeGenerator', () => {
  it('generates Flutter Material 3 ThemeData ColorScheme code', () => {
    const code = generateFlutterColorScheme('#3B82F6', false);
    expect(code).toContain('ThemeData(');
    expect(code).toContain('0xFF3B82F6');
  });
});
