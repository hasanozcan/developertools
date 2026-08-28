export function detectRsaKeyFormat(pem: string): 'PKCS#1' | 'PKCS#8' | 'Unknown' {
  if (pem.includes('BEGIN RSA PRIVATE KEY')) return 'PKCS#1';
  if (pem.includes('BEGIN PRIVATE KEY')) return 'PKCS#8';
  return 'Unknown';
}
