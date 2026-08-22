import { describe, it, expect } from 'vitest';
import { planMeetingSlots } from './timezoneMeetingPlanner';

describe('timezoneMeetingPlanner', () => {
  it('calculates overlapping meeting hours across global timezones', () => {
    const slots = planMeetingSlots(14, ['UTC', 'EST', 'TRT']);
    expect(slots['UTC']).toBe('14:00');
    expect(slots['EST']).toBe('09:00');
    expect(slots['TRT']).toBe('17:00');
  });
});
