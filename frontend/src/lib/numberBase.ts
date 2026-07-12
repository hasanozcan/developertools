export type NumberBase = 'decimal' | 'hex' | 'octal' | 'binary';

interface BaseDefinition {
  label: string;
  radix: number;
  prefix: string;
  digits: RegExp;
  digitHint: string;
}

const BASE_DEFINITIONS: Record<NumberBase, BaseDefinition> = {
  decimal: {
    label: 'decimal',
    radix: 10,
    prefix: '',
    digits: /^[0-9]+$/,
    digitHint: 'digits 0-9',
  },
  hex: {
    label: 'hexadecimal',
    radix: 16,
    prefix: '0x',
    digits: /^[0-9a-f]+$/i,
    digitHint: 'digits 0-9 and letters A-F',
  },
  octal: {
    label: 'octal',
    radix: 8,
    prefix: '0o',
    digits: /^[0-7]+$/,
    digitHint: 'digits 0-7',
  },
  binary: {
    label: 'binary',
    radix: 2,
    prefix: '0b',
    digits: /^[01]+$/,
    digitHint: 'digits 0 and 1',
  },
};

const PREFIX_BASES: Record<string, Exclude<NumberBase, 'decimal'>> = {
  '0x': 'hex',
  '0o': 'octal',
  '0b': 'binary',
};

const ZERO = BigInt(0);
export const MAX_INTEGER_DIGITS = 10_000;

export interface ConvertedNumberBases {
  decimal: string;
  hex: string;
  octal: string;
  binary: string;
}

export function parseIntegerInBase(input: string, base: NumberBase): bigint {
  const definition = BASE_DEFINITIONS[base];
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error(`Enter a ${definition.label} integer.`);
  }

  let unsigned = trimmed;
  let isNegative = false;

  if (unsigned[0] === '+' || unsigned[0] === '-') {
    isNegative = unsigned[0] === '-';
    unsigned = unsigned.slice(1);
  }

  if (!unsigned) {
    throw new Error(`Enter digits after the sign for the ${definition.label} integer.`);
  }

  const possiblePrefix = unsigned.slice(0, 2).toLowerCase();
  const prefixedBase = PREFIX_BASES[possiblePrefix];

  if (prefixedBase) {
    if (prefixedBase !== base) {
      throw new Error(
        `The ${possiblePrefix} prefix does not match the ${definition.label} input field.`,
      );
    }

    unsigned = unsigned.slice(2);
  }

  if (!unsigned) {
    throw new Error(`Enter digits after the ${definition.prefix} prefix.`);
  }

  if (unsigned.length > MAX_INTEGER_DIGITS) {
    throw new Error(
      `${definition.label[0].toUpperCase()}${definition.label.slice(1)} input is limited to ${MAX_INTEGER_DIGITS.toLocaleString('en-US')} digits.`,
    );
  }

  if (!definition.digits.test(unsigned)) {
    throw new Error(
      `Invalid ${definition.label} integer. Use only ${definition.digitHint}; trailing characters are not allowed.`,
    );
  }

  const normalizedMagnitude = definition.prefix ? `${definition.prefix}${unsigned}` : unsigned;
  const magnitude = BigInt(normalizedMagnitude);

  return isNegative && magnitude !== ZERO ? -magnitude : magnitude;
}

export function formatIntegerInBase(value: bigint, base: NumberBase): string {
  const definition = BASE_DEFINITIONS[base];
  const isNegative = value < ZERO;
  const magnitude = isNegative ? -value : value;
  const digits = magnitude.toString(definition.radix).toUpperCase();

  return `${isNegative ? '-' : ''}${definition.prefix}${digits}`;
}

export function convertIntegerBase(
  input: string,
  fromBase: NumberBase,
  toBase: NumberBase,
): string {
  return formatIntegerInBase(parseIntegerInBase(input, fromBase), toBase);
}

export function convertIntegerToAllBases(
  input: string,
  fromBase: NumberBase,
): ConvertedNumberBases {
  const value = parseIntegerInBase(input, fromBase);

  return {
    decimal: formatIntegerInBase(value, 'decimal'),
    hex: formatIntegerInBase(value, 'hex'),
    octal: formatIntegerInBase(value, 'octal'),
    binary: formatIntegerInBase(value, 'binary'),
  };
}
