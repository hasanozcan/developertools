'use client';

import React, { useState, useMemo } from 'react';
import { Cpu, RefreshCw, Copy, Check } from 'lucide-react';
import { generateMacAddress, type MacFormat, type MacOptions } from '@/lib/macAddress';
import { useLanguage } from '@/context/LanguageContext';

export default function MacAddressTool() {
  const { t } = useLanguage();
  const [format, setFormat] = useState<MacFormat>('colon');
  const [caseType, setCaseType] = useState<'upper' | 'lower'>('upper');
  const [isUnicast, setIsUnicast] = useState(true);
  const [count, setCount] = useState(5);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const generatedList = useMemo(() => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      void (seed + i);
      list.push(generateMacAddress({ format, caseType, isUnicast }));
    }
    return list;
  }, [format, caseType, isUnicast, count, seed]);

  const outputText = generatedList.join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.mac.title') || 'Random MAC Address Generator'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Separator Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as MacFormat)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            >
              <option value="colon">Colon (00:1A:2B:3C:4D:5E)</option>
              <option value="hyphen">Hyphen (00-1A-2B-3C-4D-5E)</option>
              <option value="cisco">Cisco Dot (001a.2b3c.4d5e)</option>
              <option value="none">No Separator (001A2B3C4D5E)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Letter Case</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value as 'upper' | 'lower')}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            >
              <option value="upper">UPPERCASE (00:1A:...)</option>
              <option value="lower">lowercase (00:1a:...)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Quantity</label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            >
              <option value="1">1 Address</option>
              <option value="5">5 Addresses</option>
              <option value="10">10 Addresses</option>
              <option value="25">25 Addresses</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated MAC Output Display */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Generated MAC Address List
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy All')}
          </button>
        </div>

        <textarea
          readOnly
          value={outputText}
          rows={Math.max(5, count)}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950"
        />
      </div>
    </div>
  );
}
