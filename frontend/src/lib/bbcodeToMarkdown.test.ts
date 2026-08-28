import { describe, it, expect } from 'vitest';
import { convertBbcodeToMarkdown } from './bbcodeToMarkdown';

describe('bbcodeToMarkdown', () => {
  it('converts bbcode to md', () => {
    expect(convertBbcodeToMarkdown('[b]hi[/b]')).toBe('**hi**');
  });
});
