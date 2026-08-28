import { describe, it, expect } from 'vitest';
import { generateTerraformModule } from './terraformModuleScaffolder';

describe('terraformModuleScaffolder', () => {
  it('generates terraform module structure', () => {
    const mod = generateTerraformModule('db');
    expect(mod['main.tf']).toContain('resource');
  });
});
