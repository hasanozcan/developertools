import { isIP } from 'node:net';

export class ContactRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ContactRequestError';
  }
}

export interface RateLimitDecision {
  allowed: boolean;
  retryAfterSeconds: number;
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export class FixedWindowRateLimiter {
  private readonly buckets = new Map<string, RateLimitBucket>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly maxBuckets = 10_000,
  ) {}

  consume(key: string, now = Date.now()): RateLimitDecision {
    let existing = this.buckets.get(key);

    if (!existing && this.buckets.size >= this.maxBuckets) {
      for (const [bucketKey, value] of this.buckets) {
        if (value.resetAt <= now) this.buckets.delete(bucketKey);
      }
      existing = this.buckets.get(key);

      if (!existing && this.buckets.size >= this.maxBuckets) {
        return {
          allowed: false,
          retryAfterSeconds: Math.max(1, Math.ceil(this.windowMs / 1000)),
        };
      }
    }

    const bucket =
      !existing || existing.resetAt <= now ? { count: 0, resetAt: now + this.windowMs } : existing;

    bucket.count += 1;
    this.buckets.set(key, bucket);

    return {
      allowed: bucket.count <= this.limit,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
}

export function consumeContactRateLimits(
  clientLimiter: FixedWindowRateLimiter,
  globalLimiter: FixedWindowRateLimiter,
  clientKey: string,
  now = Date.now(),
): RateLimitDecision {
  const clientDecision = clientLimiter.consume(clientKey, now);
  if (!clientDecision.allowed) return clientDecision;

  return globalLimiter.consume('global', now);
}

export function isTrustedContactRequest(request: Request): boolean {
  const fetchSite = request.headers.get('sec-fetch-site')?.toLowerCase();
  if (fetchSite && fetchSite !== 'same-origin') {
    return false;
  }

  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function getContactClientKey(request: Request): string {
  const forwardedFor =
    request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip');

  const candidate = forwardedFor?.split(',')[0]?.trim();
  return candidate && isIP(candidate) ? candidate : 'unknown';
}

export async function readLimitedJsonBody(request: Request, maxBytes: number): Promise<unknown> {
  const mediaType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase();
  if (mediaType !== 'application/json') {
    throw new ContactRequestError('Content-Type must be application/json', 415);
  }

  const contentLengthHeader = request.headers.get('content-length');
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isSafeInteger(contentLength) || contentLength < 0) {
      throw new ContactRequestError('Invalid Content-Length header', 400);
    }
    if (contentLength > maxBytes) {
      throw new ContactRequestError('Request body is too large', 413);
    }
  }

  if (!request.body) {
    throw new ContactRequestError('Invalid request body', 400);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new ContactRequestError('Request body is too large', 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return JSON.parse(text) as unknown;
  } catch {
    throw new ContactRequestError('Invalid JSON body', 400);
  }
}
