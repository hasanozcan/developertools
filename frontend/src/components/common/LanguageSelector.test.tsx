import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LanguageProvider, languageFlagUrls } from '@/context/LanguageContext';
import LanguageSelector from './LanguageSelector';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

describe('LanguageSelector flags', () => {
  it('returns option focus to the open selector on Escape when another selector is mounted', () => {
    render(
      <LanguageProvider initialLocale="en">
        <LanguageSelector />
        <LanguageSelector />
      </LanguageProvider>,
    );
    const triggers = screen.getAllByRole('button', { name: /current: english/i });
    fireEvent.click(triggers[1]);
    const option = screen.getByRole('option', { name: /Français/ });
    option.focus();
    expect(option).toHaveFocus();
    fireEvent.keyDown(option, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(triggers[1]).toHaveFocus();
  });

  it('points every flag at a small self-hosted SVG', () => {
    for (const url of Object.values(languageFlagUrls)) {
      expect(url).toMatch(/^\/flags\/[a-z]{2}\.svg$/);
      const file = path.join(process.cwd(), 'public', url);
      expect(fs.existsSync(file)).toBe(true);
      const svg = fs.readFileSync(file, 'utf8');
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.length).toBeLessThan(2048);
    }
  });

  it('renders flag images with explicit dimensions and no third-party host', () => {
    const { container } = render(
      <LanguageProvider initialLocale="en">
        <LanguageSelector />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /current: english/i }));

    const images = Array.from(container.querySelectorAll('img'));
    expect(images).toHaveLength(8); // trigger + 7 options
    for (const img of images) {
      const src = new URL(img.getAttribute('src') ?? '', window.location.href);
      expect(src.origin).toBe(window.location.origin);
      expect(src.pathname).toMatch(/^\/flags\/[a-z]{2}\.svg$/);
      expect(img).toHaveAttribute('width', '20');
      expect(img).toHaveAttribute('height', '20');
    }
  });
});
