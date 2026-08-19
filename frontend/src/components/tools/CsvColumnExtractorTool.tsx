'use client';

import React, { useState, useMemo } from 'react';
import { Columns, Copy, Check } from 'lucide-react';
import { extractCsvColumns } from '@/lib/csvColumnExtractor';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_CSV = `id,first_name,last_name,email,ip_address,created_at
1,Alice,Smith,alice@example.com,192.168.1.1,2026-01-01
2,Bob,Jones,bob@example.com,10.0.0.1,2026-01-02
3,Carol,White,carol@example.com,172.16.0.1,2026-01-03`;

export default function CsvColumnExtractorTool() {
  const { t } = useLanguage();
  const [csvInput, setCsvInput] = useState(SAMPLE_CSV);
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>(['first_name', 'email']);
  const [copied, setCopied] = useState(false);

  const availableHeaders = useMemo(() => {
    const firstLine = csvInput.trim().split(/\r\n|\r|\n/)[0];
    if (!firstLine) return [];
    return firstLine.split(',').map((h) => h.trim());
  }, [csvInput]);

  const extractedCsv = useMemo(() => {
    return extractCsvColumns(csvInput, selectedHeaders);
  }, [csvInput, selectedHeaders]);

  const toggleHeader = (h: string) => {
    if (selectedHeaders.includes(h)) {
      setSelectedHeaders(selectedHeaders.filter((item) => item !== h));
    } else {
      setSelectedHeaders([...selectedHeaders, h]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedCsv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Column Selector Bar */}
      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Columns className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.csvextract.title') || 'Select Columns to Extract'}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {availableHeaders.map((h) => {
            const isSelected = selectedHeaders.includes(h);
            return (
              <button
                key={h}
                onClick={() => toggleHeader(h)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50'
                }`}
              >
                {isSelected ? '✓ ' : '+ '} {h}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Full CSV in -> Extracted CSV out */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Source CSV File</span>
            <button
              onClick={() => {
                setCsvInput(SAMPLE_CSV);
                setSelectedHeaders(['first_name', 'email']);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            rows={10}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Extracted Columns Output</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Filtered CSV')}
            </button>
          </div>
          <textarea
            readOnly
            value={extractedCsv}
            rows={10}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
