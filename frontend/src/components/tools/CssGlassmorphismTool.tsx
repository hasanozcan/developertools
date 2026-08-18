'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Sliders } from 'lucide-react';
import { computeGlassmorphism } from '@/lib/cssGlassmorphism';
import { useLanguage } from '@/context/LanguageContext';

export default function CssGlassmorphismTool() {
  const { t } = useLanguage();
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(0.25);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [borderRadius, setBorderRadius] = useState(24);
  const [hasShadow, setHasShadow] = useState(true);
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);

  const result = useMemo(() => {
    return computeGlassmorphism({
      blur,
      opacity,
      bgColor,
      borderOpacity,
      borderRadius,
      hasShadow,
    });
  }, [blur, opacity, bgColor, borderOpacity, borderRadius, hasShadow]);

  const copyText = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Preview Area with Colorful Gradient Background */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-tr from-violet-600 via-indigo-500 to-pink-500 flex items-center justify-center min-h-[320px] shadow-xl">
        {/* Floating background decorative spheres */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-yellow-400/80 blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-cyan-400/80 blur-xl pointer-events-none" />

        {/* The Glass Element */}
        <div
          style={result.styleObject}
          className="relative z-10 p-6 sm:p-8 max-w-sm w-full text-white space-y-3 transition-all"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h4 className="font-bold text-lg text-white drop-shadow">Glassmorphism Card</h4>
          </div>
          <p className="text-xs text-white/90 leading-relaxed drop-shadow-sm">
            Frosted glass CSS generator with real-time backdrop blur, transparency, and glowing borders.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white/80">Blur: {blur}px</span>
            <span className="text-[11px] font-semibold text-white/80">Opacity: {Math.round(opacity * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Controls Form */}
      <div className="surface-card rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.glass.controls') || 'Glassmorphism Controls'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Blur */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>{t('tool.glass.blur') || 'Backdrop Blur'}</span>
              <span className="font-mono">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Opacity */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>{t('tool.glass.transparency') || 'Background Opacity'}</span>
              <span className="font-mono">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.9"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Border Opacity */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>{t('tool.glass.borderOpacity') || 'Border Opacity'}</span>
              <span className="font-mono">{Math.round(borderOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Border Radius */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>{t('tool.glass.radius') || 'Border Radius'}</span>
              <span className="font-mono">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Background Color */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              {t('tool.glass.bgColor') || 'Glass Base Color'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 px-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Box Shadow Toggle */}
          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              id="shadow-toggle"
              checked={hasShadow}
              onChange={(e) => setHasShadow(e.target.checked)}
              className="rounded accent-indigo-600 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="shadow-toggle" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              {t('tool.glass.enableShadow') || 'Enable Elevation Shadow'}
            </label>
          </div>
        </div>
      </div>

      {/* Generated Code Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSS Rules */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Vanilla CSS
            </span>
            <button
              onClick={() => copyText(result.css, setCopiedCss)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedCss ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCss ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSS')}
            </button>
          </div>
          <textarea
            readOnly
            value={result.css}
            rows={6}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
          />
        </div>

        {/* Tailwind Classes */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tailwind CSS Utility Classes
            </span>
            <button
              onClick={() => copyText(result.tailwind, setCopiedTailwind)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedTailwind ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedTailwind ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Tailwind')}
            </button>
          </div>
          <textarea
            readOnly
            value={result.tailwind}
            rows={6}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
