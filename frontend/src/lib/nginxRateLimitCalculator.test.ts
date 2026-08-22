import { describe, it, expect } from 'vitest';
import { generateNginxRateLimitDirectives } from './nginxRateLimitCalculator';

describe('generateNginxRateLimitDirectives', () => {
  it('generates valid limit_req directives', () => {
    const res = generateNginxRateLimitDirectives({
      zoneName: 'api_limit',
      ratePerSec: 10,
      burst: 20,
      nodelay: true,
    });
    expect(res).toContain('limit_req_zone');
    expect(res).toContain('burst=20 nodelay');
  });
});