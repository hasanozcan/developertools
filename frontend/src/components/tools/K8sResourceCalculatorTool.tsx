'use client';
import React, { useState } from 'react';
import { calculateK8sPodQos } from '@/lib/k8sResourceCalculator';
import { Copy, Check } from 'lucide-react';

export default function K8sResourceCalculatorTool() {
  const [cpuReq, setCpuReq] = useState(250);
  const [cpuLim, setCpuLim] = useState(500);
  const [memReq, setMemReq] = useState(256);
  const [memLim, setMemLim] = useState(512);
  const [copied, setCopied] = useState(false);

  const result = calculateK8sPodQos({ cpuRequest: cpuReq, cpuLimit: cpuLim, memoryRequest: memReq, memoryLimit: memLim });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-500">CPU Request (m)</label>
          <input type="number" value={cpuReq} onChange={(e) => setCpuReq(parseInt(e.target.value, 10) || 0)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">CPU Limit (m)</label>
          <input type="number" value={cpuLim} onChange={(e) => setCpuLim(parseInt(e.target.value, 10) || 0)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">RAM Request (Mi)</label>
          <input type="number" value={memReq} onChange={(e) => setMemReq(parseInt(e.target.value, 10) || 0)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">RAM Limit (Mi)</label>
          <input type="number" value={memLim} onChange={(e) => setMemLim(parseInt(e.target.value, 10) || 0)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>

      <div className="rounded-2xl bg-indigo-50/50 p-4 border border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/40 text-center font-semibold text-indigo-700 dark:text-indigo-300 text-sm">
        {result.summary}
      </div>

      <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-auto">
        {result.yaml}
      </pre>
    </div>
  );
}
