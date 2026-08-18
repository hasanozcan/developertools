'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowRightLeft, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { csvToMarkdownTable, markdownTableToCsv, type TableAlignment } from '@/lib/csvToMarkdown';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_CSV = `Name, Role, Department, Salary
Alice Johnson, Senior Engineer, Frontend, $135000
Bob Smith, Product Manager, Product, $142000
Charlie Brown, DevOps Lead, Infrastructure, $150000
Diana Prince, UX Architect, Design, $128000`;

export default function CsvToMarkdownTool() {
  const { t } = useLanguage();
  const [csvInput, setCsvInput] = useState(SAMPLE_CSV);
  const [alignment, setAlignment] = useState<TableAlignment>('left');
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedCsv, setCopiedCsv] = useState(false);

  const markdownOutput = useMemo(() => {
    return csvToMarkdownTable(csvInput, { alignment, delimiter: ',' });
  }, [csvInput, alignment]);

  const handleCopyMd = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyCsv = () => {
    navigator.clipboard.writeText(csvInput);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const handleConvertBack = () => {
    if (markdownOutput) {
      const backCsv = markdownTableToCsv(markdownOutput);
      if (backCsv) setCsvInput(backCsv);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t('tool.csvtomd.align') || 'Column Alignment'}:
          </span>
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-900">
            {(['left', 'center', 'right'] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAlignment(a)}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  alignment === a
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {a === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                {a === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                {a === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                <span className="capitalize">{a}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleConvertBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 transition"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          {t('tool.csvtomd.syncBack') || 'Sync MD ➔ CSV'}
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSV Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              CSV / TSV Input
            </span>
            <button
              onClick={handleCopyCsv}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
            >
              {copiedCsv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCsv ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSV')}
            </button>
          </div>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="col1, col2, col3..."
          />
        </div>

        {/* Markdown Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              GitHub Markdown Table
            </span>
            <button
              onClick={handleCopyMd}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedMd ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Markdown')}
            </button>
          </div>
          <textarea
            readOnly
            value={markdownOutput}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
            placeholder="| Col 1 | Col 2 |..."
          />
        </div>
      </div>
    </div>
  );
}
