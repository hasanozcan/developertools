'use client';

import React, { useState, useMemo } from 'react';
import { Scissors, Copy, Check } from 'lucide-react';
import { generateClipPathCss, CLIP_PATH_PRESETS, type ClipPathPreset, type Point } from '@/lib/cssClipPath';
import { useLanguage } from '@/context/LanguageContext';

export default function CssClipPathTool() {
  const { t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<ClipPathPreset>('triangle');
  const [points, setPoints] = useState<Point[]>(CLIP_PATH_PRESETS.triangle.points);
  const [copied, setCopied] = useState(false);

  const { clipPath, css } = useMemo(() => {
    return generateClipPathCss(points);
  }, [points]);

  const handleSelectPreset = (preset: ClipPathPreset) => {
    setSelectedPreset(preset);
    setPoints(CLIP_PATH_PRESETS[preset].points);
  };

  const updatePoint = (idx: number, axis: 'x' | 'y', val: number) => {
    const next = [...points];
    next[idx] = { ...next[idx], [axis]: val };
    setPoints(next);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Preset Shapes Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.clippath.presets') || 'Shape Presets'}:
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(CLIP_PATH_PRESETS) as ClipPathPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => handleSelectPreset(key)}
              className={`px-3 py-1 text-xs font-bold rounded-xl capitalize transition border ${
                selectedPreset === key
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50'
              }`}
            >
              {CLIP_PATH_PRESETS[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Live Canvas */}
      <div className="surface-card rounded-3xl p-12 flex items-center justify-center min-h-[300px] border border-slate-200/80 dark:border-white/5 bg-slate-900">
        <div
          style={{
            clipPath,
            WebkitClipPath: clipPath,
            backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)',
          }}
          className="w-64 h-64 shadow-2xl transition-all duration-200 flex items-center justify-center text-white font-black text-xs uppercase tracking-widest select-none"
        >
          <span>CSS Clip Path</span>
        </div>
      </div>

      {/* Point Sliders */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          {t('tool.clippath.pointsTitle') || 'Polygon Coordinates (X% / Y%)'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {points.map((p, i) => (
            <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 space-y-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">Point #{i + 1}</span>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>X:</span>
                  <span>{p.x}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={p.x}
                  onChange={(e) => updatePoint(i, 'x', parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Y:</span>
                  <span>{p.y}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={p.y}
                  onChange={(e) => updatePoint(i, 'y', parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Clip-Path CSS Code</span>
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
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
