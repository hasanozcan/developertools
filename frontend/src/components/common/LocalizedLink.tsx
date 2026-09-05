'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPath } from '@/lib/i18nRouting';

export default function LocalizedLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { language } = useLanguage();
  const localizedHref = typeof href === 'string' ? getLocalizedPath(href, language) : href;
  return <NextLink {...props} href={localizedHref} />;
}
