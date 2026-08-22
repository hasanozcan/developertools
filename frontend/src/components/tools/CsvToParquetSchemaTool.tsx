'use client';
import React, { useState, useMemo } from 'react';
import { csvToParquetSchema } from '@/lib/csvToParquetSchema';

export default function CsvToParquetSchemaTool() {
  const [csv, setCsv] = useState('id,name,score,is_active\n1,Alice,95.5,true');
  const output = useMemo(() => {
    try { return csvToParquetSchema(csv); } catch (e: any) { return '# ' + e.message; }
  }, [csv]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={csv} onChange={(e) => setCsv(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
