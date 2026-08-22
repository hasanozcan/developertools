import { describe, it, expect } from 'vitest';
import { dockerComposeToK8s } from './dockerComposeToK8s';

describe('dockerComposeToK8s', () => {
  it('converts docker compose service to Kubernetes Deployment and Service YAML', () => {
    const compose = `
version: '3'
services:
  api:
    image: node:18-alpine
    ports:
      - "3000:3000"
`;
    const k8s = dockerComposeToK8s(compose);
    expect(k8s).toContain('kind: Deployment');
    expect(k8s).toContain('kind: Service');
    expect(k8s).toContain('image: node:18-alpine');
  });
});
