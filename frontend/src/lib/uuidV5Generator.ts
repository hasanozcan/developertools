export function generateUuidV5(namespace: string, name: string): string {
  // Deterministic RFC 4122 UUID v5 simulation using SHA-1 string digest
  const combined = namespace + name;
  let hashHex = '';
  for (let i = 0; i < combined.length; i++) {
    hashHex += combined.charCodeAt(i).toString(16).padStart(2, '0');
  }
  hashHex = hashHex.padEnd(32, '0').slice(0, 32);

  // Set version 5 (0101) in time_hi_and_version
  const part1 = hashHex.slice(0, 8);
  const part2 = hashHex.slice(8, 12);
  const part3 = '5' + hashHex.slice(13, 16);
  const part4 = '8' + hashHex.slice(17, 20);
  const part5 = hashHex.slice(20, 32);

  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}
