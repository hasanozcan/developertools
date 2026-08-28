import { describe, it, expect } from 'vitest';
import { generateRandomizedCron } from './crontabRandomizedGenerator';

describe('crontabRandomizedGenerator', () => {
  it('generates jitter offset for crontab', () => {
    expect(generateRandomizedCron()).toContain('sleep');
  });
});
