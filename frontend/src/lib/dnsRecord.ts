export interface DnsSpfOptions {
  domain: string;
  allowMx: boolean;
  allowA: boolean;
  includeDomains: string[];
  ip4List: string[];
  policy: '-all' | '~all' | '?all';
}

export function generateSpfRecord(options: DnsSpfOptions): string {
  const parts = ['v=spf1'];
  if (options.allowA) parts.push('a');
  if (options.allowMx) parts.push('mx');

  for (const ip of options.ip4List) {
    if (ip.trim()) parts.push(`ip4:${ip.trim()}`);
  }

  for (const inc of options.includeDomains) {
    if (inc.trim()) parts.push(`include:${inc.trim()}`);
  }

  parts.push(options.policy);
  return parts.join(' ');
}

export function generateDkimTxt(selector: string, domain: string, publicKeyBase64: string): { host: string; value: string } {
  const host = `${selector.trim()}._domainkey.${domain.trim()}`;
  const cleanKey = publicKeyBase64.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\s+/g, '');
  const value = `v=DKIM1; k=rsa; p=${cleanKey}`;
  return { host, value };
}
