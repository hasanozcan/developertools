export function calculateBitwise(
  a: number,
  b: number,
  op: 'AND' | 'OR' | 'XOR' | 'NOT' | 'SHL' | 'SHR',
): {
  decimalResult: number;
  binaryResult: string;
  hexResult: string;
} {
  let res = 0;
  switch (op) {
    case 'AND': res = a & b; break;
    case 'OR': res = a | b; break;
    case 'XOR': res = a ^ b; break;
    case 'NOT': res = ~a; break;
    case 'SHL': res = a << b; break;
    case 'SHR': res = a >> b; break;
  }

  return {
    decimalResult: res,
    binaryResult: (res >>> 0).toString(2).padStart(32, '0'),
    hexResult: '0x' + (res >>> 0).toString(16).toUpperCase(),
  };
}
