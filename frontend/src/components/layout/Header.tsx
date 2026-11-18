'use client';

import Link from '@/components/common/LocalizedLink';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, Star, Clock, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useHistory } from '@/context/HistoryContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/common/LanguageSelector';
import { BrandLogoMark } from '@/components/common/BrandLogo';
import CommandPalette from '@/components/layout/CommandPalette';
import { toolCatalog } from '@/lib/api';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';
import { getLocalizedPath } from '@/lib/localeRouting';
import { prefetchToolIndex, useToolIndex } from '@/lib/toolIndexClient';
import { trackToolEvent } from '@/lib/analytics';
import { getToolManifest } from '@/lib/toolManifest';

// Derive search coverage from the same catalog that powers the home page and API.
const toolSlugs = toolCatalog.map((tool) => ({
  slug: tool.slug,
  defaultName: tool.name,
  category: tool.categorySlug,
  keywords: [
    tool.slug.replace(/-/g, ' '),
    tool.name.toLowerCase(),
    tool.shortDescription?.toLowerCase() || '',
    ...tool.slug.split('-'),
    ...(getToolManifest(tool.slug)?.searchAliases || []).map((alias) => alias.toLowerCase()),
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
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const { favorites, isFavorite } = useFavorites();
  const { history } = useHistory();
  const { t, language } = useLanguage();

  // Signal to browser tests that client event handlers on the header have hydrated.
  useEffect(() => {
    headerRef.current?.setAttribute('data-hydrated', 'true');
  }, []);

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
          { slug: 'json-csv', category: 'json', name: t('toolName.json-csv') },
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
          { slug: 'markdown-preview', category: 'text', name: t('toolName.markdown-preview') },
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

  // Localized tool names are not in the client dictionary: they come from the lazy
  // current-locale index, loaded only once the favorites/search UI actually needs them.
  const toolIndex = useToolIndex(language, showFavorites || searchOpen);

  // All tools with translated names for search
  const allTools = useMemo(
    () =>
      toolSlugs.map((tool) => ({
        ...tool,
        category: getCanonicalToolCategory(tool.slug, tool.category),
        name: toolIndex?.get(tool.slug)?.name || tool.defaultName,
      })),
    [toolIndex],
  );

  const handleSelectTool = useCallback(
    (tool: ToolItem, source: 'favorites' | 'search' = 'search') => {
      if (source === 'search') {
        trackToolEvent('tool_search_selected', tool.slug, tool.category, {
          query_length: searchQuery.trim().length,
          result_count: searchResults.length,
        });
      }
      router.push(getLocalizedPath(buildToolPath(tool.category, tool.slug), language));
      setSearchOpen(false);
      setSearchQuery('');
      setSelectedIndex(-1);
      setShowFavorites(false);
      setShowHistory(false);
    },
    [router, language, searchQuery, searchResults.length],
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
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-[#09090b]/95"
    >
      <nav
        aria-label={t("uiText.6fba33cd")}
        className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12"
      >
        <div className="flex h-14 items-center">
          {/* Logo - Sol */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <BrandLogoMark
              size={28}
              className="shrink-0 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-lg font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
              {t("uiText.11e991fd")}<span className="text-emerald-600 dark:text-emerald-400">{t("uiText.950196fc")}</span>
            </span>
          </Link>

          {/* Desktop Navigation - Logo'dan sonra */}
          <div className="ml-4 hidden items-center gap-0.5 lg:flex xl:ml-8 xl:gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-50 xl:px-3 xl:text-sm"
                >
                  {item.name}
                  <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                </Link>
                {/* Dropdown Menu */}
                <div className="invisible absolute left-0 top-full z-50 pt-1.5 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-[240px] rounded-xl border border-zinc-200 bg-white py-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                    {item.tools.map((tool: any) => (
                      <Link
                        key={tool.slug}
                        href={buildToolPath(tool.category, tool.slug)}
                        prefetch={false}
                        className="block px-3.5 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
                      >
                        {tool.name}
                      </Link>
                    ))}
                    {item.href !== '/#categories' && (
                      <div className="mt-1 border-t border-zinc-100 pt-1 dark:border-zinc-800">
                        <Link
                          href={item.href}
                          prefetch={false}
                          className="block px-3.5 py-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-zinc-100 dark:text-emerald-400 dark:hover:bg-zinc-800"
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
          <div className="min-w-2 flex-1" />

          {/* Right side controls - Sağ */}
          <div className="hidden shrink-0 items-center gap-1.5 md:flex lg:gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              onPointerEnter={() => prefetchToolIndex(language)}
              onFocus={() => prefetchToolIndex(language)}
              aria-label={t('search')}
              aria-controls="tool-search-results"
              aria-haspopup="dialog"
              className="flex shrink-0 items-center gap-2.5 rounded-lg border border-zinc-200 bg-zinc-50/80 px-2.5 py-1.5 text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
            >
              <Search className="h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" />
              <span className="text-xs font-medium">{t('search')}...</span>
              <kbd className="hidden items-center rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 xl:inline-flex">
                {t("uiText.1c039058")}</kbd>
            </button>

            {/* Favorites */}
            <div className="relative" ref={favoritesRef}>
              <button
                onClick={() => {
                  setShowFavorites(!showFavorites);
                  setShowHistory(false);
                }}
                className={`rounded-lg p-2 transition-colors ${
                  favoriteTools.length > 0
                    ? 'text-amber-500 hover:bg-amber-500/10'
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                }`}
                title={t('favorites')}
                aria-label={t('favorites')}
                aria-expanded={showFavorites}
                aria-controls="favorite-tools-menu"
              >
                <Star className={`h-4 w-4 ${favoriteTools.length > 0 ? 'fill-current' : ''}`} />
              </button>
              {showFavorites && (
                <div
                  id="favorite-tools-menu"
                  className="absolute right-0 z-[100] mt-2 w-72 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950/60">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {t('favorites')}
                    </span>
                  </div>
                  {favoriteTools.length > 0 ? (
                    favoriteTools.map((tool) => (
                      <button
                        key={tool.slug}
                        onClick={() => handleSelectTool(tool, 'favorites')}
                        className="w-full px-4 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-emerald-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
                      >
                        {tool.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
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
                className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                title={t('recent')}
                aria-label={t('recent')}
                aria-expanded={showHistory}
                aria-controls="recent-tools-menu"
              >
                <Clock className="h-4 w-4" />
              </button>
              {showHistory && (
                <div
                  id="recent-tools-menu"
                  className="absolute right-0 z-[100] mt-2 w-72 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950/60">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {t('recent')}
                    </span>
                  </div>
                  {history.length > 0 ? (
                    history.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => {
                          router.push(getLocalizedPath(buildToolPath(item.category, item.slug), language));
                          setShowHistory(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-emerald-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
                      >
                        {item.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
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
              className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              title={resolvedTheme === 'dark' ? t('lightMode') : t('darkMode')}
              aria-label={resolvedTheme === 'dark' ? t('lightMode') : t('darkMode')}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:hidden">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              aria-label={t("uiText.ac59e99d")}
              aria-haspopup="dialog"
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t("uiText.feac2727") : t("uiText.b807c8dd")}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-zinc-200 py-4 dark:border-zinc-800 md:hidden"
          >
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                {t('common.selectLanguage')}
              </span>
              <LanguageSelector />
            </div>
            {navigation.map((item, index) => (
              <div
                key={item.name}
                className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  aria-expanded={activeDropdown === item.name}
                  aria-controls={`mobile-navigation-group-${index}`}
                  className="flex w-full items-center justify-between py-3 font-medium text-zinc-700 transition-colors hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400"
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                  />
                </button>
                {activeDropdown === item.name && item.tools.length > 0 && (
                  <div id={`mobile-navigation-group-${index}`} className="pb-2 pl-4">
                    {item.href !== '/#categories' && (
                      <Link
                        href={item.href}
                        className="block py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.viewAll')}
                      </Link>
                    )}
                    {item.tools.map((tool: any) => (
                      <Link
                        key={tool.slug}
                        href={buildToolPath(tool.category, tool.slug)}
                        className="block py-2 text-sm text-zinc-600 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
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
              className="flex items-center gap-2 py-3 font-medium text-zinc-700 transition-colors hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
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
