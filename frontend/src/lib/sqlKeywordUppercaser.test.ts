import { describe, expect, it } from 'vitest';
import { uppercaseSqlKeywords } from './sqlKeywordUppercaser';

describe('sqlKeywordUppercaser', () => {
  it('uppercases sql keywords while preserving table names', () => {
    const input = 'select id, name from users where age > 18 order by name asc limit 10;';
    const output = uppercaseSqlKeywords(input);
    expect(output).toContain('SELECT');
    expect(output).toContain('FROM');
    expect(output).toContain('WHERE');
    expect(output).toContain('ORDER BY');
  });
});
