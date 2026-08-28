import { describe, it, expect } from 'vitest';
import { queryJsonPath } from './jsonPathQueryTester';

describe('jsonPathQueryTester', () => {
  it('evaluates basic jsonpath root query', () => {
    expect(queryJsonPath({ user: 'neo' }, '$.user')).toBe('neo');
  });
});
