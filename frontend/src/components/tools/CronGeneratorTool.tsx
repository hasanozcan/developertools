'use client';

import React, { useState, useCallback } from 'react';
import { Clock, AlertCircle, Copy, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ParsedCron {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  expression: string;
  description: string;
}

const DAY_MAP: Record<string, number> = {
  'sunday': 0, 'sun': 0,
  'monday': 1, 'mon': 1,
  'tuesday': 2, 'tue': 2,
  'wednesday': 3, 'wed': 3,
  'thursday': 4, 'thu': 4,
  'friday': 5, 'fri': 5,
  'saturday': 6, 'sat': 6,
};

const MONTH_MAP: Record<string, number> = {
  'january': 1, 'jan': 1,
  'february': 2, 'feb': 2,
  'march': 3, 'mar': 3,
  'april': 4, 'apr': 4,
  'may': 5,
  'june': 6, 'jun': 6,
  'july': 7, 'jul': 7,
  'august': 8, 'aug': 8,
  'september': 9, 'sep': 9, 'sept': 9,
  'october': 10, 'oct': 10,
  'november': 11, 'nov': 11,
  'december': 12, 'dec': 12,
};

const parseNaturalLanguage = (input: string): ParsedCron | null => {
  const text = input.toLowerCase().trim();

  if (!text) return null;

  // Default values (every minute)
  let minute = '*';
  let hour = '*';
  let dayOfMonth = '*';
  let month = '*';
  let dayOfWeek = '*';
  let description = '';

  // Every minute
  if (text === 'every minute' || text === 'every minutes') {
    return {
      minute: '*',
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: '* * * * *',
      description: 'Every minute',
    };
  }

  // Every hour
  if (text === 'every hour' || text === 'every hours') {
    return {
      minute: '0',
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: '0 * * * *',
      description: 'Every hour at minute 0',
    };
  }

  // Every X minutes
  const minMatch = text.match(/^every\s+(\d+)\s+minute(s)?$/i);
  if (minMatch) {
    const mins = minMatch[1];
    return {
      minute: `*/${mins}`,
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: `*/${mins} * * * *`,
      description: `Every ${mins} minutes`,
    };
  }

  // Every X hours
  const hourMatch = text.match(/^every\s+(\d+)\s+hour(s)?$/i);
  if (hourMatch) {
    const hrs = hourMatch[1];
    return {
      minute: '0',
      hour: `*/${hrs}`,
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: `0 */${hrs} * * *`,
      description: `Every ${hrs} hours at minute 0`,
    };
  }

  // Weekdays at X (e.g., "weekdays at 8am", "weekdays at 9am")
  const weekdayAtMatch = text.match(/^weekdays\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (weekdayAtMatch) {
    let h = parseInt(weekdayAtMatch[1]);
    const mins = weekdayAtMatch[2] ? weekdayAtMatch[2] : '0';
    const period = weekdayAtMatch[3]?.toLowerCase();

    if (period === 'pm' && h < 12) h += 12;
    else if (period === 'am' && h === 12) h = 0;

    description = `At ${formatTime(h, parseInt(mins))} on weekdays (Mon-Fri)`;
    return {
      minute: mins,
      hour: h.toString(),
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '1-5',
      expression: `${mins} ${h} * * 1-5`,
      description,
    };
  }

  // Weekends at X
  const weekendAtMatch = text.match(/^weekends\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (weekendAtMatch) {
    let h = parseInt(weekendAtMatch[1]);
    const mins = weekendAtMatch[2] ? weekendAtMatch[2] : '0';
    const period = weekendAtMatch[3]?.toLowerCase();

    if (period === 'pm' && h < 12) h += 12;
    else if (period === 'am' && h === 12) h = 0;

    description = `At ${formatTime(h, parseInt(mins))} on weekends (Sat-Sun)`;
    return {
      minute: mins,
      hour: h.toString(),
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '0,6',
      expression: `${mins} ${h} * * 0,6`,
      description,
    };
  }

  // Every day at X (e.g., "every day at 9am", "every day at 3pm", "every day at 14:30")
  const everyDayAtMatch = text.match(/^every\s+day\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (everyDayAtMatch) {
    let h = parseInt(everyDayAtMatch[1]);
    const mins = everyDayAtMatch[2] ? everyDayAtMatch[2] : '0';
    const period = everyDayAtMatch[3]?.toLowerCase();

    if (period === 'pm' && h < 12) h += 12;
    else if (period === 'am' && h === 12) h = 0;

    description = `Every day at ${formatTime(h, parseInt(mins))}`;
    return {
      minute: mins,
      hour: h.toString(),
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: `${mins} ${h} * * *`,
      description,
    };
  }

  // At midnight
  if (text === 'every day at midnight' || text === 'midnight' || text === 'every midnight') {
    return {
      minute: '0',
      hour: '0',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: '0 0 * * *',
      description: 'Every day at midnight',
    };
  }

  // At noon
  if (text === 'every day at noon' || text === 'noon' || text === 'every noon') {
    return {
      minute: '0',
      hour: '12',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: '0 12 * * *',
      description: 'Every day at noon',
    };
  }

  // Every [dayname] at X (e.g., "every monday at 3pm", "every tuesday at 9am")
  const everyDayNameAtMatch = text.match(/^every\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (everyDayNameAtMatch) {
    const dayName = everyDayNameAtMatch[1];
    const dayNum = DAY_MAP[dayName];
    let h = parseInt(everyDayNameAtMatch[2]);
    const mins = everyDayNameAtMatch[3] ? everyDayNameAtMatch[3] : '0';
    const period = everyDayNameAtMatch[4]?.toLowerCase();

    if (period === 'pm' && h < 12) h += 12;
    else if (period === 'am' && h === 12) h = 0;

    const dayFullName = Object.entries(DAY_MAP).find(([k, v]) => v === dayNum && k.length > 2)?.[0] || dayName;
    description = `Every ${dayFullName.charAt(0).toUpperCase() + dayFullName.slice(1)} at ${formatTime(h, parseInt(mins))}`;
    return {
      minute: mins,
      hour: h.toString(),
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: dayNum.toString(),
      expression: `${mins} ${h} * * ${dayNum}`,
      description,
    };
  }

  // Every [dayname]
  const everyDayNameMatch = text.match(/^every\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)$/i);
  if (everyDayNameMatch) {
    const dayName = everyDayNameMatch[1];
    const dayNum = DAY_MAP[dayName];
    const dayFullName = Object.entries(DAY_MAP).find(([k, v]) => v === dayNum && k.length > 2)?.[0] || dayName;

    return {
      minute: '0',
      hour: '0',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: dayNum.toString(),
      expression: `0 0 * * ${dayNum}`,
      description: `Every ${dayFullName.charAt(0).toUpperCase() + dayFullName.slice(1)} at midnight`,
    };
  }

  // First of month at noon
  if (text === 'first of month at noon' || text === 'first of the month at noon') {
    return {
      minute: '0',
      hour: '12',
      dayOfMonth: '1',
      month: '*',
      dayOfWeek: '*',
      expression: '0 12 1 * *',
      description: 'First of every month at noon',
    };
  }

  // First of month at midnight
  if (text === 'first of month at midnight' || text === 'first of the month at midnight') {
    return {
      minute: '0',
      hour: '0',
      dayOfMonth: '1',
      month: '*',
      dayOfWeek: '*',
      expression: '0 0 1 * *',
      description: 'First of every month at midnight',
    };
  }

  // First of month at X
  const firstOfMonthAtMatch = text.match(/^first\s+of\s+(month|the\s+month)\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (firstOfMonthAtMatch) {
    let h = parseInt(firstOfMonthAtMatch[2]);
    const mins = firstOfMonthAtMatch[3] ? firstOfMonthAtMatch[3] : '0';
    const period = firstOfMonthAtMatch[4]?.toLowerCase();

    if (period === 'pm' && h < 12) h += 12;
    else if (period === 'am' && h === 12) h = 0;

    description = `First of every month at ${formatTime(h, parseInt(mins))}`;
    return {
      minute: mins,
      hour: h.toString(),
      dayOfMonth: '1',
      month: '*',
      dayOfWeek: '*',
      expression: `${mins} ${h} 1 * *`,
      description,
    };
  }

  // At X (e.g., "at 9am", "at 14:30")
  const atMatch = text.match(/^at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (atMatch) {
    let h = parseInt(atMatch[1]);
    const mins = atMatch[2] ? atMatch[2] : '0';
    const period = atMatch[3]?.toLowerCase();

    if (period === 'pm' && h < 12) h += 12;
    else if (period === 'am' && h === 12) h = 0;

    description = `Every day at ${formatTime(h, parseInt(mins))}`;
    return {
      minute: mins,
      hour: h.toString(),
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: `${mins} ${h} * * *`,
      description,
    };
  }

  // Hourly at minute X (e.g., "hourly at 30")
  const hourlyAtMatch = text.match(/^hourly\s+at\s+(\d+)$/i);
  if (hourlyAtMatch) {
    const mins = hourlyAtMatch[1];
    return {
      minute: mins,
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      expression: `${mins} * * * *`,
      description: `Every hour at minute ${mins}`,
    };
  }

  return null;
};

const formatTime = (hour: number, minute: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
};

const presets = [
  { label: 'Every minute', description: 'Every minute', expression: '* * * * *' },
  { label: 'Every hour', description: 'Every hour at minute 0', expression: '0 * * * *' },
  { label: 'Every day at midnight', description: 'Every day at midnight', expression: '0 0 * * *' },
  { label: 'Every Monday', description: 'Every Monday at midnight', expression: '0 0 * * 1' },
  { label: 'Every weekday at 9am', description: 'Weekdays at 9am', expression: '0 9 * * 1-5' },
  { label: 'First of month at noon', description: 'First of every month at noon', expression: '0 12 1 * *' },
];

const fieldInfo = [
  { name: 'Minute', range: '0-59', special: '* , - /' },
  { name: 'Hour', range: '0-23', special: '* , - /' },
  { name: 'Day of Month', range: '1-31', special: '* , - /' },
  { name: 'Month', range: '1-12', special: '* , - /' },
  { name: 'Day of Week', range: '0-6 (Sun-Sat)', special: '* , - /' },
];

export default function CronGeneratorTool() {
  const { t } = useLanguage();
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<ParsedCron | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!description.trim()) {
      setResult(null);
      setError('');
      return;
    }

    const parsed = parseNaturalLanguage(description);
    if (parsed) {
      setResult(parsed);
      setError('');
    } else {
      setResult(null);
      setError('Could not understand the description. Try phrases like "every day at 9am" or "every monday at 3pm"');
    }
  }, [description]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const handlePreset = (preset: typeof presets[0]) => {
    setDescription(preset.description);
    const parsed = parseNaturalLanguage(preset.description);
    if (parsed) {
      setResult(parsed);
      setError('');
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.expression);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Natural Language Description
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., every day at 9am, every monday at 3pm, every 5 minutes"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate
          </button>
        </div>
      </div>

      {/* Example hints */}
      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <p>Try these patterns:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><code className="text-primary-600 dark:text-primary-400">every day at 9am</code> - Daily at specific time</li>
          <li><code className="text-primary-600 dark:text-primary-400">every monday at 3pm</code> - Weekly on specific day</li>
          <li><code className="text-primary-600 dark:text-primary-400">every 5 minutes</code> - Interval-based</li>
          <li><code className="text-primary-600 dark:text-primary-400">weekdays at 8am</code> - Weekdays only</li>
          <li><code className="text-primary-600 dark:text-primary-400">first of month at noon</code> - Monthly on specific date</li>
        </ul>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Generated Expression */}
          <div className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 border border-primary-200 dark:border-primary-800 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="font-medium text-primary-700 dark:text-primary-300">Generated Cron Expression</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="text-center mb-4">
              <code className="text-3xl font-mono font-bold text-primary-600 dark:text-primary-400">{result.expression}</code>
            </div>

            {/* Field Labels */}
            <div className="grid grid-cols-5 gap-2 text-center mb-4">
              {['Minute', 'Hour', 'Day', 'Month', 'Weekday'].map((label, i) => (
                <div key={label} className="bg-white/50 dark:bg-gray-800/50 rounded py-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
                  <div className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                    {result.expression.split(' ')[i]}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-primary-700 dark:text-primary-300 font-medium">{result.description}</p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <span className="font-medium text-gray-700 dark:text-gray-300">Cron Fields Breakdown</span>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-600">
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Minute</span>
                <code className="font-mono text-primary-600 dark:text-primary-400">{result.minute}</code>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Hour</span>
                <code className="font-mono text-primary-600 dark:text-primary-400">{result.hour}</code>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Day of Month</span>
                <code className="font-mono text-primary-600 dark:text-primary-400">{result.dayOfMonth}</code>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Month</span>
                <code className="font-mono text-primary-600 dark:text-primary-400">{result.month}</code>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Day of Week</span>
                <code className="font-mono text-primary-600 dark:text-primary-400">{result.dayOfWeek}</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Presets
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.expression}
              onClick={() => handlePreset(preset)}
              className="p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            >
              <div className="font-medium text-sm text-gray-800 dark:text-gray-200">{preset.label}</div>
              <div className="font-mono text-xs text-primary-600 dark:text-primary-400 mt-1">{preset.expression}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Field Reference */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <span className="font-medium text-gray-700 dark:text-gray-300">Cron Field Reference</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Field</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Range</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Special Characters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {fieldInfo.map((field) => (
                <tr key={field.name}>
                  <td className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300">{field.name}</td>
                  <td className="px-4 py-2 font-mono text-gray-600 dark:text-gray-400">{field.range}</td>
                  <td className="px-4 py-2 font-mono text-gray-600 dark:text-gray-400">{field.special}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:divide-gray-600 text-sm text-gray-600 dark:text-gray-400">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div><code className="text-primary-600 dark:text-primary-400">*</code> = any value</div>
            <div><code className="text-primary-600 dark:text-primary-400">,</code> = value list</div>
            <div><code className="text-primary-600 dark:text-primary-400">-</code> = range</div>
            <div><code className="text-primary-600 dark:text-primary-400">/</code> = step</div>
          </div>
        </div>
      </div>
    </div>
  );
}
