import type { Metadata } from 'next';
import GuideCards from '@/components/seo/GuideCards';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app').replace(/\/$/, '');
const title = 'Developer Guides with JavaScript and Python';
const description =
  'Learn to verify SHA-256 file checksums, decode Unicode escapes, and choose UUID v4 or v7 with practical examples and free browser tools.';

export const metadata: Metadata = {
  title: { absolute: `${title} | DevsTools` },
  description,
  alternates: { canonical: `${siteUrl}/guides` },
  openGraph: {
    title,
    description,
    type: 'website',
    url: `${siteUrl}/guides`,
    images: [`${siteUrl}/opengraph-image`],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteUrl}/twitter-image`],
  },
};

export default function GuidesPage() {
  return (
    <div lang="en">
      <header className="page-shell pt-10 sm:pt-14">
        <span className="eyebrow">Developer guides</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Developer guides with working code examples
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          Follow a worked example, check the common failure cases, and continue in the matching
          browser tool. These guides cover file verification, escaped text, and application
          identifiers.
        </p>
      </header>
      <GuideCards />
    </div>
  );
}
