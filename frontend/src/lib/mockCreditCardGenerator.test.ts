import { describe, expect, it } from 'vitest';
import { generateTestCard } from './mockCreditCardGenerator';

describe('mockCreditCardGenerator', () => {
  it('generates test card number with brand details', () => {
    const card = generateTestCard('visa');
    expect(card.number).toHaveLength(16);
    expect(card.number.startsWith('4')).toBe(true);
  });
});
