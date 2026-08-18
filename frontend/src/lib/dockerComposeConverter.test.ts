import { describe, it, expect } from 'vitest';
import { parseDockerRun, generateDockerComposeYaml } from './dockerComposeConverter';

describe('dockerComposeConverter', () => {
  it('parses complex docker run command accurately', () => {
    const cmd = `docker run -d --name redis_cache -p 6379:6379 -v /var/data:/data -e REDIS_PASSWORD=secret123 --restart unless-stopped redis:7.2-alpine`;
    const parsed = parseDockerRun(cmd);

    expect(parsed.serviceName).toBe('redis_cache');
    expect(parsed.image).toBe('redis:7.2-alpine');
    expect(parsed.ports).toEqual(['6379:6379']);
    expect(parsed.volumes).toEqual(['/var/data:/data']);
    expect(parsed.environment).toEqual({ REDIS_PASSWORD: 'secret123' });
    expect(parsed.restart).toBe('unless-stopped');

    const yaml = generateDockerComposeYaml(parsed);
    expect(yaml).toContain('services:');
    expect(yaml).toContain('  redis_cache:');
    expect(yaml).toContain('    image: redis:7.2-alpine');
    expect(yaml).toContain('      - "6379:6379"');
  });
});
