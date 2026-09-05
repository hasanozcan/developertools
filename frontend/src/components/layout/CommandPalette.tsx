'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Clock,
  Star,
  CornerDownLeft,
  ArrowUpDown,
  Sparkles,
  Braces,
  Code,
  Wand2,
  Lock,
  Type,
  ArrowLeftRight,
  ShieldCheck,
  FileJson,
  Binary,
  KeyRound,
  Fingerprint,
  QrCode,
  LinkIcon,
  Paintbrush,
  Tags,
  Hash,
  Regex,
  GitCompare,
  FileText,
  Timer,
  Palette,
  Database,
  Minimize2,
  FileCode,
  FileType,
  FileSpreadsheet,
  FileJson2,
  Image,
  Code2,
  Key,
  Trash,
  Circle,
  Calculator,
  Network,
  LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useHistory } from '@/context/HistoryContext';
import { toolCatalog } from '@/lib/api';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';
import { getLocalizedPath } from '@/lib/i18nRouting';
import { trackToolEvent } from '@/lib/analytics';

const categoryIcons: Record<string, LucideIcon> = {
  json: Braces,
  encoding: Code,
  generators: Wand2,
  crypto: Lock,
  text: Type,
  converters: ArrowLeftRight,
  formatters: Code,
  utilities: Wand2,
};

