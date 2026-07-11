import { describe, expect, it } from 'vitest';
import { buildContactEmailBody, CONTACT_FIELD_LIMITS, validateContactPayload } from './contactForm';

const validPayload = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Tool feedback',
  message: 'Hello\nGreat work.',
};

describe('contact form validation', () => {
  it('trims and accepts a normal contact message', () => {
    expect(validateContactPayload({ ...validPayload, name: '  Ada Lovelace  ' })).toEqual({
      ok: true,
      value: validPayload,
    });
  });

  it('rejects malformed addresses and address-group syntax', () => {
    expect(validateContactPayload({ ...validPayload, email: 'not-an-email' })).toEqual({
      ok: false,
      error: 'Invalid email address',
    });
    expect(
      validateContactPayload({ ...validPayload, email: 'group: victim@example.com;' }),
    ).toEqual({
      ok: false,
      error: 'Invalid email address',
    });
  });

  it('rejects header controls and oversized fields', () => {
    expect(
      validateContactPayload({ ...validPayload, subject: 'Hello\r\nBcc: victim@example.com' }),
    ).toEqual({
      ok: false,
      error: 'Invalid header characters',
    });
    expect(
      validateContactPayload({
        ...validPayload,
        message: 'x'.repeat(CONTACT_FIELD_LIMITS.message + 1),
      }),
    ).toEqual({ ok: false, error: 'message is too long' });
  });

  it('escapes user-controlled HTML while preserving line breaks', () => {
    const html = buildContactEmailBody({
      ...validPayload,
      name: '<img src=x onerror=alert(1)>',
      message: '<script>alert("x")</script>\nNext line',
    });

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;<br />Next line');
  });
});
