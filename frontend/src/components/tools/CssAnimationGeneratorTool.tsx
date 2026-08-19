'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Play, Sliders } from 'lucide-react';
import {
  generateCssAnimation,
  type AnimationType,
  type TimingFunction,
} from '@/lib/cssAnimation';
import { useLanguage } from '@/context/LanguageContext';

export default function CssAnimationGeneratorTool() {
  const { t } = useLanguage();
  const [type, setType] = useState<AnimationType>('bounce');
  const [duration, setDuration] = useState(1.2);
  const [delay, setDelay] = useState(0);
  const [timingFunction, setTimingFunction] = useState<TimingFunction>('ease-in-out');
  const [iterationCount, setIterationCount] = useState('infinite');
  const [copied, setCopied] = useState(false);

  const { css, keyframes } = useMemo(() => {
    return generateCssAnimation({
      type,
      duration,
      delay,
      timingFunction,
      iterationCount,
    });
  }, [type, duration, delay, timingFunction, iterationCount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Inject Keyframes into Page for Live Interactive Preview */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* Animation Type Buttons */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {t('tool.animation.selectType') || 'Animation Presets'}:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'bounce', label: 'Bounce' },
            { id: 'pulse', label: 'Pulse' },
            { id: 'spin', label: 'Spin' },
            { id: 'shake', label: 'Shake' },
            { id: 'fade-in', label: 'Fade In' },
            { id: 'flip', label: 'Flip 3D' },
            { id: 'wobble', label: 'Wobble' },
            { id: 'zoom-in', label: 'Zoom In' },
          ].map((a) => (
            <button
              key={a.id}
              onClick={() => setType(a.id as AnimationType)}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition border ${
                type === a.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Animation Stage */}
      <div className="surface-card rounded-3xl p-12 flex items-center justify-center min-h-[260px] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] border border-slate-200/80 dark:border-white/5">
        <div
          style={{
            animation: `${type === 'fade-in' ? 'fadeIn' : type === 'zoom-in' ? 'zoomIn' : type} ${duration}s ${timingFunction} ${delay}s ${iterationCount}`,
          }}
          className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-black text-sm shadow-xl cursor-pointer select-none"
        >
          <Play className="w-8 h-8 fill-current" />
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.animation.parameters') || 'Animation Timing & Easing'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Duration */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Duration</span>
              <span className="font-mono">{duration}s</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Delay */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Delay</span>
              <span className="font-mono">{delay}s</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={delay}
              onChange={(e) => setDelay(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Timing Function */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Timing Function</label>
            <select
              value={timingFunction}
              onChange={(e) => setTimingFunction(e.target.value as TimingFunction)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="ease">ease</option>
              <option value="linear">linear</option>
              <option value="ease-in">ease-in</option>
              <option value="ease-out">ease-out</option>
              <option value="ease-in-out">ease-in-out</option>
            </select>
          </div>

          {/* Iteration Count */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Iterations</label>
            <select
              value={iterationCount}
              onChange={(e) => setIterationCount(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="infinite">infinite</option>
              <option value="1">1 time</option>
              <option value="2">2 times</option>
              <option value="3">3 times</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            CSS Keyframes & Class Code
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
          rows={9}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
