import { describe, it, expect } from 'vitest';
import { simulateHandshake } from './sslTlsHandshakeSimulator';

describe('sslTlsHandshakeSimulator', () => {
  it('simulates 1-RTT for TLS 1.3', () => {
    expect(simulateHandshake('1.3').length).toBe(3);
  });
});
