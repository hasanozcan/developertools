import { describe, it, expect } from 'vitest';
import { validateKubeconfig } from './kubeconfigValidator';

describe('kubeconfigValidator', () => {
  it('validates standard Kubernetes Kubeconfig format', () => {
    const valid = `
apiVersion: v1
kind: Config
current-context: production-cluster
clusters:
- cluster:
    server: https://10.0.0.1
  name: prod
`;
    const res = validateKubeconfig(valid);
    expect(res.isValid).toBe(true);
    expect(res.currentContext).toBe('production-cluster');
  });
});
