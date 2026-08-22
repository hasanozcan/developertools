'use client';
import React, { useState, useMemo } from 'react';
import { convertCronTimezone } from '@/lib/cronTimezoneConverter';

export default function CronTimezoneConverterTool() {
  const [cron, setCron] = useState('30 18 * * 1');
  const converted = useMemo(() => convertCronTimezone(cron, 3, 0), [cron]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={cron} onChange={(e) => setCron(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">UTC Cron: {converted}</div>
      </div>
    </div>
  );
}
