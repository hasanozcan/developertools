import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import SortLinesTool from './SortLinesTool';

describe('SortLinesTool', () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('associates labels and renders only one copy control per editor', async () => {
    render(
      <LanguageProvider>
        <SortLinesTool />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Load Sample' }));

    expect((screen.getByLabelText('Input Lines') as HTMLTextAreaElement).value).toContain(
      'zebra',
    );
    await waitFor(() =>
      expect(
        (screen.getByLabelText('Sorted Lines (A-Z)') as HTMLTextAreaElement).value,
      ).toContain('apple'),
    );
    expect(screen.getAllByRole('button', { name: 'Copy' })).toHaveLength(2);
  });
});
