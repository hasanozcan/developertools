export type TimestampUnit = 'seconds' | 'milliseconds';

function parseTimestamp(value: string): number | null {
  const normalized = value.trim();
  if (!/^-?\d+$/.test(normalized)) return null;

  const timestamp = Number(normalized);
  return Number.isSafeInteger(timestamp) ? timestamp : null;
}

export function timestampToIso(value: string, unit: TimestampUnit): string {
  const timestamp = parseTimestamp(value);
  if (timestamp === null) return '';

  const milliseconds = unit === 'seconds' ? timestamp * 1000 : timestamp;
  const date = new Date(milliseconds);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

export function dateToTimestamp(value: string, unit: TimestampUnit): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const milliseconds = date.getTime();
  return unit === 'seconds' ? Math.floor(milliseconds / 1000).toString() : milliseconds.toString();
}
