'use client';

import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  generateEditorConfig,
  type EditorConfigCharset,
  type EditorConfigEndOfLine,
} from '@/lib/editorconfigGenerator';

export default function EditorconfigGeneratorTool() {
  const [indentStyle, setIndentStyle] = useState<'space' | 'tab'>('space');
  const [indentSize, setIndentSize] = useState(2);
  const [endOfLine, setEndOfLine] = useState<EditorConfigEndOfLine>('lf');
  const [charset, setCharset] = useState<EditorConfigCharset>('utf-8');
  const [trimTrailingWhitespace, setTrimTrailingWhitespace] = useState(true);
  const [insertFinalNewline, setInsertFinalNewline] = useState(true);

  const config = useMemo(
    () =>
      generateEditorConfig({
        indentStyle,
        indentSize,
        endOfLine,
        charset,
        trimTrailingWhitespace,
        insertFinalNewline,
      }),
    [indentStyle, indentSize, endOfLine, charset, trimTrailingWhitespace, insertFinalNewline],
  );

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="ec-indent-style"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              indent_style
            </label>
            <select
              id="ec-indent-style"
              value={indentStyle}
              onChange={(e) => setIndentStyle(e.target.value as 'space' | 'tab')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="space">space</option>
              <option value="tab">tab</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="ec-indent-size"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {indentStyle === 'tab' ? 'tab_width' : 'indent_size'}
            </label>
            <input
              id="ec-indent-size"
              type="number"
              min={1}
              max={16}
              value={indentSize}
              onChange={(e) => setIndentSize(Math.max(1, Number(e.target.value) || 2))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="ec-eol"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              end_of_line
            </label>
            <select
              id="ec-eol"
              value={endOfLine}
              onChange={(e) => setEndOfLine(e.target.value as EditorConfigEndOfLine)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="lf">lf</option>
              <option value="crlf">crlf</option>
              <option value="cr">cr</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="ec-charset"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              charset
            </label>
            <select
              id="ec-charset"
              value={charset}
              onChange={(e) => setCharset(e.target.value as EditorConfigCharset)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="utf-8">utf-8</option>
              <option value="utf-8-bom">utf-8-bom</option>
              <option value="utf-16be">utf-16be</option>
              <option value="utf-16le">utf-16le</option>
              <option value="latin1">latin1</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-xs font-medium text-slate-700 dark:text-slate-300">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={trimTrailingWhitespace}
              onChange={(e) => setTrimTrailingWhitespace(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            trim_trailing_whitespace
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={insertFinalNewline}
              onChange={(e) => setInsertFinalNewline(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            insert_final_newline
          </label>
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="ec-output"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Generated .editorconfig
          </label>
          <CopyButton text={config} />
        </div>
        <textarea
          id="ec-output"
          readOnly
          rows={14}
          value={config}
          className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400"
        />
      </div>
    </div>
  );
}
