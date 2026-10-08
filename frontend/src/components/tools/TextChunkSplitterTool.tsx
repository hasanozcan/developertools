'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Layers, Copy, Check } from 'lucide-react';
import { splitTextIntoChunks, ChunkItem } from '@/lib/textChunkSplitter';

export default function TextChunkSplitterTool() {
  const { t } = useLanguage();
  const [text, setText] = useState('Retrieval-Augmented Generation (RAG) combines search algorithms with large language models.\n\nChunking long documents into semantic windows with overlap improves retrieval precision.\n\nVector databases store and query embeddings efficiently.');
  const [chunkSize, setChunkSize] = useState(100);
  const [chunkOverlap, setChunkOverlap] = useState(20);

  const chunks = useMemo(() => {
    return splitTextIntoChunks(text, { chunkSize, chunkOverlap, splitBy: 'characters' });
  }, [text, chunkSize, chunkOverlap]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("uiText.d4f2b122")}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t("uiText.18000f47") + ' '}{chunkSize}</label>
            <input
              type="range"
              min={20}
              max={500}
              value={chunkSize}
              onChange={(e) => setChunkSize(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t("uiText.b3b70ee9") + ' '}{chunkOverlap}</label>
            <input
              type="range"
              min={0}
              max={Math.floor(chunkSize / 2)}
              value={chunkOverlap}
              onChange={(e) => setChunkOverlap(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t("uiText.e0618fb8")}{chunks.length})</h4>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {chunks.map((c) => (
              <div key={c.index} className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-xs font-mono">
                <div className="flex justify-between text-slate-500 pb-1">
                  <span>{t("uiText.759a331f")}{c.index}</span>
                  <span>{c.charCount} {' ' + t("uiText.712fa466") + ' '}{c.wordCount} {' ' + t("common.words")}</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
