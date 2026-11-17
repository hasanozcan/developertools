import {
  decodeJwt,
  HMAC_JWT_ALGORITHMS,
  validateJwtClaims,
  verifyJwtHmac,
  type HmacJwtAlgorithm,
  type JwtClaimIssue,
  type JwtClaimValidationOptions,
} from './jwt';

export type SupportedJwtAlgorithm =
  | HmacJwtAlgorithm
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'ES256'
  | 'ES384'
  | 'ES512';

export interface JwtValidationResult {
  isValidStructure: boolean;
  signatureValid: boolean;
  isValid: boolean;
  algorithm?: string;
  header?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  signature?: string;
  isExpired?: boolean;
  claimIssues: JwtClaimIssue[];
  error?: string;
}

const RSA_HASH_BY_ALG: Record<'RS256' | 'RS384' | 'RS512', 'SHA-256' | 'SHA-384' | 'SHA-512'> = {
  RS256: 'SHA-256',
  RS384: 'SHA-384',
  RS512: 'SHA-512',
};

const PSS_PARAMS_BY_ALG: Record<
  'PS256' | 'PS384' | 'PS512',
  { hash: 'SHA-256' | 'SHA-384' | 'SHA-512'; saltLength: number }
> = {
  PS256: { hash: 'SHA-256', saltLength: 32 },
  PS384: { hash: 'SHA-384', saltLength: 48 },
  PS512: { hash: 'SHA-512', saltLength: 64 },
};

const ECDSA_PARAMS_BY_ALG: Record<
  'ES256' | 'ES384' | 'ES512',
  { namedCurve: 'P-256' | 'P-384' | 'P-521'; hash: 'SHA-256' | 'SHA-384' | 'SHA-512'; sigBytes: number }
> = {
  ES256: { namedCurve: 'P-256', hash: 'SHA-256', sigBytes: 64 },
  ES384: { namedCurve: 'P-384', hash: 'SHA-384', sigBytes: 96 },
  ES512: { namedCurve: 'P-521', hash: 'SHA-512', sigBytes: 132 },
};

