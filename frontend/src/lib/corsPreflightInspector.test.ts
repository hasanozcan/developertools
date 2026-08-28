import { describe, it, expect } from 'vitest';
import { evaluateCorsOptions } from './corsPreflightInspector';

describe('corsPreflightInspector', () => {
  it('evaluates CORS origin allowance', () => {
    expect(evaluateCorsOptions('https://app.com', ['*'])).toBe(true);
  });
});
