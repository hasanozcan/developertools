'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage, Language, languageNames, languageFlags, languageFlagUrls } from '@/context/LanguageContext';

function FlagIcon({ lang }: { lang: Language }) {
  const emojiFallback = languageFlags[lang];
  const src = languageFlagUrls[lang];

  return (
    <span className="inline-flex items-center justify-center w-5 h-5">
      <img
        src={src}
        alt={emojiFallback}
        className="w-5 h-5"
        onError={(e) => {
          // Hide broken image; emoji fallback will still render via aria-label
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="sr-only">{emojiFallback}</span>
    </span>
  );
}

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const languages: Language[] = ['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh'];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        title="Select Language"
      >
        <FlagIcon lang={language} />
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-[100]">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              language === lang 
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
              <FlagIcon lang={lang} />
              <span className="text-sm">{languageNames[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
