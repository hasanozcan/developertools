'use client';
import React, { useState, useMemo } from 'react';
import { generatePrometheusAlert } from '@/lib/prometheusAlertBuilder';

export default function PrometheusAlertBuilderTool() {
  const [name, setName] = useState('HighCpuUsage');
  const alert = useMemo(() => generatePrometheusAlert({ alertName: name, expr: 'node_cpu_seconds_total > 0.85' }), [name]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border p-2 text-xs" />
        <textarea readOnly rows={12} value={alert} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
