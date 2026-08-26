'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Play, RotateCcw, Download, Layout, Smartphone, Monitor, Tablet } from 'lucide-react';
import { buildSandboxDocument, PLAYGROUND_TEMPLATES } from '@/lib/codePlayground';

export default function CodePlaygroundTool() {
  const [activeTemplate, setActiveTemplate] = useState('vanilla');
  const [html, setHtml] = useState(PLAYGROUND_TEMPLATES[0].html);
  const [css, setCss] = useState(PLAYGROUND_TEMPLATES[0].css);
  const [js, setJs] = useState(PLAYGROUND_TEMPLATES[0].js);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [includeTailwind, setIncludeTailwind] = useState(false);
  const [logs, setLogs] = useState<{ type: string; message: string; id: number }[]>([]);

  const handleTemplateChange = (templateId: string) => {
    const template = PLAYGROUND_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setActiveTemplate(templateId);
      setHtml(template.html);
      setCss(template.css);
      setJs(template.js);
      setIncludeTailwind(templateId === 'tailwind');
      setLogs([]);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source === 'devstools-sandbox') {
        setLogs((prev) => [
          ...prev.slice(-40),
          { type: event.data.type, message: event.data.message, id: Date.now() + Math.random() },
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const sandboxDoc = useMemo(() => {
    return buildSandboxDocument(html, css, js, { includeTailwind });
  }, [html, css, js, includeTailwind]);

  const handleDownload = () => {
    const blob = new Blob([sandboxDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'devstools-playground.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Preset:</span>
          {PLAYGROUND_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleTemplateChange(tmpl.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTemplate === tmpl.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {tmpl.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Viewport switcher */}
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-lg ${viewport === 'desktop' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-slate-400'}`}
              title="Desktop View"
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-lg ${viewport === 'tablet' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-slate-400'}`}
              title="Tablet View"
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-lg ${viewport === 'mobile' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-slate-400'}`}
              title="Mobile View"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-400/10 text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 transition"
          >
            <Download className="h-3.5 w-3.5" /> Export HTML
          </button>
        </div>
      </div>

      {/* Editor & Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
        {/* Code Editor Container */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/40 px-4">
            <div className="flex gap-2 py-2">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTab === 'html' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTab === 'css' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveTab('js')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTab === 'js' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                JavaScript
              </button>
            </div>
          </div>

          <div className="flex-1 p-3">
            {activeTab === 'html' && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-full min-h-[380px] p-3 font-mono text-xs text-slate-900 dark:text-slate-100 bg-transparent border-0 focus:outline-none resize-none"
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full h-full min-h-[380px] p-3 font-mono text-xs text-slate-900 dark:text-slate-100 bg-transparent border-0 focus:outline-none resize-none"
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                className="w-full h-full min-h-[380px] p-3 font-mono text-xs text-slate-900 dark:text-slate-100 bg-transparent border-0 focus:outline-none resize-none"
              />
            )}
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="flex flex-col space-y-3">
          <div className="flex-1 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-white/10 dark:bg-slate-900 flex justify-center items-center bg-slate-100 dark:bg-slate-950 p-2">
            <div
              className={`h-full transition-all duration-300 rounded-xl overflow-hidden bg-white shadow-md ${
                viewport === 'mobile'
                  ? 'w-[360px]'
                  : viewport === 'tablet'
                  ? 'w-[600px]'
                  : 'w-full'
              }`}
            >
              <iframe
                title="Live Sandbox Preview"
                srcDoc={sandboxDoc}
                sandbox="allow-scripts allow-modals"
                className="w-full h-full min-h-[380px] border-0"
              />
            </div>
          </div>

          {/* Console Logs Footer */}
          <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-200 p-3 max-h-36 overflow-y-auto font-mono text-[11px] shadow-sm">
            <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800 mb-1 font-sans text-xs">
              <span>Sandbox Console Log</span>
              <button
                onClick={() => setLogs([])}
                className="hover:text-white"
              >
                Clear
              </button>
            </div>
            {logs.length === 0 ? (
              <span className="text-slate-500 italic">No console logs emitted yet.</span>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className={`py-0.5 ${
                    log.type === 'error'
                      ? 'text-red-400'
                      : log.type === 'warn'
                      ? 'text-amber-300'
                      : 'text-slate-300'
                  }`}
                >
                  &gt; {log.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
