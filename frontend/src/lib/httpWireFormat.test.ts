import { describe, it, expect } from 'vitest';
import { formatRawHttpWire } from './httpWireFormat';

describe('httpWireFormat', () => {
  it('formats HTTP request into raw HTTP/1.1 wire protocol string', () => {
    const wire = formatRawHttpWire('POST', '/v1/users', 'api.example.com', { 'Content-Type': 'application/json' }, '{"name":"Bob"}');
    expect(wire).toContain('POST /v1/users HTTP/1.1');
    expect(wire).toContain('Host: api.example.com');
    expect(wire).toContain('Content-Type: application/json');
    expect(wire).toContain('{"name":"Bob"}');
  });
});
