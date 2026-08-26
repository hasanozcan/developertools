'use client';

import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Palette, Pipette } from 'lucide-react';
import {
  extractPaletteFromImageData,
  rgbToHex,
  rgbToHsl,
  getContrastTextColor,
  type ExtractedColor,
} from '@/lib/imageColorExtractor';

export default function ImageColorExtractorTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImageSrc(dataUrl);

      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        const extracted = extractPaletteFromImageData(imgData.data, 6);
        setColors(extracted);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setPickedColor(hex);
  };

  return (
    <div className="space-y-6">
      {/* Upload Banner */}
      {!imageSrc ? (
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
            <Palette className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Upload an Image to Extract Color Palette
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-extracts dominant colors with HEX, RGB, HSL codes and interactive pixel eyedropper.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Click anywhere on the image to inspect and pick exact pixel colors.
            </span>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Upload New Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Palette Grid Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {colors.map((c, i) => (
              <div
                key={i}
                onClick={() => handleCopy(c.hex)}
                className="group relative cursor-pointer rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 shadow-sm flex flex-col justify-between h-36"
                style={{ backgroundColor: c.hex }}
              >
                <div className="flex justify-between items-start">
                  <span
                    className="text-[11px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm bg-black/20 text-white"
                  >
                    {c.percentage}%
                  </span>
                  <button
                    className="p-1 rounded-md bg-black/20 text-white opacity-80 group-hover:opacity-100 transition"
                  >
                    {copiedHex === c.hex ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div>
                  <p
                    className="font-mono font-bold text-xs uppercase"
                    style={{ color: c.textColor }}
                  >
                    {c.hex}
                  </p>
                  <p
                    className="font-mono text-[10px] opacity-80"
                    style={{ color: c.textColor }}
                  >
                    rgb({c.rgb.r}, {c.rgb.g}, {c.rgb.b})
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Eyedropper Live Inspector & Canvas */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900 space-y-4">
            {pickedColor && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div
                  className="w-8 h-8 rounded-lg border border-white/20 shadow-inner"
                  style={{ backgroundColor: pickedColor }}
                />
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Eyedropper Picked Color:</span>
                  <p className="font-mono font-bold text-xs text-slate-900 dark:text-white uppercase">
                    {pickedColor}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(pickedColor)}
                  className="ml-auto flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  {copiedHex === pickedColor ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  Copy
                </button>
              </div>
            )}

            <div className="flex justify-center bg-slate-950/5 dark:bg-slate-950/40 rounded-xl p-3 overflow-auto">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="max-h-96 object-contain rounded-lg cursor-crosshair shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
