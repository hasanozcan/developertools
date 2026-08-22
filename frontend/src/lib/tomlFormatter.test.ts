import { describe, it, expect } from 'vitest';
import { formatToml } from './tomlFormatter';

describe('formatToml', () => {
  it('formats toml key values and headers', () => {
    const input = '[package]\nname="test"\nversion="1.0.0"';
    const res = formatToml(input);
    expect(res).toContain('name = "test"');
  });
});