import { describe, it, expect } from 'vitest';
import { flattenJson } from './jsonFlattenUnflatten';

describe('flattenJson', () => {
  it('flattens nested object with dot paths', () => {
    const nested = { user: { profile: { name: 'Alice', age: 30 } } };
    const flat = flattenJson(nested);
    expect(flat['user.profile.name']).toBe('Alice');
    expect(flat['user.profile.age']).toBe(30);
  });
});