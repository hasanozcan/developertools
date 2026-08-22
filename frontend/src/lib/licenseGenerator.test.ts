import { describe, it, expect } from 'vitest';
import { generateLicenseText } from './licenseGenerator';

describe('licenseGenerator', () => {
  it('generates standard MIT license text', () => {
    const license = generateLicenseText('MIT', '2026', 'Acme Corp');
    expect(license).toContain('MIT License');
    expect(license).toContain('Copyright (c) 2026 Acme Corp');
  });
});
