import { describe, expect, it } from 'vitest';
import { jsonToGoStruct } from './jsonToGoStruct';

describe('jsonToGoStruct', () => {
  it('generates Go struct with json tags', () => {
    const json = '{"title":"Post","views":150}';
    const go = jsonToGoStruct(json, 'Post');
    expect(go).toContain('type Post struct {');
    expect(go).toContain('Title string');
    expect(go).toContain('Views int');
  });
});
