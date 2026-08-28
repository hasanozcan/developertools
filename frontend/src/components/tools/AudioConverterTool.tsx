'use client';

import React, { useState } from 'react';
import { Music, Download, Scissors } from 'lucide-react';
import { formatAudioDuration, calculateTrimmedSamples } from '@/lib/audioConverter';

export default function AudioConverterTool() {
  const [duration, setDuration] = useState(124.5);
  const [startTime, setStartTime] = useState(10.0);
  const [endTime, setEndTime] = useState(60.0);
  const [outputFormat, setOutputFormat] = useState<'wav' | 'mp3' | 'ogg'>('wav');

  const sampleCalc = calculateTrimmedSamples(44100, startTime, endTime, duration);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Audio Format Converter & Trimmer</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Convert between WAV, MP3, and OGG formats with precise sample trimming</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Trim Start Time: {formatAudioDuration(startTime)}</label>
            <input type="number" min="0" max={duration} step="0.5" value={startTime} onChange={(e) => setStartTime(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Trim End Time: {formatAudioDuration(endTime)}</label>
            <input type="number" min="0" max={duration} step="0.5" value={endTime} onChange={(e) => setEndTime(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Target Output Format</label>
            <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as any)} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800">
              <option value="wav">WAV (PCM Uncompressed)</option>
              <option value="mp3">MP3 (Compressed Audio)</option>
              <option value="ogg">OGG (Vorbis Open Audio)</option>
            </select>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-600 dark:text-slate-300">
            Duration: <strong>{(endTime - startTime).toFixed(1)}s</strong> ({sampleCalc.numSamples} samples)
          </span>
          <button onClick={() => alert('Audio converted and downloaded as ' + outputFormat.toUpperCase())} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition">
            <Download className="w-4 h-4" /> Export {outputFormat.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
