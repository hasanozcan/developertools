'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Copy, Check, Upload, CheckCircle2, XCircle } from 'lucide-react';
import { calculateAllChecksums, type ChecksumResult } from '@/lib/fileChecksumComparator';

export default function FileChecksumComparatorTool() {
  const [inputText, setInputText] = useState('DevsTools Secure Client-Side Hash Verification');
  const [expectedHash, setExpectedHash] = useState('');
  const [fileSource, setFileSource] = useState<{ file: File } | null>(null);
  const selectedFile = fileSource?.file ?? null;
  const [checksums, setChecksums] = useState<ChecksumResult[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [inputError, setInputError] = useState(false);
  const hashRequest = useRef(0);
  const normalizedExpectedHash = expectedHash.trim().toLowerCase();
  const comparedChecksums = checksums.map((checksum) => ({
    ...checksum,
    matchesExpected: normalizedExpectedHash
      ? checksum.hash.toLowerCase() === normalizedExpectedHash
      : undefined,
  }));

  useEffect(() => {
    let active = true;
    const requestId = ++hashRequest.current;
    let reader: FileReader | undefined;
    const isCurrent = () => active && requestId === hashRequest.current;
    setChecksums([]);
    setInputError(false);

    const calculate = async (data: Uint8Array) => {
      try {
        const results = await calculateAllChecksums(data);
        if (isCurrent()) setChecksums(results);
      } catch {
        if (isCurrent()) setInputError(true);
      }
    };

    if (fileSource) {
      reader = new FileReader();
      reader.onload = () => {
        if (isCurrent() && reader?.result instanceof ArrayBuffer) {
          void calculate(new Uint8Array(reader.result));
        }
      };
      reader.onerror = () => {
        if (isCurrent()) setInputError(true);
      };
      try {
        reader.readAsArrayBuffer(fileSource.file);
      } catch {
        if (isCurrent()) setInputError(true);
      }
    } else {
      void calculate(new TextEncoder().encode(inputText));
    }

    return () => {
      active = false;
      if (reader?.readyState === FileReader.LOADING) reader.abort();
    };
  }, [inputText, fileSource]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file && !fileSource) return;
    ++hashRequest.current;
    setChecksums([]);
    setInputError(false);
    setFileSource(file ? { file } : null);
    // Allow selecting the same file again after changing the source.
    e.target.value = '';
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
            {selectedFile && (
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </span>
            )}
          </div>

          <textarea
            value={inputText}
            onChange={(e) => {
              ++hashRequest.current;
              setChecksums([]);
              setInputError(false);
              setFileSource(null);
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
              Paste the publisher&apos;s expected MD5, SHA-256 or SHA-512 hash to verify integrity
              instantly.
            </p>
            <input
              type="text"
              value={expectedHash}
              onChange={(e) => setExpectedHash(e.target.value)}
              placeholder="e.g. 5eb63bbbe01eeed093cb22bb8f5acdc3..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {normalizedExpectedHash && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
              {comparedChecksums.some((c) => c.matchesExpected) ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="h-4 w-4" /> Perfect Match! Computed checksum matches the
                  expected hash.
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                  <XCircle className="h-4 w-4" /> No matching hash algorithm found yet for this
                  input.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {inputError && <p role="alert">Could not read or hash this input. Try again.</p>}

      {/* Computed Hash Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="p-4 border-b border-slate-100 dark:border-white/5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Computed Hashes & Checksums
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {comparedChecksums.map(({ algorithm, hash, matchesExpected }) => (
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
                {matchesExpected !== undefined &&
                  (matchesExpected ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> MATCH
                    </span>
                  ) : normalizedExpectedHash ? (
                    <span className="text-[11px] text-slate-400">Mismatch</span>
                  ) : null)}
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
                  {copiedKey === algorithm ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
