import { describe, it, expect } from 'vitest';
import { convertYamlToTerraformHcl } from './yamlToTerraformHcl';

describe('yamlToTerraformHcl', () => {
  it('converts yaml to HCL locals', () => {
    expect(convertYamlToTerraformHcl('env: prod\ncount: 2')).toContain('env = "prod"');
  });
});
