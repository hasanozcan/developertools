'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Copy, Check, RotateCcw } from 'lucide-react';
import { generateCssFilter, DEFAULT_FILTER_VALUES, type CssFilterValues } from '@/lib/cssFilter';
import { useLanguage } from '@/context/LanguageContext';

export default function CssFilterGeneratorTool() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<CssFilterValues>(DEFAULT_FILTER_VALUES);
  const [copied, setCopied] = useState(false);

  const { filterString, css } = useMemo(() => {
    return generateCssFilter(filters);
  }, [filters]);

  const updateFilter = (key: keyof CssFilterValues, val: number) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Visual Filter Preview Sandbox */}
      <div className="surface-card rounded-3xl p-6 flex flex-col items-center justify-center min-h-[300px] border border-slate-200/80 dark:border-white/5 space-y-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Visual Image Filter Preview</span>
          <button
            onClick={() => setFilters(DEFAULT_FILTER_VALUES)}
            className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 max-w-lg w-full h-64 bg-slate-900 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=500&fit=crop"
            alt="Filter test subject"
            style={{ filter: filterString }}
            className="w-full h-full object-cover transition-all duration-150"
          />
        </div>
      </div>

      {/* Sliders Configuration */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.filter.slidersTitle') || 'CSS Filter Parameters'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Blur */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>blur</span>
              <span className="font-mono">{filters.blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={filters.blur}
              onChange={(e) => updateFilter('blur', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Brightness */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>brightness</span>
              <span className="font-mono">{filters.brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.brightness}
              onChange={(e) => updateFilter('brightness', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Contrast */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>contrast</span>
              <span className="font-mono">{filters.contrast}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.contrast}
              onChange={(e) => updateFilter('contrast', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Grayscale */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>grayscale</span>
              <span className="font-mono">{filters.grayscale}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.grayscale}
              onChange={(e) => updateFilter('grayscale', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Hue-Rotate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>hue-rotate</span>
              <span className="font-mono">{filters.hueRotate}deg</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={filters.hueRotate}
              onChange={(e) => updateFilter('hueRotate', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Invert */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>invert</span>
              <span className="font-mono">{filters.invert}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.invert}
              onChange={(e) => updateFilter('invert', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Saturate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>saturate</span>
              <span className="font-mono">{filters.saturate}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.saturate}
              onChange={(e) => updateFilter('saturate', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Sepia */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>sepia</span>
              <span className="font-mono">{filters.sepia}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.sepia}
              onChange={(e) => updateFilter('sepia', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Opacity */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>opacity</span>
              <span className="font-mono">{filters.opacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.opacity}
              onChange={(e) => updateFilter('opacity', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Generated CSS Code
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSS')}
          </button>
        </div>
        <textarea
          readOnly
          value={css}
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
