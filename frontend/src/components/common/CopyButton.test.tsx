import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import CopyButton from './CopyButton';

describe('CopyButton', () => {
  const writeText = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    writeText.mockReset();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('reports a successful copy', async () => {
    writeText.mockResolvedValue(undefined);
    render(
      <LanguageProvider>
        <CopyButton text="result" />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(await screen.findByRole('button', { name: 'Copied!' })).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith('result');
  });

  it('reports clipboard permission failures', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    render(
      <LanguageProvider>
        <CopyButton text="result" />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(
      await screen.findByRole('button', {
        name: 'Copy failed. Check browser permissions.',
      }),
    ).toBeInTheDocument();
  });
});
