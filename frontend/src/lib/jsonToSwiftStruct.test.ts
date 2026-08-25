import { describe, expect, it } from 'vitest';
import { jsonToSwiftStruct } from './jsonToSwiftStruct';

describe('jsonToSwiftStruct', () => {
  it('generates Swift Codable struct', () => {
    const json = '{"username":"dev","score":99.5}';
    const res = jsonToSwiftStruct(json, 'Player');
    expect(res).toContain('struct Player: Codable {');
    expect(res).toContain('let username: String');
    expect(res).toContain('let score: Double');
  });
});
