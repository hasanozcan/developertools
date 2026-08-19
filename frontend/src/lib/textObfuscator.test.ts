import { describe, it, expect } from 'vitest';
import { detectAndRemoveInvisibleChars } from './textObfuscator';

describe('textObfuscator', () => {
  it('should detect zero-width spaces and clean text', () => {
    const textWithHidden = 'Hello\u200BWorld\u200C!';
    const report = detectAndRemoveInvisibleChars(textWithHidden);
    expect(report.zeroWidthSpaces).toBe(1);
    expect(report.zeroWidthNonJoiners).toBe(1);
    expect(report.totalInvisible).toBe(2);
    expect(report.cleanedText).toBe('HelloWorld!');
  });
});
