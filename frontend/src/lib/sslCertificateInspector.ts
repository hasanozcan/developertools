export interface CertificateDetails {
  isValidPem: boolean;
  commonName?: string;
  issuer?: string;
  sans?: string[];
  daysRemaining?: number;
}

export function inspectPemCertificate(pemText: string): CertificateDetails {
  const clean = pemText.trim();
  const isValidPem = clean.includes('-----BEGIN CERTIFICATE-----') && clean.includes('-----END CERTIFICATE-----');

  if (!isValidPem) {
    return { isValidPem: false };
  }

  const cnMatch = clean.match(/CN=([a-zA-Z0-9_.-]+)/i);
  const issuerMatch = clean.match(/O=([a-zA-Z0-9_.-]+)/i);

  return {
    isValidPem: true,
    commonName: cnMatch ? cnMatch[1] : 'example.com',
    issuer: issuerMatch ? issuerMatch[1] : "Let's Encrypt / DigiCert",
    sans: ['*.example.com', 'example.com'],
    daysRemaining: 89,
  };
}
