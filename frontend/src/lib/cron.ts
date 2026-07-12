export type CronFieldName = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek';

export interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export interface ParsedCronField {
  source: string;
  values: readonly number[];
  wildcard: boolean;
  startsWithWildcard: boolean;
}

export interface ParsedCronExpression {
  expression: string;
  parts: CronParts;
  fields: Record<CronFieldName, ParsedCronField>;
}

export interface FindNextCronRunsOptions {
  from?: Date;
  count?: number;
  horizonDays?: number;
}

export type CronDescriptionKey =
  | 'everyMinute'
  | 'everyHour'
  | 'everyMinuteDuringHour'
  | 'everyMinuteDuringHours'
  | 'atMinuteEveryHour'
  | 'atMinutesEveryHour'
  | 'atTime'
  | 'atMinuteDuringHour'
  | 'atMinuteDuringHours'
  | 'atMinutesDuringHour'
  | 'atMinutesDuringHours'
  | 'inMonths'
  | 'dayOrWeekday'
  | 'dayAndWeekday'
  | 'onMonthDays'
  | 'onlyWeekdays';

export interface CronDescriptionOptions {
  locale?: string;
  translate?: (key: CronDescriptionKey, values: Record<string, string>) => string;
}

interface CronFieldSpec {
  label: string;
  min: number;
  max: number;
  maxStep: number;
  normalize?: (value: number) => number;
}

const CRON_FIELD_SPECS: Record<CronFieldName, CronFieldSpec> = {
  minute: { label: 'Minute', min: 0, max: 59, maxStep: 60 },
  hour: { label: 'Hour', min: 0, max: 23, maxStep: 24 },
  dayOfMonth: { label: 'Day of month', min: 1, max: 31, maxStep: 31 },
  month: { label: 'Month', min: 1, max: 12, maxStep: 12 },
  dayOfWeek: {
    label: 'Day of week',
    min: 0,
    max: 7,
    maxStep: 7,
    normalize: (value) => (value === 7 ? 0 : value),
  },
};

const ENGLISH_DESCRIPTION_TEMPLATES: Record<CronDescriptionKey, string> = {
  everyMinute: 'Every minute',
  everyHour: 'Every hour',
  everyMinuteDuringHour: 'Every minute during hour {hours}',
  everyMinuteDuringHours: 'Every minute during hours {hours}',
  atMinuteEveryHour: 'At minute {minutes} of every hour',
  atMinutesEveryHour: 'At minutes {minutes} of every hour',
  atTime: 'At {time}',
  atMinuteDuringHour: 'At minute {minutes} during hour {hours}',
  atMinuteDuringHours: 'At minute {minutes} during hours {hours}',
  atMinutesDuringHour: 'At minutes {minutes} during hour {hours}',
  atMinutesDuringHours: 'At minutes {minutes} during hours {hours}',
  inMonths: ' in {months}',
  dayOrWeekday: ', when day of month is {days} or weekday is {weekdays}',
  dayAndWeekday: ', when day of month is {days} and weekday is {weekdays}',
  onMonthDays: ', on day {days} of the month',
  onlyWeekdays: ', only on {weekdays}',
};

export const DEFAULT_CRON_SEARCH_HORIZON_DAYS = 366 * 25;
export const MAX_CRON_SEARCH_HORIZON_DAYS = 366 * 50;
export const MAX_CRON_RESULT_COUNT = 100;

export class CronValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CronValidationError';
  }
}

export class CronSearchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CronSearchError';
  }
}

function validationError(spec: CronFieldSpec, message: string): CronValidationError {
  return new CronValidationError(`${spec.label}: ${message}`);
}

function parseInteger(token: string, spec: CronFieldSpec, context: string): number {
  if (!/^\d+$/.test(token)) {
    throw validationError(spec, `${context} must be a non-negative integer`);
  }

  const value = Number(token);
  if (!Number.isSafeInteger(value)) {
    throw validationError(spec, `${context} is too large`);
  }

  return value;
}

function assertInBounds(value: number, spec: CronFieldSpec): void {
  if (value < spec.min || value > spec.max) {
    throw validationError(spec, `value ${value} is outside ${spec.min}-${spec.max}`);
  }
}

