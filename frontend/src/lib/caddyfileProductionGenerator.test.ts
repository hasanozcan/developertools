import { describe, it, expect } from 'vitest';
import { generateCaddyfile } from './caddyfileProductionGenerator';

describe('caddyfileProductionGenerator', () => {
  it('generates production Caddyfile', () => {
    expect(generateCaddyfile('app.io', 3000)).toContain('reverse_proxy 127.0.0.1:3000');
  });
});
