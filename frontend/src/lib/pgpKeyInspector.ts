export function inspectPgpKey(pgpArmorText: string): {
  isArmored: boolean;
  type: 'PUBLIC' | 'PRIVATE' | 'MESSAGE' | 'UNKNOWN';
} {
  const clean = pgpArmorText.trim();
  if (clean.includes('-----BEGIN PGP PUBLIC KEY BLOCK-----')) {
    return { isArmored: true, type: 'PUBLIC' };
  }
  if (clean.includes('-----BEGIN PGP PRIVATE KEY BLOCK-----') || clean.includes('-----BEGIN PGP SECRET KEY BLOCK-----')) {
    return { isArmored: true, type: 'PRIVATE' };
  }
  if (clean.includes('-----BEGIN PGP MESSAGE-----')) {
    return { isArmored: true, type: 'MESSAGE' };
  }
  return { isArmored: false, type: 'UNKNOWN' };
}
