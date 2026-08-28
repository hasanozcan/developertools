export function toUrlSafeBase64(standardBase64: string): string {
  return standardBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
