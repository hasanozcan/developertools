'use client';

import Link from '@/components/common/LocalizedLink';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    tools: [
      {
        key: 'toolName.json-formatter',
        fallback: 'JSON Formatter',
        href: '/tools/json/json-formatter',
      },
      {
        key: 'toolName.base64',
        fallback: 'Base64 Encoder/Decoder',
        href: '/tools/encoding/base64',
      },
      {
        key: 'toolName.uuid-generator',
        fallback: 'UUID Generator',
        href: '/tools/generators/uuid-generator',
      },
      { key: 'toolName.regex-tester', fallback: 'Regex Tester', href: '/tools/text/regex-tester' },
    ],
    categories: [
      { name: t('nav.encoders'), href: '/tools/encoding' },
      { name: t('nav.generators'), href: '/tools/generators' },
      { name: t('nav.formatters'), href: '/tools/formatters' },
      { name: t('nav.converters'), href: '/tools/converters' },
    ],
    company: [
      { name: t('footer.about'), href: '/about' },
      { name: t('footer.privacy'), href: '/privacy' },
      { name: t('footer.terms'), href: '/terms' },
      { name: t('footer.contact'), href: '/contact' },
    ],
  };

  return (
    <footer className="mt-12 border-t border-white/70 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="footerLogoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#0EA5E9' }} />
                    <stop offset="50%" style={{ stopColor: '#8B5CF6' }} />
                    <stop offset="100%" style={{ stopColor: '#EC4899' }} />
                  </linearGradient>
                  <linearGradient id="footerLogoGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#10B981' }} />
                    <stop offset="100%" style={{ stopColor: '#06B6D4' }} />
                  </linearGradient>
                </defs>
                <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="url(#footerLogoGrad1)" />
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
                <circle cx="16" cy="16" r="2.5" fill="url(#footerLogoGrad2)" />
              </svg>
              <span className="font-bold text-xl text-gray-900 dark:text-white">DevsTools</span>
            </Link>
            <p className="mb-4 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              {t('footer.description')}
            </p>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.popularTools')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => {
                const label = t(link.key) !== link.key ? t(link.key) : link.fallback;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.categories')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200/70 pt-7 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Developer Tools.{' '}
            {t('footer.copyright').replace('© {year} Developer Tools. ', '')}
          </p>
        </div>
      </div>
    </footer>
  );
}
