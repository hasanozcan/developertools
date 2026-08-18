import { describe, it, expect } from 'vitest';
import { GITIGNORE_TEMPLATES, generateGitignore } from './gitignoreTemplates';

describe('gitignoreTemplates', () => {
  it('should have standard templates defined', () => {
    expect(GITIGNORE_TEMPLATES.length).toBeGreaterThanOrEqual(10);
    const nodeTpl = GITIGNORE_TEMPLATES.find((t) => t.id === 'node');
    expect(nodeTpl).toBeDefined();
    expect(nodeTpl?.content).toContain('node_modules/');
  });

  it('should merge selected templates and custom rules', () => {
    const output = generateGitignore(['node', 'vscode'], 'my-secrets.env');
    expect(output).toContain('### Node.js / JavaScript / TypeScript ###');
    expect(output).toContain('node_modules/');
    expect(output).toContain('### Visual Studio Code ###');
    expect(output).toContain('### Custom Rules ###');
    expect(output).toContain('my-secrets.env');
  });

  it('should return empty string if no templates or rules selected', () => {
    const output = generateGitignore([]);
    expect(output).toBe('');
  });
});
