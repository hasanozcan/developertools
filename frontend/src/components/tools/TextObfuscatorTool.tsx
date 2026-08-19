'use client';

import React, { useState, useMemo } from 'react';
import { EyeOff, Sparkles, Copy, Check } from 'lucide-react';
import { detectAndRemoveInvisibleChars } from '@/lib/textObfuscator';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_TEXT = 'This\u200B text\u200C contains hidden\uFEFF zero-width spaces\u200E!';

export default function TextObfuscatorTool() {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState(SAMPLE_TEXT);
  const [copied, setCopied] = useState(false);

  const report = useMemo(() => detectAndRemoveInvisibleChars(inputText), [inputText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(report.cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <EyeOff className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.textobf.title') || 'Invisible Character & Zero-Width Detector'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
            report.totalInvisible > 0
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
              : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
          }`}>
            {report.totalInvisible > 0 ? `${report.totalInvisible} Hidden Characters Found` : 'Text is Clean'}
          </span>
        </div>
      </div>

      {/* Grid: Dirty Text & Cleaned Text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Input Text (With Hidden Characters)</span>
            <button
              onClick={() => setInputText(SAMPLE_TEXT)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sanitized & Cleaned Text</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Clean Text')}
            </button>
          </div>
          <textarea
            readOnly
            value={report.cleanedText}
            rows={8}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>

      {/* Detection Counts Breakdown */}
      <div className="surface-card rounded-2xl p-6 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Detected Character Breakdown</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
            <span className="text-slate-400 block text-[11px]">Zero-Width Spaces (\u200B)</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">{report.zeroWidthSpaces}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
            <span className="text-slate-400 block text-[11px]">Non-Joiners (\u200C)</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">{report.zeroWidthNonJoiners}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
            <span className="text-slate-400 block text-[11px]">Joiners (\u200D)</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">{report.zeroWidthJoiners}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
            <span className="text-slate-400 block text-[11px]">LTR / RTL Marks</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">{report.leftToRightMarks + report.rightToLeftMarks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
