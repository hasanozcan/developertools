import { describe, it, expect } from 'vitest';
import { generateOpaRegoPolicy } from './opaRegoPolicyBuilder';

describe('opaRegoPolicyBuilder', () => {
  it('generates OPA Rego policy', () => {
    expect(generateOpaRegoPolicy('app.rbac')).toContain('package app.rbac');
  });
});
