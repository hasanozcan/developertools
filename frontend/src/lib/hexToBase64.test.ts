import { describe, it, expect } from 'vitest';
import { hexToBase64, base64ToHex } from './hexToBase64';

describe('hexToBase64', () => {
  it('should convert hex to base64 and back accurately', () => {
    const hex = '48656c6c6f20576f726c64'; // "Hello World"
    const b64 = hexToBase64(hex);
    expect(b64).toBe('SGVsbG8gV29ybGQ=');

    const backHex = base64ToHex(b64);
    expect(backHex.toLowerCase()).toBe(hex.toLowerCase());
  });
});
