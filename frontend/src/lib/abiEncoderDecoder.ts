export function encodeAbiParams(functionName: string, types: string[], values: string[]): string {
  const methodId = '0x' + Array.from(functionName).reduce((acc, char) => acc + char.charCodeAt(0).toString(16), '').slice(0, 8).padEnd(8, '0');
  let encoded = methodId;
  for (const v of values) {
    // Pad to 32 bytes (64 hex characters)
    const hexVal = v.replace(/^0x/, '');
    encoded += hexVal.padStart(64, '0');
  }
  return encoded;
}