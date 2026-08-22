import { describe, it, expect } from 'vitest';
import { convertCronTimezone } from './cronTimezoneConverter';

describe('cronTimezoneConverter', () => {
  it('converts local cron hours to server UTC cron expression', () => {
    const cron = '30 18 * * 1'; // 18:30 in UTC+3 (TRT)
    const converted = convertCronTimezone(cron, 3, 0); // Convert to UTC (0)
    expect(converted).toBe('30 15 * * 1');
  });
});
