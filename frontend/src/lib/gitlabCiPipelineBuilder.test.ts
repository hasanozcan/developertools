import { describe, it, expect } from 'vitest';
import { generateGitlabCi } from './gitlabCiPipelineBuilder';

describe('gitlabCiPipelineBuilder', () => {
  it('generates GitLab CI YAML', () => {
    expect(generateGitlabCi()).toContain('stages:');
  });
});
