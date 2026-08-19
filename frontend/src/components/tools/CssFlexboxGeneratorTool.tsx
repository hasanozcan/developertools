'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, LayoutGrid, Plus, Minus } from 'lucide-react';
import {
  generateFlexboxCode,
  type FlexDirection,
  type FlexJustify,
  type FlexAlignItems,
  type FlexWrap,
} from '@/lib/cssFlexbox';
import { useLanguage } from '@/context/LanguageContext';

export default function CssFlexboxGeneratorTool() {
  const { t } = useLanguage();
  const [direction, setDirection] = useState<FlexDirection>('row');
  const [justifyContent, setJustifyContent] = useState<FlexJustify>('center');
  const [alignItems, setAlignItems] = useState<FlexAlignItems>('center');
  const [flexWrap, setFlexWrap] = useState<FlexWrap>('wrap');
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(5);
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);

  const { css, tailwind, styleObject } = useMemo(() => {
    return generateFlexboxCode({
      direction,
      justifyContent,
      alignItems,
      flexWrap,
      alignContent: 'center',
      gap,
      itemCount,
    });
  }, [direction, justifyContent, alignItems, flexWrap, gap, itemCount]);

  const copyText = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Preview Sandbox */}
      <div className="surface-card rounded-3xl p-6 flex flex-col space-y-3 border border-slate-200/80 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('tool.flexbox.preview') || 'Live Flexbox Container Preview'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">{t('tool.flexbox.items') || 'Items'}:</span>
            <button
              onClick={() => setItemCount(Math.max(1, itemCount - 1))}
              className="p-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono font-bold w-4 text-center">{itemCount}</span>
            <button
              onClick={() => setItemCount(Math.min(12, itemCount + 1))}
              className="p-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Container */}
        <div
          style={styleObject}
          className="min-h-[260px] p-6 rounded-2xl border border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/20 overflow-hidden transition-all"
        >
          {Array.from({ length: itemCount }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[70px] min-h-[70px] px-4 py-3 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
            >
              #{i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Controls Form */}
      <div className="surface-card rounded-2xl p-6 space-y-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          {t('tool.flexbox.properties') || 'Container Properties'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Direction */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5">flex-direction</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as FlexDirection)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="row">row (default)</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          {/* Justify Content */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5">justify-content</label>
            <select
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value as FlexJustify)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          {/* Align Items */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5">align-items</label>
            <select
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as FlexAlignItems)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="stretch">stretch</option>
              <option value="center">center</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          {/* Flex Wrap */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1.5">flex-wrap</label>
            <select
              value={flexWrap}
              onChange={(e) => setFlexWrap(e.target.value as FlexWrap)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </div>
        </div>

        {/* Gap Slider */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/5">
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>gap</span>
            <span className="font-mono">{gap}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="64"
            value={gap}
            onChange={(e) => setGap(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* Code Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSS Code */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pure CSS
            </span>
            <button
              onClick={() => copyText(css, setCopiedCss)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedCss ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCss ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSS')}
            </button>
          </div>
          <textarea
            readOnly
            value={css}
            rows={7}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
          />
        </div>

        {/* Tailwind CSS */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tailwind CSS Classes
            </span>
            <button
              onClick={() => copyText(tailwind, setCopiedTailwind)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedTailwind ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedTailwind ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Tailwind')}
            </button>
          </div>
          <textarea
            readOnly
            value={tailwind}
            rows={7}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-cyan-300"
          />
        </div>
      </div>
    </div>
  );
}
