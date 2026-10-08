import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import fixtures from './fixtures/guardedBracesExpected.json';

type Ast = { type: string; value?: string; nodes?: Ast[]; parent?: Ast };
type Options = Record<string, unknown>;
interface Braces {
  (input: string | string[], options?: Options): string[];
  create(input: string, options?: Options): string | string[];
  parse(input: string, options?: Options): Ast;
  compile(input: string | Ast, options?: Options): string;
  stringify(input: string | Ast, options?: Options): string;
  expand(input: string | Ast, options?: Options): string[];
}
const localRequire = createRequire(import.meta.url);
const source = path.resolve('vendor/guarded-braces/index.js');
const braces = localRequire(source) as Braces;
const guard = localRequire(path.resolve('vendor/guarded-braces/lib/guard.js')) as {
  assertSafeAst(ast: Ast): void;
  MAX_AST_DEPTH: number;
  MAX_AST_VISITS: number;
};
const isComplexityError = (error: unknown) =>
  error instanceof SyntaxError &&
  (error as SyntaxError & { code?: string }).code === 'ERR_BRACES_COMPLEXITY';

describe('internal braces source backport', () => {
  it.each(fixtures.cases)('preserves upstream output for $pattern with $options', (fixture) => {
    expect(braces.compile(fixture.pattern, fixture.options)).toBe(fixture.compiled);
    expect(braces.expand(fixture.pattern, fixture.options)).toEqual(fixture.expanded);
    expect(braces.stringify(fixture.pattern, fixture.options)).toBe(fixture.stringified);
  });

  it.each(['compile', 'expand', 'stringify', 'parse'] as const)(
    '%s rejects nested patterns under the existing character cap',
    (method) => {
      const input = '{'.repeat(3500) + 'x' + '}'.repeat(3500);
      expect(input.length).toBeLessThan(10000);
      expect(() => braces[method](input, { maxLength: 10000, maxDepth: Infinity })).toThrow(
        expect.objectContaining({ name: 'SyntaxError', code: 'ERR_BRACES_COMPLEXITY' }),
      );
    },
  );

  it('bounds parenthesis containers and cleanup of unclosed containers', () => {
    for (const input of ['('.repeat(3500) + 'x', '{'.repeat(3500) + 'x']) {
      expect(() => braces.parse(input)).toThrow(
        expect.objectContaining({ code: 'ERR_BRACES_COMPLEXITY' }),
      );
    }
    expect(braces.stringify('{'.repeat(127) + 'x' + '}'.repeat(127))).toBe(
      '{'.repeat(127) + 'x' + '}'.repeat(127),
    );
    expect(() => braces.parse('{'.repeat(128) + 'x' + '}'.repeat(128))).toThrow(
      expect.objectContaining({ code: 'ERR_BRACES_COMPLEXITY' }),
    );
  });

  it('retains the hard character cap when maxLength is NaN or Infinity', () => {
    const input = '{' + ','.repeat(150000);
    const methods = ['parse', 'compile', 'expand', 'stringify', 'create'] as const;
    for (const maxLength of [NaN, Infinity]) {
      for (const method of methods) {
        expect(() => braces[method](input, { maxLength })).toThrow(
          expect.objectContaining({
            name: 'SyntaxError',
            message: expect.stringContaining('exceeds max characters'),
          }),
        );
      }
      expect(() => braces(input, { maxLength })).toThrow(SyntaxError);
      expect(() => braces([input], { maxLength, expand: true })).toThrow(SyntaxError);
    }
  });

  it('does not coerce caller-controlled AST length metadata in the create fast path', () => {
    const ast = braces.parse('{a,b}');
    const nested = JSON.parse('['.repeat(3500) + '1' + ']'.repeat(3500));
    Object.assign(ast, { length: nested });
    expect(braces.create(ast as unknown as string)).toBe('(a|b)');
    expect(braces(ast as unknown as string)).toEqual(['(a|b)']);
  });

  it.each(['compile', 'expand', 'stringify'] as const)(
    '%s rejects direct deep or cyclic child ASTs before recursion',
    (method) => {
      let node: Ast = { type: 'text', value: 'x' };
      for (let index = 0; index < 3500; index++) node = { type: 'root', nodes: [node] };
      expect(() => braces[method](node)).toThrow(
        expect.objectContaining({ code: 'ERR_BRACES_COMPLEXITY' }),
      );
      const cyclic: Ast = { type: 'root', nodes: [] };
      cyclic.nodes!.push(cyclic);
      expect(() => braces[method](cyclic)).toThrow(
        expect.objectContaining({ code: 'ERR_BRACES_COMPLEXITY' }),
      );
    },
  );

  it('caps scheduled visits while allowing shared, acyclic child nodes', () => {
    const leaf: Ast = { type: 'text', value: 'x' };
    expect(braces.compile({ type: 'root', nodes: [leaf, leaf] })).toBe('xx');
    expect(() =>
      guard.assertSafeAst({ type: 'root', nodes: Array(guard.MAX_AST_VISITS).fill(leaf) }),
    ).toThrow(expect.objectContaining({ code: 'ERR_BRACES_COMPLEXITY' }));
    const branch: Ast = { type: 'root', nodes: Array(40000).fill(leaf) };
    expect(() => guard.assertSafeAst({ type: 'root', nodes: Array(40000).fill(branch) })).toThrow(
      expect.objectContaining({ code: 'ERR_BRACES_COMPLEXITY' }),
    );
    expect(() => guard.assertSafeAst({ type: 'text', value: ['x'] } as unknown as Ast)).toThrow(
      expect.objectContaining({ code: 'ERR_BRACES_COMPLEXITY' }),
    );
  });

  it('expands from the active tree even when parent metadata has a foreign cycle', () => {
    const ast = braces.parse('a(b)c');
    const foreign: Ast = { type: 'paren', nodes: [] };
    foreign.parent = foreign;
    const paren = ast.nodes!.find((node) => node.type === 'paren')!;
    paren.parent = foreign;
    expect(braces.expand(ast)).toEqual(['a(b)c']);
  });

  it.each(['compile', 'expand', 'stringify'] as const)(
    '%s rejects passive JSON metadata that would recurse during numeric coercion',
    (method) => {
      const nested = JSON.parse('['.repeat(3500) + '1' + ']'.repeat(3500));
      for (const counter of ['commas', 'ranges']) {
        const ast = braces.parse('{a,b}');
        const brace = ast.nodes!.find((node) => node.type === 'brace')!;
        (brace as Ast & Record<string, unknown>)[counter] = nested;
        expect(() => braces[method](ast, { escapeInvalid: true })).toThrow(
          expect.objectContaining({ name: 'SyntaxError', code: 'ERR_BRACES_COMPLEXITY' }),
        );
      }
    },
  );

  it.each(['step', 'rangeLimit', 'relaxZeros', 'shorthand', 'capture', 'wrap'])(
    'rejects passive nested %s options before range-library coercion',
    (field) => {
      const nested = JSON.parse('['.repeat(3500) + '1' + ']'.repeat(3500));
      const options = { [field]: nested, toRegex: true };
      for (const method of ['parse', 'compile', 'expand', 'stringify', 'create'] as const) {
        expect(() => braces[method]('{1..3}', options)).toThrow(
          expect.objectContaining({ code: 'ERR_BRACES_COMPLEXITY' }),
        );
      }
      expect(() => braces('{1..3}', options)).toThrow(SyntaxError);
      expect(() => braces(['{1..3}'], options)).toThrow(SyntaxError);
    },
  );

  it('has a negative control: disabling the guards restores the stack overflow', () => {
    const probe = (disable: boolean) => `
      const Module = require('node:module');
      const originalLoad = Module._load;
      if (${disable}) Module._load = function (request, parent, isMain) {
        if (request === './guard' && parent.filename.includes('guarded-braces'))
          return { assertParserDepth() {}, assertSafeOptions() {}, assertSafeAst() {} };
        return originalLoad.call(this, request, parent, isMain);
      };
      const braces = require(${JSON.stringify(source)});
      try { braces.compile('{'.repeat(3500) + 'x' + '}'.repeat(3500), { maxLength: 10000 });
        console.log(JSON.stringify({ unexpectedSuccess: true }));
      } catch (error) { console.log(JSON.stringify({ name: error.name, code: error.code })); }
    `;
    const run = (disable: boolean) =>
      JSON.parse(
        execFileSync(process.execPath, ['--stack-size=512', '-e', probe(disable)], {
          encoding: 'utf8',
          timeout: 5000,
        }),
      );
    expect(run(true)).toEqual({ name: 'RangeError' });
    expect(run(false)).toEqual({ name: 'SyntaxError', code: 'ERR_BRACES_COMPLEXITY' });
    expect(isComplexityError(new RangeError('Maximum call stack size exceeded'))).toBe(false);
  });
});
