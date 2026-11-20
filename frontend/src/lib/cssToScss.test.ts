import { describe, expect, it } from 'vitest';
import { convertCssToScss } from './cssToScss';

function countBraces(text: string): { open: number; close: number } {
  let open = 0;
  let close = 0;
  for (const ch of text) {
    if (ch === '{') open++;
    if (ch === '}') close++;
  }
  return { open, close };
}

describe('cssToScss', () => {
  it('nests descendant selectors under shared parent with balanced braces', () => {
    const scss = convertCssToScss('.card header { color: red; }\n.card .body { font-size: 14px; }');
    expect(scss).toContain('.card {');
    expect(scss).toContain('  header {\n    color: red;\n  }');
    expect(scss).toContain('  .body {\n    font-size: 14px;\n  }');
    const braces = countBraces(scss);
    expect(braces.open).toBe(braces.close);
    expect(braces.open).toBe(3);
  });

  it('nests combinators (>, +, ~) and pseudo selectors (&:hover, &::before)', () => {
    const scss = convertCssToScss(`
      .nav > li { list-style: none; }
      .nav > li + li { margin-left: 8px; }
      .btn { color: blue; }
      .btn:hover { color: navy; }
      .btn::before { content: "{ok}"; }
    `);
    expect(scss).toContain('> li {');
    expect(scss).toContain('+ li {');
    expect(scss).toContain('&:hover {');
    expect(scss).toContain('&::before {');
    expect(scss).toContain('content: "{ok}";');
    const braces = countBraces(scss);
    expect(braces.open).toBe(braces.close);
  });

  it('recursively nests rules inside @media blocks', () => {
    const scss = convertCssToScss(`
      @media (min-width: 768px) {
        .grid .item { width: 50%; }
        .grid .item:hover { opacity: 0.9; }
      }
    `);
    expect(scss).toContain('@media (min-width: 768px) {');
    expect(scss).toContain('  .grid {');
    expect(scss).toContain('    .item {');
    expect(scss).toContain('      &:hover {');
    const braces = countBraces(scss);
    expect(braces.open).toBe(braces.close);
  });

  it('handles comments and throws on unbalanced braces', () => {
    const scss = convertCssToScss('/* {comment} */ .box .title { font-weight: 700; }');
    expect(scss).toContain('.box {');
    expect(() => convertCssToScss('.box { color: red;')).toThrow(/unclosed/i);
    expect(() => convertCssToScss('.box }')).toThrow(/unexpected/i);
  });
});
