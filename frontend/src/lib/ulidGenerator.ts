// Crockford's Base32 alphabet for ULID
const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

export function generateUlid(timestampMs: number = Date.now()): string {
  let timeStr = '';
  let time = timestampMs;

  for (let i = 9; i >= 0; i--) {
    const mod = time % 32;
    timeStr = ENCODING[mod] + timeStr;
    time = (time - mod) / 32;
  }

  // 16 random characters
  let randStr = '';
  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);

  for (let i = 0; i < 16; i++) {
    const randByte = randomBytes[i % 10];
    const randIndex = (randByte + Math.floor(Math.random() * 32)) % 32;
    randStr += ENCODING[randIndex];
  }

  return timeStr + randStr;
}

export function generateUuidV7(timestampMs: number = Date.now()): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // Timestamp 48 bits (6 bytes)
  const time = BigInt(timestampMs);
  const mask = BigInt(0xff);
  bytes[0] = Number((time >> BigInt(40)) & mask);
  bytes[1] = Number((time >> BigInt(32)) & mask);
  bytes[2] = Number((time >> BigInt(24)) & mask);
  bytes[3] = Number((time >> BigInt(16)) & mask);
  bytes[4] = Number((time >> BigInt(8)) & mask);
  bytes[5] = Number(time & mask);

  // Version 7 (0111) in bits 48-51
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  // Variant (10) in bits 64-65
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex: string[] = [];
  for (let i = 0; i < 16; i++) {
    hex.push(bytes[i].toString(16).padStart(2, '0'));
  }

  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-');
}

export function decodeUlidTimestamp(ulid: string): Date | null {
  if (ulid.length !== 26) return null;
  const timePart = ulid.slice(0, 10);
  let time = 0;

  for (let i = 0; i < 10; i++) {
    const char = timePart[i].toUpperCase();
    const val = ENCODING.indexOf(char);
    if (val === -1) return null;
    time = time * 32 + val;
  }

  return new Date(time);
}
