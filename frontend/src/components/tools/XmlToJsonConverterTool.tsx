'use client';

import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft, Download, FileCode } from 'lucide-react';
import { xmlToJson, jsonToXml } from '@/lib/xmlToJson';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
    <publish_date>2000-10-01</publish_date>
  </book>
  <book id="bk102">
    <author>Ralls, Kim</author>
    <title>Midnight Rain</title>
    <genre>Fantasy</genre>
    <price>5.95</price>
    <publish_date>2000-12-16</publish_date>
  </book>
</catalog>`;

export default function XmlToJsonConverterTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'xmlToJson' | 'jsonToXml'>('xmlToJson');
  const [input, setInput] = useState(SAMPLE_XML);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setError(null);
    try {
      if (mode === 'xmlToJson') {
        const json = xmlToJson(input);
        setOutput(JSON.stringify(json, null, 2));
      } else {
        const parsed = JSON.parse(input);
        const xml = jsonToXml(parsed, 'root', 2);
        setOutput(xml);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid data format');
    }
  };

  const handleModeSwitch = () => {
    const nextMode = mode === 'xmlToJson' ? 'jsonToXml' : 'xmlToJson';
    setMode(nextMode);
    setInput(output || '');
    setOutput('');
    setError(null);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const ext = mode === 'xmlToJson' ? 'json' : 'xml';
    const type = mode === 'xmlToJson' ? 'application/json' : 'application/xml';
    const blob = new Blob([output], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {mode === 'xmlToJson' ? 'XML ➔ JSON Converter' : 'JSON ➔ XML Converter'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleModeSwitch}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            {mode === 'xmlToJson' ? 'Switch to JSON ➔ XML' : 'Switch to XML ➔ JSON'}
          </button>
          <button
            onClick={handleConvert}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            {t('common.convert') || 'Convert'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {mode === 'xmlToJson' ? 'Input XML' : 'Input JSON'}
            </span>
            <button
              onClick={() => {
                setInput(SAMPLE_XML);
                setError(null);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder={mode === 'xmlToJson' ? '<root>...</root>' : '{"key": "value"}'}
          />
        </div>

        {/* Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {mode === 'xmlToJson' ? 'Output JSON' : 'Output XML'}
            </span>
            {output && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Output')}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                  title="Download converted file"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-300 resize-y"
            placeholder="Click Convert to see output here..."
          />
        </div>
      </div>
    </div>
  );
}
