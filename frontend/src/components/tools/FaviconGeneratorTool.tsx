'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Copy, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { FAVICON_SIZES, generateFaviconHtmlTags, generateWebManifest } from '@/lib/faviconGenerator';
import { useLanguage } from '@/context/LanguageContext';

export default function FaviconGeneratorTool() {
  const { t } = useLanguage();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [appName, setAppName] = useState('My Awesome App');
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedManifest, setCopiedManifest] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadSize = (size: number, filename: string) => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    img.src = imageSrc;
  };

  const htmlTags = generateFaviconHtmlTags();
  const manifestJson = generateWebManifest(appName);

  const copyText = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="surface-card rounded-3xl p-8 border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer text-center transition group flex flex-col items-center justify-center min-h-[180px]"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <p className="font-bold text-slate-900 dark:text-white text-base">
          {t('tool.favicon.uploadPrompt') || 'Click or drag an image here (PNG, JPG, SVG, WebP)'}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {t('tool.favicon.uploadSub') || 'Recommended: Square image at least 512x512 pixels'}
        </p>
      </div>

      {/* Generated Sizes Grid */}
      {imageSrc && (
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            {t('tool.favicon.generatedSizes') || 'Generated Favicon Sizes'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {FAVICON_SIZES.map(({ size, name, purpose }) => (
              <div
                key={size}
                className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-between text-center space-y-3"
              >
                <span className="text-[11px] font-bold text-slate-500 uppercase">{size}x{size}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={name}
                  style={{ width: `${Math.min(size, 48)}px`, height: `${Math.min(size, 48)}px` }}
                  className="rounded object-contain shadow-sm"
                />
                <span className="text-[10px] text-slate-400 leading-tight">{purpose}</span>
                <button
                  onClick={() => handleDownloadSize(size, name)}
                  className="w-full py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 flex items-center justify-center gap-1 transition shadow-sm"
                >
                  <Download className="w-3 h-3" />
                  PNG
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HTML Links and Web Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HTML Header Tags */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              HTML &lt;head&gt; Favicon Tags
            </span>
            <button
              onClick={() => copyText(htmlTags, setCopiedTags)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedTags ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedTags ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Tags')}
            </button>
          </div>
          <textarea
            readOnly
            value={htmlTags}
            rows={7}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
          />
        </div>

        {/* site.webmanifest */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                site.webmanifest
              </span>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="App Name"
                className="px-2 py-0.5 text-xs rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <button
              onClick={() => copyText(manifestJson, setCopiedManifest)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedManifest ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedManifest ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Manifest')}
            </button>
          </div>
          <textarea
            readOnly
            value={manifestJson}
            rows={7}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
