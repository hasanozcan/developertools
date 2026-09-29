'use client';

import Link from '@/components/common/LocalizedLink';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPath } from '@/lib/localeRouting';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { t, language } = useLanguage();
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app').replace(/\/$/, '');
  // The home root is always labelled in the page language, even when a caller
  // passes a hardcoded English "Home".
  const localizedItems = items.map((item, index) =>
    index === 0 && item.href === '/' ? { ...item, name: t('common.home') || item.name } : item,
  );
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: localizedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      // Same locale prefix the visible LocalizedLink applies (EN stays unprefixed).
      item: item.href ? `${baseUrl}${getLocalizedPath(item.href, language)}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
        {localizedItems.map((item, index) => (
          <span key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-white">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
