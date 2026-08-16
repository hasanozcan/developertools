import { describe, expect, it } from 'vitest';
import { escapeRegex, unescapeRegex } from './RegexEscapeTool';

describe('RegexEscapeTool helpers', () => {
  it('escapes JavaScript regex metacharacters and literal delimiters', () => {
    expect(escapeRegex('https://example.com/users/(.*)?q=test+1')).toBe(
      'https:\\/\\/example\\.com\\/users\\/\\(\\.\\*\\)\\?q=test\\+1',
    );
  });

  it('reverses supported punctuation without changing regex tokens', () => {
    expect(unescapeRegex('file\\.txt \\/ \\d+ \\n')).toBe('file.txt / \\d+ \\n');
  });
});
