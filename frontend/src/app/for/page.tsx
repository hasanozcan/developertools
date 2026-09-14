import type { Metadata } from 'next';
import { AudienceIndexContent } from '@/components/seo/AudiencePages';
import { getHreflangAlternates } from '@/lib/i18nRouting';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

export const metadata: Metadata = {
  title: 'Developer Tools by Role',
  description: 'Role-focused developer toolboxes for API, frontend, backend, DevOps, security, data, AI, mobile, database, and QA work.',
  alternates: { canonical: `${siteUrl}/for`, languages: getHreflangAlternates('/for', siteUrl) },
};

export default function AudienceIndexPage() {
  return <AudienceIndexContent locale="en" />;
}
