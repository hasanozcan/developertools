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

  it('safely handles regex metacharacters and avoids ReDoS without throwing SyntaxError', () => {
    const patterns = [
      'foo(bar)+[1].txt',
      '[unclosed',
      'c++/*.o',
      '*a*a*a*a*a*a*a*a*a*a*a*a*a*a*a*b',
      'src/**/*.ts',
      'file?.txt',
    ];
    const files = [
      'foo(bar)+[1].txt',
      '[unclosed',
      'c++/main.o',
      'a'.repeat(500),
      'src/nested/deep/app.ts',
      'file1.txt',
      'file/.txt',
    ];

    const start = performance.now();
    const res = testGitignorePatterns(patterns, files);
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(200);
    expect(res.find(r => r.path === 'foo(bar)+[1].txt')?.ignored).toBe(true);
    expect(res.find(r => r.path === '[unclosed')?.ignored).toBe(true);
    expect(res.find(r => r.path === 'c++/main.o')?.ignored).toBe(true);
    expect(res.find(r => r.path === 'a'.repeat(500))?.ignored).toBe(false);
    expect(res.find(r => r.path === 'src/nested/deep/app.ts')?.ignored).toBe(true);
    expect(res.find(r => r.path === 'file1.txt')?.ignored).toBe(true);
    expect(res.find(r => r.path === 'file/.txt')?.ignored).toBe(false);
  });
});
