import { describe, expect, it } from 'vitest';
import {
  calculateClaudeTokens,
  CLAUDE_PRICING,
  parseClaudeOutputTokens,
  type ClaudeModelId,
} from './claudeTokenCounter';

describe('local Claude approximation and dated standard API prices', () => {
  it('returns zero for empty input and does not invent message overhead', () => {
    expect(calculateClaudeTokens('')).toMatchObject({
      inputTokens: 0,
      outputTokens: 0,
      totalCost: 0,
      characters: 0,
      words: 0,
    });
  });
  it('preserves whitespace and counts UTF-16 units, not Unicode tokens', () => {
    expect(calculateClaudeTokens('    ')).toMatchObject({ inputTokens: 2, words: 0 });
    expect(calculateClaudeTokens('😀汉e\u0301')).toMatchObject({
      inputTokens: 2,
      characters: 5,
      words: 1,
    });
  });
  it('handles long text without truncation', () => {
    expect(calculateClaudeTokens('x'.repeat(3_800_000))).toMatchObject({
      inputTokens: 1_000_000,
      inputCost: 2,
    });
  });
  it.each([
    ['claude-sonnet-5-5', 0.002, 0.005, 0.007],
    ['claude-haiku-5-5', 0.0001, 0.00025, 0.00035],
    ['claude-opus-5-5', 0.004, 0.01, 0.014],
    ['claude-fable-5-1', 0.01, 0.025, 0.035],
  ] as const)(
    'calculates separate 1000 input / 500 output costs for %s',
    (model, input, output, total) => {
      const stats = calculateClaudeTokens(
        'Summarize the code and list the risks.'.repeat(100),
        model,
        500,
      );
      expect(stats.inputTokens).toBe(1000);
      expect(stats.inputCost).toBeCloseTo(input, 10);
      expect(stats.outputCost).toBeCloseTo(output, 10);
      expect(stats.totalCost).toBeCloseTo(total, 10);
    },
  );
  it('switches BOTH Haiku rates only above the 100,000-input boundary', () => {
    const at = calculateClaudeTokens('x'.repeat(380_000), 'claude-haiku-5-5', 500);
    const above = calculateClaudeTokens('x'.repeat(380_001), 'claude-haiku-5-5', 500);
    expect(at).toMatchObject({ inputTokens: 100_000, inputRate: 0.1, outputRate: 0.5 });
    expect(above).toMatchObject({ inputTokens: 100_001, inputRate: 0.5, outputRate: 2.5 });
    expect(above.totalCost).toBeCloseTo(0.0512505, 10);
  });
  it('keeps output cost independent of empty input', () => {
    expect(calculateClaudeTokens('', 'claude-sonnet-5-5', 500)).toMatchObject({
      inputCost: 0,
      outputCost: 0.005,
      totalCost: 0.005,
    });
  });
  it('records an explicit pricing verification date and official sources', () => {
    expect(CLAUDE_PRICING.verifiedOn).toBe('2026-10-11');
    expect(new URL(CLAUDE_PRICING.source).hostname).toBe('platform.claude.com');
    expect(new URL(CLAUDE_PRICING.tokenCountingSource).hostname).toBe('platform.claude.com');
  });
  it.each([-1, 0.5, NaN, Infinity, 128001, Number.MAX_SAFE_INTEGER])(
    'rejects invalid numeric output %s',
    (value) => {
      expect(() => calculateClaudeTokens('hello', 'claude-sonnet-5-5', value)).toThrow(RangeError);
    },
  );
  it('rejects an unknown model instead of silently using a price', () => {
    expect(() => calculateClaudeTokens('hello', 'unknown' as ClaudeModelId)).toThrow(RangeError);
  });
});

describe('output token parsing', () => {
  it.each(['0', '500', '128000', '00050'])('accepts whole token budget %s', (value) => {
    expect(parseClaudeOutputTokens(value)).toBe(Number(value));
  });
  it.each([
    '',
    ' ',
    '-1',
    '+1',
    '1.5',
    '1e3',
    '500 tokens',
    '1,000',
    'NaN',
    'Infinity',
    '128001',
    '9007199254740993',
  ])('rejects ambiguous or invalid budget %s', (value) => {
    expect(parseClaudeOutputTokens(value)).toBeNull();
  });
});
