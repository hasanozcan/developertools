'use client';

import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    tools: [
      { name: 'JSON Formatter', href: '/tools/json/json-formatter' },
      { name: 'Base64 Encoder', href: '/tools/encoding/base64' },
      { name: 'UUID Generator', href: '/tools/generators/uuid-generator' },
      { name: 'Regex Tester', href: '/tools/text/regex-tester' },
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
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">DevsTools</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.popularTools')}</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.categories')}</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Developer Tools. {t('footer.copyright').replace('© {year} Developer Tools. ', '')}</p>
        </div>
      </div>
    </footer>
  );
}
