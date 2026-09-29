// @vitest-environment jsdom

import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Breadcrumb from './Breadcrumb';

const { languageState } = vi.hoisted(() => ({ languageState: { current: 'en' } }));

vi.mock('@/context/LanguageContext', async () => {
  const { translations } = await import('@/translations');
  return {
    useLanguage: () => ({
      language: languageState.current,
      t: (key: string) =>
        (translations as Record<string, Record<string, string>>)[languageState.current]?.[key] ||
        '',
    }),
  };
});

vi.mock('@/components/common/LocalizedLink', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

type ListItem = { '@type': string; position: number; name: string; item?: string };

function renderBreadcrumb(items: { name: string; href?: string }[]) {
  const { container } = render(<Breadcrumb items={items} />);
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  const data = JSON.parse(script!.textContent ?? '{}') as {
    '@type': string;
    itemListElement: ListItem[];
  };
  return data;
}

describe('Breadcrumb JSON-LD', () => {
  afterEach(() => {
    languageState.current = 'en';
  });

  it('keeps unprefixed English URLs on the default locale', () => {
    const data = renderBreadcrumb([
      { name: 'Home', href: '/' },
      { name: 'JSON Tools', href: '/tools/json' },
      { name: 'About' },
    ]);

    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devstools.app/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'JSON Tools',
        item: 'https://devstools.app/tools/json',
      },
      { '@type': 'ListItem', position: 3, name: 'About' },
    ]);
    expect(screen.getByRole('link', { name: 'Home' })).toBeTruthy();
  });

  it('locale-prefixes every item URL and localizes the home label on TR pages', () => {
    languageState.current = 'tr';
    // Callers such as the category page may still pass a hardcoded English "Home".
    const data = renderBreadcrumb([
      { name: 'Home', href: '/' },
      { name: 'JSON Araçları', href: '/tools/json' },
      { name: 'Hakkımızda' },
    ]);

    expect(data.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://devstools.app/tr' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'JSON Araçları',
        item: 'https://devstools.app/tr/tools/json',
      },
      { '@type': 'ListItem', position: 3, name: 'Hakkımızda' },
    ]);
    expect(JSON.stringify(data)).not.toContain('"https://devstools.app/"');
    expect(screen.getByRole('link', { name: 'Ana Sayfa' })).toBeTruthy();
    expect(screen.queryByText('Home')).toBeNull();
  });

  it('prefixes localized static pages such as /de/privacy', () => {
    languageState.current = 'de';
    const data = renderBreadcrumb([
      { name: 'Startseite', href: '/' },
      { name: 'Datenschutz', href: '/privacy' },
    ]);

    expect(data.itemListElement.map((item) => item.item)).toEqual([
      'https://devstools.app/de',
      'https://devstools.app/de/privacy',
    ]);
  });
});
