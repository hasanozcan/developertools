import { describe, expect, it } from 'vitest';
import { evaluateCorsOptions, inspectCorsPreflight } from './corsPreflightInspector';

describe('corsPreflightInspector', () => {
  it('evaluates CORS origin allowance', () => {
    expect(evaluateCorsOptions('https://app.com', ['*'])).toBe(true);
    expect(evaluateCorsOptions('https://app.com', ['https://other.com'])).toBe(false);
  });

  it('rejects wildcard Access-Control-Allow-Origin when credentials are enabled', () => {
    const report = inspectCorsPreflight({
      requestOrigin: 'https://app.example.com',
      requestMethod: 'POST',
      requestHeaders: ['Content-Type'],
      allowOrigin: '*',
      allowCredentials: true,
      allowMethods: ['GET', 'POST'],
      allowHeaders: ['Content-Type'],
    });

    expect(report.allowed).toBe(false);
    expect(report.checks.find((c) => c.id === 'credentials')?.passed).toBe(false);
  });

  it('enforces method, Authorization explicit listing, and comma-list rejection', () => {
    const authBlocked = inspectCorsPreflight({
      requestOrigin: 'https://app.example.com',
      requestMethod: 'DELETE',
      requestHeaders: ['Authorization', 'X-Custom'],
      allowOrigin: 'https://app.example.com',
      allowCredentials: false,
      allowMethods: ['GET', 'DELETE'],
      allowHeaders: ['*'],
    });
    expect(authBlocked.allowed).toBe(false);
    expect(authBlocked.checks.find((c) => c.id === 'headers')?.detail).toContain('Authorization');

    const ok = inspectCorsPreflight({
      requestOrigin: 'https://app.example.com',
      requestMethod: 'PATCH',
      requestHeaders: ['Authorization', 'Content-Type'],
      allowOrigin: 'https://app.example.com',
      allowCredentials: true,
      allowMethods: ['GET', 'PATCH'],
      allowHeaders: ['Authorization', 'Content-Type'],
      maxAge: 600,
    });
    expect(ok.allowed).toBe(true);
    expect(ok.responseHeaders.Vary).toBe('Origin');
    expect(ok.responseHeaders['Access-Control-Max-Age']).toBe('600');
  });
});
