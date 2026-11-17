'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  generateCssTriangle,
  getCssTriangleBubblePreviewStyles,
  TriangleDirection,
} from '@/lib/cssTriangleBubbleGenerator';

export default function CssTriangleBubbleGeneratorTool() {
  const { t } = useLanguage();
  const [type, setType] = useState<'triangle' | 'bubble'>('triangle');
  const [direction, setDirection] = useState<TriangleDirection>('top');
  const [size, setSize] = useState<number>(16);
  const [color, setColor] = useState<string>('#3b82f6');
  const [bubbleWidth] = useState<number>(240);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return generateCssTriangle({
      direction,
      size,
      color,
      type,
      bubbleWidth,
    });
  }, [direction, size, color, type, bubbleWidth]);

  const previewStyles = useMemo(() => {
    return getCssTriangleBubblePreviewStyles({
      direction,
      size,
      color,
      type,
      bubbleWidth,
    });
  }, [direction, size, color, type, bubbleWidth]);

  const colorPickerValue = /^#[0-9a-fA-F]{6}$/.test(color.trim()) ? color.trim() : '#4f46e5';

  const handleCopy = () => {
    navigator.clipboard.writeText(result.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              {t("uiText.d24dabd9")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  type === 'triangle'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setType('triangle')}
              >
                {t("uiText.e5cb8bb4")}
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  type === 'bubble'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setType('bubble')}
              >
                {t("uiText.58323a9f")}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              {t("uiText.056d8c87")}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['top', 'right', 'bottom', 'left'] as TriangleDirection[]).map((dir) => (
                <button
                  type="button"
                  key={dir}
                  onClick={() => setDirection(dir)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold uppercase border transition ${
                    direction === dir
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t("uiText.cfd6fbab")}{size}{t("uiText.326b8794")}
            </label>
            <input
              type="range"
              min="6"
              max="40"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t("uiText.e5b43cf8")}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colorPickerValue}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="surface-card rounded-3xl p-8 border border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center min-h-[220px]">
            {type === 'triangle' ? (
              <div style={previewStyles.containerStyle} />
            ) : (
              <div style={previewStyles.containerStyle}>
                Hello! This is a pure CSS speech bubble tooltip.
                {previewStyles.tailStyle && <div style={previewStyles.tailStyle} aria-hidden="true" />}
              </div>
            )}
          </div>

          <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("uiText.9a6f934c")}
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t("uiText.8dc21305") : t("uiText.9b2af91b")}
              </button>
            </div>
            <textarea
              readOnly
              value={result.css}
              className="w-full h-36 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
