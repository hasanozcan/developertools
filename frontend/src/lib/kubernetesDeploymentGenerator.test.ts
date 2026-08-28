import { describe, it, expect } from 'vitest';
import { generateK8sDeployment } from './kubernetesDeploymentGenerator';

describe('kubernetesDeploymentGenerator', () => {
  it('generates K8s deployment YAML', () => {
    expect(generateK8sDeployment('api', 'node:20', 2, 3000)).toContain('kind: Deployment');
  });
});
