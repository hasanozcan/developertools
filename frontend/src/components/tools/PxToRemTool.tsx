'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowRightLeft, Sparkles } from 'lucide-react';
import { convertPxToUnits, convertRemToPx, COMMON_PX_SCALE } from '@/lib/pxToRem';
import { useLanguage } from '@/context/LanguageContext';

export default function PxToRemTool() {
  const { t } = useLanguage();
  const [baseSize, setBaseSize] = useState<number>(16);
  const [pxInput, setPxInput] = useState<string>('24');
  const [remInput, setRemInput] = useState<string>('1.5');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const units = useMemo(() => {
    const pxNum = parseFloat(pxInput) || 0;
    return convertPxToUnits(pxNum, baseSize);
  }, [pxInput, baseSize]);

  const handlePxChange = (val: string) => {
    setPxInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setRemInput((num / (baseSize || 16)).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const handleRemChange = (val: string) => {
    setRemInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setPxInput(convertRemToPx(num, baseSize).toString());
    }
  };

  const copyValue = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-8">
      {/* Base Font Size Setting */}
      <div className="surface-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {t('tool.pxtorem.baseSize') || 'Root Font Size (Base)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('tool.pxtorem.baseSizeDesc') || 'Default root HTML font-size (usually 16px)'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="128"
            value={baseSize}
            onChange={(e) => setBaseSize(parseFloat(e.target.value) || 16)}
            className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-center text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
          />
          <span className="text-sm font-semibold text-slate-500">px</span>
        </div>
      </div>

      {/* Interactive 2-way Converter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pixels (PX)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={pxInput}
              onChange={(e) => handlePxChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-2xl font-bold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              placeholder="16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">px</span>
          </div>
        </div>

        <div className="surface-card rounded-2xl p-6 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Root EM (REM)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={remInput}
              onChange={(e) => handleRemChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-2xl font-bold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              placeholder="1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-indigo-500">rem</span>
          </div>
        </div>
      </div>

      {/* All CSS Units Conversion Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'REM', value: units.rem, key: 'rem' },
          { label: 'EM', value: units.em, key: 'em' },
          { label: 'Percentage', value: units.percent, key: 'percent' },
          { label: 'Points (PT)', value: units.pt, key: 'pt' },
          { label: 'VW (1920px)', value: units.vw, key: 'vw' },
          { label: 'VH (1080px)', value: units.vh, key: 'vh' },
        ].map(({ label, value, key }) => (
          <div key={key} className="surface-card rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">{label}</span>
            <div className="flex items-center justify-between mt-2">
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">{value}</span>
              <button
                onClick={() => copyValue(value, key)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                title="Copy"
              >
                {copiedKey === key ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Common Scale Table */}
      <div className="surface-card rounded-2xl p-6">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
          {t('tool.pxtorem.scaleTable') || 'Common Tailwind & CSS Scale Table'}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          {COMMON_PX_SCALE.map((px) => {
            const rem = (px / baseSize).toFixed(4).replace(/\.?0+$/, '');
            return (
              <button
                key={px}
                onClick={() => handlePxChange(px.toString())}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition text-left"
              >
                <span className="font-medium text-slate-600 dark:text-slate-400">{px}px</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{rem}rem</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
