import { describe, it, expect } from 'vitest';
import { generateAnsiblePlaybook } from './ansiblePlaybookScaffolder';

describe('ansiblePlaybookScaffolder', () => {
  it('generates Ansible playbook YAML', () => {
    expect(generateAnsiblePlaybook()).toContain('hosts: all');
  });
});
