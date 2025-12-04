import { NextResponse } from 'next/server';

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const buildEmailBody = ({ name, email, subject, message }: Required<ContactPayload>) => `
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <p><strong>Message:</strong></p>
  <p>${message.replace(/\n/g, '<br />')}</p>
`;

export async function POST(request: Request) {
  try {
    const payload: ContactPayload = await request.json();
    const { name, email, subject, message } = payload;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const targetEmail = (process.env.CONTACT_TO_EMAIL || 'support@devstools.app')
      .split(',')
      .map((emailAddress) => emailAddress.trim())
      .filter(Boolean);

    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'DevsTools <support@devstools.app>',
          to: targetEmail,
          reply_to: email,
          subject: `[Contact] ${subject}`,
          html: buildEmailBody({ name, email, subject, message }),
        }),
      });

      if (!emailResponse.ok) {
        const errorBody = await emailResponse.text();
        console.error('Resend error:', errorBody);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
      }
    } else {
      console.warn('RESEND_API_KEY is not configured. Message was not sent via email.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
