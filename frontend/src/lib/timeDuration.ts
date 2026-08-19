export interface TimeDifferenceResult {
  totalMilliseconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  totalDays: number;
  breakdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  humanReadable: string;
}

export function calculateDateDifference(startDate: Date | string | number, endDate: Date | string | number): TimeDifferenceResult {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (isNaN(start) || isNaN(end)) {
    return {
      totalMilliseconds: 0,
      totalSeconds: 0,
      totalMinutes: 0,
      totalHours: 0,
      totalDays: 0,
      breakdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      humanReadable: 'Invalid dates',
    };
  }

  const diffMs = Math.abs(end - start);
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

  return {
    totalMilliseconds: diffMs,
    totalSeconds,
    totalMinutes,
    totalHours,
    totalDays,
    breakdown: { days, hours, minutes, seconds },
    humanReadable: parts.join(', '),
  };
}

export function convertTimeUnits(value: number, fromUnit: 'ms' | 's' | 'min' | 'h' | 'd'): Record<string, number> {
  let inMs = value;
  switch (fromUnit) {
    case 's':
      inMs = value * 1000;
      break;
    case 'min':
      inMs = value * 60 * 1000;
      break;
    case 'h':
      inMs = value * 60 * 60 * 1000;
      break;
    case 'd':
      inMs = value * 24 * 60 * 60 * 1000;
      break;
  }

  return {
    milliseconds: inMs,
    seconds: inMs / 1000,
    minutes: inMs / (60 * 1000),
    hours: inMs / (60 * 60 * 1000),
    days: inMs / (24 * 60 * 60 * 1000),
  };
}
