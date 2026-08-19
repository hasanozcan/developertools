'use client';

import React, { useState, useRef } from 'react';
import { Download, Image as ImageIcon, Upload, RefreshCw } from 'lucide-react';
import { sanitizeSvg, extractSvgDimensions, type RasterFormat } from '@/lib/svgToRaster';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_SVG = `<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="300" height="200" rx="20" fill="url(#grad)" />
  <circle cx="150" cy="100" r="45" fill="#ffffff" opacity="0.9" />
  <path d="M140 85 L170 100 L140 115 Z" fill="#4f46e5" />
  <text x="150" y="170" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">DevTools Raster</text>
</svg>`;

export default function SvgToPngConverterTool() {
  const { t } = useLanguage();
  const [svgInput, setSvgInput] = useState(SAMPLE_SVG);
  const [format, setFormat] = useState<RasterFormat>('image/png');
  const [scale, setScale] = useState(2); // 1x, 2x, 4x
  const [bgColor, setBgColor] = useState('transparent');
  const [isRendering, setIsRendering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleConvertAndDownload = () => {
    setIsRendering(true);
    try {
      const sanitized = sanitizeSvg(svgInput);
      const { width, height } = extractSvgDimensions(sanitized);

      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Could not get Canvas context');

      const img = new Image();
      const svgBlob = new Blob([sanitized], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        if (bgColor !== 'transparent') {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        const ext = format === 'image/png' ? 'png' : format === 'image/jpeg' ? 'jpg' : 'webp';
        const dataUrl = canvas.toDataURL(format, 0.95);

        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `rasterized_image_${scale}x.${ext}`;
        a.click();
        setIsRendering(false);
      };

      img.onerror = () => {
        setIsRendering(false);
        alert('Failed to parse SVG for rendering.');
      };

      img.src = url;
    } catch {
      setIsRendering(false);
      alert('Invalid SVG markup.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgInput(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {/* Configuration Settings */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.svgtopng.settings') || 'Export Format & Resolution Scaling'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Format */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Target Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as RasterFormat)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="image/png">PNG (Lossless with Transparency)</option>
              <option value="image/jpeg">JPEG (Compressed)</option>
              <option value="image/webp">WebP (Modern Web Format)</option>
            </select>
          </div>

          {/* Scale */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Resolution Scale</label>
            <select
              value={scale}
              onChange={(e) => setScale(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="1">1x (Standard Size)</option>
              <option value="2">2x (High DPI / Retina)</option>
              <option value="4">4x (Ultra HD 4K)</option>
            </select>
          </div>

          {/* Background Color */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Background Fill</label>
            <select
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="transparent">Transparent (PNG/WebP only)</option>
              <option value="#ffffff">White (#ffffff)</option>
              <option value="#000000">Black (#000000)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor & Preview Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SVG Code Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Raw SVG Markup
            </span>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload .svg</span>
                <input type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        {/* Live Preview & Convert Action */}
        <div className="surface-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Vector Visual Preview
          </span>

          <div
            className="flex-1 flex items-center justify-center p-6 rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden min-h-[220px]"
            dangerouslySetInnerHTML={{ __html: sanitizeSvg(svgInput) }}
          />

          <button
            onClick={handleConvertAndDownload}
            disabled={isRendering}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
          >
            {isRendering ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Rendering Raster Image...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>
                  Convert & Download as {format === 'image/png' ? 'PNG' : format === 'image/jpeg' ? 'JPEG' : 'WebP'} (
                  {scale}x)
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
