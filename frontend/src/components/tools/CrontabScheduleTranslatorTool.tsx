'use client';

import React, { useState, useMemo } from 'react';
import { Clock, Calendar, Globe } from 'lucide-react';
import { translateCronSchedule } from '@/lib/crontabScheduleTranslator';

export default function CrontabScheduleTranslatorTool() {
  const [expression, setExpression] = useState('*/15 0 1,15 * 1-5');

  const result = useMemo(() => {
    return translateCronSchedule(expression, 5);
  }, [expression]);

  const presets = [
    { label: 'Every 15 Minutes', expr: '*/15 * * * *' },
    { label: 'Every Hour', expr: '0 * * * *' },
    { label: 'Daily Midnight', expr: '0 0 * * *' },
    { label: 'Every Monday 9AM', expr: '0 9 * * 1' },
    { label: '1st of Month Midnight', expr: '0 0 1 * *' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">
          Enter Cron Expression (5 fields):
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="input input-bordered w-full font-mono text-sm"
            placeholder="* * * * *"
          />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {presets.map((p) => (
            <button
              key={p.expr}
              onClick={() => setExpression(p.expr)}
              className="btn btn-ghost btn-xs border border-border text-xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Globe className="w-4 h-4" /> English Description
          </div>
          <p className="text-sm font-medium text-foreground pt-1">{result.humanReadable.en}</p>
        </div>

        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Globe className="w-4 h-4" /> Türkçe Açıklama
          </div>
          <p className="text-sm font-medium text-foreground pt-1">{result.humanReadable.tr}</p>
        </div>
      </div>

      {result.isValid && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Next 5 Scheduled Executions
          </h3>
          <div className="space-y-1">
            {result.nextOccurrences.map((occ, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-border bg-card/60 flex items-center justify-between text-xs font-mono"
              >
                <span className="text-muted-foreground">Execution #{idx + 1}</span>
                <span className="font-semibold text-primary">{occ}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
