export function describeCron(expression: string): string {
  const parts = expression.trim().split(/\s+/);
  if (parts.length < 5) return 'Invalid cron expression (requires 5 fields)';

  const [min, hour, dom, mon, dow] = parts;

  if (min === '*' && hour === '*' && dom === '*' && mon === '*' && dow === '*') {
    return 'Runs every single minute';
  }
  if (min.startsWith('*/') && hour === '*' && dom === '*' && mon === '*' && dow === '*') {
    return `Runs every ${min.slice(2)} minutes`;
  }
  if (min === '0' && hour === '*' && dom === '*' && mon === '*' && dow === '*') {
    return 'Runs at minute 0 past every hour';
  }
  if (min === '0' && hour.startsWith('*/')) {
    return `Runs every ${hour.slice(2)} hours on the hour`;
  }
  if (min === '0' && hour === '0' && dom === '*' && mon === '*' && dow === '*') {
    return 'Runs every day at midnight (00:00)';
  }
  if (min === '0' && hour === '0' && dom === '*' && mon === '*' && dow === '0') {
    return 'Runs every Sunday at midnight (00:00)';
  }
  if (min === '0' && hour === '0' && dom === '1' && mon === '*' && dow === '*') {
    return 'Runs on the 1st of every month at midnight (00:00)';
  }

  return `Runs at minute ${min}, hour ${hour}, day-of-month ${dom}, month ${mon}, day-of-week ${dow}`;
}
