'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Ratio, MoveHorizontal } from 'lucide-react';
import { calculateAspectRatio } from '@/lib/aspectRatio';
import { useLanguage } from '@/context/LanguageContext';

export default function AspectRatioCalculatorTool() {
  const { t } = useLanguage();
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [newWidth, setNewWidth] = useState(1280);
  const [copiedCss, setCopiedCss] = useState(false);

  const result = useMemo(() => {
    return calculateAspectRatio(width, height, newWidth);
  }, [width, height, newWidth]);

  const cssSnippet = `aspect-ratio: ${result.cssAspectRatio};`;

  const copyCss = () => {
    navigator.clipboard.writeText(cssSnippet);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const applyPreset = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
  };

  return (
    <div className="space-y-6">
      {/* Preset Buttons */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {t('tool.aspect.presets') || 'Standard Presets'}:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: '16:9 (HD / 4K)', w: 1920, h: 1080 },
            { label: '4:3 (SD / iPad)', w: 1024, h: 768 },
            { label: '1:1 (Square / Instagram)', w: 1080, h: 1080 },
            { label: '9:16 (Story / Reel)', w: 1080, h: 1920 },
            { label: '21:9 (Ultrawide)', w: 2560, h: 1080 },
          ].map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p.w, p.h)}
              className="px-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition font-semibold"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calculation Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Dimensions */}
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Ratio className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.aspect.originalDimensions') || 'Original Image / Screen Dimensions'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Simplified Ratio Badge */}
          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Simplified Ratio (W:H)
            </span>
            <span className="font-mono text-xl font-black text-indigo-600 dark:text-indigo-400">
              {result.ratioString}
            </span>
          </div>
        </div>

        {/* Scaled Dimension Calculator */}
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <MoveHorizontal className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.aspect.scaleProportionally') || 'Proportional Resize Calculator'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">New Width (px)</label>
              <input
                type="number"
                value={newWidth}
                onChange={(e) => setNewWidth(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Calculated Height (px)</label>
              <input
                type="number"
                readOnly
                value={result.scaledHeight}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/80 text-emerald-600 dark:text-emerald-400 cursor-default"
              />
            </div>
          </div>

          {/* CSS aspect-ratio Box */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
            <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
              <code>{cssSnippet}</code>
            </span>
            <button
              onClick={copyCss}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedCss ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCss ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSS')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
