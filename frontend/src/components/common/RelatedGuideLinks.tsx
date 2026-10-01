import Link from 'next/link';
import { getGuideLinkCopy } from '@/lib/guideLinkCopy';
import type { Language } from '@/lib/i18nRouting';

export default function RelatedGuideLinks({
  guides,
  locale,
}: {
  guides: { name: string; href: string }[];
  locale: Language;
}) {
  if (guides.length === 0) return null;
  const copy = getGuideLinkCopy(locale);

  return (
    <nav
      aria-label={copy.heading}
      data-related-guides="true"
      className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
    >
      <span className="text-gray-600 dark:text-gray-300">{copy.heading}:</span>
      {guides.map((guide) => (
        <Link
          key={guide.href}
          href={guide.href}
          hrefLang="en"
          className="font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          {copy.labels[guide.href] ?? guide.name}
          {locale !== 'en' && ` (${copy.english})`}
        </Link>
      ))}
    </nav>
  );
}
