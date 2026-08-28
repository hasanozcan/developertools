'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { convertHtmlToMarkdown, convertMarkdownToHtml } from '@/lib/htmlToMarkdown';

export default function HtmlToMarkdownTool() {
  const [htmlInput, setHtmlInput] = useState('<h1>Hello World</h1><p>This is a <strong>rich text</strong> description with <a href="https://devstools.app">link</a>.</p>');
  const mdOutput = convertHtmlToMarkdown(htmlInput);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">HTML Source Input</label>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Markdown Output (GFM)</label>
            <CopyButton text={mdOutput} />
          </div>
          <textarea
            value={mdOutput}
            readOnly
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
          />
        </div>
      </div>
    </div>
  );
}
