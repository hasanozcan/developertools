import { describe, expect, it } from 'vitest';
import { testGitignorePatterns } from './gitignoreTester';

describe('gitignoreTester', () => {
  it('matches files against gitignore rules including negations', () => {
    const patterns = ['*.log', 'dist/', '!important.log'];
    const files = ['app.log', 'dist/bundle.js', 'important.log', 'src/index.ts'];
    const res = testGitignorePatterns(patterns, files);
    expect(res.find(r => r.path === 'app.log')?.ignored).toBe(true);
    expect(res.find(r => r.path === 'important.log')?.ignored).toBe(false);
    expect(res.find(r => r.path === 'src/index.ts')?.ignored).toBe(false);
  });
});
