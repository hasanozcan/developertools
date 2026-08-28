import { describe, it, expect } from 'vitest';
import { shrinkPromptContext } from './llmContextWindowShrinker';

describe('llmContextWindowShrinker', () => {
  it('strips comments and excessive newlines', () => {
    const input = '// comment\n\nconst a = 1;\n\n/* block */';
    const res = shrinkPromptContext(input);
    expect(res.text).toBe('const a = 1;');
  });
});
