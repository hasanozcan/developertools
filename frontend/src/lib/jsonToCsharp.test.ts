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
});
