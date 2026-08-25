import { describe, expect, it } from 'vitest';
import { naturalLanguageToCron } from './naturalLanguageToCron';

describe('naturalLanguageToCron', () => {
  it('converts common phrases to 5-part cron', () => {
    expect(naturalLanguageToCron('every 15 minutes').cron).toBe('*/15 * * * *');
    expect(naturalLanguageToCron('every monday at 9').cron).toBe('0 9 * * 1');
    expect(naturalLanguageToCron('first day of every month').cron).toBe('0 0 1 * *');
  });
});
