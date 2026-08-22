import { describe, it, expect } from 'vitest';
import { buildAwsIamPolicy } from './awsIamPolicyBuilder';

describe('awsIamPolicyBuilder', () => {
  it('builds valid AWS IAM JSON Policy document', () => {
    const policyStr = buildAwsIamPolicy([
      {
        effect: 'Allow',
        actions: ['s3:GetObject', 's3:PutObject'],
        resources: ['arn:aws:s3:::my-bucket/*'],
      },
    ]);

    const parsed = JSON.parse(policyStr);
    expect(parsed.Version).toBe('2012-10-17');
    expect(parsed.Statement[0].Effect).toBe('Allow');
    expect(parsed.Statement[0].Action).toContain('s3:GetObject');
  });
});
