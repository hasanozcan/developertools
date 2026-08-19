'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Copy, Check } from 'lucide-react';
import { describeCron } from '@/lib/crontabDescriptor';
import { useLanguage } from '@/context/LanguageContext';

export default function CrontabDescriptorTool() {
  const { t } = useLanguage();
  const [expression, setExpression] = useState('*/15 * * * *');
  const [copied, setCopied] = useState(false);

  const description = useMemo(() => describeCron(expression), [expression]);

  const presets = [
    { label: 'Every Minute', expr: '* * * * *' },
    { label: 'Every 15 Minutes', expr: '*/15 * * * *' },
    { label: 'Every Hour', expr: '0 * * * *' },
    { label: 'Every Day (00:00)', expr: '0 0 * * *' },
    { label: 'Every Sunday', expr: '0 0 * * 0' },
    { label: '1st of Month', expr: '0 0 1 * *' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Expression Input Card */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.crondesc.title') || 'Crontab Expression Human Descriptor'}
          </h3>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="* * * * *"
            className="w-full px-4 py-3 text-lg font-mono text-center font-black rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400"
          />

          {/* Presets */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {presets.map((p) => (
              <button
                key={p.expr}
                onClick={() => setExpression(p.expr)}
                className={`px-3 py-1 text-xs font-semibold rounded-xl border transition ${
                  expression === p.expr
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Human Description Banner */}
      <div className="surface-card rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/40">
        <div className="p-3 rounded-full bg-indigo-600 text-white shadow-md">
          <Clock className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Natural Language Meaning</span>
        <h2 className="text-xl font-black text-slate-900 dark:text-white max-w-lg">
          &quot;{description}&quot;
        </h2>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Description'}</span>
        </button>
      </div>
    </div>
  );
}