function parseCronField(source: string, fieldName: CronFieldName): ParsedCronField {
  const spec = CRON_FIELD_SPECS[fieldName];
  if (!source) {
    throw validationError(spec, 'field is empty');
  }

  const segments = source.split(',');
  if (segments.some((segment) => segment.length === 0)) {
    throw validationError(spec, 'list contains an empty segment');
  }

  const values = new Set<number>();

  for (const segment of segments) {
    const stepParts = segment.split('/');
    if (stepParts.length > 2 || stepParts[0] === '') {
      throw validationError(spec, `invalid segment "${segment}"`);
    }

    const [base, stepSource] = stepParts;
    let step = 1;
    if (stepSource !== undefined) {
      if (stepSource === '') {
        throw validationError(spec, `segment "${segment}" has an empty step`);
      }
      if (!/^\d+$/.test(stepSource)) {
        throw validationError(spec, `step "${stepSource}" must be a positive integer`);
      }

      step = Number(stepSource);
      if (!Number.isSafeInteger(step) || step <= 0) {
        throw validationError(spec, `step "${stepSource}" must be a positive integer`);
      }
      if (step > spec.maxStep) {
        throw validationError(spec, `step ${step} is outside 1-${spec.maxStep}`);
      }
    }

    let start: number;
    let end: number;

    if (base === '*') {
      start = spec.min;
      end = spec.max;
    } else if (/^\d+$/.test(base)) {
      if (stepSource !== undefined) {
        throw validationError(spec, `step in segment "${segment}" requires "*" or a range`);
      }
      start = parseInteger(base, spec, 'value');
      end = start;
    } else {
      const rangeMatch = /^(\d+)-(\d+)$/.exec(base);
      if (!rangeMatch) {
        throw validationError(spec, `invalid segment "${segment}"`);
      }

      start = parseInteger(rangeMatch[1], spec, 'range start');
      end = parseInteger(rangeMatch[2], spec, 'range end');
      if (start > end) {
        throw validationError(spec, `range ${start}-${end} is reversed`);
      }
    }

    assertInBounds(start, spec);
    assertInBounds(end, spec);

    for (let value = start; value <= end; value += step) {
      values.add(spec.normalize ? spec.normalize(value) : value);
    }
  }

  if (values.size === 0) {
    throw validationError(spec, 'field does not select any values');
  }

  return {
    source,
    values: [...values].sort((left, right) => left - right),
    wildcard: source === '*',
    startsWithWildcard: source.startsWith('*'),
  };
}

export function parseCronExpression(expression: string): ParsedCronExpression {
  const trimmed = expression.trim();
  const fields = trimmed ? trimmed.split(/\s+/) : [];
  if (fields.length !== 5) {
    throw new CronValidationError(
      'Cron expression must have exactly 5 fields: minute hour day-of-month month day-of-week',
    );
  }

  const parts: CronParts = {
    minute: fields[0],
    hour: fields[1],
    dayOfMonth: fields[2],
    month: fields[3],
    dayOfWeek: fields[4],
  };

  return {
    expression: trimmed,
    parts,
    fields: {
      minute: parseCronField(parts.minute, 'minute'),
      hour: parseCronField(parts.hour, 'hour'),
      dayOfMonth: parseCronField(parts.dayOfMonth, 'dayOfMonth'),
      month: parseCronField(parts.month, 'month'),
      dayOfWeek: parseCronField(parts.dayOfWeek, 'dayOfWeek'),
    },
  };
}

function includes(field: ParsedCronField, value: number): boolean {
  return field.values.includes(value);
}

function matchesCalendarDay(parsed: ParsedCronExpression, date: Date): boolean {
  const dayOfMonthField = parsed.fields.dayOfMonth;
  const dayOfWeekField = parsed.fields.dayOfWeek;
  const matchesDayOfMonth = includes(dayOfMonthField, date.getDate());
  const matchesDayOfWeek = includes(dayOfWeekField, date.getDay());

  if (!dayOfMonthField.startsWithWildcard && !dayOfWeekField.startsWithWildcard) {
    return matchesDayOfMonth || matchesDayOfWeek;
  }
  return matchesDayOfMonth && matchesDayOfWeek;
}

function isSameLocalMinute(
  candidate: Date,
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): boolean {
  return (
    candidate.getFullYear() === year &&
    candidate.getMonth() === month &&
    candidate.getDate() === day &&
    candidate.getHours() === hour &&
    candidate.getMinutes() === minute &&
    candidate.getSeconds() === 0 &&
    candidate.getMilliseconds() === 0
  );
}

function createLocalDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  const date = new Date(0);
  date.setFullYear(year, month, day);
  date.setHours(hour, minute, 0, 0);
  return date;
}

function wallClockEpoch(date: Date): number {
  const wallClock = new Date(0);
  wallClock.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  wallClock.setUTCHours(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
  return wallClock.getTime();
}

function exactOffsetMilliseconds(date: Date): number {
  return date.getTime() - wallClockEpoch(date);
}

function localDayOffsetMilliseconds(year: number, month: number, day: number): number[] {
  const offsets = new Set<number>();
  for (const hour of [0, 6, 12, 18, 24]) {
    offsets.add(exactOffsetMilliseconds(createLocalDate(year, month, day, hour, 0)));
  }
  return [...offsets];
}

function localMinuteOccurrences(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  possibleOffsetMilliseconds: readonly number[],
): Date[] {
  const primary = createLocalDate(year, month, day, hour, minute);
  if (!isSameLocalMinute(primary, year, month, day, hour, minute)) {
    return [];
  }

  const occurrences = new Map<number, Date>();
  occurrences.set(primary.getTime(), primary);
  const primaryOffsetMilliseconds = exactOffsetMilliseconds(primary);
  for (const offsetMilliseconds of possibleOffsetMilliseconds) {
    const candidate = new Date(primary.getTime() + offsetMilliseconds - primaryOffsetMilliseconds);
    if (isSameLocalMinute(candidate, year, month, day, hour, minute)) {
      occurrences.set(candidate.getTime(), candidate);
    }
  }

  return [...occurrences.values()].sort((left, right) => left.getTime() - right.getTime());
}

function assertSearchOptions(from: Date, count: number, horizonDays: number): void {
  if (Number.isNaN(from.getTime())) {
    throw new CronSearchError('Search start must be a valid date');
  }
  if (!Number.isSafeInteger(count) || count <= 0 || count > MAX_CRON_RESULT_COUNT) {
    throw new CronSearchError(`Result count must be between 1 and ${MAX_CRON_RESULT_COUNT}`);
  }
  if (
    !Number.isSafeInteger(horizonDays) ||
    horizonDays <= 0 ||
    horizonDays > MAX_CRON_SEARCH_HORIZON_DAYS
  ) {
    throw new CronSearchError(
      `Search horizon must be between 1 and ${MAX_CRON_SEARCH_HORIZON_DAYS} days`,
    );
  }
}

export function findNextCronRuns(
  parsed: ParsedCronExpression,
  options: FindNextCronRunsOptions = {},
): Date[] {
  const from = new Date(options.from?.getTime() ?? Date.now());
  const count = options.count ?? 5;
  const horizonDays = options.horizonDays ?? DEFAULT_CRON_SEARCH_HORIZON_DAYS;
  assertSearchOptions(from, count, horizonDays);

  const runs: Date[] = [];
  const calendarCursor = new Date(from);
  calendarCursor.setHours(12, 0, 0, 0);
  const deadline = new Date(from);
  deadline.setDate(deadline.getDate() + horizonDays);
  if (Number.isNaN(deadline.getTime())) {
    throw new CronSearchError('Cron search horizon exceeds the supported date range');
  }

  for (let daysScanned = 0; daysScanned <= horizonDays; daysScanned += 1) {
    const year = calendarCursor.getFullYear();
    const month = calendarCursor.getMonth();
    const day = calendarCursor.getDate();

    if (includes(parsed.fields.month, month + 1) && matchesCalendarDay(parsed, calendarCursor)) {
      const dailyCandidates: Date[] = [];
      const possibleOffsetMilliseconds = localDayOffsetMilliseconds(year, month, day);
      for (const hour of parsed.fields.hour.values) {
        for (const minute of parsed.fields.minute.values) {
          dailyCandidates.push(
            ...localMinuteOccurrences(year, month, day, hour, minute, possibleOffsetMilliseconds),
          );
        }
      }

      dailyCandidates.sort((left, right) => left.getTime() - right.getTime());
      for (const candidate of dailyCandidates) {
        if (candidate.getTime() <= from.getTime()) {
          continue;
        }
        if (candidate.getTime() > deadline.getTime()) {
          continue;
        }

        runs.push(candidate);
        if (runs.length >= count) {
          return runs;
        }
      }
    }

    const previousCalendarDay = `${year}-${month}-${day}`;
    calendarCursor.setDate(calendarCursor.getDate() + 1);
    const nextCalendarDay = `${calendarCursor.getFullYear()}-${calendarCursor.getMonth()}-${calendarCursor.getDate()}`;
    if (Number.isNaN(calendarCursor.getTime()) || nextCalendarDay === previousCalendarDay) {
      throw new CronSearchError('Cron search could not advance the local calendar safely');
    }
  }

  if (runs.length === 0) {
    throw new CronSearchError(
      `No cron occurrence found within the ${horizonDays}-day search horizon`,
    );
  }

  return runs;
}

function joinValues(values: readonly number[]): string {
  return values.join(', ');
}

function renderDescription(
  key: CronDescriptionKey,
  values: Record<string, string>,
  translate?: CronDescriptionOptions['translate'],
): string {
  if (translate) {
    return translate(key, values);
  }

  return Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, value),
    ENGLISH_DESCRIPTION_TEMPLATES[key],
  );
}

