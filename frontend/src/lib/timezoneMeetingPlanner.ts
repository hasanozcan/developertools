export interface TimezoneSlot {
  tz: string;
  localTime: string;
  isBusinessHours: boolean;
}

export function planMeetingSlots(baseUtcHour: number, timezones: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  const offsets: Record<string, number> = {
    'UTC': 0,
    'EST': -5,
    'PST': -8,
    'CET': 1,
    'TRT': 3,
    'JST': 9,
  };

  for (const tz of timezones) {
    const offset = offsets[tz] ?? 0;
    const hour = (baseUtcHour + offset + 24) % 24;
    const formatted = hour.toString().padStart(2, '0') + ':00';
    result[tz] = formatted;
  }

  return result;
}
