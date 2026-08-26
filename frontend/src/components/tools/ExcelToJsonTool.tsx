'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Upload, Copy, Check, FileSpreadsheet, RefreshCw, Download } from 'lucide-react';
import { excelTextToJson } from '@/lib/excelToJson';

const SAMPLE_CSV = `id,name,role,department,salary,active
101,"Alice Smith",Tech Lead,Engineering,145000,true
102,"Bob Jones",Product Manager,Product,130000,true
103,"Carol White",UX Designer,Design,115000,false
104,"David Lee",DevOps Specialist,Infrastructure,138000,true`;

export default function ExcelToJsonTool() {
  const [tableInput, setTableInput] = useState(SAMPLE_CSV);
  const [parseNumbers, setParseNumbers] = useState(true);
  const [parseBooleans, setParseBooleans] = useState(true);
  const [trimValues, setTrimValues] = useState(true);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jsonOutput = useMemo(() => {
    if (!tableInput.trim()) return '';
    try {
      const data = excelTextToJson(tableInput, {
        parseNumbers,
        parseBooleans,
        trimValues,
      });
      return JSON.stringify(data, null, 2);
    } catch {
      return '[]';
    }
  }, [tableInput, parseNumbers, parseBooleans, trimValues]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) setTableInput(text);
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Options & Upload Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={parseNumbers}
              onChange={(e) => setParseNumbers(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Parse Numbers
          </label>
          <label className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={parseBooleans}
              onChange={(e) => setParseBooleans(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Parse Booleans
          </label>
          <label className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={trimValues}
              onChange={(e) => setTrimValues(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Trim Values
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Upload className="h-3.5 w-3.5" /> Upload CSV/TSV
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .tsv, .txt"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => setTableInput(SAMPLE_CSV)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" /> Load Sample
          </button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <FileSpreadsheet className="h-3.5 w-3.5 text-indigo-500" /> Excel / CSV / TSV Input (Paste from Spreadsheet)
          </span>
          <textarea
            value={tableInput}
            onChange={(e) => setTableInput(e.target.value)}
            placeholder="Paste cells directly from Excel, Google Sheets, or CSV file..."
            rows={15}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated JSON
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
              >
                <Download className="h-3.5 w-3.5" /> Download .json
              </button>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={jsonOutput}
            placeholder="JSON output will appear here..."
            rows={15}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
