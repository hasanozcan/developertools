import { describe, it, expect } from 'vitest';
import { translateCronSchedule } from './crontabScheduleTranslator';

describe('crontabScheduleTranslator', () => {
  it('translates standard cron expression into human language', () => {
    const res = translateCronSchedule('*/15 * * * *');
    expect(res.isValid).toBe(true);
    expect(res.humanReadable.en).toContain('every 15 minutes');
    expect(res.humanReadable.tr).toContain('Her 15 dakikada bir');
    expect(res.nextOccurrences.length).toBe(5);
  });
});
