import { describe, expect, it } from 'vitest';
import { generatePkceCodeVerifier, generatePkceChallengeFromVerifier } from './pkceGenerator';

describe('pkceGenerator', () => {
  it('generates valid length code verifier and challenge', () => {
    const verifier = generatePkceCodeVerifier(64);
    expect(verifier).toHaveLength(64);
    const challenge = generatePkceChallengeFromVerifier(verifier);
    expect(challenge).toBeTruthy();
  });
});
