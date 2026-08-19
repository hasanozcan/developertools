'use client';

import React, { useState, useMemo } from 'react';
import { Type, Binary, Database } from 'lucide-react';
import { calculateStringBytes } from '@/lib/stringByteCounter';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_TEXT = `Hello World! 🚀
DeveloperTools is 100% free, private & client-side.
Türkçe: Çağdaş yazılım geliştirme araçları.`;

export default function StringByteCounterTool() {
  const { t } = useLanguage();
  const [text, setText] = useState(SAMPLE_TEXT);
  const [varcharLimit, setVarcharLimit] = useState(255);

  const stats = useMemo(() => {
    return calculateStringBytes(text);
  }, [text]);

  const varcharRemaining = varcharLimit - stats.utf8Bytes;
  const isVarcharExceeded = varcharRemaining < 0;

  return (
    <div className="space-y-6">
      {/* Editor Input */}
      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.bytecnt.inputTitle') || 'Text & Character Input'}
            </h3>
          </div>
          <button
            onClick={() => setText(SAMPLE_TEXT)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            {t('common.loadSample') || 'Load Sample'}
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          className="w-full rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          placeholder="Type or paste your text to count bytes and characters..."
        />
      </div>

      {/* Main Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="surface-card rounded-2xl p-5 border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
            <Binary className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider">UTF-8 Bytes</span>
          </div>
          <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
            {stats.utf8Bytes.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Network & Storage Size</span>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Characters</span>
          <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            {stats.characters.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">{stats.charactersNoSpaces} without spaces</span>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Words & Lines</span>
          <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            {stats.words} <span className="text-xs font-normal text-slate-400">words</span>
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">{stats.lines} lines ({stats.paragraphs} paragraphs)</span>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Encoding Breakdown</span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
            {stats.asciiCount} <span className="text-xs text-slate-400 font-normal">ASCII (1-byte)</span>
          </span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
            {stats.nonAsciiCount} <span className="text-xs text-slate-400 font-normal">Multi-byte / Emoji</span>
          </span>
        </div>
      </div>

      {/* Database VARCHAR Limit Checker */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Database Column Byte Limit Calculator (VARCHAR / CHAR)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Column Limit (Bytes)</label>
            <select
              value={varcharLimit}
              onChange={(e) => setVarcharLimit(parseInt(e.target.value, 10))}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            >
              <option value="64">VARCHAR(64)</option>
              <option value="128">VARCHAR(128)</option>
              <option value="255">VARCHAR(255) (Default)</option>
              <option value="512">VARCHAR(512)</option>
              <option value="1024">VARCHAR(1024)</option>
              <option value="65535">TEXT (65,535 Bytes)</option>
            </select>
          </div>

          <div className="sm:col-span-2 p-4 rounded-xl border bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Capacity: {stats.utf8Bytes} / {varcharLimit} bytes used
            </span>
            <span
              className={`font-mono text-xs font-black px-3 py-1 rounded-lg ${
                isVarcharExceeded
                  ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}
            >
              {isVarcharExceeded
                ? `Exceeded by ${Math.abs(varcharRemaining)} bytes!`
                : `${varcharRemaining} bytes remaining`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
