'use client';

import React, { useState, useMemo } from 'react';
import { Compass } from 'lucide-react';
import { parseSvgPath, cleanSvgPath } from '@/lib/svgPathVisualizer';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_PATH = 'M10 80 Q 95 10 180 80 T 350 80 L 350 180 L 10 180 Z';

export default function SvgPathVisualizerTool() {
  const { t } = useLanguage();
  const [pathInput, setPathInput] = useState(SAMPLE_PATH);
  const [strokeColor, setStrokeColor] = useState('#6366f1');
  const [fillColor, setFillColor] = useState('#e0e7ff');
  const [strokeWidth, setStrokeWidth] = useState(3);

  const cleanPath = useMemo(() => cleanSvgPath(pathInput), [pathInput]);
  const commands = useMemo(() => parseSvgPath(cleanPath), [cleanPath]);

  return (
    <div className="space-y-6">
      {/* Grid: Preview & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual SVG Sandbox */}
        <div className="surface-card rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 bg-slate-900 border border-white/5 min-h-[300px]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 self-start">
            SVG Vector Path Sandbox
          </span>

          <svg viewBox="0 0 400 250" className="w-full max-w-[360px] h-48 border border-white/10 rounded-xl bg-slate-950 shadow-inner">
            <path d={cleanPath} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
          </svg>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>{commands.length} Commands Parsed</span>
          </div>
        </div>

        {/* Path Input & Styling */}
        <div className="surface-card rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t('tool.svgpath.input') || 'SVG Path Definition (d attribute)'}
                </span>
              </div>
              <button
                onClick={() => setPathInput(SAMPLE_PATH)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                {t('common.loadSample') || 'Load Sample'}
              </button>
            </div>

            <textarea
              value={pathInput}
              onChange={(e) => setPathInput(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
              placeholder="Paste path d attribute (e.g. M10 80 Q 95 10 180 80...)"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">Stroke Color</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="w-full px-1.5 py-0.5 text-xs font-mono rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">Fill Color</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={fillColor}
                  onChange={(e) => setFillColor(e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={fillColor}
                  onChange={(e) => setFillColor(e.target.value)}
                  className="w-full px-1.5 py-0.5 text-xs font-mono rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">Stroke Width ({strokeWidth}px)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Parsed Commands Table */}
      <div className="surface-card rounded-2xl p-6 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Parsed Path Segments & Coordinates
        </span>
        <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
              <tr>
                <th className="p-2.5">#</th>
                <th className="p-2.5">Command</th>
                <th className="p-2.5">Parameters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {commands.map((cmd, i) => (
                <tr key={i}>
                  <td className="p-2.5 text-slate-400">{i + 1}</td>
                  <td className="p-2.5 font-bold text-indigo-600 dark:text-indigo-400">{cmd.type}</td>
                  <td className="p-2.5 text-slate-700 dark:text-slate-200">{cmd.params.join(', ') || '(none)'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
