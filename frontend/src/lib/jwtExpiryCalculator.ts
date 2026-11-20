export interface JwtLifetimeResult {
  valid: boolean;
  hasExpiration: boolean;
  isExpired: boolean;
  secondsRemaining: number | null;
  issuedAt?: Date;
  notBefore?: Date;
  expiresAt?: Date;
  payload?: Record<string, unknown>;
  error?: string;
}

export function decodeBase64UrlToUtf8(segment: string): string {
  const clean = segment.trim();
  if (!clean) {
    throw new Error('Empty Base64URL segment.');
  }
  const base64 = clean.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = (4 - (base64.length % 4)) % 4;
  const padded = base64 + '='.repeat(padLength);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function calculateJwtLifetime(
  token: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): JwtLifetimeResult {
  const trimmed = (token || '').trim();
  if (!trimmed) {
    return {
      valid: false,
      hasExpiration: false,
      isExpired: false,
      secondsRemaining: null,
      error: 'Paste a JWT token string (header.payload.signature).',
    };
  }

  const parts = trimmed.split('.');
  if (parts.length < 2 || parts.length > 3 || !parts[1]) {
    return {
      valid: false,
      hasExpiration: false,
      isExpired: false,
      secondsRemaining: null,
      error: 'Invalid JWT structure. Expected 2 or 3 dot-separated Base64URL segments.',
    };
  }

  try {
    const decodedJson = decodeBase64UrlToUtf8(parts[1]);
    const parsed: unknown = JSON.parse(decodedJson);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {
        valid: false,
        hasExpiration: false,
        isExpired: false,
        secondsRemaining: null,
        error: 'JWT payload must be a JSON object.',
      };
    }

    const payload = parsed as Record<string, unknown>;
    const issuedAt =
      typeof payload.iat === 'number' && Number.isFinite(payload.iat)
        ? new Date(payload.iat * 1000)
        : undefined;
    const notBefore =
      typeof payload.nbf === 'number' && Number.isFinite(payload.nbf)
        ? new Date(payload.nbf * 1000)
        : undefined;

    const hasExpiration = typeof payload.exp === 'number' && Number.isFinite(payload.exp);

    if (!hasExpiration) {
      return {
        valid: true,
        hasExpiration: false,
        isExpired: false,
        secondsRemaining: null,
        issuedAt,
        notBefore,
        expiresAt: undefined,
        payload,
      };
    }

    const exp = payload.exp as number;
    const expiresAt = new Date(exp * 1000);
    const isExpired = nowSeconds >= exp;
    const secondsRemaining = Math.max(0, Math.floor(exp - nowSeconds));

    return {
      valid: true,
      hasExpiration: true,
      isExpired,
      secondsRemaining,
      issuedAt,
      notBefore,
      expiresAt,
      payload,
    };
  } catch (err) {
    return {
      valid: false,
      hasExpiration: false,
      isExpired: false,
      secondsRemaining: null,
      error: err instanceof Error ? `Invalid JWT payload: ${err.message}` : 'Invalid JWT payload.',
    };
  }
}
