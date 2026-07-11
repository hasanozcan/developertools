import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import {
  buildContactEmailBody,
  MAX_CONTACT_BODY_BYTES,
  validateContactPayload,
} from '@/lib/contactForm';

const parseBooleanEnv = (value?: string) => {
  if (typeof value !== 'string') return undefined;
  return ['true', '1', 'yes', 'y', 'on'].includes(value.toLowerCase());
};

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_CONTACT_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body is too large' }, { status: 413 });
    }

    const validation = validateContactPayload(await request.json());

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { name, email, subject, message } = validation.value;

    const targetEmail = (process.env.CONTACT_TO_EMAIL || 'support@devstools.app')
      .split(',')
      .map((emailAddress) => emailAddress.trim())
      .filter(Boolean);

    const smtpHost = process.env.SMTP_HOST;
    const smtpPortRaw = process.env.SMTP_PORT;
    const smtpSecureRaw = process.env.SMTP_SECURE;
    const smtpRejectUnauthorizedRaw = process.env.SMTP_TLS_REJECT_UNAUTHORIZED;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom =
      process.env.SMTP_FROM ||
      (smtpUser ? `DevsTools <${smtpUser}>` : 'DevsTools <support@devstools.app>');

    const smtpPort = smtpPortRaw ? Number(smtpPortRaw) : 465;
    const smtpSecure = parseBooleanEnv(smtpSecureRaw);
    const smtpRejectUnauthorized = parseBooleanEnv(smtpRejectUnauthorizedRaw);

    if (!smtpHost || !smtpUser || !smtpPass || Number.isNaN(smtpPort)) {
      console.error('SMTP configuration is incomplete.');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: typeof smtpSecure === 'boolean' ? smtpSecure : smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls:
        typeof smtpRejectUnauthorized === 'boolean'
          ? { rejectUnauthorized: smtpRejectUnauthorized }
          : undefined,
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
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
