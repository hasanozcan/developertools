import { describe, it, expect } from 'vitest';
import { convertJsonToGoStruct } from './jsonToGoStruct';

describe('jsonToGoStruct', () => {
  it('converts json to go struct with json tags', () => {
    const json = JSON.stringify({ user_id: 42, username: "gopher" });
    const go = convertJsonToGoStruct(json, 'User');
    expect(go).toContain('type User struct');
  });
});
