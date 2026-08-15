// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { minifyJavaScript, minifyStylesheet } from './codeMinifiers';

describe('parser-backed code minifiers', () => {
  it('minifies JavaScript without changing comment-like or boolean text in strings', async () => {
    const source = `
      function run() {
        const label = "true  value /* keep */";
        const path = "a//b";
        const flag = true;
        console.log(path);
        debugger;
        return { label, path, flag };
      }
    `;

    const output = await minifyJavaScript(source, {
      removeComments: true,
      removeConsole: true,
      removeDebugger: true,
      shortenBooleans: true,
    });
    const value = new Function(`${output}; return run();`)() as Record<string, unknown>;

    expect(value).toEqual({
      label: 'true  value /* keep */',
      path: 'a//b',
      flag: true,
    });
    expect(output).not.toContain('console.');
    expect(output).not.toContain('debugger');
  });

  it('rejects invalid JavaScript instead of emitting corrupted output', async () => {
    await expect(
      minifyJavaScript('const broken = ;', {
        removeComments: true,
        removeConsole: false,
        removeDebugger: true,
        shortenBooleans: true,
      }),
    ).rejects.toThrow();
  });

  it('preserves CSS calc grammar and string whitespace', async () => {
    const output = await minifyStylesheet(`a { width: calc(1px + 2px); content: "a  b"; }`, {
      removeComments: true,
    });

    expect(output).toContain('calc(1px + 2px)');
    expect(output).toContain('"a  b"');
  });

  it('preserves comments on request without treating comment-like strings as comments', async () => {
    const output = await minifyStylesheet(
      `/* keep me */ a { content: "/* string */"; color: #ff0000; }`,
      { removeComments: false },
    );

    expect(output).toContain('/* keep me */');
    expect(output).toContain('"/* string */"');
  });
});
