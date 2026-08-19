import { describe, it, expect } from 'vitest';
import { textToMorse, morseToText } from './morseCode';

describe('morseCode', () => {
  it('should encode text to Morse code', () => {
    const morse = textToMorse('SOS HELP');
    expect(morse).toBe('... --- ... / .... . .-.. .--.');
  });

  it('should decode Morse code back to text', () => {
    const text = morseToText('... --- ... / .... . .-.. .--.');
    expect(text).toBe('SOS HELP');
  });
});
