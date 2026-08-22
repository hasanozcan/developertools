import { describe, it, expect } from 'vitest';
import { formatTerraformHcl } from './terraformFormatter';

describe('terraformFormatter', () => {
  it('formats Terraform HCL files with clean indentation', () => {
    const raw = 'resource "aws_s3_bucket" "b" {\nbucket = "my-bucket"\ntags = {\nEnvironment = "Dev"\n}\n}';
    const formatted = formatTerraformHcl(raw);
    expect(formatted).toContain('resource "aws_s3_bucket" "b" {\n  bucket = "my-bucket"');
  });
});
