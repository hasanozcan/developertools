import { describe, it, expect } from 'vitest';
import { convertDockerComposeToK8s } from './dockerComposeToK8s';

describe('dockerComposeToK8s', () => {
  it('converts docker-compose services into Kubernetes Deployments and Services', () => {
    const yaml = `version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
  api:
    image: node:alpine
`;
    const k8s = convertDockerComposeToK8s(yaml);
    expect(k8s).toContain('kind: Deployment');
    expect(k8s).toContain('name: web-deployment');
    expect(k8s).toContain('name: api-deployment');
    expect(k8s).toContain('kind: Service');
  });
});
