'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Copy, Check } from 'lucide-react';
import { generateScrollbarCss, DEFAULT_SCROLLBAR, type ScrollbarOptions } from '@/lib/cssScrollbar';
import { useLanguage } from '@/context/LanguageContext';

export default function CssScrollbarTool() {
  const { t } = useLanguage();
  const [options, setOptions] = useState<ScrollbarOptions>(DEFAULT_SCROLLBAR);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => generateScrollbarCss(options), [options]);

  const update = (key: keyof ScrollbarOptions, val: string | number) => {
    setOptions((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Scrollable Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("uiText.f6d13b68")}</span>

          <div
            style={{
              scrollbarWidth: options.width <= 8 ? 'thin' : 'auto',
              scrollbarColor: `${options.thumbColor} ${options.trackColor}`,
            }}
            className="h-64 overflow-y-auto p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 space-y-3"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {t("uiText.c76852f3")}</p>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="p-3 rounded-lg bg-white dark:bg-slate-800 text-xs shadow-sm font-mono text-slate-500">
                {t("uiText.150ac1fb")}{i + 1} {t("uiText.5c5d4bf5")}</div>
            ))}
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.scrollbar.controls') || 'Scrollbar Dimensions & Palette'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">{t("uiText.67d31efc")}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={options.thumbColor}
                  onChange={(e) => update('thumbColor', e.target.value)}
                  className="w-7 h-7 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={options.thumbColor}
                  onChange={(e) => update('thumbColor', e.target.value)}
                  className="w-full px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">{t("uiText.3a28c186")}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={options.thumbHoverColor}
                  onChange={(e) => update('thumbHoverColor', e.target.value)}
                  className="w-7 h-7 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={options.thumbHoverColor}
                  onChange={(e) => update('thumbHoverColor', e.target.value)}
                  className="w-full px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">{t("uiText.cf5598bb")}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={options.trackColor}
                  onChange={(e) => update('trackColor', e.target.value)}
                  className="w-7 h-7 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={options.trackColor}
                  onChange={(e) => update('trackColor', e.target.value)}
                  className="w-full px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>{t("uiText.9e3da3ff")}{options.width}{t("uiText.326b8794")}</span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                value={options.width}
                onChange={(e) => update('width', parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("uiText.6ab0692f")}</span>
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
          rows={9}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
