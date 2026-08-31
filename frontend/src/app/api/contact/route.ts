import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import {
  buildContactEmailBody,
  MAX_CONTACT_BODY_BYTES,
  validateContactPayload,
} from '@/lib/contactForm';
import {
  ContactRequestError,
  consumeContactRateLimits,
  FixedWindowRateLimiter,
  getContactClientKey,
  isTrustedContactRequest,
  readLimitedJsonBody,
} from '@/lib/contactRequestSecurity';

const clientRateLimiter = new FixedWindowRateLimiter(5, 10 * 60 * 1000);
const globalRateLimiter = new FixedWindowRateLimiter(100, 60 * 1000);
const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' };

const parseBooleanEnv = (value?: string) => {
  if (typeof value !== 'string') return undefined;
  return ['true', '1', 'yes', 'y', 'on'].includes(value.toLowerCase());
};

export async function POST(request: Request) {
  try {
    if (!isTrustedContactRequest(request)) {
      return NextResponse.json(
        { error: 'Cross-site requests are not allowed' },
        { status: 403, headers: NO_STORE_HEADERS },
      );
    }

    const rateLimitDecision = consumeContactRateLimits(
      clientRateLimiter,
      globalRateLimiter,
      getContactClientKey(request),
    );
    if (!rateLimitDecision.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            ...NO_STORE_HEADERS,
            'Retry-After': String(rateLimitDecision.retryAfterSeconds),
          },
        },
      );
    }

    const validation = validateContactPayload(
      await readLimitedJsonBody(request, MAX_CONTACT_BODY_BYTES),
    );

    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers: NO_STORE_HEADERS },
      );
    }

    const { name, email, subject, message } = validation.value;

    const targetEmail = (process.env.CONTACT_TO_EMAIL || 'devstoolsapp@gmail.com')
      .split(',')
      .map((emailAddress) => emailAddress.trim())
      .filter(Boolean);

    const smtpHost = process.env.SMTP_HOST;
    const smtpPortRaw = process.env.SMTP_PORT;
    const smtpSecureRaw = process.env.SMTP_SECURE;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom =
      process.env.SMTP_FROM ||
      (smtpUser ? `DevsTools <${smtpUser}>` : 'DevsTools <devstoolsapp@gmail.com>');

    const smtpPort = smtpPortRaw ? Number(smtpPortRaw) : 465;
    const smtpSecure = parseBooleanEnv(smtpSecureRaw);

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPass ||
      !Number.isInteger(smtpPort) ||
      smtpPort < 1 ||
      smtpPort > 65_535 ||
      targetEmail.length === 0
    ) {
      console.error('SMTP configuration is incomplete.');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500, headers: NO_STORE_HEADERS },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: typeof smtpSecure === 'boolean' ? smtpSecure : smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    try {
      await transporter.sendMail({
        from: smtpFrom,
        to: targetEmail,
        replyTo: { name, address: email },
        subject: `[Contact] ${subject}`,
        html: buildContactEmailBody({ name, email, subject, message }),
      });
    } catch (sendError) {
      console.error('SMTP send failed:', sendError);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 502, headers: NO_STORE_HEADERS },
      );
    }

    return NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    if (error instanceof ContactRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status, headers: NO_STORE_HEADERS },
      );
    }
    console.error('Contact form submission failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}
