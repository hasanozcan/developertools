'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Code2, Search, Star, Clock, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useHistory } from '@/context/HistoryContext';

const navigation = [
  { 
    name: 'Encoders', 
    href: '/tools/encoding',
    tools: [
      { name: 'Base64 Encoder/Decoder', slug: 'base64', category: 'encoding' },
      { name: 'URL Encoder/Decoder', slug: 'url-encoder', category: 'encoding' },
      { name: 'JWT Decoder', slug: 'jwt-decoder', category: 'encoding' },
      { name: 'HTML Entity Encoder', slug: 'html-entity', category: 'encoding' },
    ]
  },
  { 
    name: 'Generators', 
    href: '/tools/generators',
    tools: [
      { name: 'UUID Generator', slug: 'uuid-generator', category: 'generators' },
      { name: 'Password Generator', slug: 'password-generator', category: 'generators' },
      { name: 'QR Code Generator', slug: 'qr-code', category: 'generators' },
      { name: 'Slug Generator', slug: 'slug-generator', category: 'generators' },
    ]
  },
  { 
    name: 'Formatters', 
    href: '/tools/formatters',
    tools: [
      { name: 'JSON Formatter', slug: 'json-formatter', category: 'json' },
      { name: 'SQL Formatter', slug: 'sql-formatter', category: 'formatters' },
      { name: 'CSS Minifier', slug: 'css-minifier', category: 'formatters' },
      { name: 'JS Minifier', slug: 'js-minifier', category: 'formatters' },
    ]
  },
  { 
    name: 'Converters', 
    href: '/tools/converters',
    tools: [
      { name: 'Timestamp Converter', slug: 'timestamp-converter', category: 'converters' },
      { name: 'Color Converter', slug: 'color-converter', category: 'converters' },
      { name: 'JSON to CSV', slug: 'json-csv', category: 'converters' },
    ]
  },
  { 
    name: 'More Tools', 
    href: '/#categories',
    tools: [
      { name: 'Regex Tester', slug: 'regex-tester', category: 'text' },
      { name: 'Text Diff Tool', slug: 'text-diff', category: 'text' },
      { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', category: 'text' },
      { name: 'Markdown Preview', slug: 'markdown-preview', category: 'utilities' },
      { name: 'Cron Parser', slug: 'cron-parser', category: 'utilities' },
      { name: 'MD5 Hash', slug: 'md5-hash', category: 'crypto' },
      { name: 'SHA256 Hash', slug: 'sha256-hash', category: 'crypto' },
    ]
  },
];

// All available tools for search
const allTools = [
  { name: 'JSON Formatter', slug: 'json-formatter', category: 'json', keywords: ['json', 'format', 'beautify', 'validate'] },
  { name: 'Base64 Encoder/Decoder', slug: 'base64', category: 'encoding', keywords: ['base64', 'encode', 'decode'] },
  { name: 'URL Encoder/Decoder', slug: 'url-encoder', category: 'encoding', keywords: ['url', 'encode', 'decode', 'percent'] },
  { name: 'JWT Decoder', slug: 'jwt-decoder', category: 'encoding', keywords: ['jwt', 'token', 'decode', 'json web token'] },
  { name: 'UUID Generator', slug: 'uuid-generator', category: 'generators', keywords: ['uuid', 'guid', 'generate', 'random'] },
  { name: 'Password Generator', slug: 'password-generator', category: 'generators', keywords: ['password', 'generate', 'secure', 'random'] },
  { name: 'MD5 Hash Generator', slug: 'md5-hash', category: 'crypto', keywords: ['md5', 'hash', 'checksum'] },
  { name: 'SHA256 Hash Generator', slug: 'sha256-hash', category: 'crypto', keywords: ['sha256', 'sha-256', 'hash', 'secure'] },
  { name: 'Regex Tester', slug: 'regex-tester', category: 'text', keywords: ['regex', 'regular expression', 'test', 'match'] },
  { name: 'Timestamp Converter', slug: 'timestamp-converter', category: 'converters', keywords: ['timestamp', 'unix', 'epoch', 'date', 'time'] },
  { name: 'Color Converter', slug: 'color-converter', category: 'converters', keywords: ['color', 'hex', 'rgb', 'hsl', 'converter'] },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', category: 'text', keywords: ['lorem', 'ipsum', 'placeholder', 'text'] },
  { name: 'HTML Entity Encoder', slug: 'html-entity', category: 'encoding', keywords: ['html', 'entity', 'encode', 'decode'] },
  { name: 'JSON to CSV Converter', slug: 'json-csv', category: 'converters', keywords: ['json', 'csv', 'convert', 'export'] },
  { name: 'Text Diff Tool', slug: 'text-diff', category: 'text', keywords: ['diff', 'compare', 'text', 'difference'] },
  { name: 'QR Code Generator', slug: 'qr-code', category: 'generators', keywords: ['qr', 'qr code', 'barcode', 'generate'] },
  { name: 'Slug Generator', slug: 'slug-generator', category: 'generators', keywords: ['slug', 'url', 'seo', 'permalink'] },
  { name: 'SQL Formatter', slug: 'sql-formatter', category: 'formatters', keywords: ['sql', 'format', 'beautify', 'query'] },
  { name: 'CSS Minifier', slug: 'css-minifier', category: 'formatters', keywords: ['css', 'minify', 'compress', 'optimize'] },
  { name: 'JS Minifier', slug: 'js-minifier', category: 'formatters', keywords: ['javascript', 'js', 'minify', 'compress'] },
  { name: 'Cron Parser', slug: 'cron-parser', category: 'utilities', keywords: ['cron', 'schedule', 'crontab', 'job'] },
  { name: 'Markdown Preview', slug: 'markdown-preview', category: 'utilities', keywords: ['markdown', 'md', 'preview', 'editor'] },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allTools>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { favorites, isFavorite } = useFavorites();
  const { history } = useHistory();

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allTools.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.keywords.some(kw => kw.includes(query))
    );
    setSearchResults(results);
  }, [searchQuery]);

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
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTool = (tool: typeof allTools[0]) => {
    router.push(`/tools/${tool.category}/${tool.slug}`);
    setSearchOpen(false);
    setSearchQuery('');
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
                    {item.name !== 'More Tools' && (
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                        >
                          View All →
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
                  <span className="text-sm">Search...</span>
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
                      placeholder="Search tools..."
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-[100]">
                      {searchResults.map((tool) => (
                        <button
                          key={tool.slug}
                          onClick={() => handleSelectTool(tool)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 last:border-0"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">{tool.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{tool.category}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 text-center text-gray-500 dark:text-gray-400 text-sm z-[100]">
                      No tools found for &quot;{searchQuery}&quot;
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
                title="Favorites"
              >
                <Star className={`w-5 h-5 ${favoriteTools.length > 0 ? 'fill-current' : ''}`} />
              </button>
              {showFavorites && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-[100]">
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Favorites</span>
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
                      No favorites yet
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
                title="Recent Tools"
              >
                <Clock className="w-5 h-5" />
              </button>
              {showHistory && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-[100]">
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Tools</span>
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
                      No recent tools
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
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
                    {item.name !== 'More Tools' && (
                      <Link
                        href={item.href}
                        className="block py-2 text-sm text-primary-600 dark:text-primary-400 font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        View All {item.name} →
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
              <span>{resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
