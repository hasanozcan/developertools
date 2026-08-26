'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw, FileCode } from 'lucide-react';
import { jsonToXml } from '@/lib/jsonToXml';

const SAMPLE_JSON = JSON.stringify(
  {
    bookstore: {
      '@name': 'City Central Books',
      book: [
        {
          '@category': 'Fiction',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          year: 1925,
          price: 10.99,
        },
        {
          '@category': 'Science',
          title: 'A Brief History of Time',
          author: 'Stephen Hawking',
          year: 1988,
          price: 14.5,
        },
      ],
    },
  },
  null,
  2
);

export default function JsonToXmlTool() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [rootName, setRootName] = useState('root');
  const [itemName, setItemName] = useState('item');
  const [includeDeclaration, setIncludeDeclaration] = useState(true);
  const [attributePrefix, setAttributePrefix] = useState('@');
  const [copied, setCopied] = useState(false);

  const { xmlOutput, error } = useMemo(() => {
    if (!jsonInput.trim()) return { xmlOutput: '', error: null };
    try {
      const res = jsonToXml(jsonInput, {
        rootName,
        itemName,
        includeDeclaration,
        attributePrefix,
        indent: 2,
      });
      return { xmlOutput: res, error: null };
    } catch (err: any) {
      return { xmlOutput: '', error: err.message || 'Invalid JSON syntax' };
    }
  }, [jsonInput, rootName, itemName, includeDeclaration, attributePrefix]);

  const handleCopy = () => {
    if (!xmlOutput) return;
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Root Tag Name
          </label>
          <input
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Array Item Tag Name
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Attribute Prefix
          </label>
          <input
            type="text"
            value={attributePrefix}
            onChange={(e) => setAttributePrefix(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeDeclaration}
              onChange={(e) => setIncludeDeclaration(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            XML Declaration (&lt;?xml...&gt;)
          </label>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              JSON Input
            </span>
            <button
              onClick={() => setJsonInput(SAMPLE_JSON)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Load Sample
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={15}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-indigo-500" /> XML Output
            </span>
            {xmlOutput && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy XML'}
              </button>
            )}
          </div>
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={xmlOutput}
              placeholder="XML will appear here..."
              rows={15}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
            />
          )}
        </div>
      </div>
    </div>
  );
}
