const BIP39_PBKDF2_ITERATIONS = 2048;
const BIP39_SEED_BITS = 512;

export async function deriveBip39SeedBytes(
  mnemonic: string,
  passphrase = '',
): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const normalizedMnemonic = mnemonic.trim().replace(/\s+/g, ' ').normalize('NFKD');
  const normalizedSalt = ('mnemonic' + passphrase).normalize('NFKD');

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(normalizedMnemonic),
    { name: 'PBKDF2' },
    false,
    ['deriveBits'],
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(normalizedSalt),
      iterations: BIP39_PBKDF2_ITERATIONS,
      hash: 'SHA-512',
    },
    keyMaterial,
    BIP39_SEED_BITS,
  );

  return new Uint8Array(derivedBits);
}

export async function deriveBip39SeedHex(
  mnemonic: string,
  passphrase = '',
): Promise<string> {
  const seedBytes = await deriveBip39SeedBytes(mnemonic, passphrase);
  return Array.from(seedBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
