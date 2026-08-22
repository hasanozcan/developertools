import { describe, it, expect } from 'vitest';
import { generateJsonPatch } from './jsonPatchGenerator';

describe('generateJsonPatch', () => {
  it('generates RFC 6902 json patch ops', () => {
    const a = { name: 'Alice', age: 25 };
    const b = { name: 'Alice', age: 26, city: 'London' };
    const patches = generateJsonPatch(a, b);
    expect(patches).toEqual([
      { op: 'replace', path: '/age', value: 26 },
      { op: 'add', path: '/city', value: 'London' },
    ]);
  });
});