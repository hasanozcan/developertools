// @vitest-environment node

import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { jsonToTypeScript, type TypeOptions } from './JsonToTypescriptTool';

const OPTIONS: TypeOptions = {
  rootName: 'Root',
  useInterface: true,
  optionalProperties: false,
  addExport: true,
  extractNested: true,
  detectUnions: true,
  addJSDoc: false,
};

function expectValidTypeScript(source: string): void {
  const diagnostics =
    ts.transpileModule(source, {
      compilerOptions: { target: ts.ScriptTarget.ES2022 },
      reportDiagnostics: true,
    }).diagnostics ?? [];

  expect(
    diagnostics.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error),
  ).toEqual([]);
}

describe('JSON to TypeScript generation', () => {
  it('emits every nested type it references', () => {
    const output = jsonToTypeScript(
      {
        address: { city: 'Istanbul' },
        items: [{ id: 1, name: 'a' }],
      },
      'Root',
      OPTIONS,
    );

    expect(output).toContain('interface Root');
    expect(output).toContain('interface Address');
    expect(output).toContain('interface ItemsItem');
    expect(output).toContain('address: Address;');
    expect(output).toContain('items: ItemsItem[];');
    expectValidTypeScript(output);
  });

  it('returns a valid alias for root arrays in extract mode', () => {
    const output = jsonToTypeScript([{ id: 1 }], 'Root', OPTIONS);

    expect(output).toMatch(/^export type Root = /);
    expect(output).not.toBe('');
    expectValidTypeScript(output);
  });

  it('quotes property names safely', () => {
    const output = jsonToTypeScript({ "owner's name": 'Ada' }, 'Root', OPTIONS);

    expect(output).toContain('"owner\'s name": string;');
    expectValidTypeScript(output);
  });
});
