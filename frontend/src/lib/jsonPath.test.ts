import { describe, expect, it } from 'vitest';
import { evaluateJsonPath, JsonPathError, parseJsonPath } from './jsonPath';

const document = {
  store: {
    book: [
      { title: 'A', price: 8, tags: ['classic', 'short'] },
      { title: 'B', price: 12 },
      { title: 'C', price: 15 },
    ],
    bicycle: { color: 'red', price: 19 },
  },
  "odd'name": { 'line\nbreak': true },
};

function paths(path: string, input: unknown = document): string[] {
  return evaluateJsonPath(input, path).map((match) => match.path);
}

function values(path: string, input: unknown = document): unknown[] {
  return evaluateJsonPath(input, path).map((match) => match.value);
}

describe('JSONPath parsing', () => {
  it('parses the supported child and descendant segment forms', () => {
    expect(parseJsonPath("$.store['book'][-1].title")).toEqual([
      { kind: 'child', selector: { kind: 'name', name: 'store' } },
      { kind: 'child', selector: { kind: 'name', name: 'book' } },
      { kind: 'child', selector: { kind: 'index', index: -1 } },
      { kind: 'child', selector: { kind: 'name', name: 'title' } },
    ]);
    expect(parseJsonPath('$..*')).toEqual([{ kind: 'descendant', selector: { kind: 'wildcard' } }]);
    expect(parseJsonPath('$..[1:5:2]')).toEqual([
      {
        kind: 'descendant',
        selector: { kind: 'slice', start: 1, end: 5, step: 2 },
      },
    ]);
  });

  it('decodes quoted names without executing source text', () => {
    expect(values("$['odd\\'name']['line\\nbreak']")).toEqual([true]);
    expect(values('$["unicode\\u0020name"]', { 'unicode name': 7 })).toEqual([7]);

    delete (globalThis as Record<string, unknown>).__jsonPathExecuted;
    expect(() => evaluateJsonPath({}, '$[(globalThis.__jsonPathExecuted = true)]')).toThrow(
      'Script expressions are not supported.',
    );
    expect((globalThis as Record<string, unknown>).__jsonPathExecuted).toBeUndefined();
  });

  it.each(['$[?(@.price < 10)]', '$[ ? @.price ]'])(
    'rejects unsupported filter selector %s explicitly',
    (path) => {
      expect(() => parseJsonPath(path)).toThrow('Filter selectors are not supported.');
    },
  );

  it.each(['$[(@.length - 1)]', '$[@.length]', '$[0 + 1]'])(
    'rejects unsupported script expression %s explicitly',
    (path) => {
      expect(() => parseJsonPath(path)).toThrow('Script expressions are not supported.');
    },
  );

  it('rejects union selectors explicitly', () => {
    expect(() => parseJsonPath('$[0,1]')).toThrow('Union selectors are not supported.');
    expect(() => parseJsonPath("$['a','b']")).toThrow('Union selectors are not supported.');
  });

  it.each([
    '',
    'store.book',
    '$.',
    '$..',
    '$[',
    '$[]',
    '$[01]',
    '$[-0]',
    '$[1:2:3:4]',
    '$.1name',
    '$[name]',
    "$['unterminated]",
  ])('rejects invalid syntax %j', (path) => {
    expect(() => parseJsonPath(path)).toThrow(JsonPathError);
  });
});

describe('JSONPath evaluation', () => {
  it('selects the root and child names with normalized paths', () => {
    expect(evaluateJsonPath(document, '$')).toEqual([{ path: '$', value: document }]);
    expect(evaluateJsonPath(document, "$.store['book'][0].title")).toEqual([
      { path: "$['store']['book'][0]['title']", value: 'A' },
    ]);
    expect(paths("$['odd\\'name']['line\\nbreak']")).toEqual(["$['odd\\'name']['line\\nbreak']"]);
  });

  it('supports negative array indices and returns no match outside the array', () => {
    expect(evaluateJsonPath(document, '$.store.book[-1].title')).toEqual([
      { path: "$['store']['book'][2]['title']", value: 'C' },
    ]);
    expect(evaluateJsonPath(document, '$.store.book[-9]')).toEqual([]);
    expect(evaluateJsonPath(document, '$.store.book[9]')).toEqual([]);
  });

  it('selects array and object wildcards in document order', () => {
    expect(values('$.store.book[*].title')).toEqual(['A', 'B', 'C']);
    expect(paths('$.store.*')).toEqual(["$['store']['book']", "$['store']['bicycle']"]);
    expect(paths('$.store.book[*].title')).toEqual([
      "$['store']['book'][0]['title']",
      "$['store']['book'][1]['title']",
      "$['store']['book'][2]['title']",
    ]);
  });

  it.each([
    ['$[1:6:2]', [1, 3, 5]],
    ['$[-4:-1]', [3, 4, 5]],
    ['$[:3]', [0, 1, 2]],
    ['$[::2]', [0, 2, 4, 6]],
    ['$[::-1]', [6, 5, 4, 3, 2, 1, 0]],
    ['$[5:1:-2]', [5, 3]],
    ['$[1:5:-1]', []],
    ['$[::0]', []],
  ] as const)('evaluates slice %s with RFC 9535 bounds', (path, expected) => {
    expect(values(path, [0, 1, 2, 3, 4, 5, 6])).toEqual(expected);
  });

  it('recursively selects named members with normalized paths', () => {
    expect(evaluateJsonPath(document, '$..price')).toEqual([
      { path: "$['store']['book'][0]['price']", value: 8 },
      { path: "$['store']['book'][1]['price']", value: 12 },
      { path: "$['store']['book'][2]['price']", value: 15 },
      { path: "$['store']['bicycle']['price']", value: 19 },
    ]);
    expect(values("$..['price']")).toEqual([8, 12, 15, 19]);
  });

  it('allows RFC 9535 whitespace between path segments', () => {
    expect(values("$  .store ['book'] [ 0 ] .title")).toEqual(['A']);
  });

  it('recursively applies wildcards in stable descendant order', () => {
    const input = { a: { b: 1 }, c: 2 };
    expect(evaluateJsonPath(input, '$..*')).toEqual([
      { path: "$['a']", value: { b: 1 } },
      { path: "$['c']", value: 2 },
      { path: "$['a']['b']", value: 1 },
    ]);
  });

  it('does not read inherited properties', () => {
    const input = Object.assign(Object.create({ secret: 'hidden' }) as Record<string, unknown>, {
      visible: 'shown',
    });
    expect(values('$.secret', input)).toEqual([]);
    expect(evaluateJsonPath(input, '$.*')).toEqual([{ path: "$['visible']", value: 'shown' }]);
  });

  it('terminates recursive descent on cyclic object input', () => {
    const input: { self?: unknown } = {};
    input.self = input;
    expect(paths('$..*', input)).toEqual(["$['self']"]);
  });
});
