export type SupportedRadix = 2 | 8 | 10 | 16;

export interface MultiRadixResult {
  binary: string;
  octal: string;
  decimal: string;
  hex: string;
  isValid: boolean;
  error?: string;
}

const RADIX_PATTERNS: Record<SupportedRadix, RegExp> = {
  2: /^-?(?:0b)?[01]+$/i,
  8: /^-?(?:0o)?[0-7]+$/i,
  10: /^-?[0-9]+$/,
  16: /^-?(?:0x)?[0-9a-f]+$/i,
};

function parseBigIntWithRadix(clean: string, radix: SupportedRadix): bigint {
  if (!RADIX_PATTERNS[radix].test(clean)) {
    throw new Error(`Invalid base-${radix} digits in "${clean}".`);
  }

  const isNegative = clean.startsWith('-');
  let digits = isNegative ? clean.slice(1) : clean;
  if (radix === 2) digits = digits.replace(/^0b/i, '');
  if (radix === 8) digits = digits.replace(/^0o/i, '');
  if (radix === 16) digits = digits.replace(/^0x/i, '');

  const prefix = radix === 2 ? '0b' : radix === 8 ? '0o' : radix === 16 ? '0x' : '';
  const magnitude = BigInt(`${prefix}${digits}`);
  return isNegative ? -magnitude : magnitude;
}

export function convertMultiRadix(valueStr: string, fromRadix = 10): MultiRadixResult {
  const clean = (valueStr || '').trim();
  if (!clean) {
    return { binary: '0', octal: '0', decimal: '0', hex: '0', isValid: true };
  }

  const radix = (
    fromRadix === 2 || fromRadix === 8 || fromRadix === 10 || fromRadix === 16 ? fromRadix : 10
  ) as SupportedRadix;

  try {
    const num = parseBigIntWithRadix(clean, radix);
    return {
      binary: num.toString(2),
      octal: num.toString(8),
      decimal: num.toString(10),
      hex: num.toString(16).toUpperCase(),
      isValid: true,
    };
  } catch (err) {
    return {
      binary: '0',
      octal: '0',
      decimal: '0',
      hex: '0',
      isValid: false,
      error: err instanceof Error ? err.message : 'Invalid number for selected radix.',
    };
  }
}
