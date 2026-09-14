'use client';

import { useMemo, useState } from 'react';
import { parseSearchConsoleCsv, rankSeoOpportunities } from '@/lib/searchConsoleOpportunities';

export default function SearchConsoleOpportunityPanel() {
  const [csv, setCsv] = useState('');
  const rows = useMemo(() => parseSearchConsoleCsv(csv), [csv]);
  const opportunities = useMemo(() => rankSeoOpportunities(rows).slice(0, 100), [rows]);

  const readFile = async (file: File | undefined) => {
    if (!file) return;
    setCsv(await file.text());
  };

  return (
    <div className="space-y-6">
      <section className="surface-card rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Import Search Console CSV</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Export the Performance table from Google Search Console with Clicks, Impressions, CTR and Position. Analysis stays in this browser.
        </p>
        <label className="mt-5 inline-flex cursor-pointer items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
          Choose CSV
          <input type="file" accept=".csv,text/csv" className="sr-only" onChange={(event) => void readFile(event.target.files?.[0])} />
        </label>
        <textarea
          value={csv}
          onChange={(event) => setCsv(event.target.value)}
          placeholder="Or paste CSV here…"
          className="mt-4 min-h-40 w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-800 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
      </section>

      <section className="surface-card rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">SEO opportunities</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Positions 4–20 with at least 20 impressions, ranked by estimated click upside.</p>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
            {opportunities.length} opportunities
          </span>
        </div>

        {csv && rows.length === 0 && (
          <p role="status" className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            No compatible rows found. The CSV needs Impressions and Position columns; Clicks and CTR are recommended.
          </p>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-white/10 dark:text-slate-400">
              <tr><th className="p-3">Query / Page</th><th className="p-3">Clicks</th><th className="p-3">Impr.</th><th className="p-3">CTR</th><th className="p-3">Pos.</th><th className="p-3">Upside</th><th className="p-3">Action</th></tr>
            </thead>
            <tbody>
              {opportunities.map((row, index) => (
                <tr key={`${row.query || row.page || 'row'}-${index}`} className="border-b border-slate-100 align-top dark:border-white/5">
                  <td className="p-3 font-medium text-slate-900 dark:text-white">{row.query || row.page || 'Unknown'}</td>
                  <td className="p-3">{row.clicks.toLocaleString()}</td>
                  <td className="p-3">{row.impressions.toLocaleString()}</td>
                  <td className="p-3">{(row.ctr * 100).toFixed(2)}%</td>
                  <td className="p-3">{row.position.toFixed(1)}</td>
                  <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">+{Math.round(row.potentialClicks)}</td>
                  <td className="max-w-md p-3 text-slate-600 dark:text-slate-300">{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
