import { describe, expect, it } from 'vitest';
import { jsonToPythonDataclass } from './jsonToPythonDataclass';

describe('jsonToPythonDataclass', () => {
  it('generates python dataclass with types', () => {
    const json = '{"name":"John","age":30,"active":true}';
    const py = jsonToPythonDataclass(json, 'User');
    expect(py).toContain('@dataclass');
    expect(py).toContain('class User:');
    expect(py).toContain('name: str');
    expect(py).toContain('age: int');
  });
});
