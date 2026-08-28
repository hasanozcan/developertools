import { describe, it, expect } from 'vitest';
import { evaluateRegexRisk } from './regexBenchmarkSimulator';

describe('regexBenchmarkSimulator', () => {
  it('detects nested quantified ReDoS patterns', () => {
    expect(evaluateRegexRisk('(a+)+').riskLevel).toBe('high');
    expect(evaluateRegexRisk('^[a-z0-9]+$').riskLevel).toBe('low');
  });
});
