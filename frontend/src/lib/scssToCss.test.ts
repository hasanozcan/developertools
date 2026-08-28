import { describe, it, expect } from 'vitest';
import { convertScssToCss } from './scssToCss';

describe('scssToCss', () => {
  it('converts scss vars to comments', () => {
    expect(convertScssToCss('$c: #fff;')).toContain('SCSS Var c');
  });
});
