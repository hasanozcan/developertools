'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Sliders, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';
import {
  calculateCompressionMetrics,
  calculateTargetDimensions,
  formatFileSize,
  type ImageCompressionMetrics,
} from '@/lib/imageCompressor';

export default function ImageCompressorTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/webp');
  const [metrics, setMetrics] = useState<ImageCompressionMetrics | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = (file: File, q: number, maxW: number, fmt: string) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setOriginalUrl(dataUrl);

      const img = new Image();
      img.onload = () => {
        const { width, height } = calculateTargetDimensions(img.width, img.height, maxW);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // High quality bicubic resampling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setCompressedBlob(blob);
              setCompressedUrl(url);
              setMetrics(calculateCompressionMetrics(file.size, blob.size));
            }
            setIsProcessing(false);
          },
          fmt,
          q / 100
        );
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    processImage(file, quality, maxWidth, format);
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (originalFile) {
      processImage(originalFile, newQuality, maxWidth, format);
    }
  };

  const handleFormatChange = (newFmt: 'image/jpeg' | 'image/webp' | 'image/png') => {
    setFormat(newFmt);
    if (originalFile) {
      processImage(originalFile, quality, maxWidth, newFmt);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !originalFile) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const link = document.createElement('a');
    link.href = compressedUrl!;
    link.download = `optimized-${originalFile.name.replace(/\.[^/.]+$/, '')}.${ext}`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      {!originalFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition flex flex-col items-center justify-center space-y-4"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/avif"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <Upload className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Drag & Drop Image or Click to Browse
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Supports PNG, JPG, WebP, AVIF. 100% processed client-side in browser.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Quality: {quality}%
                </label>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                value={quality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Output Format
              </label>
              <select
                value={format}
                onChange={(e) => handleFormatChange(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="image/webp">WebP (Recommended - Smallest)</option>
                <option value="image/jpeg">JPEG / JPG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Choose Another
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleDownload}
                disabled={!compressedUrl || isProcessing}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition disabled:opacity-50"
              >
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </div>

          {/* Metrics Banner */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-center">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Original Size</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {formatFileSize(metrics.originalSize)}
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Compressed Size</span>
                <p className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  {formatFileSize(metrics.compressedSize)}
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Space Saved</span>
                <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                  {metrics.savedPercentage}% ({formatFileSize(metrics.savedBytes)})
                </p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Compression Ratio</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {metrics.compressionRatio}x
                </p>
              </div>
            </div>
          )}

          {/* Side-by-Side Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Original Preview</span>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-2 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[250px]">
                {originalUrl && (
                  <img
                    src={originalUrl}
                    alt="Original"
                    className="max-h-80 object-contain rounded-xl"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2 text-center">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Optimized Preview ({quality}%)
              </span>
              <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 p-2 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[250px]">
                {compressedUrl ? (
                  <img
                    src={compressedUrl}
                    alt="Compressed"
                    className="max-h-80 object-contain rounded-xl"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Processing optimization...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
