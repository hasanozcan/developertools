import { describe, it, expect } from 'vitest';
import { encodeMorseCode } from './morseCodeAudioConverter';

describe('encodeMorseCode', () => {
  it('encodes SOS correctly', () => {
    expect(encodeMorseCode('SOS')).toBe('... --- ...');
  });
});