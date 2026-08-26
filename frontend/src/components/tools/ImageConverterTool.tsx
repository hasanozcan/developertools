'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, ArrowRightLeft, Image as ImageIcon } from 'lucide-react';
import {
  SUPPORTED_IMAGE_FORMATS,
  getImageExtension,
  replaceFileExtension,
  type SupportedImageFormat,
} from '@/lib/imageConverter';
import { formatFileSize } from '@/lib/imageCompressor';

export default function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<SupportedImageFormat>('image/webp');
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState<number>(90);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertImage = (imageFile: File, fmt: SupportedImageFormat, q: number) => {
    setIsConverting(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewUrl(dataUrl);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (fmt === 'image/jpeg') {
          // Fill background white for transparent images converting to JPEG
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setConvertedBlob(blob);
              setConvertedUrl(URL.createObjectURL(blob));
            }
            setIsConverting(false);
          },
          fmt,
          q / 100
        );
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(imageFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    convertImage(selected, targetFormat, quality);
  };

  const handleFormatChange = (newFmt: SupportedImageFormat) => {
    setTargetFormat(newFmt);
    if (file) {
      convertImage(file, newFmt, quality);
    }
  };

  const handleDownload = () => {
    if (!convertedUrl || !file) return;
    const newExt = getImageExtension(targetFormat);
    const downloadName = replaceFileExtension(file.name, newExt);
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = downloadName;
    link.click();
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition flex flex-col items-center justify-center space-y-4"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <ArrowRightLeft className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Select Image to Convert
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Convert between PNG, JPG, WebP, AVIF, BMP, ICO in your browser.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Options Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Format
              </label>
              <select
                value={targetFormat}
                onChange={(e) => handleFormatChange(e.target.value as SupportedImageFormat)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {SUPPORTED_IMAGE_FORMATS.map((fmt) => (
                  <option key={fmt.format} value={fmt.format}>
                    {fmt.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => {
                  setQuality(parseInt(e.target.value));
                  if (file) convertImage(file, targetFormat, parseInt(e.target.value));
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mt-2"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Change Image
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
                disabled={!convertedUrl || isConverting}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition disabled:opacity-50"
              >
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-center">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Original</span>
                <span className="text-xs font-mono text-slate-400">{formatFileSize(file.size)}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-2 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[250px]">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Original"
                    className="max-h-80 object-contain rounded-xl"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2 text-center">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Converted ({getImageExtension(targetFormat).toUpperCase()})
                </span>
                {convertedBlob && (
                  <span className="text-xs font-mono text-indigo-500 font-bold">
                    {formatFileSize(convertedBlob.size)}
                  </span>
                )}
              </div>
              <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 p-2 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[250px]">
                {convertedUrl ? (
                  <img
                    src={convertedUrl}
                    alt="Converted"
                    className="max-h-80 object-contain rounded-xl"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Converting...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
