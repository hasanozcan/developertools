'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Clock, Calendar, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CronGeneratorTool() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'minutes' | 'hourly' | 'daily' | 'weekly' | 'monthly'>('minutes');
  
  // Minute state
  const [everyNMinutes, setEveryNMinutes] = useState(15);
  
  // Hourly state
  const [everyNHours, setEveryNHours] = useState(2);
  const [hourlyAtMinute, setHourlyAtMinute] = useState(0);

  // Daily state
  const [dailyHour, setDailyHour] = useState(9);
  const [dailyMinute, setDailyMinute] = useState(30);

  // Weekly state
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]); // Mon-Fri
  const [weeklyHour, setWeeklyHour] = useState(8);
  const [weeklyMinute, setWeeklyMinute] = useState(0);

  // Monthly state
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [monthlyHour, setMonthlyHour] = useState(0);
  const [monthlyMinute, setMonthlyMinute] = useState(0);

  const [copied, setCopied] = useState(false);

  const { expression, humanReadable } = useMemo(() => {
    if (tab === 'minutes') {
      return {
        expression: `*/${everyNMinutes} * * * *`,
        humanReadable: `Runs every ${everyNMinutes} minutes`,
      };
    }
    if (tab === 'hourly') {
      return {
        expression: `${hourlyAtMinute} */${everyNHours} * * *`,
        humanReadable: `Runs every ${everyNHours} hours at minute ${hourlyAtMinute}`,
      };
    }
    if (tab === 'daily') {
      return {
        expression: `${dailyMinute} ${dailyHour} * * *`,
        humanReadable: `Runs every day at ${String(dailyHour).padStart(2, '0')}:${String(dailyMinute).padStart(2, '0')}`,
      };
    }
    if (tab === 'weekly') {
      const daysStr = selectedDays.length === 7 ? '*' : selectedDays.sort((a, b) => a - b).join(',');
      return {
        expression: `${weeklyMinute} ${weeklyHour} * * ${daysStr || '*'}`,
        humanReadable: `Runs weekly on selected days at ${String(weeklyHour).padStart(2, '0')}:${String(weeklyMinute).padStart(2, '0')}`,
      };
    }
    if (tab === 'monthly') {
      return {
        expression: `${monthlyMinute} ${monthlyHour} ${dayOfMonth} * *`,
        humanReadable: `Runs on day ${dayOfMonth} of every month at ${String(monthlyHour).padStart(2, '0')}:${String(monthlyMinute).padStart(2, '0')}`,
      };
    }
    return { expression: '* * * * *', humanReadable: 'Runs every minute' };
  }, [tab, everyNMinutes, everyNHours, hourlyAtMinute, dailyHour, dailyMinute, selectedDays, weeklyHour, weeklyMinute, dayOfMonth, monthlyHour, monthlyMinute]);

  const toggleDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const daysOfWeek = [
    { num: 0, label: 'Sun' },
    { num: 1, label: 'Mon' },
    { num: 2, label: 'Tue' },
    { num: 3, label: 'Wed' },
    { num: 4, label: 'Thu' },
    { num: 5, label: 'Fri' },
    { num: 6, label: 'Sat' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5">
        {(['minutes', 'hourly', 'daily', 'weekly', 'monthly'] as const).map((tTab) => (
          <button
            key={tTab}
            onClick={() => setTab(tTab)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold capitalize transition ${
              tab === tTab
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {tTab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 rounded-3xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-900">
        {tab === 'minutes' && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Run every N minutes:
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 5, 10, 15, 20, 30, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setEveryNMinutes(mins)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold border ${
                    everyNMinutes === mins
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  Every {mins} min{mins > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'hourly' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Every N hours:
              </label>
              <input
                type="number"
                min={1}
                max={23}
                value={everyNHours}
                onChange={(e) => setEveryNHours(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                At minute past the hour (0-59):
              </label>
              <input
                type="number"
                min={0}
                max={59}
                value={hourlyAtMinute}
                onChange={(e) => setHourlyAtMinute(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        )}

        {tab === 'daily' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Hour of Day (0-23):
              </label>
              <input
                type="number"
                min={0}
                max={23}
                value={dailyHour}
                onChange={(e) => setDailyHour(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Minute (0-59):
              </label>
              <input
                type="number"
                min={0}
                max={59}
                value={dailyMinute}
                onChange={(e) => setDailyMinute(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        )}

        {tab === 'weekly' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Days of Week:
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.num}
                    onClick={() => toggleDay(day.num)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold border ${
                      selectedDays.includes(day.num)
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Hour (0-23):
                </label>
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={weeklyHour}
                  onChange={(e) => setWeeklyHour(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Minute (0-59):
                </label>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={weeklyMinute}
                  onChange={(e) => setWeeklyMinute(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {tab === 'monthly' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Day of Month (1-31):
              </label>
              <input
                type="number"
                min={1}
                max={31}
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Hour (0-23):
              </label>
              <input
                type="number"
                min={0}
                max={23}
                value={monthlyHour}
                onChange={(e) => setMonthlyHour(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Minute (0-59):
              </label>
              <input
                type="number"
                min={0}
                max={59}
                value={monthlyMinute}
                onChange={(e) => setMonthlyMinute(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Result Display */}
      <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-slate-900/60">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Generated Cron Expression
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy Expression'}
          </button>
        </div>

        <div className="rounded-2xl bg-white p-4 font-mono text-xl font-bold tracking-widest text-indigo-600 shadow-inner dark:bg-slate-800 dark:text-indigo-300 text-center select-all">
          {expression}
        </div>

        <p className="mt-3 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
          💡 {humanReadable}
        </p>
      </div>
    </div>
  );
}
