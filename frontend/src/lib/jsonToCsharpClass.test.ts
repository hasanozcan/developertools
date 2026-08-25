import { describe, expect, it } from 'vitest';
import { jsonToCsharpClass } from './jsonToCsharpClass';

describe('jsonToCsharpClass', () => {
  it('generates modern C# record with JsonPropertyName', () => {
    const json = '{"first_name":"Jane","age":28}';
    const res = jsonToCsharpClass(json, 'Person');
    expect(res).toContain('public record Person(');
    expect(res).toContain('JsonPropertyName("first_name")');
  });
});
