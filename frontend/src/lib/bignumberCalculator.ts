export type BigIntOperator = '+' | '-' | '*' | '/' | '%' | '**';

const ZERO = BigInt(0);
const ONE = BigInt(1);
const NEG_ONE = BigInt(-1);
const MAX_EXPONENT = BigInt(100_000);

function parseBigIntInput(raw: string, label: string): bigint {
  const trimmed = raw.trim();
  if (!trimmed) return ZERO;
  try {
    return BigInt(trimmed);
  } catch {
    throw new Error(`Invalid integer for ${label}: "${trimmed}"`);
  }
}

function powBigInt(base: bigint, exp: bigint): bigint {
  let result = ONE;
  let b = base;
  let e = exp;

  while (e > ZERO) {
    if ((e & ONE) === ONE) {
      result *= b;
    }
    e >>= ONE;
    if (e > ZERO) {
      b *= b;
    }
  }

  return result;
}

export function calculateBigInt(aStr: string, bStr: string, op: BigIntOperator): string {
  const a = parseBigIntInput(aStr, 'Operand A');
  const b = parseBigIntInput(bStr, 'Operand B');

  switch (op) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case '*':
      return (a * b).toString();
    case '/':
      return b === ZERO ? 'Error: Division by zero' : (a / b).toString();
    case '%':
      return b === ZERO ? 'Error: Modulo by zero' : (a % b).toString();
    case '**':
      if (b < ZERO) {
        return 'Error: Negative exponent is not supported for integers';
      }
      if (b > MAX_EXPONENT && a !== ZERO && a !== ONE && a !== NEG_ONE) {
        return `Error: Exponent exceeds safety limit (${MAX_EXPONENT.toString()})`;
      }
      return powBigInt(a, b).toString();
  }
}
