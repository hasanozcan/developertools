'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sliders, Type, RefreshCw } from 'lucide-react';
import { calculateCssClamp } from '@/lib/cssHelpers';
import { useLanguage } from '@/context/LanguageContext';

export default function CssClampTool() {
  const { t } = useLanguage();
  const [minWidth, setMinWidth] = useState(375);
  const [maxWidth, setMaxWidth] = useState(1440);
  const [minValue, setMinValue] = useState(18);
  const [maxValue, setMaxValue] = useState(36);
  const [rootFontSize, setRootFontSize] = useState(16);
  const [unit, setUnit] = useState<'rem' | 'px'>('rem');
  const [previewWidth, setPreviewWidth] = useState(800);
  const [copied, setCopied] = useState(false);

  const { clampCss, tailwindClass, scssMixin, error } = useMemo(() => {
    try {
      const res = calculateCssClamp({
        minWidth,
        maxWidth,
        minValue,
        maxValue,
        rootFontSize,
        unit,
      });
      return { ...res, error: null };
    } catch (err: any) {
      return { clampCss: '', tailwindClass: '', scssMixin: '', error: err.message };
    }
  }, [minWidth, maxWidth, minValue, maxValue, rootFontSize, unit]);

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate live preview font size at previewWidth
  const currentCalculatedPx = useMemo(() => {
    if (previewWidth <= minWidth) return minValue;
    if (previewWidth >= maxWidth) return maxValue;
    const progress = (previewWidth - minWidth) / (maxWidth - minWidth);
    return Number((minValue + progress * (maxValue - minValue)).toFixed(2));
  }, [previewWidth, minWidth, maxWidth, minValue, maxValue]);

  return (
    <div className="space-y-6">
      {/* Parameter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Min Viewport (px)
          </label>
          <input
            type="number"
            value={minWidth}
            onChange={(e) => setMinWidth(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Max Viewport (px)
          </label>
          <input
            type="number"
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Min Value (px)
          </label>
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Max Value (px)
          </label>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Output Cards */}
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                CSS Property Value
              </span>
              <button
                onClick={() => handleCopy(`font-size: ${clampCss};`)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy CSS'}
              </button>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 font-mono text-sm text-indigo-600 dark:bg-slate-800 dark:text-indigo-300 select-all">
              font-size: {clampCss};
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Tailwind CSS Class
              </span>
              <button
                onClick={() => handleCopy(tailwindClass)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                <Copy className="h-3.5 w-3.5" /> Copy Class
              </button>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300 select-all">
              {tailwindClass}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Resizing Preview Slider */}
      <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 dark:border-white/10 dark:bg-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Interactive Viewport Simulator
            </span>
          </div>
          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
            Viewport: {previewWidth}px ➔ Computed: {currentCalculatedPx}px
          </span>
        </div>

        <input
          type="range"
          min={320}
          max={1920}
          value={previewWidth}
          onChange={(e) => setPreviewWidth(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mb-6"
        />

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-white/5 shadow-inner overflow-hidden">
          <p
            style={{ fontSize: `${currentCalculatedPx}px` }}
            className="font-bold tracking-tight text-slate-900 dark:text-white transition-all duration-75 leading-tight"
          >
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Dynamic fluid typography in action at screen width {previewWidth}px
          </p>
        </div>
      </div>
    </div>
  );
}
