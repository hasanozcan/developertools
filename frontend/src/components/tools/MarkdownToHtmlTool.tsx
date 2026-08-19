'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, FileCode } from 'lucide-react';
import { markdownToHtml } from '@/lib/markdownToHtml';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_MARKDOWN = `# Welcome to DeveloperTools

DeveloperTools is a comprehensive suite of **100+ free client-side tools**.

> Privacy first: zero tracking, zero cloud storage.

## Key Features
- 100% offline & client-side
- Fast Next.js static architecture
- Multi-language localization

Explore our code: [GitHub Repository](https://github.com/hasanozcan/developertools)

\`\`\`javascript
console.log('Hello, world!');
\`\`\``;

export default function MarkdownToHtmlTool() {
  const { t } = useLanguage();
  const [markdownInput, setMarkdownInput] = useState(SAMPLE_MARKDOWN);
  const [copied, setCopied] = useState(false);

  const htmlOutput = useMemo(() => {
    return markdownToHtml(markdownInput);
  }, [markdownInput]);

  const handleCopy = () => {
    if (!htmlOutput) return;
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!htmlOutput) return;
    const blob = new Blob([htmlOutput], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="surface-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Markdown ➔ HTML Converter
          </span>
        </div>
        <button
          onClick={() => setMarkdownInput(SAMPLE_MARKDOWN)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          {t('common.loadSample') || 'Load Sample'}
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Markdown Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Markdown Input
          </span>
          <textarea
            value={markdownInput}
            onChange={(e) => setMarkdownInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="# Type your markdown here..."
          />
        </div>

        {/* HTML Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Clean HTML Output
            </span>
            {htmlOutput && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy HTML')}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                  title="Download .html"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={htmlOutput}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400 resize-y"
            placeholder="HTML will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
