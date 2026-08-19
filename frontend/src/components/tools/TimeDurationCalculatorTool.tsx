'use client';

import React, { useState, useMemo } from 'react';
import { Clock, ArrowRightLeft, Calendar } from 'lucide-react';
import { calculateDateDifference, convertTimeUnits } from '@/lib/timeDuration';
import { useLanguage } from '@/context/LanguageContext';

export default function TimeDurationCalculatorTool() {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState('2026-01-01T00:00');
  const [endDate, setEndDate] = useState('2026-08-19T13:00');

  const [unitValue, setUnitValue] = useState(24);
  const [fromUnit, setFromUnit] = useState<'ms' | 's' | 'min' | 'h' | 'd'>('h');

  const dateDiff = useMemo(() => {
    return calculateDateDifference(startDate, endDate);
  }, [startDate, endDate]);

  const convertedUnits = useMemo(() => {
    return convertTimeUnits(unitValue, fromUnit);
  }, [unitValue, fromUnit]);

  return (
    <div className="space-y-6">
      {/* Date Difference Calculator */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.duration.dateDiffTitle') || 'Date & Timestamp Difference Calculator'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Start Date & Time</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">End Date & Time</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Human Readable Difference Banner */}
        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Exact Elapsed Duration:</span>
          <span className="font-mono text-base font-black text-indigo-600 dark:text-indigo-400 text-center sm:text-right">
            {dateDiff.humanReadable}
          </span>
        </div>

        {/* Breakdown Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { label: 'Total Days', val: dateDiff.totalDays.toLocaleString() },
            { label: 'Total Hours', val: dateDiff.totalHours.toLocaleString() },
            { label: 'Total Minutes', val: dateDiff.totalMinutes.toLocaleString() },
            { label: 'Total Seconds', val: dateDiff.totalSeconds.toLocaleString() },
          ].map((item) => (
            <div key={item.label} className="p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {item.label}
              </span>
              <span className="font-mono text-sm font-black text-slate-900 dark:text-white truncate block">
                {item.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Converter Section */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-emerald-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.duration.unitConvertTitle') || 'Time Unit Conversion Matrix'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-500 block mb-1">Amount</label>
            <input
              type="number"
              value={unitValue}
              onChange={(e) => setUnitValue(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as typeof fromUnit)}
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="ms">Milliseconds (ms)</option>
              <option value="s">Seconds (s)</option>
              <option value="min">Minutes (min)</option>
              <option value="h">Hours (h)</option>
              <option value="d">Days (d)</option>
            </select>
          </div>
        </div>

        {/* Conversion Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {[
            { label: 'Milliseconds', val: convertedUnits.milliseconds.toLocaleString() },
            { label: 'Seconds', val: convertedUnits.seconds.toLocaleString() },
            { label: 'Minutes', val: convertedUnits.minutes.toLocaleString() },
            { label: 'Hours', val: convertedUnits.hours.toLocaleString() },
            { label: 'Days', val: convertedUnits.days.toLocaleString() },
          ].map((item) => (
            <div key={item.label} className="p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {item.label}
              </span>
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 truncate block">
                {item.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