function decodeBase64UrlBytes(segment: string): Uint8Array {
  if (!segment || !/^[A-Za-z0-9_-]+$/u.test(segment) || segment.length % 4 === 1) {
    throw new Error('Invalid Base64URL signature segment.');
  }
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function decodePemDer(pem: string, headerLabel: string): Uint8Array {
  const escaped = headerLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    `-----BEGIN ${escaped}-----([\\s\\S]*?)-----END ${escaped}-----`,
    'u',
  );
  const match = regex.exec(pem);
  if (!match) {
    throw new Error(`Invalid PEM ${headerLabel} block.`);
  }
  const base64 = match[1].replace(/\s+/gu, '');
  const binary = atob(base64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function importAsymmetricVerifyKey(
  keyInput: string,
  alg: Exclude<SupportedJwtAlgorithm, HmacJwtAlgorithm>,
): Promise<CryptoKey> {
  const trimmed = keyInput.trim();
  const isRsaPkcs = alg in RSA_HASH_BY_ALG;
  const isRsaPss = alg in PSS_PARAMS_BY_ALG;
  const isEcdsa = alg in ECDSA_PARAMS_BY_ALG;

  const importAlg: RsaHashedImportParams | EcKeyImportParams = isRsaPkcs
    ? { name: 'RSASSA-PKCS1-v1_5', hash: RSA_HASH_BY_ALG[alg as 'RS256' | 'RS384' | 'RS512'] }
    : isRsaPss
      ? { name: 'RSA-PSS', hash: PSS_PARAMS_BY_ALG[alg as 'PS256' | 'PS384' | 'PS512'].hash }
      : { name: 'ECDSA', namedCurve: ECDSA_PARAMS_BY_ALG[alg as 'ES256' | 'ES384' | 'ES512'].namedCurve };

  if (trimmed.startsWith('{')) {
    const jwk = JSON.parse(trimmed) as JsonWebKey;
    if (isEcdsa && jwk.kty !== 'EC') {
      throw new Error(`Expected EC JWK for ${alg}.`);
    }
    if ((isRsaPkcs || isRsaPss) && jwk.kty !== 'RSA') {
      throw new Error(`Expected RSA JWK for ${alg}.`);
    }
    return crypto.subtle.importKey('jwk', jwk, importAlg, false, ['verify']);
  }

  if (trimmed.includes('-----BEGIN CERTIFICATE-----')) {
    await import('reflect-metadata');
    const { X509Certificate } = await import('@peculiar/x509');
    const cert = new X509Certificate(trimmed);
    return crypto.subtle.importKey('spki', cert.publicKey.rawData, importAlg, false, ['verify']);
  }

  if (trimmed.includes('-----BEGIN PUBLIC KEY-----')) {
    const spki = decodePemDer(trimmed, 'PUBLIC KEY');
    return crypto.subtle.importKey('spki', spki, importAlg, false, ['verify']);
  }

  throw new Error('Provide a PEM Public Key (SPKI), PEM X.509 Certificate, or JWK JSON.');
}

/**
 * Decodes JWT structure without asserting signature validity.
 */
export function decodeJwtStructure(jwtToken: string): {
  isValidStructure: boolean;
  header?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  signature?: string;
} {
  const decoded = decodeJwt(jwtToken.trim());
  if (!decoded) {
    return { isValidStructure: false };
  }
  return {
    isValidStructure: true,
    header: decoded.header,
    payload: decoded.payload,
    signature: decoded.signature,
  };
}

/**
 * Cryptographically verifies a JWT signature (HS256/384/512, RS256/384/512, PS256/384/512, ES256/384/512)
 * and validates standard time/identity claims. Never marks a token valid without signature verification.
 */
export async function validateJwtSignature(
  jwtToken: string,
  secretOrPublicKey: string,
  options: JwtClaimValidationOptions = {},
): Promise<JwtValidationResult> {
  const trimmedToken = jwtToken.trim();
  const decoded = decodeJwt(trimmedToken);
  if (!decoded) {
    return {
      isValidStructure: false,
      signatureValid: false,
      isValid: false,
      claimIssues: [],
      error: 'Malformed JWT structure (expected 3 Base64URL JSON/signature segments).',
    };
  }

  const claimIssues = validateJwtClaims(decoded.payload, options);
  const isExpired = claimIssues.some((issue) => issue.code === 'expired');
  const alg = decoded.header.alg;

  if (typeof alg !== 'string' || !alg) {
    return {
      isValidStructure: true,
      signatureValid: false,
      isValid: false,
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
      isExpired,
      claimIssues,
      error: 'Missing JWT "alg" header.',
    };
  }

  if (alg.toLowerCase() === 'none') {
    return {
      isValidStructure: true,
      signatureValid: false,
      isValid: false,
      algorithm: alg,
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
      isExpired,
      claimIssues,
      error: 'Unsecured "none" algorithm tokens are rejected.',
    };
  }

  if (!secretOrPublicKey.trim()) {
    return {
      isValidStructure: true,
      signatureValid: false,
      isValid: false,
      algorithm: alg,
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
      isExpired,
      claimIssues,
      error: (HMAC_JWT_ALGORITHMS as readonly string[]).includes(alg)
        ? 'HMAC secret is required to verify the signature.'
        : 'Public key (SPKI PEM, X.509 PEM, or JWK) is required to verify the signature.',
    };
  }

  if ((HMAC_JWT_ALGORITHMS as readonly string[]).includes(alg)) {
    const hmacResult = await verifyJwtHmac(trimmedToken, secretOrPublicKey, options);
    const hmacExpired = hmacResult.claimIssues.some((issue) => issue.code === 'expired');
    return {
      isValidStructure: true,
      signatureValid: hmacResult.signatureValid,
      isValid: hmacResult.valid,
      algorithm: alg,
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
      isExpired: hmacExpired,
      claimIssues: hmacResult.claimIssues,
      error: hmacResult.signatureValid ? undefined : 'Invalid HMAC signature.',
    };
  }

  const isRsaPkcs = alg in RSA_HASH_BY_ALG;
  const isRsaPss = alg in PSS_PARAMS_BY_ALG;
  const isEcdsa = alg in ECDSA_PARAMS_BY_ALG;

  if (!isRsaPkcs && !isRsaPss && !isEcdsa) {
    return {
      isValidStructure: true,
      signatureValid: false,
      isValid: false,
      algorithm: alg,
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
      isExpired,
      claimIssues,
      error: `Unsupported JWT algorithm: ${alg}`,
    };
  }

  try {
    const parts = trimmedToken.split('.');
    const sigBytes = decodeBase64UrlBytes(parts[2]);
    if (isEcdsa) {
      const expectedLen = ECDSA_PARAMS_BY_ALG[alg as 'ES256' | 'ES384' | 'ES512'].sigBytes;
      if (sigBytes.length !== expectedLen) {
        return {
          isValidStructure: true,
          signatureValid: false,
          isValid: false,
          algorithm: alg,
          header: decoded.header,
          payload: decoded.payload,
          signature: decoded.signature,
          isExpired,
          claimIssues,
          error: `Invalid ${alg} signature length (expected ${expectedLen} bytes, got ${sigBytes.length}).`,
        };
      }
    }

    const publicKey = await importAsymmetricVerifyKey(
      secretOrPublicKey,
      alg as Exclude<SupportedJwtAlgorithm, HmacJwtAlgorithm>,
    );
    const signingInput = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);

    const verifyParams: AlgorithmIdentifier | RsaPssParams | EcdsaParams = isRsaPkcs
      ? 'RSASSA-PKCS1-v1_5'
      : isRsaPss
        ? { name: 'RSA-PSS', saltLength: PSS_PARAMS_BY_ALG[alg as 'PS256' | 'PS384' | 'PS512'].saltLength }
        : { name: 'ECDSA', hash: ECDSA_PARAMS_BY_ALG[alg as 'ES256' | 'ES384' | 'ES512'].hash };

    const signatureValid = await crypto.subtle.verify(verifyParams, publicKey, sigBytes, signingInput);

    return {
      isValidStructure: true,
      signatureValid,
      isValid: signatureValid && claimIssues.length === 0,
      algorithm: alg,
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
      isExpired,
      claimIssues,
      error: signatureValid ? undefined : `Invalid ${alg} cryptographic signature.`,
    };
  } catch (err: unknown) {
    return {
      isValidStructure: true,
      signatureValid: false,
      isValid: false,
      algorithm: alg,
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
      isExpired,
      claimIssues,
      error: err instanceof Error ? err.message : 'Signature verification failed.',
    };
  }
}
