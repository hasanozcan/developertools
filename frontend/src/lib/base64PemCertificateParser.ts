export function parseCertificateSan(pem: string): string[] {
  const matches = pem.match(/DNS:([a-zA-Z0-9_.-]+)/g) || [];
  return matches.map(m => m.replace(/^DNS:/, ''));
}
