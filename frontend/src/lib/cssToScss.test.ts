import { describe, it, expect } from 'vitest';
import { convertCssToScss } from './cssToScss';

describe('cssToScss', () => {
  it('nests css into scss', () => {
    expect(convertCssToScss('.a .b { color: red; }')).toContain('.a {');
  });
});
