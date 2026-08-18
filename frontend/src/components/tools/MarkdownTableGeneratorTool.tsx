'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Table, Plus, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { generateMarkdownTable, createEmptyTable, type ColumnAlignment } from '@/lib/markdownTableGenerator';
import { useLanguage } from '@/context/LanguageContext';

export default function MarkdownTableGeneratorTool() {
  const { t } = useLanguage();
  const [tableData, setTableData] = useState(() => createEmptyTable(3, 3));
  const [copied, setCopied] = useState(false);

  const markdownOutput = useMemo(() => {
    return generateMarkdownTable(tableData);
  }, [tableData]);

  const addColumn = () => {
    const nextColIdx = tableData.headers.length + 1;
    setTableData({
      headers: [...tableData.headers, `Header ${nextColIdx}`],
      alignments: [...tableData.alignments, 'left'],
      rows: tableData.rows.map((r) => [...r, `Row Col ${nextColIdx}`]),
    });
  };

  const removeColumn = (colIdx: number) => {
    if (tableData.headers.length <= 1) return;
    setTableData({
      headers: tableData.headers.filter((_, i) => i !== colIdx),
      alignments: tableData.alignments.filter((_, i) => i !== colIdx),
      rows: tableData.rows.map((r) => r.filter((_, i) => i !== colIdx)),
    });
  };

  const addRow = () => {
    const nextRowIdx = tableData.rows.length + 1;
    const newRow = Array.from({ length: tableData.headers.length }, (_, c) => `Row ${nextRowIdx} Col ${c + 1}`);
    setTableData({
      ...tableData,
      rows: [...tableData.rows, newRow],
    });
  };

  const removeRow = (rowIdx: number) => {
    if (tableData.rows.length <= 1) return;
    setTableData({
      ...tableData,
      rows: tableData.rows.filter((_, i) => i !== rowIdx),
    });
  };

  const updateHeader = (colIdx: number, val: string) => {
    const next = [...tableData.headers];
    next[colIdx] = val;
    setTableData({ ...tableData, headers: next });
  };

  const updateCell = (rowIdx: number, colIdx: number, val: string) => {
    const nextRows = tableData.rows.map((row, r) =>
      r === rowIdx ? row.map((cell, c) => (c === colIdx ? val : cell)) : row,
    );
    setTableData({ ...tableData, rows: nextRows });
  };

  const toggleAlignment = (colIdx: number) => {
    const current = tableData.alignments[colIdx];
    const nextAlign: ColumnAlignment = current === 'left' ? 'center' : current === 'center' ? 'right' : 'left';
    const nextAlignments = [...tableData.alignments];
    nextAlignments[colIdx] = nextAlign;
    setTableData({ ...tableData, alignments: nextAlignments });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls toolbar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {t('tool.mdtable.matrixEditor') || 'Interactive Table Editor'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addColumn}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-500" />
            {t('tool.mdtable.addColumn') || 'Add Column'}
          </button>
          <button
            onClick={addRow}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-500" />
            {t('tool.mdtable.addRow') || 'Add Row'}
          </button>
        </div>
      </div>

      {/* Spreadsheet Matrix */}
      <div className="surface-card rounded-2xl p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-10"></th>
              {tableData.headers.map((h, colIdx) => (
                <th key={colIdx} className="p-1.5 min-w-[140px]">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => updateHeader(colIdx, e.target.value)}
                      className="w-full px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => toggleAlignment(colIdx)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                      title={`Align: ${tableData.alignments[colIdx]}`}
                    >
                      {tableData.alignments[colIdx] === 'center' ? (
                        <AlignCenter className="w-3.5 h-3.5" />
                      ) : tableData.alignments[colIdx] === 'right' ? (
                        <AlignRight className="w-3.5 h-3.5" />
                      ) : (
                        <AlignLeft className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {tableData.headers.length > 1 && (
                      <button
                        onClick={() => removeColumn(colIdx)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded"
                        title="Delete Column"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td className="p-1 text-center">
                  {tableData.rows.length > 1 && (
                    <button
                      onClick={() => removeRow(rowIdx)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded"
                      title="Delete Row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
                {row.map((cell, colIdx) => (
                  <td key={colIdx} className="p-1">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                      className={`w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500 ${
                        tableData.alignments[colIdx] === 'center'
                          ? 'text-center'
                          : tableData.alignments[colIdx] === 'right'
                          ? 'text-right'
                          : 'text-left'
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generated Markdown Output */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            GitHub Markdown Table Output
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Markdown')}
            </button>
            <button
              onClick={handleDownload}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
              title="Download table.md"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={markdownOutput}
          rows={8}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
        />
      </div>
    </div>
  );
}
