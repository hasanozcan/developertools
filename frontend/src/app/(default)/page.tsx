import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { getHomeHubs } from '@/lib/homeHubs';
import { ToolTextProvider } from '@/context/LanguageContext';
import { getToolTextMap } from '@/lib/toolText';
import { rootMetadata } from '../_shell/RootDocument';
import GuideCards from '@/components/seo/GuideCards';

// The homepage used to pick up app/opengraph-image.tsx and app/twitter-image.tsx
// automatically because it lived in the app root segment. It now sits in the
// (default) route group (so its root layout can render <html lang="en">), and image
// files placed inside a route group get a hash-suffixed URL, so the root images are
// referenced explicitly here to keep the /opengraph-image and /twitter-image URLs.
// Keep alt/size/type in sync with those two files.
const shareImage = {
  alt: 'DevsTools - Free Online Developer Tools',
  width: 1200,
  height: 630,
  type: 'image/png',
};

export const metadata: Metadata = {
  openGraph: {
    ...rootMetadata.openGraph,
    images: [{ url: '/opengraph-image', ...shareImage }],
  },
  twitter: {
    ...rootMetadata.twitter,
    images: [{ url: '/twitter-image', ...shareImage }],
  },
};

export default function HomePage() {
  // Tool names/descriptions are not in the client dictionary; the tool grid gets them here.
  return (
    <ToolTextProvider text={getToolTextMap('en')}>
      <HomePageClient hubs={getHomeHubs('en')}>
        <GuideCards />
      </HomePageClient>
    </ToolTextProvider>
  );
}
