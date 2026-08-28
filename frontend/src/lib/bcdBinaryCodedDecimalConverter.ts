export function encodeBcd(num: number): string {
  return num.toString().split('').map(d => parseInt(d, 10).toString(2).padStart(4, '0')).join(' ');
}
