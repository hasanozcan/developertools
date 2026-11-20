'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { gridToCsv, gridToJson, parseCsvToGrid, parseJsonToGrid } from '@/lib/jsonCsvGridEditor';

const SAMPLE_JSON = JSON.stringify(
  [
    { id: 1, name: 'Alice', role: 'Developer', city: 'San Francisco' },
    { id: 2, name: 'Bob', role: 'Designer', city: 'London' },
    { id: 3, name: 'Charlie', role: 'Product Manager', city: 'Berlin' },
  ],
  null,
  2,
);

export default function JsonCsvGridEditorTool() {
  const { t } = useLanguage();
  const initial = useMemo(() => parseJsonToGrid(SAMPLE_JSON), []);
  const [headers, setHeaders] = useState<string[]>(initial.headers);
  const [rows, setRows] = useState<string[][]>(initial.rows);
  const [importText, setImportText] = useState(SAMPLE_JSON);
  const [importFormat, setImportFormat] = useState<'json' | 'csv'>('json');
  const [importError, setImportError] = useState<string | null>(null);

  const jsonOutput = useMemo(() => gridToJson(headers, rows), [headers, rows]);
  const csvOutput = useMemo(() => gridToCsv(headers, rows), [headers, rows]);

  const updateHeader = (colIdx: number, value: string) => {
    setHeaders((prev) => prev.map((h, i) => (i === colIdx ? value : h)));
  };

  const updateCell = (rowIdx: number, colIdx: number, value: string) => {
    setRows((prev) =>
      prev.map((row, r) =>
        r === rowIdx ? row.map((cell, c) => (c === colIdx ? value : cell)) : row,
      ),
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, headers.map(() => '')]);
  };

  const deleteRow = (rowIdx: number) => {
    setRows((prev) => prev.filter((_, idx) => idx !== rowIdx));
  };

  const addColumn = () => {
    const colName = `column_${headers.length + 1}`;
    setHeaders((prev) => [...prev, colName]);
    setRows((prev) => prev.map((row) => [...row, '']));
  };

  const deleteColumn = (colIdx: number) => {
    if (headers.length <= 1) return;
    setHeaders((prev) => prev.filter((_, idx) => idx !== colIdx));
    setRows((prev) => prev.map((row) => row.filter((_, idx) => idx !== colIdx)));
  };

  const handleImport = () => {
    setImportError(null);
    if (importFormat === 'json') {
      try {
        JSON.parse(importText);
      } catch (err) {
        setImportError(err instanceof Error ? `Invalid JSON: ${err.message}` : 'Invalid JSON.');
        return;
      }
      const parsed = parseJsonToGrid(importText);
      if (parsed.headers.length === 0) {
        setImportError('JSON must be a non-empty array of objects or values.');
        return;
      }
      setHeaders(parsed.headers);
      setRows(parsed.rows);
      return;
    }

    const parsedCsv = parseCsvToGrid(importText);
    if (parsedCsv.headers.length === 0) {
      setImportError('CSV input is empty.');
      return;
    }
    setHeaders(parsedCsv.headers);
    setRows(parsedCsv.rows);
  };

  const handleResetSample = () => {
    const sample = parseJsonToGrid(SAMPLE_JSON);
    setHeaders(sample.headers);
    setRows(sample.rows);
    setImportFormat('json');
    setImportText(SAMPLE_JSON);
    setImportError(null);
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {t('uiText.e9ca8b51')}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Row
            </button>
            <button
              type="button"
              onClick={addColumn}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Column
            </button>
            <button
              type="button"
              onClick={handleResetSample}
              className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {t('common.loadSample')}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                {headers.map((header, colIdx) => (
                  <th key={colIdx} className="p-2 min-w-[130px]">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        aria-label={`Column ${colIdx + 1} header`}
                        value={header}
                        onChange={(e) => updateHeader(colIdx, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
                      />
                      <button
                        type="button"
                        onClick={() => deleteColumn(colIdx)}
                        disabled={headers.length <= 1}
                        aria-label={`Delete column ${header || colIdx + 1}`}
                        className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 dark:hover:bg-red-950/40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="p-2 w-10 text-right font-semibold text-slate-400">Row</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                >
                  {headers.map((_, cIdx) => (
                    <td key={cIdx} className="p-1.5">
                      <input
                        type="text"
                        aria-label={`Row ${rIdx + 1} Column ${cIdx + 1}`}
                        value={row[cIdx] ?? ''}
                        onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                        className="w-full rounded-lg border border-slate-200/80 bg-transparent px-2 py-1 font-mono text-xs text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:focus:bg-slate-950"
                      />
                    </td>
                  ))}
                  <td className="p-1.5 text-right">
                    <button
                      type="button"
                      onClick={() => deleteRow(rIdx)}
                      aria-label={`Delete row ${rIdx + 1}`}
                      className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Import Data Into Grid:
            </span>
            <select
              aria-label="Import format"
              value={importFormat}
              onChange={(e) => {
                const next = e.target.value as 'json' | 'csv';
                setImportFormat(next);
                setImportText(next === 'json' ? jsonOutput : csvOutput);
                setImportError(null);
              }}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleImport}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
          >
            <Upload className="h-3.5 w-3.5" />
            Load into Grid
          </button>
        </div>

        <textarea
          aria-label="Import JSON or CSV"
          rows={5}
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
        />

        {importError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {importError}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Exported JSON</span>
            <CopyButton text={jsonOutput} />
          </div>
          <textarea
            aria-label="Exported JSON output"
            readOnly
            rows={8}
            value={jsonOutput}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="surface-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Exported CSV</span>
            <CopyButton text={csvOutput} />
          </div>
          <textarea
            aria-label="Exported CSV output"
            readOnly
            rows={8}
            value={csvOutput}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
