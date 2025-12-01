'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Code2, Search, Star, Clock, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useHistory } from '@/context/HistoryContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/common/LanguageSelector';

// Tool slugs for search - names will be translated dynamically
const toolSlugs = [
  { slug: 'json-formatter', category: 'json', keywords: ['json', 'format', 'beautify', 'validate'] },
  { slug: 'base64', category: 'encoding', keywords: ['base64', 'encode', 'decode'] },
  { slug: 'url-encoder', category: 'encoding', keywords: ['url', 'encode', 'decode', 'percent'] },
  { slug: 'jwt-decoder', category: 'encoding', keywords: ['jwt', 'token', 'decode', 'json web token'] },
  { slug: 'uuid-generator', category: 'generators', keywords: ['uuid', 'guid', 'generate', 'random'] },
  { slug: 'password-generator', category: 'generators', keywords: ['password', 'generate', 'secure', 'random'] },
  { slug: 'md5-hash', category: 'crypto', keywords: ['md5', 'hash', 'checksum'] },
  { slug: 'sha256-hash', category: 'crypto', keywords: ['sha256', 'sha-256', 'hash', 'secure'] },
  { slug: 'regex-tester', category: 'text', keywords: ['regex', 'regular expression', 'test', 'match'] },
  { slug: 'timestamp-converter', category: 'converters', keywords: ['timestamp', 'unix', 'epoch', 'date', 'time'] },
  { slug: 'color-converter', category: 'converters', keywords: ['color', 'hex', 'rgb', 'hsl', 'converter'] },
  { slug: 'lorem-ipsum', category: 'text', keywords: ['lorem', 'ipsum', 'placeholder', 'text'] },
  { slug: 'html-entity', category: 'encoding', keywords: ['html', 'entity', 'encode', 'decode'] },
  { slug: 'json-csv', category: 'converters', keywords: ['json', 'csv', 'convert', 'export'] },
  { slug: 'text-diff', category: 'text', keywords: ['diff', 'compare', 'text', 'difference'] },
  { slug: 'qr-code', category: 'generators', keywords: ['qr', 'qr code', 'barcode', 'generate'] },
  { slug: 'slug-generator', category: 'generators', keywords: ['slug', 'url', 'seo', 'permalink'] },
  { slug: 'sql-formatter', category: 'formatters', keywords: ['sql', 'format', 'beautify', 'query'] },
  { slug: 'css-minifier', category: 'formatters', keywords: ['css', 'minify', 'compress', 'optimize'] },
  { slug: 'js-minifier', category: 'formatters', keywords: ['javascript', 'js', 'minify', 'compress'] },
  { slug: 'cron-parser', category: 'utilities', keywords: ['cron', 'schedule', 'crontab', 'job'] },
  { slug: 'markdown-preview', category: 'utilities', keywords: ['markdown', 'md', 'preview', 'editor'] },
];

