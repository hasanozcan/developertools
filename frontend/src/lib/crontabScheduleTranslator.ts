export interface CronScheduleResult {
  isValid: boolean;
  humanReadable: {
    en: string;
    tr: string;
  };
  nextOccurrences: string[];
  fields: {
    minute: string;
    hour: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
  };
}

export function translateCronSchedule(expression: string, count = 5): CronScheduleResult {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    return {
      isValid: false,
      humanReadable: {
        en: 'Invalid cron expression. Expected 5 standard fields (minute, hour, day, month, day-of-week).',
        tr: 'Geçersiz cron ifadesi. 5 alan bekleniyor (dakika, saat, gün, ay, haftanın günü).',
      },
      nextOccurrences: [],
      fields: { minute: '', hour: '', dayOfMonth: '', month: '', dayOfWeek: '' },
    };
  }

  const [min, hour, dom, mon, dow] = parts;

  let enDesc = 'Runs ';
  let trDesc = 'Çalışma zamanı: ';

  if (min === '*' && hour === '*') {
    enDesc += 'every minute';
    trDesc += 'Her dakika';
  } else if (min.startsWith('*/')) {
    const step = min.replace('*/', '');
    enDesc += 'every ' + step + ' minutes';
    trDesc += 'Her ' + step + ' dakikada bir';
  } else if (min === '0' && hour === '*') {
    enDesc += 'at minute 0 of every hour';
    trDesc += 'Her saatin başında (00. dakikada)';
  } else if (min === '0' && hour === '0') {
    enDesc += 'every day at midnight (00:00)';
    trDesc += 'Her gün gece yarısı (00:00)';
  } else {
    enDesc += 'at ' + hour + ':' + min.padStart(2, '0');
    trDesc += 'Saat ' + hour + ':' + min.padStart(2, '0');
  }

  if (dow !== '*') {
    enDesc += ' on day-of-week ' + dow;
    trDesc += ' haftanın ' + dow + '. günlerinde';
  }
  if (dom !== '*') {
    enDesc += ' on day ' + dom + ' of the month';
    trDesc += ' ayın ' + dom + '. gününde';
  }

  const now = new Date();
  const nextDates: string[] = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date(now.getTime() + i * 3600000 * (min.startsWith('*/') ? 0.25 : 1));
    nextDates.push(d.toUTCString());
  }

  return {
    isValid: true,
    humanReadable: {
      en: enDesc,
      tr: trDesc,
    },
    nextOccurrences: nextDates,
    fields: {
      minute: min,
      hour,
      dayOfMonth: dom,
      month: mon,
      dayOfWeek: dow,
    },
  };
}
