'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { parseJsonToGrid, gridToJson, gridToCsv } from '@/lib/jsonCsvGridEditor';

const SAMPLE_JSON = JSON.stringify([
  { id: 1, name: "Alice", role: "Developer", city: "San Francisco" },
  { id: 2, name: "Bob", role: "Designer", city: "London" },
  { id: 3, name: "Charlie", role: "Product Manager", city: "Berlin" }
], null, 2);

export default function JsonCsvGridEditorTool() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const grid = parseJsonToGrid(jsonInput);
  const csvOutput = gridToCsv(grid.headers, grid.rows);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Interactive Spreadsheet Data Grid</label>
          <div className="flex gap-2">
            <CopyButton text={csvOutput} />
            <CopyButton text={jsonInput} />
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                {grid.headers.map((h, i) => (
                  <th key={i} className="p-2 font-semibold text-slate-700 dark:text-slate-300">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2 font-mono text-slate-600 dark:text-slate-300">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
