import { describe, expect, it } from 'vitest';
import { jsonToKotlinClass } from './jsonToKotlinClass';

describe('jsonToKotlinClass', () => {
  it('generates Kotlin @Serializable data class', () => {
    const json = '{"id":1,"name":"Alice"}';
    const res = jsonToKotlinClass(json, 'User');
    expect(res).toContain('data class User(');
    expect(res).toContain('val id: Int');
    expect(res).toContain('val name: String');
  });
});
