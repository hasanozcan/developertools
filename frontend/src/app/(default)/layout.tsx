import { RootDocument, rootMetadata } from '../_shell/RootDocument';
import EnDictionary from '@/translations/client/en';

// Root layout for unprefixed (English) URLs. Locale-prefixed URLs (/tr, /de, ...) use
// app/[locale]/layout.tsx; both render the same document with a different `lang`.
export const metadata = rootMetadata;

export default function DefaultLocaleRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en" Dictionary={EnDictionary}>{children}</RootDocument>;
}
