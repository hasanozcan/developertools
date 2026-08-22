import { describe, it, expect } from 'vitest';
import { generateReactHookFormCode } from './reactHookFormGenerator';

describe('generateReactHookFormCode', () => {
  it('generates react hook form component', () => {
    const code = generateReactHookFormCode([{ name: 'email', type: 'email' }, { name: 'password', type: 'password' }]);
    expect(code).toContain("useForm");
    expect(code).toContain("register('email'");
  });
});