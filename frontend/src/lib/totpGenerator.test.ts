import { describe, it, expect } from 'vitest';
import { generateBase32Secret, generateTotpCode, generateOtpAuthUri, base32ToBytes } from './totpGenerator';

describe('totpGenerator', () => {
  it('should generate valid base32 secret', () => {
    const secret = generateBase32Secret(16);
    expect(secret.length).toBe(16);
    expect(secret).toMatch(/^[A-Z2-7]+$/);
  });

  it('should convert base32 to bytes properly', () => {
    const bytes = base32ToBytes('JBSWY3DPEHPK3PXP');
    expect(bytes.length).toBe(10);
  });

  it('should generate 6-digit TOTP code and remaining seconds', async () => {
    const { code, remainingSeconds } = await generateTotpCode('JBSWY3DPEHPK3PXP');
    expect(code.length).toBe(6);
    expect(code).toMatch(/^\d{6}$/);
    expect(remainingSeconds).toBeGreaterThanOrEqual(1);
    expect(remainingSeconds).toBeLessThanOrEqual(30);
  });

  it('should generate valid otpauth URI', () => {
    const uri = generateOtpAuthUri('MyApp', 'test@example.com', 'JBSWY3DPEHPK3PXP');
    expect(uri.startsWith('otpauth://totp/MyApp:test%40example.com?secret=JBSWY3DPEHPK3PXP')).toBe(true);
    expect(uri).toContain('period=30');
  });
});
