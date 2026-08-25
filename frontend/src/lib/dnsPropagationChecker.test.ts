import { describe, expect, it } from 'vitest';
import { checkDnsPropagation } from './dnsPropagationChecker';

describe('dnsPropagationChecker', () => {
  it('returns propagation check results across regions', () => {
    const res = checkDnsPropagation('devstools.app', '76.76.21.21');
    expect(res).toHaveLength(5);
    expect(res[0].status).toBe('propagated');
  });
});
