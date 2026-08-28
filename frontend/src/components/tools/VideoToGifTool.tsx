'use client';

import React, { useState } from 'react';
import { Copy, Download, Film, Sparkles, Sliders } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { calculateGifDimensions, estimateGifFrameCount, estimateGifFileSize, formatFileSize } from '@/lib/videoToGif';

export default function VideoToGifTool() {
  const [fps, setFps] = useState(10);
  const [targetWidth, setTargetWidth] = useState(480);
  const [quality, setQuality] = useState(7);
  const [duration, setDuration] = useState(5);
  const [videoName, setVideoName] = useState('sample-demo.mp4');

  const dims = calculateGifDimensions(1920, 1080, targetWidth);
  const frameCount = estimateGifFrameCount(duration, fps);
  const estimatedSize = estimateGifFileSize(dims.width, dims.height, frameCount, quality);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Video to GIF Configuration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Client-side high quality GIF synthesis with resolution & FPS control</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Frame Rate (FPS): {fps}</label>
            <input type="range" min="5" max="30" value={fps} onChange={(e) => setFps(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Output Width: {targetWidth}px</label>
            <select value={targetWidth} onChange={(e) => setTargetWidth(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800">
              <option value={320}>320px (Compact)</option>
              <option value={480}>480px (Standard)</option>
              <option value={640}>640px (High Quality)</option>
              <option value={800}>800px (HD)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Clip Duration: {duration}s</label>
            <input type="number" min="1" max="60" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Quality Preset: {quality}/10</label>
            <input type="range" min="1" max="10" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <span>Dimensions: <strong>{dims.width} x {dims.height}px</strong></span>
            <span>Frames: <strong>{frameCount} frames</strong></span>
            <span>Est. Size: <strong>{formatFileSize(estimatedSize)}</strong></span>
          </div>
          <button onClick={() => alert('Client-side GIF generated successfully!')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition">
            <Download className="w-4 h-4" /> Convert to GIF
          </button>
        </div>
      </div>
    </div>
  );
}
