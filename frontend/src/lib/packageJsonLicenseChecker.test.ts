import { describe, it, expect } from 'vitest';
import { checkLicenses } from './packageJsonLicenseChecker';

describe('packageJsonLicenseChecker', () => {
  it('parses dependencies list', () => {
    expect(checkLicenses({ 'react': '^19.0.0' }).allowed).toContain('react');
  });
});
