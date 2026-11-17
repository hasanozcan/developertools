export interface CsrOptions {
  commonName?: string;
  domain?: string;
  country?: string;
  state?: string;
  city?: string;
  organization?: string;
  sans?: string[];
}

const CONTROL_OR_NEWLINE_RE = /[\r\n\x00-\x1f\x7f]/;
const SHELL_OR_INI_META_RE = /["'`;$&|<>\\#[\]=/*?{}!~]/;
const VALID_DOMAIN_OR_SAN_RE =
  /^(?:\*\.)?[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

function validateDomainOrSan(value: string, label: string): string {
  if (CONTROL_OR_NEWLINE_RE.test(value)) {
    throw new Error(`${label} contains invalid control or newline characters.`);
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 253 || !VALID_DOMAIN_OR_SAN_RE.test(trimmed)) {
    throw new Error(`${label} contains invalid characters or is not a valid hostname.`);
  }
  return trimmed;
}

function validateDnField(value: string, label: string): string {
  if (CONTROL_OR_NEWLINE_RE.test(value)) {
    throw new Error(`${label} contains invalid control or newline characters.`);
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 128 || SHELL_OR_INI_META_RE.test(trimmed)) {
    throw new Error(`${label} contains disallowed quotes or shell/INI metacharacters.`);
  }
  return trimmed;
}

function shellQuote(arg: string): string {
  return `'${arg.replace(/'/g, `'\\''`)}'`;
}

export function generateOpenSslCsrCommand(opts: CsrOptions): { openSslCommand: string; config: string; command: string } {
  const rawDomain = opts.commonName || opts.domain || 'example.com';
  const domain = validateDomainOrSan(rawDomain, 'Domain');
  const country = validateDnField(opts.country || 'US', 'Country');
  const state = validateDnField(opts.state || 'State', 'State');
  const city = validateDnField(opts.city || 'City', 'City');
  const organization = validateDnField(opts.organization || 'Org', 'Organization');
  const sans = (opts.sans ?? []).map((s, idx) => validateDomainOrSan(s, `SAN[${idx}]`));

  const sanLines = sans.length > 0
    ? `[alt_names]\n${sans.map((s, i) => `DNS.${i + 1} = ${s}`).join('\n')}`
    : '';

  const config = `[req]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[dn]
C = ${country}
ST = ${state}
L = ${city}
O = ${organization}
CN = ${domain}

[req_ext]
subjectAltName = @alt_names

${sanLines}`;

  const fileStem = domain.replace(/^\*\./, 'wildcard.');
  const subj = `/C=${country}/ST=${state}/L=${city}/O=${organization}/CN=${domain}`;
  const command = `openssl req -new -newkey rsa:2048 -nodes -keyout ${shellQuote(`${fileStem}.key`)} -out ${shellQuote(`${fileStem}.csr`)} -subj ${shellQuote(subj)} -config ${shellQuote('san.cnf')}`;
  return { openSslCommand: command, command, config };
}

export function generateOpenSslCsrConfig(opts: { domain: string; country: string; state: string; city: string; organization: string; sans: string[] }): { config: string; command: string } {
  return generateOpenSslCsrCommand(opts);
}
