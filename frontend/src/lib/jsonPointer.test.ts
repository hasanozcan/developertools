import { describe, expect, it } from 'vitest';
import { evaluateJsonPointer, JsonPointerError, parseJsonPointer } from './jsonPointer';

const document = {
  foo: ['bar', 'baz'],
  '': 0,
  'a/b': 1,
  'm~n': 2,
  nested: { false: false, nil: null },
};

describe('JSON Pointer', () => {
  it.each([
    ['', document],
    ['/foo', ['bar', 'baz']],
    ['/foo/0', 'bar'],
    ['/', 0],
    ['/a~1b', 1],
    ['/m~0n', 2],
    ['/nested/false', false],
    ['/nested/nil', null],
  ])('evaluates %j', (pointer, expected) => {
    expect(evaluateJsonPointer(document, pointer)).toEqual(expected);
  });

  it('parses escaped reference tokens', () => {
    expect(parseJsonPointer('/a~1b/m~0n')).toEqual(['a/b', 'm~n']);
  });

  it.each(['foo', '/bad~2escape', '/bad~', '/foo/01', '/foo/-', '/foo/9', '/missing'])(
    'rejects invalid or missing path %j',
    (pointer) => {
      expect(() => evaluateJsonPointer(document, pointer)).toThrow(JsonPointerError);
    },
  );
});
