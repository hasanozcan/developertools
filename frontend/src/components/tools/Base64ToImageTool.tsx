'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Image as ImageIcon, Sparkles } from 'lucide-react';
import { parseBase64Image } from '@/lib/base64ToImage';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_BASE64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9QzwAEjDAGYzUAAIpCA/1W/8VAAAAAAElFTkSuQmCC`;

export default function Base64ToImageTool() {
  const { t } = useLanguage();
  const [base64Input, setBase64Input] = useState(SAMPLE_BASE64);
  const [copied, setCopied] = useState(false);

  const decoded = useMemo(() => {
    return parseBase64Image(base64Input);
  }, [base64Input]);

  const handleDownload = () => {
    if (!decoded) return;
    const a = document.createElement('a');
    a.href = decoded.dataUrl;
    a.download = `decoded_image.${decoded.extension}`;
    a.click();
  };

  const handleCopyDataUri = () => {
    if (!decoded) return;
    navigator.clipboard.writeText(decoded.dataUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Sample Loader */}
      <div className="surface-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.b64image.title') || 'Base64 to Image Decoder & Preview'}
          </span>
        </div>
        <button
          onClick={() => setBase64Input(SAMPLE_BASE64)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          {t('common.loadSample') || 'Load Sample'}
        </button>
      </div>

      {/* Editor & Live Image Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Base64 Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('tool.b64image.inputLabel') || 'Base64 String or Data URI'}
          </span>
          <textarea
            value={base64Input}
            onChange={(e) => setBase64Input(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y break-all"
            placeholder="Paste data:image/png;base64,... or raw base64 string"
          />
        </div>

        {/* Image Preview & Actions */}
        <div className="surface-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Decoded Image Preview
            </span>
            {decoded && (
              <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {decoded.mimeType} (~{decoded.approxSizeKb} KB)
              </span>
            )}
          </div>

          {/* Checkerboard Image Container */}
          <div className="flex-1 flex items-center justify-center p-6 rounded-xl border border-dashed border-slate-300 dark:border-white/10 min-h-[220px] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
            {decoded ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={decoded.dataUrl}
                alt="Decoded result"
                className="max-h-56 max-w-full rounded-lg shadow-md object-contain"
              />
            ) : (
              <div className="text-center text-slate-400 text-xs">
                <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <span>Paste a valid Base64 image string to view preview</span>
              </div>
            )}
          </div>

          {/* Download & Copy Buttons */}
          {decoded && (
            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={handleCopyDataUri}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Data URI')}
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                <Download className="w-3.5 h-3.5" />
                {t('tool.b64image.downloadImage') || 'Download Image'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
