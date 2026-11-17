import { describe, it, expect } from 'vitest';
import { flattenJson } from './jsonFlattenUnflatten';

describe('flattenJson', () => {
  it('flattens nested object with dot paths', () => {
    const nested = { user: { profile: { name: 'Alice', age: 30 } } };
    const flat = flattenJson(nested);
    expect(flat['user.profile.name']).toBe('Alice');
    expect(flat['user.profile.age']).toBe(30);
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
  });
});