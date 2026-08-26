'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Copy, Check, Upload, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { calculateAllChecksums, type ChecksumResult } from '@/lib/fileChecksumComparator';

export default function FileChecksumComparatorTool() {
  const [inputText, setInputText] = useState('DevsTools Secure Client-Side Hash Verification');
  const [expectedHash, setExpectedHash] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [checksums, setChecksums] = useState<ChecksumResult[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);

    calculateAllChecksums(data, expectedHash).then((res) => {
      if (active) setChecksums(res);
    });

    return () => {
      active = false;
    };
  }, [inputText, expectedHash]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      if (buffer) {
        const uint8 = new Uint8Array(buffer);
        calculateAllChecksums(uint8, expectedHash).then((res) => {
          setChecksums(res);
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCopy = (hash: string, algo: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedKey(algo);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* File / Text Input Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Input Mode (Text or File)
            </span>
            {fileName && (
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {fileName} ({Math.round((fileSize || 0) / 1024)} KB)
              </span>
            )}
          </div>

          <textarea
            value={inputText}
            onChange={(e) => {
              setFileName(null);
              setInputText(e.target.value);
            }}
            placeholder="Type or paste text to hash in real-time..."
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />

          <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center hover:border-indigo-400 dark:hover:border-indigo-600 transition">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Upload className="h-4 w-4 text-indigo-500" />
              <span>Or drag & drop any file to compute checksums locally</span>
            </div>
          </div>
        </div>

        {/* Expected Checksum Matcher */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" /> Expected Checksum Comparator
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste the publisher&apos;s expected MD5, SHA-256 or SHA-512 hash to verify integrity instantly.
            </p>
            <input
              type="text"
              value={expectedHash}
              onChange={(e) => setExpectedHash(e.target.value)}
              placeholder="e.g. 5eb63bbbe01eeed093cb22bb8f5acdc3..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {expectedHash && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
              {checksums.some((c) => c.matchesExpected) ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="h-4 w-4" /> Perfect Match! File checksum is authentic.
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                  <XCircle className="h-4 w-4" /> No matching hash algorithm found yet for this input.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Computed Hash Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="p-4 border-b border-slate-100 dark:border-white/5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Computed Hashes & Checksums
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {checksums.map(({ algorithm, hash, matchesExpected }) => (
            <div
              key={algorithm}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                matchesExpected ? 'bg-emerald-50/60 dark:bg-emerald-950/20' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-20 font-bold text-xs text-slate-900 dark:text-white">
                  {algorithm}
                </span>
                {matchesExpected !== undefined && (
                  matchesExpected ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> MATCH
                    </span>
                  ) : expectedHash ? (
                    <span className="text-[11px] text-slate-400">Mismatch</span>
                  ) : null
                )}
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-xl">
                <input
                  readOnly
                  value={hash}
                  className="w-full font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-slate-800 dark:text-indigo-200"
                />
                <button
                  onClick={() => handleCopy(hash, algorithm)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Copy Hash"
                >
                  {copiedKey === algorithm ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
