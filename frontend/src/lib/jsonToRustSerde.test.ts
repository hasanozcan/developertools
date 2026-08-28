import { describe, it, expect } from 'vitest';
import { convertJsonToRustSerde } from './jsonToRustSerde';

describe('convertJsonToRustSerde', () => {
  it('converts basic json to rust serde structs', () => {
    const json = JSON.stringify({ id: 1, name: "Ferris", active: true });
    const rust = convertJsonToRustSerde(json, 'User');
    expect(rust).toContain('pub struct User');
    expect(rust).toContain('pub id: i64');
  });
});
