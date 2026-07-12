import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import { detectContentBlocker } from '@/lib/contentBlockerDetection';
import ContentBlockerOverlay from './ContentBlockerOverlay';

vi.mock('@/lib/contentBlockerDetection', () => ({
  detectContentBlocker: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/tools/json/json-formatter',
}));

const detector = vi.mocked(detectContentBlocker);

function renderOverlay(reloadPage?: () => void) {
  return render(
    <LanguageProvider>
      <div data-site-support-slot="true" />
      <ContentBlockerOverlay reloadPage={reloadPage} />
    </LanguageProvider>,
  );
}

describe('ContentBlockerOverlay', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', 'ca-pub-123');
    detector.mockReset();
    localStorage.clear();
    document.body.style.overflow = '';
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    document.body.style.overflow = '';
  });

  it('does not run detection when AdSense is not configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', '');

    renderOverlay();

    await waitFor(() => expect(detector).not.toHaveBeenCalled());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not gate routes that do not contain a monetized slot', async () => {
    render(
      <LanguageProvider>
        <ContentBlockerOverlay />
      </LanguageProvider>,
    );

    await waitFor(() => expect(detector).not.toHaveBeenCalled());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('starts detection when a monetized slot arrives after hydration', async () => {
    detector.mockResolvedValue('clear');
    render(
      <LanguageProvider>
        <ContentBlockerOverlay />
      </LanguageProvider>,
    );
    expect(detector).not.toHaveBeenCalled();

    const lateSlot = document.createElement('div');
    lateSlot.setAttribute('data-site-support-slot', 'true');
    document.body.appendChild(lateSlot);

    await waitFor(() => expect(detector).toHaveBeenCalledWith('ca-pub-123'));
    lateSlot.remove();
  });

  it('shows a non-dismissible modal and ignores the old localStorage bypass', async () => {
    localStorage.setItem('cb_dismissed', String(Date.now()));
    detector.mockResolvedValue('blocked');

    const { unmount } = renderOverlay();
    const dialog = await screen.findByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Ad blocker detected')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('keeps the gate open and reloads after a clear retry result', async () => {
    let resolveRetry: ((result: 'clear') => void) | undefined;
    const reloadPage = vi.fn();
    detector.mockResolvedValueOnce('blocked').mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveRetry = resolve;
        }),
    );

    renderOverlay(reloadPage);
    await screen.findByRole('dialog');

    fireEvent.click(screen.getByRole('button', { name: 'Check again' }));
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('button', { name: 'Checking...' })).toBeDisabled();

    resolveRetry?.('clear');
    await waitFor(() => expect(reloadPage).toHaveBeenCalledOnce());
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check again' })).toBeEnabled();
    expect(detector).toHaveBeenCalledTimes(2);
  });

  it('keeps an active gate open when a retry is inconclusive', async () => {
    const reloadPage = vi.fn();
    detector.mockResolvedValueOnce('blocked').mockResolvedValueOnce('unknown');

    renderOverlay(reloadPage);
    await screen.findByRole('dialog');
    fireEvent.click(screen.getByRole('button', { name: 'Check again' }));

    await waitFor(() => expect(detector).toHaveBeenCalledTimes(2));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check again' })).toBeEnabled();
    expect(reloadPage).not.toHaveBeenCalled();
  });

  it('fails closed when the initial Google ad check is inconclusive', async () => {
    detector.mockResolvedValue('unknown');

    renderOverlay();

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await waitFor(() => expect(detector).toHaveBeenCalledOnce());
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-busy', 'false');
  });

  it('wraps keyboard focus between the modal buttons', async () => {
    detector.mockResolvedValue('blocked');
    renderOverlay();
    const dialog = await screen.findByRole('dialog');
    const retry = screen.getByRole('button', { name: 'Check again' });
    const reload = screen.getByRole('button', { name: 'Reload page' });

    dialog.focus();
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(reload).toHaveFocus();

    dialog.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(retry).toHaveFocus();

    reload.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(retry).toHaveFocus();

    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(reload).toHaveFocus();
  });
});
