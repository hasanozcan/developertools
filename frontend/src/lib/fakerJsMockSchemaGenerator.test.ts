import { describe, it, expect } from 'vitest';
import { generateFakerSchema } from './fakerJsMockSchemaGenerator';

describe('fakerJsMockSchemaGenerator', () => {
  it('generates faker schema generator function', () => {
    expect(generateFakerSchema('Account')).toContain('createMockAccount');
  });
});
