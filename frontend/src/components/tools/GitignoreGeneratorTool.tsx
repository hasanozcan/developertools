'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Search, CheckSquare, Square, FileText } from 'lucide-react';
import { GITIGNORE_TEMPLATES, generateGitignore } from '@/lib/gitignoreTemplates';
import { useLanguage } from '@/context/LanguageContext';

export default function GitignoreGeneratorTool() {
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState<string[]>(['node', 'macos', 'vscode']);
  const [searchQuery, setSearchQuery] = useState('');
  const [customRules, setCustomRules] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) return GITIGNORE_TEMPLATES;
    const q = searchQuery.toLowerCase();
    return GITIGNORE_TEMPLATES.filter(
      (tpl) => tpl.name.toLowerCase().includes(q) || tpl.id.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const gitignoreContent = useMemo(() => {
    return generateGitignore(selectedIds, customRules);
  }, [selectedIds, customRules]);

  const toggleTemplate = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleCopy = () => {
    if (!gitignoreContent) return;
    navigator.clipboard.writeText(gitignoreContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!gitignoreContent) return;
    const blob = new Blob([gitignoreContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.gitignore';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Template Selector Grid */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {t('tool.gitignore.selectTemplates') || 'Select Frameworks, Languages & OS Templates'}
            </h3>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('tool.gitignore.searchPlaceholder') || 'Search templates (e.g. Node, Python, macOS)...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-1">
          {filteredTemplates.map((tpl) => {
            const isSelected = selectedIds.includes(tpl.id);
            return (
              <button
                key={tpl.id}
                onClick={() => toggleTemplate(tpl.id)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs font-semibold transition ${
                  isSelected
                    ? 'border-indigo-500/50 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className="truncate">{tpl.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor & Custom Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Custom Rules */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('tool.gitignore.customRules') || 'Custom Rules (Appended to .gitignore)'}
          </span>
          <textarea
            value={customRules}
            onChange={(e) => setCustomRules(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="# Add your custom ignore patterns here...&#10;secrets.json&#10;my_local_config.yml"
          />
        </div>

        {/* Output .gitignore */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated .gitignore File
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                disabled={!gitignoreContent}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300 disabled:opacity-50"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy')}
              </button>
              <button
                onClick={handleDownload}
                disabled={!gitignoreContent}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition disabled:opacity-50"
                title="Download .gitignore"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={gitignoreContent}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
