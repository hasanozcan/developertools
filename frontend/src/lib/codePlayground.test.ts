import { describe, expect, it } from 'vitest';
import { buildSandboxDocument, PLAYGROUND_TEMPLATES } from './codePlayground';

describe('codePlayground', () => {
  it('builds full HTML sandbox document', () => {
    const doc = buildSandboxDocument('<h1>Test</h1>', 'h1 { color: red; }', 'console.log("hello");');
    expect(doc).toContain('<!DOCTYPE html>');
    expect(doc).toContain('<h1>Test</h1>');
    expect(doc).toContain('h1 { color: red; }');
    expect(doc).toContain('console.log("hello");');
    expect(doc).toContain('devstools-sandbox');
  });

  it('includes tailwind cdn script when enabled', () => {
    const doc = buildSandboxDocument('<div>Content</div>', '', '', { includeTailwind: true });
    expect(doc).toContain('https://cdn.tailwindcss.com');
  });

  it('contains valid starter templates', () => {
    expect(PLAYGROUND_TEMPLATES.length).toBeGreaterThan(0);
    expect(PLAYGROUND_TEMPLATES[0].html).toBeTruthy();
    expect(PLAYGROUND_TEMPLATES[0].css).toBeTruthy();
    expect(PLAYGROUND_TEMPLATES[0].js).toBeTruthy();
  });
});
