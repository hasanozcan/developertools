'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateBlake3 } from '@/lib/blake3HashGenerator';

const SAMPLE = 'The quick brown fox jumps over the lazy dog';

export default function Blake3HashGeneratorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    calculateBlake3(input)
      .then((digest) => {
        if (!active) return;
        setOutput(digest);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setOutput(err instanceof Error ? err.message : 'BLAKE3 computation error');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [input]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('uiText.5f1a5627')}</label>
            <button onClick={() => setInput(SAMPLE)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
              {t('common.loadSample')}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('uiText.c99f8ad0')}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={loading && !output ? '...' : output}
            readOnly
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
          />
        </div>
      </div>
    </div>
  );
}
