// DMARC, SPF, and DKIM DNS TXT Record Generator

export interface SpfConfig {
  domain: string;
  allowMx: boolean;
  allowA: boolean;
  ip4: string[];
  ip6: string[];
  includes: string[];
  policy: '~all' | '-all' | '?all' | '+all';
}

export interface DmarcConfig {
  domain: string;
  policy: 'none' | 'quarantine' | 'reject';
  subdomainPolicy?: 'none' | 'quarantine' | 'reject';
  ruaEmail?: string;
  rufEmail?: string;
  percentage: number; // 1 - 100
  alignmentDkim: 'r' | 's'; // relaxed or strict
  alignmentSpf: 'r' | 's';
  reportFormat: 'afrf';
}

export function generateSpfRecord(config: SpfConfig): { host: string; type: 'TXT'; record: string } {
  const parts: string[] = ['v=spf1'];

  if (config.allowMx) parts.push('mx');
  if (config.allowA) parts.push('a');

  config.ip4.forEach((ip) => {
    const clean = ip.trim();
    if (clean) parts.push(`ip4:${clean}`);
  });

  config.ip6.forEach((ip) => {
    const clean = ip.trim();
    if (clean) parts.push(`ip6:${clean}`);
  });

  config.includes.forEach((inc) => {
    const clean = inc.trim();
    if (clean) parts.push(`include:${clean}`);
  });

  parts.push(config.policy);

  return {
    host: config.domain.trim() || '@',
    type: 'TXT',
    record: parts.join(' '),
  };
}

export function generateDmarcRecord(config: DmarcConfig): { host: string; type: 'TXT'; record: string } {
  const domain = config.domain.trim() || 'example.com';
  const parts: string[] = ['v=DMARC1', `p=${config.policy}`];

  if (config.subdomainPolicy) {
    parts.push(`sp=${config.subdomainPolicy}`);
  }

  if (config.ruaEmail?.trim()) {
    parts.push(`rua=mailto:${config.ruaEmail.trim()}`);
  }

  if (config.rufEmail?.trim()) {
    parts.push(`ruf=mailto:${config.rufEmail.trim()}`);
  }

  if (config.percentage < 100 && config.percentage > 0) {
    parts.push(`pct=${config.percentage}`);
  }

  if (config.alignmentDkim === 's') {
    parts.push('adkim=s');
  }

  if (config.alignmentSpf === 's') {
    parts.push('aspf=s');
  }

  return {
    host: `_dmarc.${domain}`,
    type: 'TXT',
    record: parts.join('; '),
  };
}
