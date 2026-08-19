import { describe, it, expect } from 'vitest';
import { describeCron } from './crontabDescriptor';

describe('crontabDescriptor', () => {
  it('should describe common cron schedules in natural English', () => {
    expect(describeCron('* * * * *')).toBe('Runs every single minute');
    expect(describeCron('*/15 * * * *')).toBe('Runs every 15 minutes');
    expect(describeCron('0 0 * * *')).toBe('Runs every day at midnight (00:00)');
    expect(describeCron('0 0 1 * *')).toBe('Runs on the 1st of every month at midnight (00:00)');
  });
});
