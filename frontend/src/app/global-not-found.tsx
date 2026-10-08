import type { Metadata } from 'next';
import { RootDocument, rootMetadata } from './_shell/RootDocument';
import EnDictionary from '@/translations/client/en';
import NotFoundContent from './_shell/NotFoundContent';
import { notFoundMetadata } from './_shell/notFoundMetadata';

// With separate root layouts (app/(default), app/[locale], app/about, app/contact) there
// is no single layout to compose the 404 for unmatched URLs from, so this renders the
// full document itself. It bypasses layouts, hence the explicit merge with the root
// metadata and the absolute title (no parent title template applies here).
// Share images are left out so app/opengraph-image.tsx and app/twitter-image.tsx, which
// live in this same app root segment, apply (config images would take precedence).
const { images: _ogImages, ...openGraph } = rootMetadata.openGraph ?? {};
const { images: _twitterImages, ...twitter } = rootMetadata.twitter ?? {};

export const metadata: Metadata = {
  ...rootMetadata,
  openGraph,
  twitter,
  ...notFoundMetadata,
  title: { absolute: 'Page Not Found | DevsTools' },
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en" Dictionary={EnDictionary}>
      <NotFoundContent />
    </RootDocument>
  );
}
