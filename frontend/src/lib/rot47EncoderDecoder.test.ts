import { describe, it, expect } from 'vitest';
import { rot47 } from './rot47EncoderDecoder';

describe('rot47EncoderDecoder', () => {
  it('rotates printable ascii with rot47', () => {
    const encoded = rot47('Hello World');
    expect(rot47(encoded)).toBe('Hello World');
  });
});
