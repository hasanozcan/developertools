import { describe, it, expect } from 'vitest';
import { calculateStorageSlot } from './ethereumAbiStorageSlotCalculator';

describe('ethereumAbiStorageSlotCalculator', () => {
  it('calculates padded EVM 32-byte storage slots', () => {
    expect(calculateStorageSlot(1)).toBe('0x0000000000000000000000000000000000000000000000000000000000000001');
  });
});
