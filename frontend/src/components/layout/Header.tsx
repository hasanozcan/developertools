'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, Star, Clock, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useHistory } from '@/context/HistoryContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/common/LanguageSelector';
import CommandPalette from '@/components/layout/CommandPalette';
import { toolCatalog } from '@/lib/api';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';
import { trackToolEvent } from '@/lib/analytics';

// Derive search coverage from the same catalog that powers the home page and API.
const toolSlugs = toolCatalog.map((tool) => ({
  slug: tool.slug,
  category: tool.categorySlug,
  keywords: [
    tool.slug.replace(/-/g, ' '),
    tool.name.toLowerCase(),
    tool.shortDescription?.toLowerCase() || '',
    ...tool.slug.split('-'),
  ],
}));

// Tool type for search results
type ToolItem = {
  slug: string;
  category: string;
  keywords: string[];
  name: string;
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ToolItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const { favorites, isFavorite } = useFavorites();
  const { history } = useHistory();
  const { t } = useLanguage();

  // Dynamic navigation with translations
  const navigation = useMemo(
    () => [
      {
        name: t('nav.encoders'),
        href: '/tools/encoding',
        tools: [
          { slug: 'base64', category: 'encoding', name: t('toolName.base64') },
          { slug: 'url-encoder', category: 'encoding', name: t('toolName.url-encoder') },
          { slug: 'jwt-decoder', category: 'encoding', name: t('toolName.jwt-decoder') },
          { slug: 'html-entity', category: 'encoding', name: t('toolName.html-entity') },
          { slug: 'unicode-escape', category: 'encoding', name: t('toolName.unicode-escape') },
          {
            slug: 'json-string-escape',
            category: 'encoding',
            name: t('toolName.json-string-escape'),
          },
          { slug: 'image-to-base64', category: 'encoding', name: t('toolName.image-to-base64') },
        ],
      },
      {
        name: t('nav.generators'),
        href: '/tools/generators',
        tools: [
          { slug: 'uuid-generator', category: 'generators', name: t('toolName.uuid-generator') },
          {
            slug: 'password-generator',
            category: 'generators',
            name: t('toolName.password-generator'),
          },
          { slug: 'bip39-generator', category: 'crypto', name: t('toolName.bip39-generator') },
          { slug: 'qr-code', category: 'generators', name: t('toolName.qr-code') },
          { slug: 'slug-generator', category: 'generators', name: t('toolName.slug-generator') },
          { slug: 'css-gradient', category: 'generators', name: t('toolName.css-gradient') },
          { slug: 'meta-tags', category: 'generators', name: t('toolName.meta-tags') },
          { slug: 'json-to-models', category: 'generators', name: t('toolName.json-to-models') },
        ],
      },
      {
        name: t('nav.formatters'),
        href: '/tools/formatters',
        tools: [
          { slug: 'json-formatter', category: 'json', name: t('toolName.json-formatter') },
          { slug: 'sql-formatter', category: 'formatters', name: t('toolName.sql-formatter') },
          { slug: 'css-minifier', category: 'formatters', name: t('toolName.css-minifier') },
          { slug: 'js-minifier', category: 'formatters', name: t('toolName.js-minifier') },
          { slug: 'svg-minifier', category: 'converters', name: t('toolName.svg-minifier') },
        ],
      },
      {
        name: t('nav.converters'),
        href: '/tools/converters',
        tools: [
          { slug: 'svg-to-jsx', category: 'converters', name: t('toolName.svg-to-jsx') },
          { slug: 'css-clamp', category: 'converters', name: t('toolName.css-clamp') },
          { slug: 'css-box-shadow', category: 'converters', name: t('toolName.css-box-shadow') },
          { slug: 'json-to-sql', category: 'converters', name: t('toolName.json-to-sql') },
          {
            slug: 'timestamp-converter',
            category: 'converters',
            name: t('toolName.timestamp-converter'),
          },
          { slug: 'color-converter', category: 'converters', name: t('toolName.color-converter') },
          { slug: 'url-parser', category: 'converters', name: t('toolName.url-parser') },
          {
            slug: 'query-string-parser',
            category: 'converters',
            name: t('toolName.query-string-parser'),
          },
          { slug: 'json-csv', category: 'converters', name: t('toolName.json-csv') },
          { slug: 'json-to-typescript', category: 'json', name: t('toolName.json-to-typescript') },
          { slug: 'yaml-json', category: 'json', name: t('toolName.yaml-json') },
        ],
      },
      {
        name: t('nav.moreTools'),
        href: '/#categories',
        tools: [
          { slug: 'docker-run-to-compose', category: 'utilities', name: t('toolName.docker-run-to-compose') },
          { slug: 'cron-generator', category: 'utilities', name: t('toolName.cron-generator') },
          { slug: 'dmarc-generator', category: 'utilities', name: t('toolName.dmarc-generator') },
          { slug: 'regex-tester', category: 'text', name: t('toolName.regex-tester') },
          { slug: 'regex-escape', category: 'text', name: t('toolName.regex-escape') },
          { slug: 'text-diff', category: 'text', name: t('toolName.text-diff') },
          { slug: 'lorem-ipsum', category: 'text', name: t('toolName.lorem-ipsum') },
          {
            slug: 'http-headers-parser',
            category: 'utilities',
            name: t('toolName.http-headers-parser'),
          },
          { slug: 'markdown-preview', category: 'utilities', name: t('toolName.markdown-preview') },
          { slug: 'cron-parser', category: 'utilities', name: t('toolName.cron-parser') },
          {
            slug: 'http-status-codes',
            category: 'utilities',
            name: t('toolName.http-status-codes'),
          },
          {
            slug: 'user-agent-parser',
            category: 'utilities',
            name: t('toolName.user-agent-parser'),
          },
          {
            slug: 'json-schema-validator',
            category: 'json',
            name: t('toolName.json-schema-validator'),
          },
          { slug: 'hmac-generator', category: 'crypto', name: t('toolName.hmac-generator') },
          { slug: 'md5-hash', category: 'crypto', name: t('toolName.md5-hash') },
          { slug: 'sha256-hash', category: 'crypto', name: t('toolName.sha256-hash') },
        ],
      },
    ],
    [t],
  );

  // All tools with translated names for search
  const allTools = useMemo(
    () =>
      toolSlugs.map((tool) => ({
        ...tool,
        category: getCanonicalToolCategory(tool.slug, tool.category),
        name: t(`toolName.${tool.slug}`),
      })),
    [t],
  );

  const handleSelectTool = useCallback(
    (tool: ToolItem, source: 'favorites' | 'search' = 'search') => {
      if (source === 'search') {
        trackToolEvent('tool_search_selected', tool.slug, tool.category, {
          query_length: searchQuery.trim().length,
          result_count: searchResults.length,
        });
      }
      router.push(buildToolPath(tool.category, tool.slug));
      setSearchOpen(false);
      setSearchQuery('');
      setSelectedIndex(-1);
      setShowFavorites(false);
      setShowHistory(false);
    },
    [router, searchQuery, searchResults.length],
  );

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) || tool.keywords.some((kw) => kw.includes(query)),
    );
    setSearchResults(results);
    setSelectedIndex(-1);
  }, [searchQuery, allTools]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setSearchQuery('');
      }
      if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
        setShowFavorites(false);
      }
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
    }

    function handleOpenCommandPalette() {
      setCommandPaletteOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenCommandPalette);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenCommandPalette);
    };
  }, []);

  // Handle search keyboard navigation
  const handleSearchKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchResults.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            handleSelectTool(searchResults[selectedIndex]);
          } else if (searchResults.length > 0) {
            handleSelectTool(searchResults[0]);
          }
          break;
      }
    },
    [handleSelectTool, searchResults, selectedIndex],
  );

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const favoriteTools = allTools.filter((t) => favorites.includes(t.slug));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_-24px_rgba(15,23,42,0.6)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95">
      <nav
        aria-label="Primary navigation"
        className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12"
      >
        <div className="flex h-[4.5rem] items-center">
          {/* Logo - Sol */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <svg
              className="h-9 w-9 drop-shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#0EA5E9' }} />
                  <stop offset="50%" style={{ stopColor: '#8B5CF6' }} />
                  <stop offset="100%" style={{ stopColor: '#EC4899' }} />
                </linearGradient>
                <linearGradient id="logoGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#10B981' }} />
                  <stop offset="100%" style={{ stopColor: '#06B6D4' }} />
                </linearGradient>
              </defs>
              <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="url(#logoGrad1)" />
              <path d="M16 5L25 10.5V21.5L16 27L7 21.5V10.5L16 5Z" fill="rgba(255,255,255,0.1)" />
              <path
                d="M10 12L6 16L10 20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 12L26 16L22 20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="16" r="2.5" fill="url(#logoGrad2)" />
            </svg>
            <span className="text-xl font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white">
              Devs<span className="gradient-text">Tools</span>
            </span>
          </Link>

          {/* Desktop Navigation - Logo'dan sonra */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 ml-4 xl:ml-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white shrink-0 whitespace-nowrap"
                >
                  {item.name}
                  <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                  <div className="min-w-[240px] rounded-2xl border border-slate-200 bg-white py-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                    {item.tools.map((tool: any) => (
                      <Link
                        key={tool.slug}
                        href={buildToolPath(tool.category, tool.slug)}
                        className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                    {item.href !== '/#categories' && (
                      <div className="border-t border-slate-100 dark:border-slate-800 mt-1.5 pt-1.5">
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 font-semibold"
                        >
                          {t('nav.viewAll')}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1 min-w-3" />

          {/* Right side controls - Sağ */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              aria-label={t('search')}
              aria-controls="tool-search-results"
              aria-haspopup="dialog"
              className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500 shrink-0"
            >
              <Search className="w-4 h-4 text-indigo-500" />
              <span className="text-xs lg:text-sm font-medium">{t('search')}...</span>
              <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono font-semibold text-slate-800 bg-slate-200/90 dark:bg-slate-700 dark:text-slate-100 rounded border border-slate-300 dark:border-slate-600">
                ⌘K / Ctrl+K
              </kbd>
            </button>

            {/* Favorites */}
            <div className="relative" ref={favoritesRef}>
              <button
                onClick={() => {
                  setShowFavorites(!showFavorites);
                  setShowHistory(false);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  favoriteTools.length > 0
                    ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={t('favorites')}
                aria-label={t('favorites')}
                aria-expanded={showFavorites}
                aria-controls="favorite-tools-menu"
              >
                <Star className={`w-5 h-5 ${favoriteTools.length > 0 ? 'fill-current' : ''}`} />
              </button>
              {showFavorites && (
                <div
                  id="favorite-tools-menu"
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-[100]"
                >
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {t('favorites')}
                    </span>
                  </div>
                  {favoriteTools.length > 0 ? (
                    favoriteTools.map((tool) => (
                      <button
                        key={tool.slug}
                        onClick={() => handleSelectTool(tool, 'favorites')}
                        className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium transition-colors"
                      >
                        {tool.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400 text-center">
                      {t('favorites.empty')}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* History */}
            <div className="relative" ref={historyRef}>
              <button
                onClick={() => {
                  setShowHistory(!showHistory);
                  setShowFavorites(false);
                }}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title={t('recent')}
                aria-label={t('recent')}
                aria-expanded={showHistory}
                aria-controls="recent-tools-menu"
              >
                <Clock className="w-5 h-5" />
              </button>
              {showHistory && (
                <div
                  id="recent-tools-menu"
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-[100]"
                >
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {t('recent')}
                    </span>
                  </div>
                  {history.length > 0 ? (
                    history.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => {
                          router.push(buildToolPath(item.category, item.slug));
                          setShowHistory(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium transition-colors"
                      >
                        {item.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400 text-center">
                      {t('recent.empty')}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={resolvedTheme === 'dark' ? t('lightMode') : t('darkMode')}
              aria-label={resolvedTheme === 'dark' ? t('lightMode') : t('darkMode')}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="ml-auto flex items-center gap-1.5 md:hidden">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              aria-label="Open search dialog"
              aria-haspopup="dialog"
              className="rounded-xl border border-slate-200 bg-white/70 p-2 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="rounded-xl border border-slate-200 bg-white/70 p-2 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700"
          >
            {navigation.map((item, index) => (
              <div
                key={item.name}
                className="border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  aria-expanded={activeDropdown === item.name}
                  aria-controls={`mobile-navigation-group-${index}`}
                  className="w-full flex items-center justify-between py-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                  />
                </button>
                {activeDropdown === item.name && item.tools.length > 0 && (
                  <div id={`mobile-navigation-group-${index}`} className="pb-2 pl-4">
                    {item.href !== '/#categories' && (
                      <Link
                        href={item.href}
                        className="block py-2 text-sm text-primary-600 dark:text-primary-400 font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.viewAll')}
                      </Link>
                    )}
                    {item.tools.map((tool: any) => (
                      <Link
                        key={tool.slug}
                        href={buildToolPath(tool.category, tool.slug)}
                        className="block py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 py-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span>{resolvedTheme === 'dark' ? t('lightMode') : t('darkMode')}</span>
            </button>
          </div>
        )}
      </nav>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </header>
  );
}