const toolIconMap: Record<string, LucideIcon> = {
  'json-formatter': FileJson,
  'json-validator': FileJson,
  'json-schema-validator': ShieldCheck,
  'json-csv': FileSpreadsheet,
  'json-to-typescript': FileType,
  'yaml-json': FileJson2,
  base64: Binary,
  'url-encoder': LinkIcon,
  'jwt-decoder': KeyRound,
  'html-entity': Code2,
  'unicode-escape': Code2,
  'json-string-escape': FileJson,
  'image-to-base64': Image,
  'uuid-generator': Fingerprint,
  'password-generator': Key,
  'lorem-ipsum': FileText,
  'qr-code': QrCode,
  'slug-generator': LinkIcon,
  'css-gradient': Paintbrush,
  'meta-tags': Tags,
  'md5-hash': Hash,
  'sha256-hash': ShieldCheck,
  'regex-tester': Regex,
  'regex-escape': Regex,
  'text-diff': GitCompare,
  'markdown-preview': FileText,
  'timestamp-converter': Timer,
  'color-converter': Palette,
  'url-parser': LinkIcon,
  'query-string-parser': LinkIcon,
  'sql-formatter': Database,
  'css-minifier': Minimize2,
  'js-minifier': FileCode,
  'cron-parser': Clock,
  'http-headers-parser': FileText,
  'case-converter': Type,
  'word-counter': FileType,
  'remove-duplicates': Trash,
  'sort-lines': ArrowUpDown,
  'hex-encoder': Hash,
  'binary-encoder': Binary,
  'html-formatter': FileJson,
  'html-minifier': Minimize2,
  'xml-formatter': FileCode,
  'sha512-hash': ShieldCheck,
  'hmac-generator': KeyRound,
  'pkce-generator': KeyRound,
  'roman-numeral-converter': Circle,
  'number-base-converter': Calculator,
  'http-status-codes': FileText,
  'user-agent-parser': Fingerprint,
  'cidr-calculator': Network,
  'svg-to-jsx': FileCode,
  'svg-minifier': Minimize2,
  'css-clamp': Calculator,
  'css-box-shadow': Paintbrush,
  'docker-run-to-compose': Binary,
  'cron-generator': Clock,
  'json-to-sql': Database,
  'bip39-generator': Key,
  'dmarc-generator': ShieldCheck,
  'json-to-models': Code2,
};

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { t, language } = useLanguage();
  const { favorites } = useFavorites();
  const { history } = useHistory();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Normalize tools
  const allTools = useMemo(() => {
    return toolCatalog.map((tool) => {
      const canonicalCategory = getCanonicalToolCategory(tool.slug, tool.categorySlug);
      const name = t(`toolName.${tool.slug}`) !== `toolName.${tool.slug}` ? t(`toolName.${tool.slug}`) : tool.name;
      const desc = t(`toolDesc.${tool.slug}`) !== `toolDesc.${tool.slug}` ? t(`toolDesc.${tool.slug}`) : (tool.shortDescription || '');
      const categoryName = t(`cat.${canonicalCategory}`) || canonicalCategory;

      return {
        slug: tool.slug,
        category: canonicalCategory,
        categoryName,
        name,
        description: desc,
        icon: toolIconMap[tool.slug] || categoryIcons[canonicalCategory] || Wand2,
        keywords: [
          tool.slug.replace(/-/g, ' '),
          name.toLowerCase(),
          desc.toLowerCase(),
          canonicalCategory,
          categoryName.toLowerCase(),
          ...tool.slug.split('-'),
        ],
      };
    });
  }, [t]);

  // Categories list
  const categories = useMemo(() => {
    const slugs = ['json', 'encoding', 'generators', 'crypto', 'text', 'converters', 'formatters', 'utilities'];
    return slugs.map((slug) => ({
      slug,
      name: t(`cat.${slug}`) || slug,
      icon: categoryIcons[slug] || Wand2,
    }));
  }, [t]);

  // Filtered tools list
  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = allTools;
    if (selectedCategory) {
      list = list.filter((tool) => tool.category === selectedCategory);
    }

    if (!q) {
      return list;
    }

    return list.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((kw) => kw.includes(q))
      );
    });
  }, [allTools, query, selectedCategory]);

  // Recent & favorite tool objects
  const recentToolItems = useMemo(() => {
    return history
      .map((item) => allTools.find((t) => t.slug === item.slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .slice(0, 5);
  }, [history, allTools]);

  const favoriteToolItems = useMemo(() => {
    return favorites
      .map((slug) => allTools.find((t) => t.slug === slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .slice(0, 5);
  }, [favorites, allTools]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredTools, query, selectedCategory]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedCategory(null);
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global hotkeys to open command palette
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(); // toggle if already open or handled by parent
      }
      // Press '/' to search when not typing in an editable field
      if (
        e.key === '/' &&
        !isOpen &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName) &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        // Trigger open via CustomEvent or callback
        window.dispatchEvent(new CustomEvent('open-command-palette'));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Navigate to selected tool
  const handleSelectTool = useCallback(
    (tool: (typeof allTools)[0]) => {
      trackToolEvent('tool_search_selected', tool.slug, tool.category, {
        query_length: query.trim().length,
        result_count: filteredTools.length,
      });
      router.push(getLocalizedPath(buildToolPath(tool.category, tool.slug), language));
      onClose();
    },
    [router, language, onClose, query, filteredTools.length],
  );

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredTools.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        handleSelectTool(filteredTools[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('commandPalette.title') || 'Command Palette'}
      className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 md:pt-28 overflow-y-auto bg-slate-950/70 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl transition-all dark:border-white/10 dark:bg-slate-900/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative flex items-center border-b border-slate-200/80 px-4 py-3.5 dark:border-white/10">
          <Search className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 ml-1 mr-3" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={true}
            aria-controls="tool-search-results"
            aria-autocomplete="list"
            aria-label={t('commandPalette.placeholder') || 'Search tools or type a command...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('commandPalette.placeholder') || 'Search tools or type a command...'}
            className="w-full bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="ml-2 hidden sm:inline-flex items-center rounded-lg border border-slate-300 bg-slate-200/90 px-2 py-0.5 text-[11px] font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100">
            ESC
          </kbd>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2.5 border-b border-slate-100 dark:border-white/5 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition ${
              selectedCategory === null
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {t('commandPalette.allTools') || 'All Tools'} ({allTools.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition flex items-center gap-1.5 ${
                selectedCategory === cat.slug
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <cat.icon className="h-3 w-3" />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Quick Access (Recent & Favorites) when query is empty and no category filter */}
        {!query && !selectedCategory && (recentToolItems.length > 0 || favoriteToolItems.length > 0) && (
          <div className="border-b border-slate-100 px-4 py-3 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
            {favoriteToolItems.length > 0 && (
              <div className="mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-1.5">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {t('commandPalette.favorites') || 'Favorites'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {favoriteToolItems.map((tool) => (
                    <button
                      key={`fav-${tool.slug}`}
                      onClick={() => handleSelectTool(tool)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500"
                    >
                      <tool.icon className="h-3 w-3 text-indigo-500" />
                      {tool.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {recentToolItems.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1.5">
                  <Clock className="h-3 w-3" /> {t('commandPalette.recent') || 'Recent Tools'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {recentToolItems.map((tool) => (
                    <button
                      key={`rec-${tool.slug}`}
                      onClick={() => handleSelectTool(tool)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500"
                    >
                      <tool.icon className="h-3 w-3 text-cyan-500" />
                      {tool.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results List */}
        <div
          ref={listRef}
          id="tool-search-results"
          role="listbox"
          aria-label={t('commandPalette.title') || 'Search Results'}
          className="max-h-80 sm:max-h-96 overflow-y-auto p-2 scroll-smooth"
        >
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => {
              const isSelected = index === selectedIndex;
              const Icon = tool.icon;
              return (
                <button
                  key={`${tool.slug}-${tool.category}`}
                  onClick={() => handleSelectTool(tool)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="option"
                  aria-selected={isSelected}
                  className={`w-full flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-left transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 transition ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">{tool.name}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          {tool.categoryName}
                        </span>
                      </div>
                      {tool.description && (
                        <p
                          className={`text-xs truncate mt-0.5 ${
                            isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {tool.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <CornerDownLeft className="h-4 w-4 shrink-0 text-white/80" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium">
                {t('commandPalette.noResults') || 'No tools found matching'} &quot;{query}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Footer Hints */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 py-2.5 text-[11px] text-slate-500 dark:border-white/5 dark:bg-slate-900/80 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[10px] font-semibold dark:border-slate-700 dark:bg-slate-800">
                ↑
              </kbd>
              <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[10px] font-semibold dark:border-slate-700 dark:bg-slate-800">
                ↓
              </kbd>
              <span>{t('commandPalette.shortcuts') || 'Navigate'}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[10px] font-semibold dark:border-slate-700 dark:bg-slate-800">
                ↵
              </kbd>
              <span>{t('commandPalette.select') || 'Select'}</span>
            </span>
          </div>
          <span>
            {filteredTools.length} {filteredTools.length === 1 ? (t('common.tool') || 'tool') : (t('common.tools') || 'tools')}
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
