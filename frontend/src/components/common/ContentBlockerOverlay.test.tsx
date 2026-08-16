import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    await act(async () => {
      document.body.appendChild(lateSlot);
      await Promise.resolve();
    });

    await waitFor(() => expect(detector).toHaveBeenCalledWith('ca-pub-123'));
    act(() => lateSlot.remove());
  });

  it('keeps content available while the initial check is pending, then clears without reloading', async () => {
    let resolveInitial: ((result: 'clear') => void) | undefined;
    const reloadPage = vi.fn();
    detector.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveInitial = resolve;
        }),
    );

    renderOverlay(reloadPage);

    await waitFor(() => expect(detector).toHaveBeenCalledOnce());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    resolveInitial?.('clear');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(reloadPage).not.toHaveBeenCalled();
  });

  it('does not flash the gate during a background recheck after a clear result', async () => {
    let resolveRecheck: ((result: 'clear') => void) | undefined;
    detector.mockResolvedValueOnce('clear').mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveRecheck = resolve;
        }),
    );

    renderOverlay();
    await waitFor(() => expect(detector).toHaveBeenCalledOnce());
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    fireEvent.focus(window);
    await waitFor(() => expect(detector).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    resolveRecheck?.('clear');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
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

  it('reloads immediately when the user checks again after allowing ads', async () => {
    const reloadPage = vi.fn();
    detector.mockResolvedValue('blocked');

    renderOverlay(reloadPage);
    await screen.findByRole('dialog');

    fireEvent.click(screen.getByRole('button', { name: 'Check again' }));
    expect(reloadPage).toHaveBeenCalledOnce();
    expect(detector).toHaveBeenCalledOnce();
  });

  it('keeps content available after an inconclusive check and retries on focus', async () => {
    detector.mockResolvedValueOnce('unknown').mockResolvedValueOnce('clear');

    renderOverlay();
    await waitFor(() => expect(detector).toHaveBeenCalledOnce());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.focus(window);

    await waitFor(() => expect(detector).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not disable the retry button with background checks while the gate is open', async () => {
    const reloadPage = vi.fn();
    detector.mockResolvedValue('blocked');

    renderOverlay(reloadPage);
    await screen.findByRole('dialog');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Check again' })).toBeEnabled());

    fireEvent.focus(window);

    expect(detector).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Check again' })).toBeEnabled();
    expect(reloadPage).not.toHaveBeenCalled();
  });

  it('fails open when the initial Google ad check is inconclusive', async () => {
    detector.mockResolvedValue('unknown');

    renderOverlay();

    await waitFor(() => expect(detector).toHaveBeenCalledOnce());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
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
