import { describe, it, expect } from 'vitest';
import { parseJsonSyntaxError } from './jsonErrorParser';

describe('parseJsonSyntaxError', () => {
  it('extracts line and column from error message', () => {
    const invalidJson = '{\n  "name": "test",\n  "age": 30,\n}';
    const rawError = 'SyntaxError: Unexpected token } in JSON at line 4 column 1';

    const result = parseJsonSyntaxError(rawError, invalidJson);
    expect(result.line).toBe(4);
    expect(result.column).toBe(1);
    expect(result.snippet).toBe('}');
  });

  it('handles custom string message with line and column format', () => {
    const json = 'line 1\nline 2\nline 3';
    const result = parseJsonSyntaxError('SyntaxError: Unexpected token at line 2 column 5', json);
    expect(result.line).toBe(2);
    expect(result.column).toBe(5);
    expect(result.snippet).toBe('line 2');
  });

  it('gracefully handles errors without line numbers', () => {
    const result = parseJsonSyntaxError('Generic Error', 'test');
    expect(result.line).toBeUndefined();
    expect(result.column).toBeUndefined();
  });
});
