import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/navigation', () => {
  const router = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() };
  return {
    usePathname: vi.fn(() => '/'),
    useRouter: () => router,
  };
});

// In the app the server layout supplies the active locale's dictionary through a per-locale
// client module. Tests render <LanguageProvider> on its own, so give it the full dictionary
// of the locale it resolves (initialLocale, else the mocked pathname).
vi.mock('@/context/LanguageContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/context/LanguageContext')>();
  const { createElement } = await import('react');
  const { usePathname } = await import('next/navigation');
  const { translations } = await import('@/translations');
  const { stripLocaleFromPath } = await import('@/lib/localeRouting');

  function LanguageProvider(props: React.ComponentProps<typeof actual.LanguageProvider>) {
    const pathname = usePathname();
    const locale = props.initialLocale ?? stripLocaleFromPath(pathname || '/').locale;
    return createElement(actual.DictionaryProvider, {
      dictionary: translations[locale],
      children: createElement(actual.LanguageProvider, props),
    });
  }

  return { ...actual, LanguageProvider };
});

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(String(key), String(value)),
  };
}

const localStorageMock = createMemoryStorage();
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: localStorageMock,
});
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: localStorageMock,
  });
}
