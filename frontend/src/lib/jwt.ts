export const HMAC_JWT_ALGORITHMS = ['HS256', 'HS384', 'HS512'] as const;

export type HmacJwtAlgorithm = (typeof HMAC_JWT_ALGORITHMS)[number];

export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export type JwtClaimIssueCode =
  | 'expired'
  | 'not-active'
  | 'issued-in-future'
  | 'invalid-exp'
  | 'invalid-nbf'
  | 'invalid-iat'
  | 'issuer-mismatch'
  | 'audience-mismatch';

export interface JwtClaimIssue {
  code: JwtClaimIssueCode;
  claim: 'exp' | 'nbf' | 'iat' | 'iss' | 'aud';
  value: unknown;
}

export interface JwtClaimValidationOptions {
  now?: number;
  clockSkewSeconds?: number;
  issuer?: string;
  audience?: string;
}

export interface JwtVerificationResult {
  valid: boolean;
  signatureValid: boolean;
  algorithm?: HmacJwtAlgorithm;
  decoded: DecodedJwt | null;
  claimIssues: JwtClaimIssue[];
  error?:
    | 'invalid-token'
    | 'missing-secret'
    | 'missing-algorithm'
    | 'unsupported-algorithm'
    | 'invalid-signature';
}

const HASH_BY_ALGORITHM: Record<HmacJwtAlgorithm, 'SHA-256' | 'SHA-384' | 'SHA-512'> = {
  HS256: 'SHA-256',
  HS384: 'SHA-384',
  HS512: 'SHA-512',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isHmacAlgorithm(value: unknown): value is HmacJwtAlgorithm {
  return typeof value === 'string' && (HMAC_JWT_ALGORITHMS as readonly string[]).includes(value);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '');
}

function decodeBase64UrlBytes(segment: string): Uint8Array {
  if (!segment || !/^[A-Za-z0-9_-]+$/u.test(segment) || segment.length % 4 === 1) {
    throw new Error('Invalid Base64URL segment.');
  }

  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function decodeBase64UrlUtf8(segment: string): string {
  return new TextDecoder('utf-8', { fatal: true }).decode(decodeBase64UrlBytes(segment));
}

function encodeJsonSegment(value: Record<string, unknown>): string {
  return bytesToBase64Url(new TextEncoder().encode(JSON.stringify(value)));
}

async function importHmacKey(
  secret: string,
  algorithm: HmacJwtAlgorithm,
  usage: 'sign' | 'verify',
): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: HASH_BY_ALGORITHM[algorithm] },
    false,
    [usage],
  );
}

export function decodeJwt(token: string): DecodedJwt | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header: unknown = JSON.parse(decodeBase64UrlUtf8(parts[0]));
    const payload: unknown = JSON.parse(decodeBase64UrlUtf8(parts[1]));
    if (!isRecord(header) || !isRecord(payload)) return null;

    return { header, payload, signature: parts[2] };
  } catch {
    return null;
  }
}

export function validateJwtClaims(
  payload: Record<string, unknown>,
  options: JwtClaimValidationOptions = {},
): JwtClaimIssue[] {
  const now = options.now ?? Math.floor(Date.now() / 1000);
  const skew = options.clockSkewSeconds ?? 0;
  if (!Number.isFinite(now) || !Number.isFinite(skew) || skew < 0) {
    throw new Error('JWT time options must be finite and clock skew cannot be negative.');
  }

  const issues: JwtClaimIssue[] = [];
  const numericClaims = [
    ['exp', 'invalid-exp'],
    ['nbf', 'invalid-nbf'],
    ['iat', 'invalid-iat'],
  ] as const;

  for (const [claim, invalidCode] of numericClaims) {
    const value = payload[claim];
    if (value !== undefined && (typeof value !== 'number' || !Number.isFinite(value))) {
      issues.push({ code: invalidCode, claim, value });
    }
  }

  const expiration = payload.exp;
  if (typeof expiration === 'number' && Number.isFinite(expiration) && now - skew >= expiration) {
    issues.push({ code: 'expired', claim: 'exp', value: expiration });
  }

  const notBefore = payload.nbf;
  if (typeof notBefore === 'number' && Number.isFinite(notBefore) && now + skew < notBefore) {
    issues.push({ code: 'not-active', claim: 'nbf', value: notBefore });
  }

  const issuedAt = payload.iat;
  if (typeof issuedAt === 'number' && Number.isFinite(issuedAt) && now + skew < issuedAt) {
    issues.push({ code: 'issued-in-future', claim: 'iat', value: issuedAt });
  }

  if (options.issuer !== undefined && payload.iss !== options.issuer) {
    issues.push({ code: 'issuer-mismatch', claim: 'iss', value: payload.iss });
  }

  if (options.audience !== undefined) {
    const audience = payload.aud;
    const matches =
      audience === options.audience ||
      (Array.isArray(audience) && audience.some((value) => value === options.audience));
    if (!matches) {
      issues.push({ code: 'audience-mismatch', claim: 'aud', value: audience });
    }
  }

  return issues;
}

export async function signJwtHmac(
  header: Record<string, unknown>,
  payload: Record<string, unknown>,
  secret: string,
  algorithm: HmacJwtAlgorithm,
): Promise<string> {
  if (!secret) throw new Error('A non-empty HMAC secret is required.');
  if (!isHmacAlgorithm(algorithm)) throw new Error('Unsupported HMAC JWT algorithm.');

  const protectedHeader = { ...header, alg: algorithm };
  const signingInput = `${encodeJsonSegment(protectedHeader)}.${encodeJsonSegment(payload)}`;
  const key = await importHmacKey(secret, algorithm, 'sign');
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));
  return `${signingInput}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

export async function verifyJwtHmac(
  token: string,
  secret: string,
  options: JwtClaimValidationOptions = {},
): Promise<JwtVerificationResult> {
  const decoded = decodeJwt(token);
  if (!decoded) {
    return {
      valid: false,
      signatureValid: false,
      decoded: null,
      claimIssues: [],
      error: 'invalid-token',
    };
  }
  if (!secret) {
    return {
      valid: false,
      signatureValid: false,
      decoded,
      claimIssues: [],
      error: 'missing-secret',
    };
  }

  const headerAlgorithm = decoded.header.alg;
  if (typeof headerAlgorithm !== 'string' || !headerAlgorithm) {
    return {
      valid: false,
      signatureValid: false,
      decoded,
      claimIssues: [],
      error: 'missing-algorithm',
    };
  }
  if (!isHmacAlgorithm(headerAlgorithm)) {
    return {
      valid: false,
      signatureValid: false,
      decoded,
      claimIssues: [],
      error: 'unsupported-algorithm',
    };
  }

  try {
    const parts = token.split('.');
    const signatureBytes = decodeBase64UrlBytes(parts[2]);
    const key = await importHmacKey(secret, headerAlgorithm, 'verify');
    const signatureValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
    );
    const claimIssues = validateJwtClaims(decoded.payload, options);

    return {
      valid: signatureValid && claimIssues.length === 0,
      signatureValid,
      algorithm: headerAlgorithm,
      decoded,
      claimIssues,
      error: signatureValid ? undefined : 'invalid-signature',
    };
  } catch {
    return {
      valid: false,
      signatureValid: false,
      algorithm: headerAlgorithm,
      decoded,
      claimIssues: [],
      error: 'invalid-signature',
    };
  }
}
