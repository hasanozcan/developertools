import { describe, expect, it } from 'vitest';
import { evaluateSemverRange, matchesCaret, satisfiesSemverRange } from './semverRangeEvaluator';

describe('semverRangeEvaluator', () => {
  it('enforces real SemVer 2.0.0 caret rules including lower bound and 0.x / 0.0.x', () => {
    expect(matchesCaret('1.2.0', '1.9.3')).toBe(true);
    expect(matchesCaret('1.2.0', '1.0.0')).toBe(false);
    expect(matchesCaret('1.2.0', '2.0.0')).toBe(false);

    // 0.x rules: ^0.2.3 allows >=0.2.3 <0.3.0
    expect(matchesCaret('0.2.3', '0.2.9')).toBe(true);
    expect(matchesCaret('0.2.3', '0.2.2')).toBe(false);
    expect(matchesCaret('0.2.3', '0.3.0')).toBe(false);

    // 0.0.x rules: ^0.0.3 only allows >=0.0.3 <0.0.4
    expect(matchesCaret('0.0.3', '0.0.3')).toBe(true);
    expect(matchesCaret('0.0.3', '0.0.4')).toBe(false);
  });

  it('evaluates ~, >=, <=, >, <, =, hyphen, and || union ranges', () => {
    expect(satisfiesSemverRange('1.2.9', '~1.2.3')).toBe(true);
    expect(satisfiesSemverRange('1.3.0', '~1.2.3')).toBe(false);

    expect(satisfiesSemverRange('2.4.1', '>=1.0.0 <2.0.0 || >=2.4.0 <=2.5.0')).toBe(true);
    expect(satisfiesSemverRange('2.6.0', '>=1.0.0 <2.0.0 || >=2.4.0 <=2.5.0')).toBe(false);

    expect(satisfiesSemverRange('1.5.0', '1.2.3 - 2.0.0')).toBe(true);
    expect(satisfiesSemverRange('2.0.1', '1.2.3 - 2.0.0')).toBe(false);
  });

  it('handles SemVer prerelease precedence and matching rules', () => {
    expect(satisfiesSemverRange('1.2.3-beta.2', '>=1.2.3-beta.1 <2.0.0')).toBe(true);
    expect(satisfiesSemverRange('1.2.4-alpha.1', '^1.2.3')).toBe(false);
    expect(satisfiesSemverRange('2.0.0-alpha.1', '^1.2.3')).toBe(false);

    const invalid = evaluateSemverRange('not-a-semver', '^1.0.0');
    expect(invalid.valid).toBe(false);
  });
});
