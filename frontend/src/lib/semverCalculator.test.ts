import { describe, it, expect } from 'vitest';
import { parseSemver, bumpSemver, satisfiesRange } from './semverCalculator';

describe('semverCalculator', () => {
  it('should parse and bump semver version strings', () => {
    const parsed = parseSemver('1.2.3-beta.1');
    expect(parsed).toEqual({ major: 1, minor: 2, patch: 3, prerelease: 'beta.1', build: undefined });

    expect(bumpSemver('1.2.3', 'major')).toBe('2.0.0');
    expect(bumpSemver('1.2.3', 'minor')).toBe('1.3.0');
    expect(bumpSemver('1.2.3', 'patch')).toBe('1.2.4');
  });

  it('should check caret and tilde semver range matching', () => {
    expect(satisfiesRange('1.2.5', '^1.2.0')).toBe(true);
    expect(satisfiesRange('2.0.0', '^1.2.0')).toBe(false);
    expect(satisfiesRange('1.2.5', '~1.2.0')).toBe(true);
    expect(satisfiesRange('1.3.0', '~1.2.0')).toBe(false);
  });
});
