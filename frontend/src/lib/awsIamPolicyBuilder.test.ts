import { describe, expect, it } from 'vitest';
import { buildAwsIamPolicy } from './awsIamPolicyBuilder';

describe('awsIamPolicyBuilder', () => {
  it('generates valid AWS IAM policy document', () => {
    const json = buildAwsIamPolicy([
      { effect: 'Allow', actions: ['s3:GetObject', 's3:PutObject'], resources: ['arn:aws:s3:::my-bucket/*'] }
    ]);
    const parsed = JSON.parse(json);
    expect(parsed.Version).toBe('2012-10-17');
    expect(parsed.Statement[0].Effect).toBe('Allow');
  });
});
