import { describe, expect, it } from 'vitest';
import {
  CronSearchError,
  CronValidationError,
  MAX_CRON_RESULT_COUNT,
  MAX_CRON_SEARCH_HORIZON_DAYS,
  describeCronSchedule,
  findNextCronRuns,
  parseCronExpression,
} from './cron';

function expectLocalDate(
  actual: Date,
  expected: [year: number, month: number, day: number, hour: number, minute: number],
): void {
  expect([
    actual.getFullYear(),
    actual.getMonth() + 1,
    actual.getDate(),
    actual.getHours(),
    actual.getMinutes(),
  ]).toEqual(expected);
}

describe('parseCronExpression', () => {
  it('parses lists, ranges, wildcard steps, and range steps', () => {
    const wildcardStep = parseCronExpression('*/15 * * * *');
    expect(wildcardStep.fields.minute.values).toEqual([0, 15, 30, 45]);

    const rangeStep = parseCronExpression('5-10/2 1,3 * * *');
    expect(rangeStep.fields.minute.values).toEqual([5, 7, 9]);
    expect(rangeStep.fields.hour.values).toEqual([1, 3]);
  });

  it('requires exactly five fields', () => {
    expect(() => parseCronExpression('')).toThrow(CronValidationError);
    expect(() => parseCronExpression('* * * *')).toThrow(/exactly 5 fields/);
    expect(() => parseCronExpression('* * * * * *')).toThrow(/exactly 5 fields/);
  });

  it.each([
    '*/0 * * * *',
    '* */0 * * *',
    '* * */0 * *',
    '* * * */0 *',
    '* * * * */0',
    '1-5/0 * * * *',
    '*/-1 * * * *',
    '*/NaN * * * *',
    '*/1.5 * * * *',
  ])('rejects a non-positive or non-integer step in %s', (expression) => {
    expect(() => parseCronExpression(expression)).toThrow(/step.*positive integer/i);
  });

  it('rejects a step attached to a bare value', () => {
    expect(() => parseCronExpression('5/20 * * * *')).toThrow(/requires "\*" or a range/);
  });

  it.each([
    ['60 * * * *', /Minute.*outside 0-59/],
    ['* 24 * * *', /Hour.*outside 0-23/],
    ['* * 0 * *', /Day of month.*outside 1-31/],
    ['* * 32 * *', /Day of month.*outside 1-31/],
    ['* * * 0 *', /Month.*outside 1-12/],
    ['* * * 13 *', /Month.*outside 1-12/],
    ['* * * * 8', /Day of week.*outside 0-7/],
  ])('rejects an out-of-bounds field in %s', (expression, message) => {
    expect(() => parseCronExpression(expression)).toThrow(message);
  });

  it.each(['10-5 * * * *', '* 20-10 * * *', '* * 20-10 * *', '* * * 12-2 *', '* * * * 7-0'])(
    'rejects a reversed range in %s',
    (expression) => {
      expect(() => parseCronExpression(expression)).toThrow(/reversed/);
    },
  );

  it.each([
    '1,,2 * * * *',
    'word * * * *',
    '1-2-3 * * * *',
    '/5 * * * *',
    '1/2/3 * * * *',
    '1.5 * * * *',
    '1/ * * * *',
  ])('rejects a malformed segment in %s', (expression) => {
    expect(() => parseCronExpression(expression)).toThrow(CronValidationError);
  });

  it('normalizes both 0 and 7 to Sunday', () => {
    expect(parseCronExpression('0 0 * * 7').fields.dayOfWeek.values).toEqual([0]);
    expect(parseCronExpression('0 0 * * 0,7').fields.dayOfWeek.values).toEqual([0]);
    expect(parseCronExpression('0 0 * * 5-7').fields.dayOfWeek.values).toEqual([0, 5, 6]);
  });

  it('tracks asterisk steps separately from an unrestricted asterisk', () => {
    const parsed = parseCronExpression('0 0 */2 * */2');

    expect(parsed.fields.dayOfMonth).toMatchObject({
      wildcard: false,
      startsWithWildcard: true,
    });
    expect(parsed.fields.dayOfWeek).toMatchObject({
      wildcard: false,
      startsWithWildcard: true,
    });
    expect(parseCronExpression('0 0 * * *').fields.dayOfMonth).toMatchObject({
      wildcard: true,
      startsWithWildcard: true,
    });
  });

  it('does not apply Cronie STAR semantics to an asterisk later in a list', () => {
    expect(parseCronExpression('0 0 1,* * 1').fields.dayOfMonth).toMatchObject({
      wildcard: false,
      startsWithWildcard: false,
    });
  });
});

