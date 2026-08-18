'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, FileText } from 'lucide-react';
import { htmlToMarkdown } from '@/lib/htmlToMarkdown';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_HTML = `<h1>DevsTools Suite</h1>
<p>Welcome to <strong>DevsTools</strong>, a free collection of developer utilities!</p>
<blockquote>Built for speed, privacy, and zero telemetry.</blockquote>
<h2>Key Features</h2>
<ul>
  <li>100% Client-Side execution</li>
  <li>Multi-language support</li>
  <li>Fast SSG static builds</li>
</ul>
<p>Visit the repository: <a href="https://github.com/hasanozcan/developertools">GitHub Repo</a></p>`;

export default function HtmlToMarkdownTool() {
  const { t } = useLanguage();
  const [htmlInput, setHtmlInput] = useState(SAMPLE_HTML);
  const [copied, setCopied] = useState(false);

  const markdownOutput = useMemo(() => {
    return htmlToMarkdown(htmlInput);
  }, [htmlInput]);

  const handleCopy = () => {
    if (!markdownOutput) return;
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!markdownOutput) return;
    const blob = new Blob([markdownOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="surface-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            HTML ➔ Markdown Converter
          </span>
        </div>
        <button
          onClick={() => setHtmlInput(SAMPLE_HTML)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          {t('common.loadSample') || 'Load Sample'}
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HTML Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            HTML Source Code
          </span>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="<p>Paste your HTML markup here...</p>"
          />
        </div>

        {/* Markdown Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Clean Markdown Output
            </span>
            {markdownOutput && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Markdown')}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                  title="Download .md"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={markdownOutput}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400 resize-y"
            placeholder="Markdown will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
