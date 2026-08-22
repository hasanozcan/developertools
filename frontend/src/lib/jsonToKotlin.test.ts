import { describe, it, expect } from 'vitest';
import { jsonToKotlin } from './jsonToKotlin';

describe('jsonToKotlin', () => {
  it('converts JSON to Kotlin @Serializable data classes', () => {
    const json = JSON.stringify({ id: 50, email: 'dev@kotlin.org', verified: true });
    const kotlinCode = jsonToKotlin(json, 'UserResponse');
    expect(kotlinCode).toContain('@Serializable');
    expect(kotlinCode).toContain('data class UserResponse(');
    expect(kotlinCode).toContain('@SerialName("email") val email: String');
  });
});
