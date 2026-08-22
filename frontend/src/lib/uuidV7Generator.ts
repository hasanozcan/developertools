export function generateUuidV7(timestampMs = Date.now()): string {
  // 48-bit timestamp in hex
  const timeHex = timestampMs.toString(16).padStart(12, '0');

  // Random bits
  const randHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  // 8-4-4-4-12 format with version 7 (0111) and variant (10xx)
  const part1 = timeHex.substring(0, 8);
  const part2 = timeHex.substring(8, 12);
  const part3 = '7' + randHex.substring(0, 3);
  const part4 = ((parseInt(randHex.substring(3, 4), 16) & 0x3) | 0x8).toString(16) + randHex.substring(4, 7);
  const part5 = randHex.substring(7, 19).padEnd(12, 'a');

  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

export function parseUuidV7Timestamp(uuid: string): { isValid: boolean; timestamp?: Date; epochMs?: number } {
  const clean = uuid.trim().toLowerCase().replace(/-/g, '');
  if (clean.length !== 32) return { isValid: false };

  const timeHex = clean.substring(0, 12);
  const epochMs = parseInt(timeHex, 16);
  if (isNaN(epochMs) || epochMs <= 0) return { isValid: false };

  return {
    isValid: true,
    timestamp: new Date(epochMs),
    epochMs,
  };
}
