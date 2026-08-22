import { describe, it, expect } from 'vitest';
import { computeSimulatedTotp } from './totpAuthenticatorSimulator';

describe('computeSimulatedTotp', () => {
  it('generates 6 digit 2FA code with remaining countdown seconds', () => {
    const res = computeSimulatedTotp('JBSWY3DPEHPK3PXP');
    expect(res.code.length).toBe(6);
    expect(res.remainingSeconds).toBeGreaterThanOrEqual(0);
    expect(res.remainingSeconds).toBeLessThanOrEqual(30);
  });
});