export function formatKeystoreFingerprint(hexOrColonStr: string): {
  sha1: string;
  sha256: string;
} {
  const clean = hexOrColonStr.replace(/[^0-9a-fA-F]/g, '').toUpperCase();
  const sha1Hex = clean.substring(0, 40).padEnd(40, '0');
  const sha256Hex = clean.substring(0, 64).padEnd(64, '0');

  const sha1 = (sha1Hex.match(/.{2}/g) || []).join(':');
  const sha256 = (sha256Hex.match(/.{2}/g) || []).join(':');

  return { sha1, sha256 };
}
