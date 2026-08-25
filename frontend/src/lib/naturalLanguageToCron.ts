export function naturalLanguageToCron(input: string): { cron: string; description: string } {
  const text = input.toLowerCase().trim();

  if (text.includes('every minute') || text === '* * * * *') {
    return { cron: '* * * * *', description: 'Every minute' };
  }
  if (text.includes('every 5 minute') || text.includes('every 5 min')) {
    return { cron: '*/5 * * * *', description: 'Every 5 minutes' };
  }
  if (text.includes('every 10 minute') || text.includes('every 10 min')) {
    return { cron: '*/10 * * * *', description: 'Every 10 minutes' };
  }
  if (text.includes('every 15 minute') || text.includes('every 15 min')) {
    return { cron: '*/15 * * * *', description: 'Every 15 minutes' };
  }
  if (text.includes('every 30 minute') || text.includes('every 30 min') || text.includes('every half hour')) {
    return { cron: '*/30 * * * *', description: 'Every 30 minutes' };
  }
  if (text.includes('every hour') || text.includes('hourly')) {
    return { cron: '0 * * * *', description: 'Every hour on the hour' };
  }
  if (text.includes('every 2 hour')) {
    return { cron: '0 */2 * * *', description: 'Every 2 hours' };
  }
  if (text.includes('every day at midnight') || text.includes('daily at midnight') || text.includes('every night at midnight')) {
    return { cron: '0 0 * * *', description: 'At 00:00 every day' };
  }
  if (text.includes('every day at 9') || text.includes('daily at 9am') || text.includes('daily at 9')) {
    return { cron: '0 9 * * *', description: 'At 09:00 AM every day' };
  }
  if (text.includes('monday at 9') || text.includes('every monday at 9')) {
    return { cron: '0 9 * * 1', description: 'At 09:00 AM on Monday' };
  }
  if (text.includes('friday at 5') || text.includes('friday at 17')) {
    return { cron: '0 17 * * 5', description: 'At 05:00 PM on Friday' };
  }
  if (text.includes('first day of every month') || text.includes('1st of every month')) {
    return { cron: '0 0 1 * *', description: 'At 00:00 on day 1 of every month' };
  }
  if (text.includes('every weekday') || text.includes('mon-fri') || text.includes('monday to friday')) {
    return { cron: '0 9 * * 1-5', description: 'At 09:00 AM on every weekday (Monday through Friday)' };
  }
  if (text.includes('every weekend') || text.includes('saturday and sunday')) {
    return { cron: '0 0 * * 6,0', description: 'At 00:00 on Saturday and Sunday' };
  }

  // Fallback pattern matching
  const hourMatch = text.match(/at (\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (hourMatch) {
    let hour = parseInt(hourMatch[1], 10);
    const minute = hourMatch[2] ? parseInt(hourMatch[2], 10) : 0;
    const ampm = hourMatch[3];
    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;
    return { cron: `${minute} ${hour} * * *`, description: `At ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} every day` };
  }

  return { cron: '0 0 * * *', description: 'At 00:00 every day (Default fallback)' };
}
