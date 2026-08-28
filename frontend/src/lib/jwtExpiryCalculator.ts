export function calculateJwtLifetime(token: string): { isExpired: boolean; secondsRemaining: number; issuedAt?: Date; expiresAt?: Date } {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return { isExpired: true, secondsRemaining: 0 };
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    const exp = payload.exp || now;
    const iat = payload.iat ? new Date(payload.iat * 1000) : undefined;
    const expiresAt = new Date(exp * 1000);
    const secondsRemaining = Math.max(0, exp - now);
    return { isExpired: now >= exp, secondsRemaining, issuedAt: iat, expiresAt };
  } catch {
    return { isExpired: true, secondsRemaining: 0 };
  }
}
