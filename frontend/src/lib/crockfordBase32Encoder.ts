export function encodeCrockford(num: number): string {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  let n = num;
  let str = '';
  while (n > 0) {
    str = alphabet[n % 32] + str;
    n = Math.floor(n / 32);
  }
  return str || '0';
}
