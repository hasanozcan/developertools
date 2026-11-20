import { describe, expect, it } from 'vitest';
import { generateReactHookFormCode } from './reactHookFormGenerator';

describe('generateReactHookFormCode', () => {
  it('generates react hook form component for standard fields', () => {
    const code = generateReactHookFormCode([
      { name: 'email', type: 'email' },
      { name: 'password', type: 'password' },
    ]);
    expect(code).toContain('useForm');
    expect(code).toContain("register('email'");
    expect(code).toContain('type="password"');
  });

  it('supports optional fields, textarea, checkbox, and sanitizes unsafe names', () => {
    const code = generateReactHookFormCode([
      { name: 'bio text', type: 'textarea', required: false, label: 'Bio' },
      { name: 'acceptTerms', type: 'checkbox', required: true, label: 'Accept Terms' },
    ]);
    expect(code).toContain("register('bio_text')");
    expect(code).toContain('<textarea');
    expect(code).toContain('type="checkbox"');
  });
});
