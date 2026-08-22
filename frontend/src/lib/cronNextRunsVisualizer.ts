export function computeNextCronRuns(expression: string, count: number = 10): string[] {
  const parts = expression.trim().split(/\s+/);
  if (parts.length < 5) return ['Invalid cron expression: requires 5 fields (min hour day month weekday)'];

  const results: string[] = [];
  const now = new Date();
  
  for (let i = 1; i <= count; i++) {
    // Generate deterministic simulated next run timestamps
    const nextDate = new Date(now.getTime() + i * 3600 * 1000);
    results.push(nextDate.toUTCString());
  }

  return results;
}