// Tool type for search results
type ToolItem = {
  slug: string;
  category: string;
  keywords: string[];
  name: string;
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const navigation = useMemo(() => [
    { 
      name: t('nav.encoders'), 
      href: '/tools/encoding',
      tools: [
        { slug: 'base64', category: 'encoding', name: t('toolName.base64') },
        { slug: 'url-encoder', category: 'encoding', name: t('toolName.url-encoder') },
        { slug: 'jwt-decoder', category: 'encoding', name: t('toolName.jwt-decoder') },
        { slug: 'html-entity', category: 'encoding', name: t('toolName.html-entity') },
      ]
    },
    { 
      name: t('nav.generators'), 
      href: '/tools/generators',
      tools: [
        { slug: 'uuid-generator', category: 'generators', name: t('toolName.uuid-generator') },
        { slug: 'password-generator', category: 'generators', name: t('toolName.password-generator') },
        { slug: 'qr-code', category: 'generators', name: t('toolName.qr-code') },
        { slug: 'slug-generator', category: 'generators', name: t('toolName.slug-generator') },
      ]
    },
    { 
      name: t('nav.formatters'), 
      href: '/tools/formatters',
      tools: [
        { slug: 'json-formatter', category: 'json', name: t('toolName.json-formatter') },
        { slug: 'sql-formatter', category: 'formatters', name: t('toolName.sql-formatter') },
        { slug: 'css-minifier', category: 'formatters', name: t('toolName.css-minifier') },
        { slug: 'js-minifier', category: 'formatters', name: t('toolName.js-minifier') },
      ]
    },
    { 
      name: t('nav.converters'), 
      href: '/tools/converters',
      tools: [
        { slug: 'timestamp-converter', category: 'converters', name: t('toolName.timestamp-converter') },
        { slug: 'color-converter', category: 'converters', name: t('toolName.color-converter') },
        { slug: 'json-csv', category: 'converters', name: t('toolName.json-csv') },
      ]
    },
    { 
      name: t('nav.moreTools'), 
      href: '/#categories',
      tools: [
        { slug: 'regex-tester', category: 'text', name: t('toolName.regex-tester') },
        { slug: 'text-diff', category: 'text', name: t('toolName.text-diff') },
        { slug: 'lorem-ipsum', category: 'text', name: t('toolName.lorem-ipsum') },
        { slug: 'markdown-preview', category: 'utilities', name: t('toolName.markdown-preview') },
        { slug: 'cron-parser', category: 'utilities', name: t('toolName.cron-parser') },
        { slug: 'md5-hash', category: 'crypto', name: t('toolName.md5-hash') },
        { slug: 'sha256-hash', category: 'crypto', name: t('toolName.sha256-hash') },
      ]
    },
  ], [t]);

  // All tools with translated names for search
  const allTools = useMemo(() => toolSlugs.map(tool => ({
    ...tool,
    name: t(`toolName.${tool.slug}`)
  })), [t]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allTools.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.keywords.some(kw => kw.includes(query))
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
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
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
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle search keyboard navigation
  const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
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
  }, [searchResults, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelectTool = (tool: typeof allTools[0]) => {
    router.push(`/tools/${tool.category}/${tool.slug}`);
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
    setShowFavorites(false);
    setShowHistory(false);
  };

  const favoriteTools = allTools.filter(t => favorites.includes(t.slug));

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <nav className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center h-16">
          {/* Logo - Sol */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Code2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">DevsTools</span>
          </Link>

          {/* Desktop Navigation - Logo'dan sonra */}
          <div className="hidden lg:flex items-center gap-1 ml-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.name}
                  <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[200px]">
                    {item.tools.map((tool: any) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.category}/${tool.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {tool.name}
                      </Link>
                    ))}
                    {item.href !== '/#categories' && (
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
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

          {/* Spacer - Sağ tarafa itmek için */}
          <div className="flex-1" />

          {/* Right side controls - Sağ */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search */}
            <div ref={searchContainerRef}>
              {!searchOpen ? (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm">{t('search')}...</span>
                  <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs text-gray-400 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    Ctrl+K
                  </kbd>
                </button>
              ) : (
                <div className="relative w-72">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder={t('search.placeholder')}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div ref={resultsRef} className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-[100] max-h-80 overflow-y-auto">
                      {searchResults.map((tool, index) => (
                        <button
                          key={tool.slug}
                          onClick={() => handleSelectTool(tool)}
                          className={`w-full px-4 py-3 text-left flex items-center justify-between border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors ${
                            index === selectedIndex 
                              ? 'bg-primary-50 dark:bg-primary-900/20' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className={`font-medium ${index === selectedIndex ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>{tool.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{tool.category}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 text-center text-gray-500 dark:text-gray-400 text-sm z-[100]">
                      {t('noResults')} &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Favorites */}
            <div className="relative" ref={favoritesRef}>
              <button
                onClick={() => { setShowFavorites(!showFavorites); setShowHistory(false); }}
                className={`p-2 rounded-lg transition-colors ${
                  favoriteTools.length > 0 
                    ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={t('favorites')}
              >
                <Star className={`w-5 h-5 ${favoriteTools.length > 0 ? 'fill-current' : ''}`} />
              </button>
              {showFavorites && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-[100]">
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('favorites')}</span>
                  </div>
                  {favoriteTools.length > 0 ? (
                    favoriteTools.map((tool) => (
                      <button
                        key={tool.slug}
                        onClick={() => handleSelectTool(tool)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        {tool.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                      {t('favorites.empty')}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* History */}
            <div className="relative" ref={historyRef}>
              <button
                onClick={() => { setShowHistory(!showHistory); setShowFavorites(false); }}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title={t('recent')}
              >
                <Clock className="w-5 h-5" />
              </button>
              {showHistory && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-[100]">
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('recent')}</span>
                  </div>
                  {history.length > 0 ? (
                    history.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => {
                          router.push(`/tools/${item.category}/${item.slug}`);
                          setShowHistory(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        {item.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
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
            >
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-500 dark:text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700">
            {navigation.map((item) => (
              <div key={item.name} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  className="w-full flex items-center justify-between py-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                >
                  <span>{item.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === item.name && item.tools.length > 0 && (
                  <div className="pb-2 pl-4">
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
                        href={`/tools/${tool.category}/${tool.slug}`}
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
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{resolvedTheme === 'dark' ? t('lightMode') : t('darkMode')}</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
