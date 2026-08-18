'use client';

import { useState, useRef, useEffect, useId } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useLanguage, Language, languageNames, languageFlags, languageFlagUrls } from '@/context/LanguageContext';

function FlagIcon({ lang }: { lang: Language }) {
  const emojiFallback = languageFlags[lang];
  const src = languageFlagUrls[lang];

  return (
    <span aria-hidden="true" className="inline-flex items-center justify-center w-5 h-5">
      <Image
        src={src}
        alt=""
        width={20}
        height={20}
        unoptimized
        className="w-5 h-5"
        onError={(e) => {
          // Hide a broken image; the trigger and option keep their text labels.
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="sr-only">{emojiFallback}</span>
    </span>
  );
}

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
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
        title={t('common.selectLanguage') || 'Select Language'}
        aria-label={`${t('common.selectLanguage') || 'Select language'}. Current: ${languageNames[language]}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
      >
        <FlagIcon lang={language} />
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={t('common.selectLanguage') || 'Select language'}
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-[100]"
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              role="option"
              aria-selected={language === lang}
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
