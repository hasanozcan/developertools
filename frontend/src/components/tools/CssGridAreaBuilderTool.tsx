'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateGridTemplateAreasCss } from '@/lib/cssGridAreaBuilder';

const matrix = [
  ['header', 'header', 'header'],
  ['sidebar', 'main', 'main'],
  ['footer', 'footer', 'footer'],
];

export default function CssGridAreaBuilderTool() {
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => generateGridTemplateAreasCss(matrix, '16px'), []);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="p-4 rounded-xl bg-slate-900 font-mono text-emerald-400 text-xs">
          <pre>{result.css}</pre>
        </div>
      </div>
    </div>
  );
}