function describeDaysOfWeek(values: readonly number[], locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' });
  return values.map((value) => formatter.format(new Date(Date.UTC(2023, 0, value + 1)))).join(', ');
}

function describeMonths(values: readonly number[], locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' });
  return values.map((value) => formatter.format(new Date(Date.UTC(2023, value - 1, 1)))).join(', ');
}

export function describeCronSchedule(
  parsed: ParsedCronExpression,
  options: CronDescriptionOptions = {},
): string {
  const { parts, fields } = parsed;
  const locale = options.locale ?? 'en-US';
  const render = (key: CronDescriptionKey, values: Record<string, string> = {}) =>
    renderDescription(key, values, options.translate);
  let description: string;

  if (parts.minute === '*' && parts.hour === '*') {
    description = render('everyMinute');
  } else if (parts.minute === '0' && parts.hour === '*') {
    description = render('everyHour');
  } else if (parts.minute === '*') {
    description = render(
      fields.hour.values.length === 1 ? 'everyMinuteDuringHour' : 'everyMinuteDuringHours',
      {
        hours: joinValues(fields.hour.values),
      },
    );
  } else if (parts.hour === '*') {
    description = render(
      fields.minute.values.length === 1 ? 'atMinuteEveryHour' : 'atMinutesEveryHour',
      {
        minutes: joinValues(fields.minute.values),
      },
    );
  } else if (fields.minute.values.length === 1 && fields.hour.values.length === 1) {
    const hour = fields.hour.values[0];
    const minute = fields.minute.values[0];
    const time = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(2023, 0, 1, hour, minute)));
    description = render('atTime', { time });
  } else {
    const key: CronDescriptionKey =
      fields.minute.values.length === 1
        ? fields.hour.values.length === 1
          ? 'atMinuteDuringHour'
          : 'atMinuteDuringHours'
        : fields.hour.values.length === 1
          ? 'atMinutesDuringHour'
          : 'atMinutesDuringHours';
    description = render(key, {
      minutes: joinValues(fields.minute.values),
      hours: joinValues(fields.hour.values),
    });
  }

  if (!fields.month.wildcard) {
    description += render('inMonths', { months: describeMonths(fields.month.values, locale) });
  }

  if (!fields.dayOfMonth.startsWithWildcard && !fields.dayOfWeek.startsWithWildcard) {
    description += render('dayOrWeekday', {
      days: joinValues(fields.dayOfMonth.values),
      weekdays: describeDaysOfWeek(fields.dayOfWeek.values, locale),
    });
  } else if (!fields.dayOfMonth.wildcard && !fields.dayOfWeek.wildcard) {
    description += render('dayAndWeekday', {
      days: joinValues(fields.dayOfMonth.values),
      weekdays: describeDaysOfWeek(fields.dayOfWeek.values, locale),
    });
  } else if (!fields.dayOfMonth.wildcard) {
    description += render('onMonthDays', { days: joinValues(fields.dayOfMonth.values) });
  } else if (!fields.dayOfWeek.wildcard) {
    description += render('onlyWeekdays', {
      weekdays: describeDaysOfWeek(fields.dayOfWeek.values, locale),
    });
  }

  return description;
}
