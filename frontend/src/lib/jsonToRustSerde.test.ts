import { describe, it, expect } from 'vitest';
import { jsonToRustSerde } from './jsonToRustSerde';

describe('jsonToRustSerde', () => {
  it('converts JSON to Rust serde structs with derive macros', () => {
    const json = JSON.stringify({ id: 1, name: 'Alice', active: true });
    const rustCode = jsonToRustSerde(json, 'User');
    expect(rustCode).toContain('use serde::{Deserialize, Serialize};');
    expect(rustCode).toContain('pub struct User {');
    expect(rustCode).toContain('pub id: i64,');
    expect(rustCode).toContain('pub name: String,');
    expect(rustCode).toContain('pub active: bool,');
  });
});
