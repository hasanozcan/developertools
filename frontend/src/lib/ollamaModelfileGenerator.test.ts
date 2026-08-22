import { describe, it, expect } from 'vitest';
import { generateOllamaModelfile } from './ollamaModelfileGenerator';

describe('generateOllamaModelfile', () => {
  it('generates Modelfile content', () => {
    const res = generateOllamaModelfile({
      baseModel: 'llama3:8b',
      temperature: 0.7,
      systemPrompt: 'You are an expert Python engineer.',
    });
    expect(res).toContain('FROM llama3:8b');
    expect(res).toContain('PARAMETER temperature 0.7');
    expect(res).toContain('SYSTEM """');
  });
});