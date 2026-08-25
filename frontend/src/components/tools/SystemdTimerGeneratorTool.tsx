'use client';
import React, { useState } from 'react';
import { generateSystemdUnit } from '@/lib/systemdTimerGenerator';
import { Copy, Check } from 'lucide-react';

export default function SystemdTimerGeneratorTool() {
  const [serviceName, setServiceName] = useState('app-backup');
  const [desc, setDesc] = useState('Daily Database and Storage Backup');
  const [execPath, setExecPath] = useState('/opt/scripts/backup.sh');
  const [sched, setSched] = useState('daily');
  const [copied, setCopied] = useState(false);

  const result = generateSystemdUnit({ serviceName, description: desc, execPath, user: 'root', calendarSchedule: sched });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-500">Service Name</label>
          <input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">Description</label>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">ExecStart Script</label>
          <input value={execPath} onChange={(e) => setExecPath(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">OnCalendar</label>
          <input value={sched} onChange={(e) => setSched(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase">{serviceName}.service</label>
          <pre className="h-[200px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 dark:border-white/10">
            {result.serviceFile}
          </pre>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase">{serviceName}.timer</label>
          <pre className="h-[200px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-cyan-400 dark:border-white/10">
            {result.timerFile}
          </pre>
        </div>
      </div>
    </div>
  );
}
