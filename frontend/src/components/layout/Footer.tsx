'use client';

import Link from '@/components/common/LocalizedLink';
import { BrandLogoMark } from '@/components/common/BrandLogo';
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
      { key: 'cat.json', fallback: 'JSON Tools', href: '/tools/json' },
      { key: 'cat.encoding', fallback: 'Encoding & Decoding', href: '/tools/encoding' },
      { key: 'cat.generators', fallback: 'Generators', href: '/tools/generators' },
      { key: 'cat.crypto', fallback: 'Cryptography', href: '/tools/crypto' },
      { key: 'cat.text', fallback: 'Text Tools', href: '/tools/text' },
      { key: 'cat.converters', fallback: 'Converters', href: '/tools/converters' },
      { key: 'cat.formatters', fallback: 'Code Formatters', href: '/tools/formatters' },
      { key: 'cat.utilities', fallback: 'Developer Utilities', href: '/tools/utilities' },
    ],
    company: [
      { name: t('footer.about'), href: '/about' },
      { name: t('footer.privacy'), href: '/privacy' },
      { name: t('footer.terms'), href: '/terms' },
      { name: t('footer.contact'), href: '/contact' },
    ],
  };

  return (
    <footer className="mt-12 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#09090b]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <BrandLogoMark size={28} className="shrink-0" />
              <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                DevsTools
              </span>
            </Link>
            <p className="mb-4 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {t('footer.description')}
            </p>
            <p className="max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              <Link
                href="/collections"
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {t("uiText.9ae6a966")}</Link>
              <span className="px-2 text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                ·
              </span>
              <Link
                href="/for"
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {t("uiText.ac6d3237")}</Link>
              <span className="px-2 text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                ·
              </span>
              <Link
                href="/guides"
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {t("uiText.e4c8a27b")}</Link>
            </p>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {t('footer.popularTools')}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.tools.map((link) => {
                const label = t(link.key) !== link.key ? t(link.key) : link.fallback;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
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
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {t('footer.categories')}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => {
                const label = t(link.key) !== link.key ? t(link.key) : link.fallback;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-7 text-center text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <p>
            {t("uiText.2ba51521")} {new Date().getFullYear()} {' ' + t("uiText.a6fb1028")}{' '}
            {t('footer.copyright').replace('© {year} Developer Tools. ', '')}
          </p>
        </div>
      </div>
    </footer>
  );
}
