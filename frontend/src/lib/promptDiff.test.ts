import { describe, it, expect } from 'vitest';
import { comparePrompts } from './promptDiff';

describe('promptDiff', () => {
  it('identifies differences and line changes between two prompt versions', () => {
    const prompt1 = 'You are a helpful assistant.\nBe concise.';
    const prompt2 = 'You are a helpful coding assistant.\nBe concise.\nUse TypeScript.';

    const diff = comparePrompts(prompt1, prompt2);
    expect(diff.addedCount).toBeGreaterThan(0);
    expect(diff.charDelta).toBeGreaterThan(0);
    expect(diff.wordDelta).toBe(3);
  });
});
