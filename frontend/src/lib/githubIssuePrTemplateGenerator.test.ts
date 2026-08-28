import { describe, it, expect } from 'vitest';
import { generateGithubTemplate } from './githubIssuePrTemplateGenerator';

describe('githubIssuePrTemplateGenerator', () => {
  it('generates GitHub templates', () => {
    expect(generateGithubTemplate('bug')).toContain('Bug Report');
  });
});
