import { describe, it, expect } from 'vitest';
import { formatAudioDuration, calculateTrimmedSamples } from './audioConverter';

describe('audioConverter', () => {
  it('formats audio seconds into mm:ss.ms', () => {
    expect(formatAudioDuration(65.45)).toBe('01:05.45');
    expect(formatAudioDuration(0)).toBe('00:00.00');
  });

  it('calculates sample range for audio trimming', () => {
    const res = calculateTrimmedSamples(44100, 1.0, 3.0, 10.0);
    expect(res.startSample).toBe(44100);
    expect(res.endSample).toBe(88200 * 1.5);
    expect(res.numSamples).toBe(88200);
  });
});
