import { describe, it, expect } from 'vitest';
import { generateGithubActionsMatrixYaml } from './githubActionsMatrixBuilder';

describe('generateGithubActionsMatrixYaml', () => {
  it('generates multi-os matrix workflow', () => {
    const yaml = generateGithubActionsMatrixYaml({
      workflowName: 'CI Test',
      osList: ['ubuntu-latest', 'windows-latest'],
      nodeVersions: ['18.x', '20.x'],
    });
    expect(yaml).toContain('ubuntu-latest, windows-latest');
    expect(yaml).toContain('matrix.node-version');
  });
});