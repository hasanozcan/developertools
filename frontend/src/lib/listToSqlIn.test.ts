import { describe, it, expect } from 'vitest';
import { convertListToSqlIn } from './listToSqlIn';

describe('listToSqlIn', () => {
  it('should convert newline list to single-quoted SQL IN clause', () => {
    const input = 'apple\nbanana\ncherry';
    const result = convertListToSqlIn(input);

    expect(result).toBe("IN ('apple', 'banana', 'cherry')");
  });

  it('should escape internal single quotes properly', () => {
    const input = "O'Connor\nMcDonald's";
    const result = convertListToSqlIn(input);

    expect(result).toBe("IN ('O''Connor', 'McDonald''s')");
  });

  it('should handle numeric lists with no quotes', () => {
    const input = '101\n202\n303';
    const result = convertListToSqlIn(input, { quoteType: 'none' });

    expect(result).toBe('IN (101, 202, 303)');
  });

  it('should remove duplicates when requested', () => {
    const input = 'item1\nitem2\nitem1\nitem3';
    const result = convertListToSqlIn(input, { removeDuplicates: true });

    expect(result).toBe("IN ('item1', 'item2', 'item3')");
  });
});
