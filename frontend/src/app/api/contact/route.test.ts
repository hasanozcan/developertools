// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sendMailMock = vi.fn();
const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));

vi.mock('nodemailer', () => ({
  default: {
    createTransport: createTransportMock,
  },
}));

const VALID_BODY = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Tool feedback',
  message: 'Hello\nGreat work.',
};

function makeContactRequest({
  origin = 'https://devstools.app',
  secFetchSite = 'same-origin',
  contentType = 'application/json',
  body = JSON.stringify(VALID_BODY),
  headers = {},
}: {
  origin?: string | null;
  secFetchSite?: string | null;
  contentType?: string;
  body?: string;
  headers?: Record<string, string>;
} = {}): Request {
  const reqHeaders = new Headers(headers);
  if (origin !== null) reqHeaders.set('Origin', origin);
  if (secFetchSite !== null) reqHeaders.set('Sec-Fetch-Site', secFetchSite);
  if (contentType) reqHeaders.set('Content-Type', contentType);

  return new Request('https://devstools.app/api/contact', {
    method: 'POST',
    headers: reqHeaders,
    body,
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.stubEnv('SMTP_HOST', 'smtp.example.com');
    vi.stubEnv('SMTP_PORT', '465');
    vi.stubEnv('SMTP_USER', 'mailer@example.com');
    vi.stubEnv('SMTP_PASS', 'secret-pass');
    vi.stubEnv('SMTP_FROM', 'DevsTools <mailer@example.com>');
    vi.stubEnv('CONTACT_TO_EMAIL', 'team@example.com');
    sendMailMock.mockResolvedValue({ messageId: 'msg-1' });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns 403 for untrusted cross-site origins with Cache-Control: no-store', async () => {
    const { POST } = await import('./route');

    const res = await POST(
      makeContactRequest({
        origin: 'https://attacker.example',
        secFetchSite: 'cross-site',
      }),
    );

    expect(res.status).toBe(403);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    await expect(res.json()).resolves.toEqual({
      error: 'Cross-site requests are not allowed',
    });
    expect(createTransportMock).not.toHaveBeenCalled();
  });

  it('returns 429 with Retry-After and Cache-Control: no-store when rate limited, without cross-user unknown-IP lockout', async () => {
    const { POST } = await import('./route');

    for (let i = 0; i < 5; i++) {
      const okRes = await POST(
        makeContactRequest({
          headers: { 'X-Real-IP': '198.51.100.10' },
        }),
      );
      expect(okRes.status).toBe(200);
    }

    const blockedRes = await POST(
      makeContactRequest({
        headers: { 'X-Real-IP': '198.51.100.10' },
      }),
    );
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.headers.get('Cache-Control')).toBe('no-store');
    expect(Number(blockedRes.headers.get('Retry-After'))).toBeGreaterThanOrEqual(1);
    await expect(blockedRes.json()).resolves.toEqual({ error: 'Too many requests' });

    // Unknown-IP users are scoped per User-Agent so one client does not lock out others
    for (let i = 0; i < 5; i++) {
      const ua1Res = await POST(
        makeContactRequest({
          headers: { 'User-Agent': 'Client-A/1.0' },
        }),
      );
      expect(ua1Res.status).toBe(200);
    }
    const ua1Blocked = await POST(
      makeContactRequest({
        headers: { 'User-Agent': 'Client-A/1.0' },
      }),
    );
    expect(ua1Blocked.status).toBe(429);

    const ua2Allowed = await POST(
      makeContactRequest({
        headers: { 'User-Agent': 'Client-B/2.0' },
      }),
    );
    expect(ua2Allowed.status).toBe(200);
  });

  it('returns 400 on payload validation failure', async () => {
    const { POST } = await import('./route');

    const res = await POST(
      makeContactRequest({
        headers: { 'X-Real-IP': '198.51.100.11' },
        body: JSON.stringify({ ...VALID_BODY, email: 'invalid-email' }),
      }),
    );

    expect(res.status).toBe(400);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    await expect(res.json()).resolves.toEqual({ error: 'Invalid email address' });
    expect(createTransportMock).not.toHaveBeenCalled();
  });

  it('returns 500 when SMTP configuration is missing or CONTACT_TO_EMAIL is invalid', async () => {
    vi.stubEnv('SMTP_PASS', '');
    const { POST } = await import('./route');

    const missingSmtpRes = await POST(
      makeContactRequest({
        headers: { 'X-Real-IP': '198.51.100.12' },
      }),
    );
    expect(missingSmtpRes.status).toBe(500);
    expect(missingSmtpRes.headers.get('Cache-Control')).toBe('no-store');
    await expect(missingSmtpRes.json()).resolves.toEqual({
      error: 'Email service is not configured',
    });

    vi.stubEnv('SMTP_PASS', 'secret-pass');
    vi.stubEnv('CONTACT_TO_EMAIL', 'team@example.com, not-an-email');

    const badRecipientRes = await POST(
      makeContactRequest({
        headers: { 'X-Real-IP': '198.51.100.13' },
      }),
    );
    expect(badRecipientRes.status).toBe(500);
    expect(badRecipientRes.headers.get('Cache-Control')).toBe('no-store');
    await expect(badRecipientRes.json()).resolves.toEqual({
      error: 'Email service is not configured',
    });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('returns 200 and sends sanitized email when SMTP succeeds', async () => {
    vi.stubEnv('CONTACT_TO_EMAIL', 'team@example.com, support@example.com');
    const { POST } = await import('./route');

    const res = await POST(
      makeContactRequest({
        headers: { 'X-Real-IP': '198.51.100.14' },
      }),
    );

    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(createTransportMock).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'smtp.example.com',
        port: 465,
        secure: true,
        auth: { user: 'mailer@example.com', pass: 'secret-pass' },
      }),
    );
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'DevsTools <mailer@example.com>',
        to: ['team@example.com', 'support@example.com'],
        replyTo: { name: 'Ada Lovelace', address: 'ada@example.com' },
        subject: '[Contact] Tool feedback',
      }),
    );
  });

  it('returns 502 when SMTP sendMail fails', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('SMTP connection refused'));
    const { POST } = await import('./route');

    const res = await POST(
      makeContactRequest({
        headers: { 'X-Real-IP': '198.51.100.15' },
      }),
    );

    expect(res.status).toBe(502);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    await expect(res.json()).resolves.toEqual({ error: 'Failed to send message' });
  });
});
