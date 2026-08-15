const ROMAN_NUMERALS = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' },
] as const;

export function numberToRoman(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    throw new Error('Number must be an integer between 1 and 3999');
  }

  let remaining = value;
  let result = '';
  for (const entry of ROMAN_NUMERALS) {
    while (remaining >= entry.value) {
      result += entry.numeral;
      remaining -= entry.value;
    }
  }
  return result;
}

export function romanToNumber(value: string): number {
  const normalized = value.trim().toUpperCase();
  if (!normalized || !/^[MDCLXVI]+$/.test(normalized)) {
    throw new Error('Invalid Roman numeral');
  }

  let result = 0;
  let previousValue = 0;
  const singleCharacterValues: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  for (let index = normalized.length - 1; index >= 0; index -= 1) {
    const currentValue = singleCharacterValues[normalized[index]];
    if (currentValue < previousValue) result -= currentValue;
    else {
      result += currentValue;
      previousValue = currentValue;
    }
  }

  if (result < 1 || result > 3999 || numberToRoman(result) !== normalized) {
    throw new Error('Invalid Roman numeral');
  }

  return result;
}

export function parseRomanNumberInput(value: string): number {
  const normalized = value.trim();
  if (!/^\d+$/.test(normalized)) throw new Error('Please enter a valid whole number');

  const parsed = Number(normalized);
  if (!Number.isSafeInteger(parsed)) throw new Error('Please enter a valid whole number');
  return parsed;
}
