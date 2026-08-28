'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { generateFakerSchema } from '@/lib/fakerJsMockSchemaGenerator';

export default function FakerJsMockSchemaGeneratorTool() {
  const [val, setVal] = useState('');
  let output = '';
  try {
    const res = generateFakerSchema('User');
    output = typeof res === 'object' ? JSON.stringify(res, null, 2) : String(res);
  } catch (e: any) {
    output = e.message || 'Error generating output';
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Faker.js Mock Data Generator Function</label>
          <CopyButton text={output} />
        </div>
        <textarea
          value={output}
          readOnly
          rows={16}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
        />
      </div>
    </div>
  );
}
