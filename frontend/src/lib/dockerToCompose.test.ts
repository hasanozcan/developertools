import { describe, it, expect } from 'vitest';
import { convertDockerRunToCompose } from './dockerToCompose';

describe('convertDockerRunToCompose', () => {
  it('converts docker run command to docker-compose.yml', () => {
    const cmd = 'docker run -d --name web -p 8080:80 -e NODE_ENV=production redis:alpine';
    const yaml = convertDockerRunToCompose(cmd);
    expect(yaml).toContain('web:');
    expect(yaml).toContain('image: redis:alpine');
    expect(yaml).toContain('- "8080:80"');
    expect(yaml).toContain('- NODE_ENV=production');
  });
});