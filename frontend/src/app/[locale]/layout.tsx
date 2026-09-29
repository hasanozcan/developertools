import { DEFAULT_LOCALE, isNonDefaultLocale } from '@/lib/i18nRouting';
import LocaleDictionary from '@/translations/client/LocaleDictionary';
import { RootDocument, rootMetadata } from '../_shell/RootDocument';

// Root layout for locale-prefixed URLs (/tr, /de, /es, /fr, /ru, /zh). The pages below
// generate the static params and call notFound() for anything else (including /en), so
// the fallback `lang` only ever applies to 404 responses.
export const metadata = rootMetadata;

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <RootDocument
      lang={isNonDefaultLocale(locale) ? locale : DEFAULT_LOCALE}
      Dictionary={LocaleDictionary}
    >
      {children}
    </RootDocument>
  );
}
