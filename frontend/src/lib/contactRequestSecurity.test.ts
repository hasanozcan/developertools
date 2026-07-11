import { describe, expect, it } from 'vitest';
import {
  consumeContactRateLimits,
  FixedWindowRateLimiter,
  getContactClientKey,
  isTrustedContactRequest,
  readLimitedJsonBody,
} from './contactRequestSecurity';

describe('contact request security', () => {
  it('rejects cross-site browser requests', () => {
    const request = new Request('https://devstools.app/api/contact', {
      headers: {
        Origin: 'https://attacker.example',
        'Sec-Fetch-Site': 'cross-site',
      },
    });

    expect(isTrustedContactRequest(request)).toBe(false);
  });

  it('accepts same-origin browser requests', () => {
    const request = new Request('https://devstools.app/api/contact', {
      headers: { Origin: 'https://devstools.app' },
    });

    expect(isTrustedContactRequest(request)).toBe(true);
  });

  it('rejects requests without browser origin metadata', () => {
    expect(isTrustedContactRequest(new Request('https://devstools.app/api/contact'))).toBe(false);
  });

  it('uses only normalized IP addresses as limiter keys', () => {
    const valid = new Request('https://devstools.app/api/contact', {
      headers: { 'X-Vercel-Forwarded-For': '203.0.113.10, 10.0.0.1' },
    });
    const invalid = new Request('https://devstools.app/api/contact', {
      headers: { 'X-Forwarded-For': 'attacker-controlled-key' },
    });

    expect(getContactClientKey(valid)).toBe('203.0.113.10');
    expect(getContactClientKey(invalid)).toBe('unknown');
  });

  it('requires JSON content', async () => {
    const request = new Request('https://devstools.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: '{}',
    });

    await expect(readLimitedJsonBody(request, 100)).rejects.toMatchObject({ status: 415 });
  });

  it('enforces the real streamed body size without Content-Length', async () => {
    const request = new Request('https://devstools.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'x'.repeat(200) }),
    });

    await expect(readLimitedJsonBody(request, 100)).rejects.toMatchObject({ status: 413 });
  });

  it('parses a valid bounded JSON body', async () => {
    const request = new Request('https://devstools.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: '{"message":"hello"}',
    });

    await expect(readLimitedJsonBody(request, 100)).resolves.toEqual({ message: 'hello' });
  });

  it('limits repeated requests and resets after the window', () => {
    const limiter = new FixedWindowRateLimiter(2, 1_000);

    expect(limiter.consume('client', 0).allowed).toBe(true);
    expect(limiter.consume('client', 1).allowed).toBe(true);
    expect(limiter.consume('client', 2).allowed).toBe(false);
    expect(limiter.consume('client', 1_001).allowed).toBe(true);
  });

  it('bounds the number of tracked client buckets', () => {
    const limiter = new FixedWindowRateLimiter(1, 1_000, 2);

    expect(limiter.consume('client-a', 0).allowed).toBe(true);
    expect(limiter.consume('client-b', 0).allowed).toBe(true);
    expect(limiter.consume('client-c', 0).allowed).toBe(false);
    expect(limiter.consume('client-c', 1_001).allowed).toBe(true);
  });

  it('does not consume the global quota after a client is already limited', () => {
    const clients = new FixedWindowRateLimiter(1, 1_000);
    const global = new FixedWindowRateLimiter(2, 1_000);

    expect(consumeContactRateLimits(clients, global, 'client-a', 0).allowed).toBe(true);
    expect(consumeContactRateLimits(clients, global, 'client-a', 1).allowed).toBe(false);
    expect(consumeContactRateLimits(clients, global, 'client-b', 2).allowed).toBe(true);
    expect(consumeContactRateLimits(clients, global, 'client-c', 3).allowed).toBe(false);
  });
});
