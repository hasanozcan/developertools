import { describe, it, expect } from 'vitest';
import { generateGitLabCiYaml } from './gitlabCiGenerator';

describe('generateGitLabCiYaml', () => {
  it('generates .gitlab-ci.yml config', () => {
    const res = generateGitLabCiYaml({ stages: ['test', 'deploy'], nodeVersion: '20' });
    expect(res).toContain('image: node:20');
    expect(res).toContain('npm run lint');
  });
});