// BIP-39 Mnemonic Generator and Validator (Client-side Cryptographic implementation)

import { BIP39_WORDLIST } from './bip39Wordlist';

export { BIP39_WORDLIST };

export type WordCount = 12 | 15 | 18 | 21 | 24;

const VALID_WORD_COUNTS = new Set<number>([12, 15, 18, 21, 24]);
const VALID_ENTROPY_BYTE_LENGTHS = new Set<number>([16, 20, 24, 28, 32]);

const WORD_INDEX_MAP = new Map<string, number>(
  BIP39_WORDLIST.map((word, index) => [word, index]),
);

const SHA256_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

const SHA256_INIT = new Uint32Array([
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
  0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
]);

function rotr(value: number, bits: number): number {
  return (value >>> bits) | (value << (32 - bits));
}

/**
 * Synchronous FIPS 180-4 SHA-256 digest so BIP-39 checksum validation and
 * synchronous phrase generation remain deterministic and fast without async API changes.
 */
export function sha256Sync(data: Uint8Array): Uint8Array {
  const paddedLength = Math.ceil((data.length + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(data);
  padded[data.length] = 0x80;

  const paddedView = new DataView(padded.buffer);
  const bitLength = data.length * 8;
  paddedView.setUint32(paddedLength - 8, Math.floor(bitLength / 0x1_0000_0000), false);
  paddedView.setUint32(paddedLength - 4, bitLength >>> 0, false);

  const hash = new Uint32Array(SHA256_INIT);
  const w = new Uint32Array(64);

  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let i = 0; i < 16; i++) {
      w[i] = paddedView.getUint32(offset + i * 4, false);
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    let a = hash[0];
    let b = hash[1];
    let c = hash[2];
    let d = hash[3];
    let e = hash[4];
    let f = hash[5];
    let g = hash[6];
    let h = hash[7];

    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + SHA256_K[i] + w[i]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    hash[0] = (hash[0] + a) >>> 0;
    hash[1] = (hash[1] + b) >>> 0;
    hash[2] = (hash[2] + c) >>> 0;
    hash[3] = (hash[3] + d) >>> 0;
    hash[4] = (hash[4] + e) >>> 0;
    hash[5] = (hash[5] + f) >>> 0;
    hash[6] = (hash[6] + g) >>> 0;
    hash[7] = (hash[7] + h) >>> 0;
  }

  const digest = new Uint8Array(32);
  const digestView = new DataView(digest.buffer);
  for (let i = 0; i < 8; i++) {
    digestView.setUint32(i * 4, hash[i], false);
  }
  return digest;
}

export async function sha256Bytes(data: Uint8Array): Promise<Uint8Array> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', new Uint8Array(data));
  return new Uint8Array(hashBuffer);
}

function generateEntropyForWordCount(wordCount: WordCount): Uint8Array {
  if (!VALID_WORD_COUNTS.has(wordCount)) {
    throw new RangeError(`Unsupported BIP-39 word count: ${wordCount}`);
  }
  const entropyBytes = (wordCount / 3) * 4;
  const entropy = new Uint8Array(entropyBytes);
  crypto.getRandomValues(entropy);
  return entropy;
}

function entropyToMnemonicWithHash(
  entropy: Uint8Array,
  hashFirstByte: number,
): {
  mnemonic: string;
  entropyHex: string;
  entropyBits: number;
  words: string[];
} {
  if (!VALID_ENTROPY_BYTE_LENGTHS.has(entropy.length)) {
    throw new RangeError(`Unsupported BIP-39 entropy byte length: ${entropy.length}`);
  }

  const entropyBits = entropy.length * 8;
  const checksumBits = entropyBits / 32;

  const words: string[] = [];
  let bitBuffer = 0;
  let bitCount = 0;

  for (let i = 0; i < entropy.length; i++) {
    bitBuffer = (bitBuffer << 8) | entropy[i];
    bitCount += 8;
    while (bitCount >= 11) {
      bitCount -= 11;
      words.push(BIP39_WORDLIST[(bitBuffer >>> bitCount) & 0x7ff]);
      bitBuffer &= (1 << bitCount) - 1;
    }
  }

  const checksum = hashFirstByte >>> (8 - checksumBits);
  bitBuffer = (bitBuffer << checksumBits) | checksum;
  words.push(BIP39_WORDLIST[bitBuffer & 0x7ff]);

  const entropyHex = Array.from(entropy)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return {
    mnemonic: words.join(' '),
    entropyHex,
    entropyBits,
    words,
  };
}

export function entropyToMnemonic(entropy: Uint8Array): {
  mnemonic: string;
  entropyHex: string;
  entropyBits: number;
  words: string[];
} {
  const hash = sha256Sync(entropy);
  return entropyToMnemonicWithHash(entropy, hash[0]);
}

export function generateMnemonicSync(wordCount: WordCount = 12): {
  mnemonic: string;
  entropyHex: string;
  entropyBits: number;
  words: string[];
} {
  const entropy = generateEntropyForWordCount(wordCount);
  return entropyToMnemonic(entropy);
}

export async function generateMnemonic(wordCount: WordCount = 12): Promise<{
  mnemonic: string;
  entropyHex: string;
  entropyBits: number;
  words: string[];
}> {
  const entropy = generateEntropyForWordCount(wordCount);
  const hash = await sha256Bytes(entropy);
  return entropyToMnemonicWithHash(entropy, hash[0]);
}

export function validateMnemonic(mnemonic: string): {
  isValid: boolean;
  wordCount: number;
  invalidWords: string[];
  checksumValid: boolean;
} {
  const words = mnemonic.normalize('NFKD').trim().toLowerCase().split(/\s+/).filter(Boolean);
  const invalidWords = words.filter((w) => !WORD_INDEX_MAP.has(w));

  if (invalidWords.length > 0 || !VALID_WORD_COUNTS.has(words.length)) {
    return {
      isValid: false,
      wordCount: words.length,
      invalidWords,
      checksumValid: false,
    };
  }

  const checksumBits = words.length / 3;
  const entropyBytes = checksumBits * 4;
  const entropy = new Uint8Array(entropyBytes);

  let bitBuffer = 0;
  let bitCount = 0;
  let byteIdx = 0;

  for (const word of words) {
    const idx = WORD_INDEX_MAP.get(word)!;
    bitBuffer = (bitBuffer << 11) | idx;
    bitCount += 11;
    while (bitCount >= 8 && byteIdx < entropyBytes) {
      bitCount -= 8;
      entropy[byteIdx++] = (bitBuffer >>> bitCount) & 0xff;
      bitBuffer &= (1 << bitCount) - 1;
    }
  }

  const hash = sha256Sync(entropy);
  const expectedChecksum = hash[0] >>> (8 - checksumBits);
  const checksumValid = bitBuffer === expectedChecksum;

  return {
    isValid: checksumValid,
    wordCount: words.length,
    invalidWords: [],
    checksumValid,
  };
}
