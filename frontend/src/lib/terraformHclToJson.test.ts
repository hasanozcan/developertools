import { describe, expect, it } from 'vitest';
import { convertHclToJson } from './terraformHclToJson';

describe('terraformHclToJson', () => {
  it('converts HCL resource blocks to JSON format', () => {
    const hcl = `resource "aws_s3_bucket" "b" {
      bucket = "my-tf-test-bucket"
      acl    = "private"
    }`;
    const json = convertHclToJson(hcl);
    const parsed = JSON.parse(json);
    expect(parsed.resource.aws_s3_bucket.b.bucket).toBe('my-tf-test-bucket');
  });
});
