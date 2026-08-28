import { describe, it, expect } from 'vitest';
import { generateTypeGuards } from './jsonToTypescriptTypeGuards';

describe('jsonToTypescriptTypeGuards', () => {
  it('generates type guards', () => {
    expect(generateTypeGuards('{"id": 1}', 'User')).toContain('export function isUser');
  });
});
