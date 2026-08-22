export function inspectIeee754Float32(num: number): {
  signBit: string;
  exponentBits: string;
  mantissaBits: string;
  fullBinary: string;
} {
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setFloat32(0, num);
  const uint = view.getUint32(0);
  const binary = uint.toString(2).padStart(32, '0');

  return {
    signBit: binary.substring(0, 1),
    exponentBits: binary.substring(1, 9),
    mantissaBits: binary.substring(9, 32),
    fullBinary: binary,
  };
}
