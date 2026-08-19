'use client';

import React, { useState, useMemo } from 'react';
import { Grid, Copy, Check } from 'lucide-react';
import { generatePatternCss, DEFAULT_PATTERN, type PatternOptions, type PatternType } from '@/lib/cssPattern';
import { useLanguage } from '@/context/LanguageContext';

export default function CssPatternTool() {
  const { t } = useLanguage();
  const [options, setOptions] = useState<PatternOptions>(DEFAULT_PATTERN);
  const [copied, setCopied] = useState(false);

  const { background, backgroundSize, css } = useMemo(() => {
    return generatePatternCss(options);
  }, [options]);

  const update = (key: keyof PatternOptions, val: string | number) => {
    setOptions((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Pattern Type Selector */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Grid className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.pattern.type') || 'Pattern Style'}:
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['dots', 'grid', 'stripes', 'diagonal', 'checkerboard'] as PatternType[]).map((type) => (
            <button
              key={type}
              onClick={() => update('type', type)}
              className={`px-3 py-1 text-xs font-bold rounded-xl capitalize transition border ${
                options.type === type
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Live Sandbox */}
      <div
        style={{
          backgroundColor: options.bgColor,
          backgroundImage: background,
          backgroundSize,
        }}
        className="rounded-3xl p-16 flex items-center justify-center min-h-[260px] border border-slate-300 dark:border-white/10 shadow-inner"
      >
        <div className="px-6 py-3 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white shadow-lg">
          Live Pattern Canvas
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={options.bgColor}
                onChange={(e) => update('bgColor', e.target.value)}
                className="w-7 h-7 rounded border-0 cursor-pointer"
              />
              <input
                type="text"
                value={options.bgColor}
                onChange={(e) => update('bgColor', e.target.value)}
                className="w-full px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Pattern Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={options.fgColor}
                onChange={(e) => update('fgColor', e.target.value)}
                className="w-7 h-7 rounded border-0 cursor-pointer"
              />
              <input
                type="text"
                value={options.fgColor}
                onChange={(e) => update('fgColor', e.target.value)}
                className="w-full px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Grid / Step Size ({options.size}px)</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={options.size}
              onChange={(e) => update('size', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {options.type === 'dots' && (
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Dot Radius ({options.dotRadius}px)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={options.dotRadius}
                onChange={(e) => update('dotRadius', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>
          )}
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pattern CSS Code</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSS')}
          </button>
        </div>
        <textarea
          readOnly
          value={css}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
