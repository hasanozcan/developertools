import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import MarkdownPreviewTool from './MarkdownPreviewTool';

describe('MarkdownPreviewTool', () => {
  const writeText = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    writeText.mockReset();
    writeText.mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  function renderTool() {
    return render(
      <LanguageProvider>
        <MarkdownPreviewTool />
      </LanguageProvider>,
    );
  }

  it('exposes labelled controls and the active view mode', () => {
    renderTool();

    expect(screen.getByLabelText('Markdown Input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Preview' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'HTML' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByLabelText('0 / 250000')).toBeInTheDocument();
  });

  it('loads an accurate sample without claiming unsupported highlighting or footnotes', async () => {
    renderTool();

    fireEvent.click(screen.getByRole('button', { name: 'Load Sample' }));

    const input = screen.getByLabelText('Markdown Input');
    await waitFor(() =>
      expect((input as HTMLTextAreaElement).value).toContain(
        'syntax highlighting is not applied',
      ),
    );
    expect((input as HTMLTextAreaElement).value).not.toContain('Footnotes');
  });

  it('blocks linked images until the user explicitly enables them', async () => {
    renderTool();
    fireEvent.change(screen.getByLabelText('Markdown Input'), {
      target: { value: '![Diagram](https://cdn.example.test/diagram.png)' },
    });

    expect(await screen.findByText('Linked image blocked: Diagram')).toBeInTheDocument();
    expect(screen.queryByAltText('Diagram')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('checkbox', { name: 'Load linked images' }));

    expect(await screen.findByAltText('Diagram')).toHaveAttribute(
      'src',
      'https://cdn.example.test/diagram.png',
    );
  });

  it('shows clipboard failures instead of silently ignoring them', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    renderTool();
    fireEvent.change(screen.getByLabelText('Markdown Input'), {
      target: { value: '# Heading' },
    });

    const copyButton = await screen.findByRole('button', { name: 'Copy HTML' });
    fireEvent.click(copyButton);

    expect(
      await screen.findByRole('button', {
        name: 'Copy failed. Check browser permissions.',
      }),
    ).toBeInTheDocument();
  });
});
