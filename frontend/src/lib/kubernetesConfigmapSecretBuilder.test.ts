import { describe, it, expect } from 'vitest';
import { generateK8sConfigMapSecret } from './kubernetesConfigmapSecretBuilder';

describe('kubernetesConfigmapSecretBuilder', () => {
  it('generates K8s ConfigMap', () => {
    expect(generateK8sConfigMapSecret('app-config', { ENV: 'production' })).toContain('kind: ConfigMap');
  });
});
