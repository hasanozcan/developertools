'use client';
import React, { useState, useMemo } from 'react';
import { convertMarkdownToSlidesHtml } from '@/lib/markdownToSlides';

export default function MarkdownToSlidesTool() {
  const [md, setMd] = useState('# Slide 1: Welcome\n---\n# Slide 2: Next Steps');
  const html = useMemo(() => convertMarkdownToSlidesHtml(md), [md]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={md} onChange={(e) => setMd(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={html} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
