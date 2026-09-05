'use client';

import { useState, useCallback, useEffect } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import ViewModeToggle, { type ViewLayout } from '@/components/common/ViewModeToggle';
import ShareLinkButton, { decodeShareData } from '@/components/common/ShareLinkButton';
import { CheckCircle, AlertTriangle, Play, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { parseJsonSyntaxError, type ParsedJsonError } from '@/lib/jsonErrorParser';
import { readToolInput } from '@/lib/toolInput';

function sortJsonKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeys);
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b));
    const sorted: Record<string, unknown> = {};
    for (const [key, item] of entries) {
      sorted[key] = sortJsonKeys(item);
    }
    return sorted;
  }

  return value;
}

export default function JsonFormatterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [parsedError, setParsedError] = useState<ParsedJsonError | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [layout, setLayout] = useState<ViewLayout>('split');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const shared = decodeShareData<{ input?: string; indent?: number; sort?: boolean }>(window.location.hash);
      if (shared && typeof shared.input === 'string') {
        setInput(shared.input);
        if (shared.indent) setIndentSize(shared.indent);
        if (shared.sort !== undefined) setSortKeys(shared.sort);
      } else {
        const extensionInput = readToolInput(window.location.hash);
        if (extensionInput !== null) setInput(extensionInput);
      }
    }
  }, []);

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setParsedError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const normalized = sortKeys ? sortJsonKeys(parsed) : parsed;
      const formatted = JSON.stringify(normalized, null, indentSize);
      setOutput(formatted);
      setParsedError(null);
    } catch (e) {
      setParsedError(parseJsonSyntaxError(e as Error, input));
      setOutput('');
    }
  }, [input, indentSize, sortKeys]);

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setParsedError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const normalized = sortKeys ? sortJsonKeys(parsed) : parsed;
      const minified = JSON.stringify(normalized);
      setOutput(minified);
      setParsedError(null);
    } catch (e) {
      setParsedError(parseJsonSyntaxError(e as Error, input));
      setOutput('');
    }
  }, [input, sortKeys]);

  const loadSample = useCallback(() => {
    const sampleJson = {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
      },
      hobbies: ['reading', 'coding', 'gaming'],
      isActive: true,
    };
    setInput(JSON.stringify(sampleJson, null, 2));
    setOutput('');
    setParsedError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Action & Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 dark:border-white/5 dark:bg-slate-900/60 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={formatJson}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 transition text-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{t('common.format') || 'Format'} JSON</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-indigo-700/80 text-indigo-100 rounded">
              Ctrl+↵
            </kbd>
          </button>

          <button
            type="button"
            onClick={minifyJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-200/80 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl font-medium transition text-sm"
          >
            {t('common.minify') || 'Minify'}
          </button>

          <button
            type="button"
            onClick={loadSample}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition text-sm font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('common.loadSample') || 'Sample'}</span>
          </button>

          <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer ml-1">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
            />
            {t('tool.jsonFormatter.sortKeys') || 'Sort Keys'}
          </label>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 ml-1">
            <label htmlFor="json-indent-size">{t('tool.jsonFormatter.indentSize') || 'Indent'}:</label>
            <select
              id="json-indent-size"
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-800 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
        </div>

        {/* Right Tools: Layout & Share */}
        <div className="flex items-center gap-2 ml-auto">
          <ViewModeToggle layout={layout} onChange={setLayout} />
          {input && (
            <ShareLinkButton
              data={{ input, indent: indentSize, sort: sortKeys }}
            />
          )}
        </div>
      </div>

      {/* Syntax Error / Validation Status Badge */}
      {input && (
        <div>
          {parsedError ? (
            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/90 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 text-xs flex items-start gap-2.5 shadow-2xs">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold">
                  {parsedError.line ? (
                    <span>
                      Line {parsedError.line}, Column {parsedError.column || 1}: {parsedError.message}
                    </span>
                  ) : (
                    <span>{parsedError.message}</span>
                  )}
                </div>
                {parsedError.snippet && (
                  <div className="mt-1 font-mono text-[11px] bg-red-100/80 dark:bg-red-900/50 px-2 py-0.5 rounded text-red-900 dark:text-red-200 truncate">
                    &gt; {parsedError.snippet}
                  </div>
                )}
              </div>
            </div>
          ) : output ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-medium border border-emerald-200/60 dark:border-emerald-800/40">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t('tool.jsonValidator.valid') || 'Valid JSON'}</span>
            </div>
          ) : null}
        </div>
      )}

      {/* Input / Output Editors Grid */}
      <div className={`grid gap-6 ${layout === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {t('common.input')} JSON
            </label>
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            onRun={formatJson}
            placeholder={t('tool.jsonFormatter.inputPlaceholder')}
            language="json"
            downloadFilename="formatted.json"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {t('common.output')}
            </label>
          </div>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language="json"
            placeholder={t('common.result') + '...'}
            downloadFilename="formatted.json"
          />
        </div>
      </div>
    </div>
  );
}
