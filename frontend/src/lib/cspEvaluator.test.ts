import { describe, it, expect } from 'vitest';
import { evaluateCspHeader } from './cspEvaluator';

describe('evaluateCspHeader', () => {
  it('detects unsafe-inline risks', () => {
    const res = evaluateCspHeader("script-src 'self' 'unsafe-inline'");
    expect(res.findings.length).toBeGreaterThan(0);
    expect(res.score).toBeLessThan(100);
  });
});