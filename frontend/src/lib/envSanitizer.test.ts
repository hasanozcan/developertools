import { describe, it, expect } from 'vitest';
import { sanitizeEnvFile } from './envSanitizer';

describe('envSanitizer', () => {
  it('strips private secret values from .env files for .env.example template', () => {
    const env = '# Database\nDATABASE_URL=postgres://root:secret@localhost:5432/app\nAPI_KEY=sk_live_123456';
    const template = sanitizeEnvFile(env);
    expect(template).toContain('# Database');
    expect(template).toContain('DATABASE_URL=');
    expect(template).toContain('API_KEY=');
    expect(template).not.toContain('secret');
  });
});
