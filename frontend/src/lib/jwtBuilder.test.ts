import { describe, expect, it } from 'vitest';
import { buildTestJwt } from './jwtBuilder';

describe('jwtBuilder', () => {
  it('builds standard 3-part JWT token', () => {
    const token = buildTestJwt({ alg: 'HS256', typ: 'JWT' }, { sub: '1234567890', name: 'John Doe', iat: 1516239022 });
    expect(token.split('.')).toHaveLength(3);
  });
});
