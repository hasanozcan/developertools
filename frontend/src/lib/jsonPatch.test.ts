import { describe, expect, it } from 'vitest';
import {
  JsonPatchError,
  applyJsonPatch,
  generateJsonPatch,
  parseJsonPatch,
  parseJsonPointer,
  type JsonValue,
} from './jsonPatch';

describe('JSON Patch generation', () => {
  it('generates a deterministic patch that recreates nested object changes', () => {
    const source = { name: 'Ada', active: true, profile: { city: 'London', role: 'admin' } };
    const target = { name: 'Ada Lovelace', profile: { city: 'London', language: 'TypeScript' } };
    const patch = generateJsonPatch(source, target);

    expect(patch).toEqual([
      { op: 'remove', path: '/active' },
      { op: 'replace', path: '/name', value: 'Ada Lovelace' },
      { op: 'remove', path: '/profile/role' },
      { op: 'add', path: '/profile/language', value: 'TypeScript' },
    ]);
    expect(applyJsonPatch(source, patch)).toEqual(target);
  });

  it('escapes pointer segments and replaces changed arrays atomically', () => {
    const source = { 'a/b': { '~key': [1, 2] } };
    const target = { 'a/b': { '~key': [1, 3] } };
    const patch = generateJsonPatch(source, target);

    expect(patch).toEqual([{ op: 'replace', path: '/a~1b/~0key', value: [1, 3] }]);
    expect(applyJsonPatch(source, patch)).toEqual(target);
  });
});

describe('JSON Patch application', () => {
  it('supports add, remove, replace, copy, move, and test operations', () => {
    const result = applyJsonPatch({ users: ['Ada', 'Grace'], meta: { count: 2 } }, [
      { op: 'test', path: '/meta/count', value: 2 },
      { op: 'add', path: '/users/-', value: 'Linus' },
      { op: 'copy', from: '/users/0', path: '/owner' },
      { op: 'move', from: '/users/1', path: '/users/0' },
      { op: 'replace', path: '/meta/count', value: 3 },
      { op: 'remove', path: '/users/1' },
    ]);

    expect(result).toEqual({ users: ['Grace', 'Linus'], meta: { count: 3 }, owner: 'Ada' });
  });

  it('does not mutate the input or pollute object prototypes', () => {
    const source: JsonValue = JSON.parse('{"safe":true}');
    const result = applyJsonPatch(source, [
      { op: 'add', path: '/__proto__', value: { polluted: true } },
    ]) as Record<string, JsonValue>;

    expect(source).toEqual({ safe: true });
    expect(Object.prototype).not.toHaveProperty('polluted');
    expect(result.__proto__).toEqual({ polluted: true });
    expect(JSON.stringify(result)).toContain('"__proto__"');
  });

  it('reports failed tests and invalid moves with operation context', () => {
    expect(() => applyJsonPatch({ value: 1 }, [{ op: 'test', path: '/value', value: 2 }])).toThrow(
      /Operation 1 \(test\).*failed/u,
    );
    expect(() =>
      applyJsonPatch({ parent: { child: 1 } }, [
        { op: 'move', from: '/parent', path: '/parent/child/new' },
      ]),
    ).toThrow(/own children/u);
  });
});

describe('JSON Patch parsing', () => {
  it('validates pointer escapes and operation requirements', () => {
    expect(parseJsonPointer('/a~1b/~0key')).toEqual(['a/b', '~key']);
    expect(parseJsonPatch('[{"op":"remove","path":"/old"}]')).toEqual([
      { op: 'remove', path: '/old' },
    ]);
    expect(() => parseJsonPointer('/bad~2escape')).toThrow(JsonPatchError);
    expect(() => parseJsonPatch('[{"op":"add","path":"/value"}]')).toThrow(/requires a value/u);
  });
});
