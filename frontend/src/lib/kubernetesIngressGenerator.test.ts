import { describe, it, expect } from 'vitest';
import { generateKubernetesIngressYaml } from './kubernetesIngressGenerator';

describe('generateKubernetesIngressYaml', () => {
  it('generates ingress manifest with TLS', () => {
    const yaml = generateKubernetesIngressYaml({
      name: 'api-ingress',
      host: 'api.example.com',
      serviceName: 'api-service',
      servicePort: 8080,
      enableTls: true,
      clusterIssuer: 'letsencrypt-prod',
    });
    expect(yaml).toContain('kind: Ingress');
    expect(yaml).toContain('host: api.example.com');
    expect(yaml).toContain('cert-manager.io/cluster-issuer: letsencrypt-prod');
  });
});