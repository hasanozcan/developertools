'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Sliders } from 'lucide-react';
import {
  generateBorderRadius,
  DEFAULT_BORDER_RADIUS,
  BORDER_RADIUS_PRESETS,
  type BorderRadiusValues,
} from '@/lib/cssBorderRadius';
import { useLanguage } from '@/context/LanguageContext';

export default function CssBorderRadiusTool() {
  const { t } = useLanguage();
  const [radii, setRadii] = useState<BorderRadiusValues>(DEFAULT_BORDER_RADIUS);
  const [copied, setCopied] = useState(false);

  const { value, css } = useMemo(() => {
    return generateBorderRadius(radii);
  }, [radii]);

  const updateRadius = (key: keyof BorderRadiusValues, val: number | string) => {
    setRadii((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Preset Buttons */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.radius.presets') || 'Shape Presets'}:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {BORDER_RADIUS_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => setRadii(p.values)}
              className="px-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition font-semibold"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Squircle Preview Stage */}
      <div className="surface-card rounded-3xl p-12 flex items-center justify-center min-h-[300px] border border-slate-200/80 dark:border-white/5 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
        <div
          style={{ borderRadius: value }}
          className="w-56 h-56 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center text-white font-black text-sm transition-all duration-200 select-none transform hover:scale-105"
        >
          <span>Live Shape</span>
        </div>
      </div>

      {/* 8-Point Radius Sliders */}
      <div className="surface-card rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.radius.slidersTitle') || '8-Point Radius Axes'}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => updateRadius('unit', '%')}
              className={`px-2.5 py-0.5 text-xs font-bold rounded-lg transition ${
                radii.unit === '%' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              %
            </button>
            <button
              onClick={() => updateRadius('unit', 'px')}
              className={`px-2.5 py-0.5 text-xs font-bold rounded-lg transition ${
                radii.unit === 'px' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              px
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Horizontal Radii */}
          <div className="space-y-4 p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Horizontal Radii (X-Axis)</h4>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Top-Left (H)</span>
                <span className="font-mono">{radii.topLeftH}{radii.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={radii.unit === '%' ? 100 : 150}
                value={radii.topLeftH}
                onChange={(e) => updateRadius('topLeftH', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Top-Right (H)</span>
                <span className="font-mono">{radii.topRightH}{radii.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={radii.unit === '%' ? 100 : 150}
                value={radii.topRightH}
                onChange={(e) => updateRadius('topRightH', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Bottom-Right (H)</span>
                <span className="font-mono">{radii.bottomRightH}{radii.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={radii.unit === '%' ? 100 : 150}
                value={radii.bottomRightH}
                onChange={(e) => updateRadius('bottomRightH', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Bottom-Left (H)</span>
                <span className="font-mono">{radii.bottomLeftH}{radii.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={radii.unit === '%' ? 100 : 150}
                value={radii.bottomLeftH}
                onChange={(e) => updateRadius('bottomLeftH', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          {/* Vertical Radii */}
          <div className="space-y-4 p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Vertical Radii (Y-Axis)</h4>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Top-Left (V)</span>
                <span className="font-mono">{radii.topLeftV}{radii.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={radii.unit === '%' ? 100 : 150}
                value={radii.topLeftV}
                onChange={(e) => updateRadius('topLeftV', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Top-Right (V)</span>
                <span className="font-mono">{radii.topRightV}{radii.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={radii.unit === '%' ? 100 : 150}
                value={radii.topRightV}
                onChange={(e) => updateRadius('topRightV', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Bottom-Right (V)</span>
                <span className="font-mono">{radii.bottomRightV}{radii.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={radii.unit === '%' ? 100 : 150}
                value={radii.bottomRightV}
                onChange={(e) => updateRadius('bottomRightV', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Bottom-Left (V)</span>
                <span className="font-mono">{radii.bottomLeftV}{radii.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={radii.unit === '%' ? 100 : 150}
                value={radii.bottomLeftV}
                onChange={(e) => updateRadius('bottomLeftV', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            CSS border-radius Property
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
