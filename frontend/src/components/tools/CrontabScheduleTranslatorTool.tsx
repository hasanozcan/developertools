'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Clock, Calendar, Globe } from 'lucide-react';
import { translateCronSchedule } from '@/lib/crontabScheduleTranslator';
import { localizeUiText } from '@/lib/localizedText';

export default function CrontabScheduleTranslatorTool() {
  const { t } = useLanguage();
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("uiText.c35191a0")}</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="* * * * *"
          />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {presets.map((p) => (
            <button
              key={p.expr}
              onClick={() => setExpression(p.expr)}
              className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {localizeUiText(p.label, t)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-primary-200 bg-primary-50/70 dark:border-primary-800 dark:bg-primary-950/30 space-y-1">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-xs uppercase tracking-wider">
            <Globe className="w-4 h-4" /> {t("uiText.1ab92885")}</div>
          <p className="text-sm font-medium text-gray-900 dark:text-white pt-1">{result.humanReadable.en}</p>
        </div>

        <div className="p-4 rounded-xl border border-primary-200 bg-primary-50/70 dark:border-primary-800 dark:bg-primary-950/30 space-y-1">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-xs uppercase tracking-wider">
            <Globe className="w-4 h-4" /> {t("uiText.abceb483")}</div>
          <p className="text-sm font-medium text-gray-900 dark:text-white pt-1">{result.humanReadable.tr}</p>
        </div>
      </div>

      {result.isValid && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {t("uiText.f95bf857")}</h3>
          <div className="space-y-1">
            {result.nextOccurrences.map((occ, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/60 flex items-center justify-between text-xs font-mono"
              >
                <span className="text-gray-500 dark:text-gray-400">{t("uiText.a00aa704")}{idx + 1}</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">{occ}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
