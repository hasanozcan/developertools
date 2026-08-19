'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Type } from 'lucide-react';
import { generateAsciiArt, type AsciiFont } from '@/lib/asciiArt';
import { useLanguage } from '@/context/LanguageContext';

export default function AsciiArtGeneratorTool() {
  const { t } = useLanguage();
  const [text, setText] = useState('DEV TOOLS');
  const [font, setFont] = useState<AsciiFont>('standard');
  const [copied, setCopied] = useState(false);

  const asciiOutput = useMemo(() => {
    return generateAsciiArt(text, font);
  }, [text, font]);

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([asciiOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii_banner.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Input & Font Selector */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.ascii.inputTitle') || 'Text & ASCII Font Settings'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-500 block mb-1">Your Text / Heading</label>
            <input
              type="text"
              value={text}
              maxLength={24}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder="e.g. WELCOME"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Font Style</label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value as AsciiFont)}
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="standard">Standard ASCII</option>
              <option value="blocks">Unicode Solid Blocks (█)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ASCII Output Display */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            ASCII Banner Output
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy ASCII')}
            </button>
            <button
              onClick={handleDownload}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
              title="Download banner.txt"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <pre className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-5 font-mono text-xs leading-none text-emerald-400 shadow-inner dark:border-white/10 dark:bg-slate-950">
          {asciiOutput || 'Type text above to generate ASCII banner'}
        </pre>
      </div>
    </div>
  );
}
