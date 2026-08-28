import { describe, it, expect } from 'vitest';
import { convertTerraformHclToYaml } from './terraformHclToYaml';

describe('terraformHclToYaml', () => {
  it('converts HCL to YAML', () => {
    expect(convertTerraformHclToYaml('tier = "premium"')).toContain('tier: premium');
  });
});
