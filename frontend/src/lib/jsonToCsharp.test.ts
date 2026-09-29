import { describe, it, expect } from 'vitest';
import { jsonToCsharp } from './jsonToCsharp';

describe('jsonToCsharp', () => {
  it('converts JSON to C# strongly-typed class with JsonPropertyName attributes', () => {
    const json = JSON.stringify({ userId: 1, title: 'Task 1', isComplete: false });
    const csharpCode = jsonToCsharp(json, 'TodoItem');
    expect(csharpCode).toContain('using System.Text.Json.Serialization;');
    expect(csharpCode).toContain('public class TodoItem');
    expect(csharpCode).toContain('[JsonPropertyName("userId")]');
    expect(csharpCode).toContain('public int UserId { get; set; }');
  });

  it('generates positional records with JsonPropertyName when record style is selected', () => {
    const json = JSON.stringify({ first_name: 'Jane', age: 28, address: { city: 'Oslo' } });
    const code = jsonToCsharp(json, 'Person', 'record');
    expect(code).toContain('public record Person(');
    expect(code).toContain('[property: JsonPropertyName("first_name")] string FirstName');
    expect(code).toContain('[property: JsonPropertyName("address")] Address Address');
    expect(code).toContain('public record Address(');
    expect(code).not.toContain('public class');
  });
});
