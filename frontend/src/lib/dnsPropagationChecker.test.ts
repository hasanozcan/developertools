import { describe, expect, it, vi } from 'vitest';
import {
  buildDohRequestUrl,
  checkDnsPropagation,
  isValidDomain,
  parseDohResponse,
} from './dnsPropagationChecker';

describe('dnsPropagationChecker', () => {
  it('validates domains and builds DoH URLs', () => {
    expect(isValidDomain('devstools.app')).toBe(true);
    expect(isValidDomain('https://devstools.app/path')).toBe(false);
    expect(isValidDomain('localhost')).toBe(false);

    expect(buildDohRequestUrl('https://dns.google/resolve', 'devstools.app', 'MX')).toBe(
      'https://dns.google/resolve?name=devstools.app&type=MX',
    );
  });

  it('parses DoH answers matching requested record type and computes min TTL', () => {
    const parsed = parseDohResponse(
      {
        Status: 0,
        Answer: [
          { type: 5, TTL: 600, data: 'alias.example.com.' },
          { type: 1, TTL: 120, data: '76.76.21.21' },
          { type: 1, TTL: 300, data: '76.76.21.22' },
        ],
      },
      'A',
    );

    expect(parsed.answers).toEqual(['76.76.21.21', '76.76.21.22']);
    expect(parsed.ttl).toBe(120);
    expect(parsed.rcode).toBe(0);
  });

  it('queries Google and Cloudflare DoH and compares propagation across resolvers', async () => {
    const mockFetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('dns.google')) {
        return new Response(
          JSON.stringify({
            Status: 0,
            Answer: [{ type: 1, TTL: 300, data: '76.76.21.21' }],
          }),
          { status: 200 },
        );
      }
      return new Response(
        JSON.stringify({
          Status: 0,
          Answer: [{ type: 1, TTL: 60, data: '76.76.21.21' }],
        }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;

    const results = await checkDnsPropagation('devstools.app', '76.76.21.21', {
      recordType: 'A',
      fetchFn: mockFetch,
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(results).toHaveLength(2);
    expect(results.every((r) => r.status === 'propagated')).toBe(true);
    expect(results[0].ttl).toBe(300);
    expect(results[1].ttl).toBe(60);
  });

  it('flags mismatch when resolvers disagree or fail', async () => {
    const mockFetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('dns.google')) {
        return new Response(
          JSON.stringify({ Status: 0, Answer: [{ type: 1, TTL: 60, data: '1.1.1.1' }] }),
          { status: 200 },
        );
      }
      return new Response(
        JSON.stringify({ Status: 0, Answer: [{ type: 1, TTL: 60, data: '2.2.2.2' }] }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;

    const results = await checkDnsPropagation('example.com', '', {
      recordType: 'A',
      fetchFn: mockFetch,
    });

    expect(results[0].status).toBe('mismatch');
    expect(results[1].status).toBe('mismatch');
  });

  it('rejects invalid domain input', async () => {
    await expect(checkDnsPropagation('not a domain!')).rejects.toThrow(/valid domain/i);
  });
});
