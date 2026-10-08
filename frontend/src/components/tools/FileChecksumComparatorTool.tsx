'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Copy, Check, Upload, CheckCircle2, XCircle } from 'lucide-react';
import { calculateAllChecksums, type ChecksumResult } from '@/lib/fileChecksumComparator';
import { interpolateText } from '@/lib/localizedText';

export default function FileChecksumComparatorTool() {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('DevsTools Secure Client-Side Hash Verification');
  const [expectedHash, setExpectedHash] = useState('');
  const [fileSource, setFileSource] = useState<{ file: File } | null>(null);
  const selectedFile = fileSource?.file ?? null;
  const [checksums, setChecksums] = useState<ChecksumResult[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [inputError, setInputError] = useState(false);
  const hashRequest = useRef(0);
  const isHashing = !inputError && checksums.length === 0;
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
            <label
              htmlFor="checksum-text"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              {t("uiText.627c0307")}</label>
            {selectedFile && (
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} {t("uiText.14ba3f63")}</span>
            )}
          </div>

          <textarea
            id="checksum-text"
            value={inputText}
            onChange={(e) => {
              ++hashRequest.current;
              setChecksums([]);
              setInputError(false);
              setFileSource(null);
              setInputText(e.target.value);
            }}
            placeholder={t("uiText.0cb9b1ce")}
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => {
                if (!fileSource && inputText === 'abc') return;
                ++hashRequest.current;
                setChecksums([]);
                setInputError(false);
                setFileSource(null);
                setInputText('abc');
              }}
              className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-indigo-600 hover:bg-slate-50 dark:border-slate-700 dark:text-indigo-400 dark:hover:bg-slate-800"
            >
              {t("uiText.7ae3d337")}</button>
            <span>{t("uiText.54ff4231")}</span>
          </div>

          <div className="relative focus-within:ring-2 focus-within:ring-indigo-500 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center hover:border-indigo-400 dark:hover:border-indigo-600 transition">
            <input
              type="file"
              aria-label={t("uiText.5cc87949")}
              aria-describedby="checksum-file-help"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Upload className="h-4 w-4 text-indigo-500" />
              <span>{t("uiText.391a11c1")}</span>
            </div>
          </div>
          <p id="checksum-file-help" className="text-xs text-slate-500 dark:text-slate-400">
            {t("uiText.75970fd0")}</p>
        </div>

        {/* Expected Checksum Matcher */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 flex flex-col justify-between">
          <div className="space-y-2">
            <label
              htmlFor="checksum-expected"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" /> {t("uiText.ccd1cbc4")}</label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t("uiText.ce2adfa5")}</p>
            <input
              id="checksum-expected"
              type="text"
              spellCheck={false}
              autoComplete="off"
              value={expectedHash}
              onChange={(e) => setExpectedHash(e.target.value)}
              placeholder={t("uiText.01fb2a13")}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {normalizedExpectedHash && !isHashing && !inputError && (
            <div role="status" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
              {comparedChecksums.some((c) => c.matchesExpected) ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="h-4 w-4" /> {t("uiText.35aba754")}</div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                  <XCircle className="h-4 w-4" /> {t("uiText.d53946be")}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {inputError && <p role="alert">{t("uiText.8eee4c81")}</p>}

      {/* Computed Hash Table */}
      <div
        aria-busy={isHashing}
        className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900"
      >
        <div className="p-4 border-b border-slate-100 dark:border-white/5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {t("uiText.877ac750")}</div>
        {isHashing && (
          <p role="status" className="p-4 text-sm text-slate-600 dark:text-slate-300">
            {selectedFile ? t("uiText.5f8c262e") : t("uiText.c801b2b0")}
            {normalizedExpectedHash && ' ' + t("uiText.ed95b99c")}
          </p>
        )}
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
                      <CheckCircle2 className="h-3.5 w-3.5" /> {t("uiText.3bb15d76")}</span>
                  ) : normalizedExpectedHash ? (
                    <span className="text-[11px] text-slate-400">{t("uiText.bfdb40b1")}</span>
                  ) : null)}
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-xl">
                <input
                  readOnly
                  aria-label={interpolateText(t('tool.fileChecksum.algorithmLabel'), { algorithm })}
                  value={hash}
                  className="w-full font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-slate-800 dark:text-indigo-200"
                />
                <button
                  aria-label={interpolateText(t('tool.fileChecksum.copyAlgorithm'), { algorithm })}
                  onClick={() => handleCopy(hash, algorithm)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title={t("uiText.78551acc")}
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
