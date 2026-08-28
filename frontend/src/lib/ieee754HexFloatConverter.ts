export function floatToHex(val: number): string {
  const buf = new ArrayBuffer(4);
  new Float32Array(buf)[0] = val;
  return '0x' + Array.from(new Uint8Array(buf)).reverse().map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}
