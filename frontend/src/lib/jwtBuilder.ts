import {
  HMAC_JWT_ALGORITHMS,
  signJwtHmac,
  type HmacJwtAlgorithm,
} from './jwt';

export { HMAC_JWT_ALGORITHMS, type HmacJwtAlgorithm };

function resolveHmacAlgorithm(
  header: Record<string, unknown>,
  explicitAlgorithm?: HmacJwtAlgorithm,
): HmacJwtAlgorithm {
  const candidate = explicitAlgorithm ?? header.alg ?? 'HS256';
  if (
    typeof candidate !== 'string' ||
    !(HMAC_JWT_ALGORITHMS as readonly string[]).includes(candidate)
  ) {
    throw new Error(
      `Unsupported JWT signing algorithm "${String(candidate)}". Expected one of: ${HMAC_JWT_ALGORITHMS.join(', ')}.`,
    );
  }
  return candidate as HmacJwtAlgorithm;
}

/**
 * Signs and builds a real HMAC-SHA JWT (HS256, HS384, or HS512) using Web Crypto.
 */
export async function buildSignedJwt(
  header: Record<string, unknown>,
  payload: Record<string, unknown>,
  secret: string,
  algorithm?: HmacJwtAlgorithm,
): Promise<string> {
  if (!header || typeof header !== 'object' || Array.isArray(header)) {
    throw new Error('JWT header must be a JSON object.');
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('JWT payload must be a JSON object.');
  }
  const resolvedAlg = resolveHmacAlgorithm(header, algorithm);
  return signJwtHmac(header, payload, secret, resolvedAlg);
}
