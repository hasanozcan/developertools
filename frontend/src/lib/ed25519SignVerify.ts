export function formatEd25519Key(rawHex: string): string {
  return rawHex.replace(/[^0-9a-fA-F]/g, '').toLowerCase().slice(0, 64);
}
