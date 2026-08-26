'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, ShieldCheck, ShieldAlert, Camera, MapPin, Calendar, Info } from 'lucide-react';
import { parseExifFromBuffer, stripJpegExif, type ParsedExifData } from '@/lib/imageExifStripper';
import { formatFileSize } from '@/lib/imageCompressor';

export default function ImageExifStripperTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [exifData, setExifData] = useState<ParsedExifData | null>(null);
  const [cleanBlob, setCleanBlob] = useState<Blob | null>(null);
  const [cleanUrl, setCleanUrl] = useState<string | null>(null);
  const [isStripped, setIsStripped] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setIsStripped(false);
    setCleanBlob(null);
    setCleanUrl(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      if (buffer) {
        const parsed = parseExifFromBuffer(buffer);
        setExifData(parsed);
        const dataUrl = URL.createObjectURL(new Blob([buffer], { type: selected.type }));
        setPreviewUrl(dataUrl);
      }
    };
    reader.readAsArrayBuffer(selected);
  };

  const handleStrip = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      if (buffer) {
        let cleanBytes: Uint8Array;
        if (file.type === 'image/jpeg' || file.name.match(/\.(jpg|jpeg)$/i)) {
          cleanBytes = stripJpegExif(buffer);
        } else {
          // Re-encode via canvas for non-JPEG
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                setCleanBlob(blob);
                setCleanUrl(URL.createObjectURL(blob));
                setIsStripped(true);
              }
            }, file.type);
          };
          img.src = previewUrl!;
          return;
        }

        const blob = new Blob([cleanBytes as any], { type: file.type || 'image/jpeg' });
        setCleanBlob(blob);
        setCleanUrl(URL.createObjectURL(blob));
        setIsStripped(true);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownload = () => {
    if (!cleanUrl || !file) return;
    const link = document.createElement('a');
    link.href = cleanUrl;
    link.download = `privacy-clean-${file.name}`;
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
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Select Photo to Inspect & Strip EXIF Metadata
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Inspect hidden camera details, GPS geolocation, and timestamps. Remove all metadata with 1 click.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">{file.name}</span>
              <span className="text-xs text-slate-500">({formatFileSize(file.size)})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Change Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {!isStripped ? (
                <button
                  onClick={handleStrip}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4" /> Strip All EXIF & Privacy Tags
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition shadow-sm"
                >
                  <Download className="h-4 w-4" /> Download Clean Image
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900 flex flex-col items-center justify-center min-h-[300px]">
              {previewUrl && (
                <img
                  src={isStripped && cleanUrl ? cleanUrl : previewUrl}
                  alt="Preview"
                  className="max-h-80 object-contain rounded-xl shadow-sm"
                />
              )}
              {isStripped && (
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4" /> EXIF metadata successfully removed!
                </span>
              )}
            </div>

            {/* Metadata Info Panel */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-indigo-500" /> Detected Metadata
              </span>

              {exifData?.hasExif ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center gap-2 text-amber-700 dark:text-amber-300">
                    <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                    <span>This photo contains embedded camera and exposure metadata.</span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {exifData.cameraModel && (
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Camera className="h-3.5 w-3.5" /> Camera / Device
                        </span>
                        <span className="font-semibold">{exifData.cameraModel}</span>
                      </div>
                    )}
                    {exifData.dateTimeOriginal && (
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" /> Date & Time Taken
                        </span>
                        <span className="font-semibold">{exifData.dateTimeOriginal}</span>
                      </div>
                    )}
                    {Object.entries(exifData.rawTags).map(([k, v]) => (
                      <div key={k} className="py-2 flex items-center justify-between">
                        <span className="text-slate-500">{k}</span>
                        <span className="font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center text-xs text-slate-500 dark:text-slate-400">
                  No EXIF privacy metadata found in this image.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
