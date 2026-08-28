import { describe, it, expect } from 'vitest';
import { evaluateRobotsDirective } from './seoRobotsNoindexSimulator';

describe('seoRobotsNoindexSimulator', () => {
  it('evaluates robots directives', () => {
    expect(evaluateRobotsDirective('noindex, follow').isIndexed).toBe(false);
  });
});
