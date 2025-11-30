'use client';

import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Calendar, Play, Copy, Check, FileText } from 'lucide-react';

interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

interface NextRun {
  date: Date;
  formatted: string;
}

export default function CronParserTool() {
  const [expression, setExpression] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [nextRuns, setNextRuns] = useState<NextRun[]>([]);
  const [copied, setCopied] = useState(false);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const parsePart = (part: string, min: number, max: number): number[] => {
    const values: number[] = [];

    if (part === '*') {
      for (let i = min; i <= max; i++) values.push(i);
      return values;
    }

    const segments = part.split(',');
    for (const segment of segments) {
      if (segment.includes('/')) {
        const [range, step] = segment.split('/');
        const stepNum = parseInt(step);
        let start = min;
        let end = max;
        
        if (range !== '*') {
          if (range.includes('-')) {
            [start, end] = range.split('-').map(Number);
          } else {
            start = parseInt(range);
          }
        }
        
        for (let i = start; i <= end; i += stepNum) values.push(i);
      } else if (segment.includes('-')) {
        const [start, end] = segment.split('-').map(Number);
        for (let i = start; i <= end; i++) values.push(i);
      } else {
        values.push(parseInt(segment));
      }
    }

    return Array.from(new Set(values)).sort((a, b) => a - b);
  };

  const describePart = (part: string, type: 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek'): string => {
    if (part === '*') {
      return type === 'minute' ? 'every minute' :
             type === 'hour' ? 'every hour' :
             type === 'dayOfMonth' ? 'every day' :
             type === 'month' ? 'every month' :
             'every day of the week';
    }

    if (part.includes('/')) {
      const [, step] = part.split('/');
      return `every ${step} ${type === 'minute' ? 'minutes' : type === 'hour' ? 'hours' : type === 'dayOfMonth' ? 'days' : type === 'month' ? 'months' : 'days'}`;
    }

    if (type === 'dayOfWeek') {
      const days = part.split(',').map(d => {
        if (d.includes('-')) {
          const [start, end] = d.split('-').map(Number);
          return `${dayNames[start]} to ${dayNames[end]}`;
        }
        return dayNames[parseInt(d)];
      });
      return days.join(', ');
    }

    if (type === 'month') {
      const months = part.split(',').map(m => {
        if (m.includes('-')) {
          const [start, end] = m.split('-').map(Number);
          return `${monthNames[start - 1]} to ${monthNames[end - 1]}`;
        }
        return monthNames[parseInt(m) - 1];
      });
      return months.join(', ');
    }

    return part;
  };

  const generateDescription = (parts: CronParts): string => {
    const { minute, hour, dayOfMonth, month, dayOfWeek } = parts;
    
    let desc = 'At ';
    
    // Time
    if (minute === '*' && hour === '*') {
      desc = 'Every minute';
    } else if (minute === '0' && hour === '*') {
      desc = 'Every hour';
    } else if (minute === '*') {
      desc = `Every minute during hour ${hour}`;
    } else if (hour === '*') {
      desc = `At minute ${minute} of every hour`;
    } else {
      const hourNum = parseInt(hour);
      const minNum = parseInt(minute);
      const period = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
      desc = `At ${displayHour}:${minNum.toString().padStart(2, '0')} ${period}`;
    }

    // Day of month
    if (dayOfMonth !== '*') {
      desc += `, on day ${dayOfMonth} of the month`;
    }

    // Month
    if (month !== '*') {
      desc += ` in ${describePart(month, 'month')}`;
    }

    // Day of week
    if (dayOfWeek !== '*') {
      desc += `, only on ${describePart(dayOfWeek, 'dayOfWeek')}`;
    }

    return desc;
  };

  const calculateNextRuns = (parts: CronParts, count: number = 5): NextRun[] => {
    const runs: NextRun[] = [];
    const now = new Date();
    let current = new Date(now);
    current.setSeconds(0);
    current.setMilliseconds(0);

    const minutes = parsePart(parts.minute, 0, 59);
    const hours = parsePart(parts.hour, 0, 23);
    const daysOfMonth = parsePart(parts.dayOfMonth, 1, 31);
    const months = parsePart(parts.month, 1, 12);
    const daysOfWeek = parsePart(parts.dayOfWeek, 0, 6);

    let iterations = 0;
    const maxIterations = 10000;

    while (runs.length < count && iterations < maxIterations) {
      iterations++;
      current.setMinutes(current.getMinutes() + 1);

      const matchMinute = minutes.includes(current.getMinutes());
      const matchHour = hours.includes(current.getHours());
      const matchDayOfMonth = parts.dayOfMonth === '*' || daysOfMonth.includes(current.getDate());
      const matchMonth = parts.month === '*' || months.includes(current.getMonth() + 1);
      const matchDayOfWeek = parts.dayOfWeek === '*' || daysOfWeek.includes(current.getDay());

      if (matchMinute && matchHour && matchDayOfMonth && matchMonth && matchDayOfWeek) {
        runs.push({
          date: new Date(current),
          formatted: current.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
      }
    }

    return runs;
  };

  const parseCron = (expr: string) => {
    const trimmed = expr.trim();
    if (!trimmed) {
      setDescription('');
      setError('');
      setNextRuns([]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    if (parts.length !== 5) {
      setError('Invalid cron expression. Must have exactly 5 fields: minute hour day-of-month month day-of-week');
      setDescription('');
      setNextRuns([]);
      return;
    }

    try {
      const cronParts: CronParts = {
        minute: parts[0],
        hour: parts[1],
        dayOfMonth: parts[2],
        month: parts[3],
        dayOfWeek: parts[4],
      };

      const desc = generateDescription(cronParts);
      setDescription(desc);
      setError('');

      const runs = calculateNextRuns(cronParts);
      setNextRuns(runs);
    } catch (err) {
      setError('Failed to parse cron expression');
      setDescription('');
      setNextRuns([]);
    }
  };

  useEffect(() => {
    parseCron(expression);
  }, [expression]);

  const loadPreset = (expr: string) => {
    setExpression(expr);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: 'Every minute', expr: '* * * * *' },
    { label: 'Every hour', expr: '0 * * * *' },
    { label: 'Every day at midnight', expr: '0 0 * * *' },
    { label: 'Every day at noon', expr: '0 12 * * *' },
    { label: 'Every Monday at 9 AM', expr: '0 9 * * 1' },
    { label: 'Every weekday at 6 PM', expr: '0 18 * * 1-5' },
    { label: 'First day of month', expr: '0 0 1 * *' },
    { label: 'Every 15 minutes', expr: '*/15 * * * *' },
    { label: 'Every 6 hours', expr: '0 */6 * * *' },
    { label: 'Weekends at 10 AM', expr: '0 10 * * 0,6' },
  ];

  const fieldInfo = [
    { name: 'Minute', range: '0-59', special: '* , - /' },
    { name: 'Hour', range: '0-23', special: '* , - /' },
    { name: 'Day of Month', range: '1-31', special: '* , - /' },
    { name: 'Month', range: '1-12', special: '* , - /' },
    { name: 'Day of Week', range: '0-6 (Sun-Sat)', special: '* , - /' },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cron Expression
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="* * * * *"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            onClick={copyToClipboard}
            disabled={!expression}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            title="Copy expression"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Field Labels */}
        <div className="grid grid-cols-5 gap-2 mt-2 text-center">
          {['Minute', 'Hour', 'Day', 'Month', 'Weekday'].map((label) => (
            <span key={label} className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-700 dark:text-green-300">Schedule Description</span>
          </div>
          <p className="text-green-800 dark:text-green-200 text-lg">{description}</p>
        </div>
      )}

      {/* Next Runs */}
      {nextRuns.length > 0 && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Play className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Next 5 Runs</span>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-600">
            {nextRuns.map((run, index) => (
              <div key={index} className="px-4 py-3 flex items-center gap-3">
                <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{run.formatted}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Common Presets
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.expr}
              onClick={() => loadPreset(preset.expr)}
              className="p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            >
              <div className="font-mono text-sm text-primary-600 dark:text-primary-400">{preset.expr}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{preset.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Field Reference */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Field Reference</span>
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
            <div><code className="text-primary-600 dark:text-primary-400">/</code> = step values</div>
          </div>
        </div>
      </div>
    </div>
  );
}
