import { describe, expect, it } from 'vitest';
import { flattenJson, unflattenJson } from './jsonFlattenUnflatten';

describe('jsonFlattenUnflatten', () => {
  it('flattens nested object with dot paths and custom delimiters', () => {
    const nested = { user: { profile: { name: 'Alice', age: 30 } } };
    const flat = flattenJson(nested);
    expect(flat['user.profile.name']).toBe('Alice');
    expect(flat['user.profile.age']).toBe(30);

    const slashFlat = flattenJson(nested, '', '/');
    expect(slashFlat['user/profile/name']).toBe('Alice');
  });

  it('unflattens flat objects back into nested structures', () => {
    const flat = { 'user.profile.name': 'Alice', 'user.profile.age': 30, tags: ['a', 'b'] };
    expect(unflattenJson(flat)).toEqual({
      user: { profile: { name: 'Alice', age: 30 } },
      tags: ['a', 'b'],
    });

    expect(unflattenJson({ 'a/b/c': true }, '/')).toEqual({ a: { b: { c: true } } });
  });

  it('ignores prototype-polluting keys like __proto__, constructor, and prototype', () => {
    const payload = JSON.parse(
      '{"__proto__":{"polluted":true},"constructor":{"prototype":{"admin":true}},"safe":{"ok":1}}',
    );
    const flat = flattenJson(payload);
    expect(flat['safe.ok']).toBe(1);
    expect(Object.hasOwn(flat, '__proto__')).toBe(false);
    expect(Object.keys(flat)).toEqual(['safe.ok']);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(({} as Record<string, unknown>).admin).toBeUndefined();

    const unflatPayload = JSON.parse(
      '{"__proto__.polluted":true,"constructor.prototype.admin":true,"safe.ok":1}',
    );
    const unflat = unflattenJson(unflatPayload);
    expect(unflat).toEqual({ safe: { ok: 1 } });
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(({} as Record<string, unknown>).admin).toBeUndefined();
  });
});
