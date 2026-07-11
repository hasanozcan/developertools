export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  subject: 160,
  message: 10_000,
} as const;

export const MAX_CONTACT_BODY_BYTES = 16_384;

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactValidationResult =
  | { ok: true; value: ContactMessage }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@<>(),:;\\[\]"]+@[^\s@<>(),:;\\[\]"]+\.[^\s@<>(),:;\\[\]"]+$/;
const HEADER_CONTROL_PATTERN = /[\u0000-\u001f\u007f]/;
const MESSAGE_CONTROL_PATTERN = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

export function validateContactPayload(payload: unknown): ContactValidationResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'Invalid request body' };
  }

  const record = payload as Record<string, unknown>;
  const fields = ['name', 'email', 'subject', 'message'] as const;

  for (const field of fields) {
    if (typeof record[field] !== 'string') {
      return { ok: false, error: 'Missing required fields' };
    }
  }

  const value: ContactMessage = {
    name: (record.name as string).trim(),
    email: (record.email as string).trim(),
    subject: (record.subject as string).trim(),
    message: (record.message as string).trim(),
  };

  if (fields.some((field) => !value[field])) {
    return { ok: false, error: 'Missing required fields' };
  }

  for (const field of fields) {
    if (value[field].length > CONTACT_FIELD_LIMITS[field]) {
      return { ok: false, error: `${field} is too long` };
    }
  }

  if (!EMAIL_PATTERN.test(value.email) || HEADER_CONTROL_PATTERN.test(value.email)) {
    return { ok: false, error: 'Invalid email address' };
  }

  if (HEADER_CONTROL_PATTERN.test(value.name) || HEADER_CONTROL_PATTERN.test(value.subject)) {
    return { ok: false, error: 'Invalid header characters' };
  }

  if (MESSAGE_CONTROL_PATTERN.test(value.message)) {
    return { ok: false, error: 'Invalid message characters' };
  }

  return { ok: true, value };
}

export function buildContactEmailBody({ name, email, subject, message }: ContactMessage): string {
  const safeMessage = escapeHtml(message).replace(/\r\n?|\n/g, '<br />');

  return `
  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
  <p><strong>Message:</strong></p>
  <p>${safeMessage}</p>
`;
}
