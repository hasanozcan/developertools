'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, Scissors, CheckCircle2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { parsePageRangeString, formatPageRangeString } from '@/lib/pdfSplitter';
import { formatFileSize } from '@/lib/imageCompressor';

export default function PdfSplitterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [rangeInput, setRangeInput] = useState<string>('1');
  const [splitPdfUrl, setSplitPdfUrl] = useState<string | null>(null);
  const [isSplitting, setIsSplitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const buffer = await selected.arrayBuffer();
    const uint8 = new Uint8Array(buffer);

    try {
      const doc = await PDFDocument.load(uint8, { ignoreEncryption: true });
      const pages = doc.getPageCount();
      setFile(selected);
      setPdfBytes(uint8);
      setPageCount(pages);
      setRangeInput(pages > 1 ? `1-${Math.min(pages, 3)}` : '1');
      setSplitPdfUrl(null);
    } catch (err) {
      console.error('Failed to load PDF:', err);
    }
  };

  const handleSplit = async () => {
    if (!pdfBytes || pageCount === 0) return;
    setIsSplitting(true);

    try {
      const pagesToExtract = parsePageRangeString(rangeInput, pageCount);
      if (pagesToExtract.length === 0) return;

      const srcPdf = await PDFDocument.load(pdfBytes);
      const newPdf = await PDFDocument.create();

      // pdf-lib uses 0-based page indices
      const pageIndices = pagesToExtract.map((p) => p - 1);
      const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newBytes = await newPdf.save();
      const blob = new Blob([newBytes as any], { type: 'application/pdf' });
      setSplitPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error('Error splitting PDF:', err);
    } finally {
      setIsSplitting(false);
    }
  };

  const handleDownload = () => {
    if (!splitPdfUrl || !file) return;
    const link = document.createElement('a');
    link.href = splitPdfUrl;
    link.download = `extracted-pages-${file.name}`;
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
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <Scissors className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Select PDF Document to Split
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Extract specific pages or page ranges into a new PDF document.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{file.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Total Pages: {pageCount} • {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Choose Different PDF
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Range Selection Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Scissors className="h-3.5 w-3.5 text-indigo-500" /> Page Range Selection
            </span>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pages to Extract (e.g. 1-3, 5, 8-{pageCount})
              </label>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder={`1-${Math.min(pageCount, 5)}`}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Enter single page numbers separated by commas or page intervals with a hyphen.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setRangeInput('1')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                First Page Only (1)
              </button>
              {pageCount >= 2 && (
                <button
                  onClick={() => setRangeInput(`1-${Math.ceil(pageCount / 2)}`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  First Half (1-{Math.ceil(pageCount / 2)})
                </button>
              )}
              {pageCount >= 2 && (
                <button
                  onClick={() => setRangeInput(`${Math.ceil(pageCount / 2) + 1}-${pageCount}`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  Second Half ({Math.ceil(pageCount / 2) + 1}-{pageCount})
                </button>
              )}
              <button
                onClick={() => setRangeInput(String(pageCount))}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Last Page ({pageCount})
              </button>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={handleSplit}
                disabled={isSplitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition shadow-sm disabled:opacity-50"
              >
                <Scissors className="h-4 w-4" />
                {isSplitting ? 'Extracting Pages...' : 'Extract Selected Pages'}
              </button>

              {splitPdfUrl && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition shadow-sm"
                >
                  <Download className="h-4 w-4" /> Download Extracted PDF
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
