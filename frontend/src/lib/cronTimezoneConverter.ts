export function convertCronTimezone(
  cronExpr: string,
  fromOffsetHours: number,
  toOffsetHours: number,
): string {
  const parts = cronExpr.trim().split(/\s+/);
  if (parts.length < 5) return cronExpr;

  const [min, hour, dom, mon, dow] = parts;
  if (hour === '*') return cronExpr;

  const hNum = parseInt(hour, 10);
  if (isNaN(hNum)) return cronExpr;

  const diff = toOffsetHours - fromOffsetHours;
  const newHour = (hNum + diff + 24) % 24;

  return `${min} ${newHour} ${dom} ${mon} ${dow}`;
}
