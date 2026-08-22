export function deriveSeedHexSimple(mnemonic: string, passphrase = ''): string {
  let hash = BigInt(0);
  const combined = mnemonic.trim() + ':' + passphrase;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << BigInt(5)) - hash + BigInt(combined.charCodeAt(i));
  }
  return hash.toString(16).padStart(64, '0').substring(0, 64);
}
