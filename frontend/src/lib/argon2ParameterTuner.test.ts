import { describe, it, expect } from 'vitest';
import { recommendArgon2Params } from './argon2ParameterTuner';

describe('argon2ParameterTuner', () => {
  it('recommends secure RFC-9106 params', () => {
    expect(recommendArgon2Params(500).memoryKiB).toBe(65536);
  });
});