describe('findNextCronRuns', () => {
  it('finds stepped minute occurrences strictly after the starting instant', () => {
    const parsed = parseCronExpression('*/15 * * * *');
    const runs = findNextCronRuns(parsed, {
      from: new Date(2026, 0, 1, 10, 7, 30),
      count: 4,
      horizonDays: 2,
    });

    expectLocalDate(runs[0], [2026, 1, 1, 10, 15]);
    expectLocalDate(runs[1], [2026, 1, 1, 10, 30]);
    expectLocalDate(runs[2], [2026, 1, 1, 10, 45]);
    expectLocalDate(runs[3], [2026, 1, 1, 11, 0]);
  });

  it('does not include an occurrence equal to the starting instant', () => {
    const [run] = findNextCronRuns(parseCronExpression('* * * * *'), {
      from: new Date(2026, 0, 1, 10, 0, 0),
      count: 1,
      horizonDays: 1,
    });
    expectLocalDate(run, [2026, 1, 1, 10, 1]);
  });

  it('uses OR when both day-of-month and day-of-week are restricted', () => {
    const runs = findNextCronRuns(parseCronExpression('0 9 13 * 1'), {
      from: new Date(2026, 0, 11, 0, 0, 0),
      count: 2,
      horizonDays: 10,
    });

    // Monday the 12th matches weekday; Tuesday the 13th matches day-of-month.
    expectLocalDate(runs[0], [2026, 1, 12, 9, 0]);
    expectLocalDate(runs[1], [2026, 1, 13, 9, 0]);
  });

  it('uses AND when either day field contains an asterisk step', () => {
    const runs = findNextCronRuns(parseCronExpression('0 9 */2 * 1'), {
      from: new Date(2026, 0, 1, 0, 0, 0),
      count: 2,
      horizonDays: 20,
    });

    // */2 selects odd month days, and the asterisk makes Cronie require both day fields.
    expectLocalDate(runs[0], [2026, 1, 5, 9, 0]);
    expectLocalDate(runs[1], [2026, 1, 19, 9, 0]);
  });

  it('uses OR when a day field contains a non-leading asterisk list segment', () => {
    const [run] = findNextCronRuns(parseCronExpression('0 9 1,* * 1'), {
      from: new Date(2026, 0, 1, 10, 0, 0),
      count: 1,
      horizonDays: 2,
    });

    // Cronie marks STAR only when the first field character is an asterisk.
    expectLocalDate(run, [2026, 1, 2, 9, 0]);
  });

  it('requires day-of-month when day-of-week is unrestricted', () => {
    const [run] = findNextCronRuns(parseCronExpression('0 9 13 * *'), {
      from: new Date(2026, 0, 11, 0, 0, 0),
      count: 1,
      horizonDays: 10,
    });
    expectLocalDate(run, [2026, 1, 13, 9, 0]);
  });

  it('requires day-of-week when day-of-month is unrestricted', () => {
    const [run] = findNextCronRuns(parseCronExpression('0 9 * * 1'), {
      from: new Date(2026, 0, 11, 0, 0, 0),
      count: 1,
      horizonDays: 10,
    });
    expectLocalDate(run, [2026, 1, 12, 9, 0]);
  });

  it('finds Sunday when the expression uses the 7 alias', () => {
    const [run] = findNextCronRuns(parseCronExpression('0 9 * * 7'), {
      from: new Date(2026, 0, 10, 0, 0, 0),
      count: 1,
      horizonDays: 3,
    });
    expectLocalDate(run, [2026, 1, 11, 9, 0]);
  });

  it('searches far enough to find leap-day schedules without minute-by-minute iteration', () => {
    const [run] = findNextCronRuns(parseCronExpression('0 0 29 2 *'), {
      from: new Date(2025, 2, 1, 0, 0, 0),
      count: 1,
      horizonDays: 1_500,
    });
    expectLocalDate(run, [2028, 2, 29, 0, 0]);
  });

  it('throws an explicit error when no calendar occurrence exists in the horizon', () => {
    const parsed = parseCronExpression('0 0 31 2 *');
    expect(() =>
      findNextCronRuns(parsed, {
        from: new Date(2026, 0, 1),
        count: 1,
        horizonDays: 800,
      }),
    ).toThrow(/No cron occurrence found within the 800-day search horizon/);
  });

  it('does not return a candidate beyond the exact local-calendar horizon', () => {
    expect(() =>
      findNextCronRuns(parseCronExpression('59 23 2 1 *'), {
        from: new Date(2026, 0, 1, 0, 0, 0),
        count: 1,
        horizonDays: 1,
      }),
    ).toThrow(/No cron occurrence found within the 1-day search horizon/);
  });

  it('returns both occurrences of a repeated daylight-saving wall-clock minute', () => {
    const previousTimezone = process.env.TZ;
    process.env.TZ = 'America/New_York';

    try {
      const runs = findNextCronRuns(parseCronExpression('30 1 * * *'), {
        from: new Date(2026, 10, 1, 0, 0, 0),
        count: 2,
        horizonDays: 1,
      });

      expect(runs).toHaveLength(2);
      expectLocalDate(runs[0], [2026, 11, 1, 1, 30]);
      expectLocalDate(runs[1], [2026, 11, 1, 1, 30]);
      expect(runs[1].getTime() - runs[0].getTime()).toBe(60 * 60 * 1000);
      expect(runs[0].getTimezoneOffset()).not.toBe(runs[1].getTimezoneOffset());
    } finally {
      if (previousTimezone === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = previousTimezone;
      }
    }
  });

  it('preserves years from 0 through 99 instead of applying the Date constructor offset', () => {
    const from = new Date(0);
    from.setFullYear(50, 0, 1);
    from.setHours(23, 59, 0, 0);

    const [run] = findNextCronRuns(parseCronExpression('0 0 2 1 *'), {
      from,
      count: 1,
      horizonDays: 2,
    });

    expect(run.getFullYear()).toBe(50);
    expect(run.getMonth()).toBe(0);
    expect(run.getDate()).toBe(2);
    expect(run.getHours()).toBe(0);
    expect(run.getMinutes()).toBe(0);
  });

  it('keeps second zero in historical zones with sub-minute local offsets', () => {
    const previousTimezone = process.env.TZ;
    process.env.TZ = 'Europe/Istanbul';

    try {
      const from = new Date(0);
      from.setFullYear(1800, 0, 1);
      from.setHours(23, 59, 0, 0);
      const [run] = findNextCronRuns(parseCronExpression('0 0 * * *'), {
        from,
        count: 1,
        horizonDays: 2,
      });

      expect(run.getFullYear()).toBe(1800);
      expect(run.getDate()).toBe(2);
      expect(run.getHours()).toBe(0);
      expect(run.getMinutes()).toBe(0);
      expect(run.getSeconds()).toBe(0);
      expect(run.getMilliseconds()).toBe(0);
    } finally {
      if (previousTimezone === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = previousTimezone;
      }
    }
  });

  it('returns both historical overlap occurrences when an offset changes by seconds', () => {
    const previousTimezone = process.env.TZ;
    process.env.TZ = 'Europe/Paris';

    try {
      const runs = findNextCronRuns(parseCronExpression('55 23 10 3 *'), {
        from: new Date('1911-03-10T23:44:00.000Z'),
        count: 2,
        horizonDays: 1,
      });

      expect(runs.map((run) => run.toISOString())).toEqual([
        '1911-03-10T23:45:39.000Z',
        '1911-03-10T23:55:00.000Z',
      ]);
      expect(runs.every((run) => run.getSeconds() === 0)).toBe(true);
    } finally {
      if (previousTimezone === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = previousTimezone;
      }
    }
  });

  it('rejects unsafe search options before searching', () => {
    const parsed = parseCronExpression('* * * * *');

    expect(() => findNextCronRuns(parsed, { horizonDays: 0 })).toThrow(CronSearchError);
    expect(() =>
      findNextCronRuns(parsed, { horizonDays: MAX_CRON_SEARCH_HORIZON_DAYS + 1 }),
    ).toThrow(/Search horizon/);
    expect(() => findNextCronRuns(parsed, { horizonDays: 1.5 })).toThrow(/Search horizon/);
    expect(() => findNextCronRuns(parsed, { count: 0 })).toThrow(/Result count/);
    expect(() => findNextCronRuns(parsed, { count: MAX_CRON_RESULT_COUNT + 1 })).toThrow(
      /Result count/,
    );
    expect(() => findNextCronRuns(parsed, { from: new Date(Number.NaN) })).toThrow(/valid date/);
  });
});

describe('describeCronSchedule', () => {
  it('describes combined day restrictions with their OR semantics', () => {
    expect(describeCronSchedule(parseCronExpression('0 9 13 * 1'))).toContain(
      'day of month is 13 or weekday is Monday',
    );
  });

  it('describes stepped hours without producing NaN', () => {
    const description = describeCronSchedule(parseCronExpression('0 */6 * * *'));
    expect(description).toBe('At minute 0 during hours 0, 6, 12, 18');
    expect(description).not.toContain('NaN');
  });

  it('describes asterisk-step day fields with their AND semantics', () => {
    expect(describeCronSchedule(parseCronExpression('0 9 */2 * 1'))).toContain(
      'day of month is 1, 3, 5',
    );
    expect(describeCronSchedule(parseCronExpression('0 9 */2 * 1'))).toContain(
      'and weekday is Monday',
    );
  });
});
