import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
        {items.map((item, index) => (
          <span key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
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
