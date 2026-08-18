'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Bot, Plus, Trash2 } from 'lucide-react';
import { generateRobotsTxt, type BotRule } from '@/lib/robotsTxt';
import { useLanguage } from '@/context/LanguageContext';

export default function RobotsTxtGeneratorTool() {
  const { t } = useLanguage();
  const [rules, setRules] = useState<BotRule[]>([
    { userAgent: '*', allow: ['/'], disallow: ['/admin/', '/private/', '/api/'] },
    { userAgent: 'Googlebot', allow: ['/'], disallow: ['/nogoogle/'] },
  ]);
  const [sitemaps, setSitemaps] = useState<string[]>(['https://example.com/sitemap.xml']);
  const [host, setHost] = useState('example.com');
  const [copied, setCopied] = useState(false);

  const robotsTxtContent = useMemo(() => {
    return generateRobotsTxt({ rules, sitemaps, host });
  }, [rules, sitemaps, host]);

  const addDisallow = (ruleIdx: number) => {
    const next = [...rules];
    next[ruleIdx].disallow.push('');
    setRules(next);
  };

  const removeDisallow = (ruleIdx: number, disallowIdx: number) => {
    const next = [...rules];
    next[ruleIdx].disallow = next[ruleIdx].disallow.filter((_, idx) => idx !== disallowIdx);
    setRules(next);
  };

  const updateDisallow = (ruleIdx: number, disallowIdx: number, val: string) => {
    const next = [...rules];
    next[ruleIdx].disallow[disallowIdx] = val;
    setRules(next);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(robotsTxtContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([robotsTxtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Bot Rules & Sitemaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rules Config */}
        <div className="surface-card rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.robotstxt.botRules') || 'Crawler Rules (User-agent & Directives)'}
            </h3>
          </div>

          <div className="space-y-4">
            {rules.map((rule, ruleIdx) => (
              <div key={ruleIdx} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    User-agent: <code className="text-indigo-600 dark:text-indigo-400">{rule.userAgent}</code>
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Disallow Paths:</label>
                  <div className="space-y-1.5">
                    {rule.disallow.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={d}
                          onChange={(e) => updateDisallow(ruleIdx, dIdx, e.target.value)}
                          placeholder="/path-to-block/"
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                        />
                        <button
                          onClick={() => removeDisallow(ruleIdx, dIdx)}
                          className="p-1 text-slate-400 hover:text-red-500 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addDisallow(ruleIdx)}
                      className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 mt-1 hover:underline"
                    >
                      <Plus className="w-3 h-3" /> Add Disallow Path
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Sitemap URL
            </label>
            <input
              type="text"
              value={sitemaps[0] || ''}
              onChange={(e) => setSitemaps([e.target.value])}
              placeholder="https://example.com/sitemap.xml"
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
            />
          </div>
        </div>

        {/* Generated robots.txt */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated robots.txt File
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy')}
              </button>
              <button
                onClick={handleDownload}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                title="Download robots.txt"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={robotsTxtContent}
            rows={15}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
