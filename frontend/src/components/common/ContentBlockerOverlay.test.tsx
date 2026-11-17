import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import { trackProductEvent } from '@/lib/analytics';
import { detectContentBlocker } from '@/lib/contentBlockerDetection';
import {
  ADBLOCK_GATE_STORAGE_KEY,
  ADBLOCK_GATE_WINDOW_MS,
  resetContentBlockerGate,
} from '@/lib/contentBlockerGate';
import ContentBlockerOverlay from './ContentBlockerOverlay';
import { NON_PRODUCTION_AD_ORIGINS, setBrowserUrl } from '@/test/browserLocation';

const originalUrl = window.location.href;
let mockPathname = '/tools/json/json-formatter';

vi.mock('@/lib/contentBlockerDetection', () => ({
  detectContentBlocker: vi.fn(),
}));

vi.mock('@/lib/analytics', () => ({
  trackProductEvent: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

const detector = vi.mocked(detectContentBlocker);
const trackEvent = vi.mocked(trackProductEvent);

function seedGateCount(count: number, windowStart = Date.now()) {
  localStorage.setItem(ADBLOCK_GATE_STORAGE_KEY, JSON.stringify({ count, windowStart }));
}

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
    mockPathname = '/tools/json/json-formatter';
    setBrowserUrl('https://devstools.app/tools/json/json-formatter');
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', 'ca-pub-123');
    detector.mockReset();
    trackEvent.mockReset();
    resetContentBlockerGate();
    localStorage.clear();
    document.body.style.overflow = '';
  });

  afterEach(() => {
    setBrowserUrl(originalUrl);
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    resetContentBlockerGate();
    document.body.style.overflow = '';
  });

  it.each(NON_PRODUCTION_AD_ORIGINS)(
    'does not probe or show the banner or blocking dialog on %s',
    async (origin) => {
      setBrowserUrl(origin);
      detector.mockResolvedValue('blocked');
      renderOverlay();
      await act(async () => {
        window.dispatchEvent(new Event('focus'));
        document.dispatchEvent(new Event('visibilitychange'));
      });
      expect(detector).not.toHaveBeenCalled();
      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    },
  );

  it('does not run detection when AdSense is not configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', '');

    renderOverlay();

    await waitFor(() => expect(detector).not.toHaveBeenCalled());
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not gate routes that do not contain a monetized slot', async () => {
    render(
      <LanguageProvider>
        <ContentBlockerOverlay />
      </LanguageProvider>,
    );

    await waitFor(() => expect(detector).not.toHaveBeenCalled());
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
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

  it('closes the soft banner and hard gate when the monetized slot is removed without a route change', async () => {
    detector.mockResolvedValue('blocked');
    const tree = (showSlot: boolean) => (
      <LanguageProvider>
        {showSlot && <div data-site-support-slot="true" />}
        <ContentBlockerOverlay />
      </LanguageProvider>
    );

    const { rerender, unmount } = render(tree(true));
    await screen.findByRole('region', { name: 'Ad blocker detected' });

    rerender(tree(false));
    await waitFor(() =>
      expect(screen.queryByRole('region', { name: 'Ad blocker detected' })).not.toBeInTheDocument(),
    );
    unmount();

    // Second blocked mount opens the hard modal, which also closes when the slot is removed.
    const secondMount = render(tree(true));
    await screen.findByRole('dialog');

    secondMount.rerender(tree(false));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('does not query the whole document for unrelated DOM mutations', async () => {
    detector.mockResolvedValue('clear');
    renderOverlay();
    await waitFor(() => expect(detector).toHaveBeenCalledOnce());

    const querySpy = vi.spyOn(document, 'querySelector');
    const output = document.createElement('pre');
    await act(async () => {
      document.body.appendChild(output);
      for (let i = 0; i < 5; i += 1) {
        output.appendChild(document.createElement('span')).textContent = String(i);
      }
      await Promise.resolve();
    });
    act(() => output.remove());
    await act(async () => {
      await Promise.resolve();
    });

    expect(querySpy).not.toHaveBeenCalled();
    querySpy.mockRestore();
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
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    resolveInitial?.('clear');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
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
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    resolveRecheck?.('clear');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('shows a dismissible soft banner on the first blocked page view without locking scroll or escalating on focus', async () => {
    localStorage.setItem('cb_dismissed', String(Date.now()));
    const reloadPage = vi.fn();
    detector.mockResolvedValue('blocked');

    renderOverlay(reloadPage);

    const banner = await screen.findByRole('region', { name: 'Ad blocker detected' });
    expect(banner).toBeInTheDocument();
    expect(
      screen.getByText('Ads help keep DevsTools free. Please consider allowing ads for this site.'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(trackEvent).toHaveBeenCalledWith('adblock_soft_banner_shown');

    // Focus recheck on the same page must not increment the counter or escalate to the hard modal.
    fireEvent.focus(window);
    await waitFor(() => expect(detector).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Ad blocker detected' })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(ADBLOCK_GATE_STORAGE_KEY) ?? '{}')).toMatchObject({
      count: 1,
    });

    // Dismissing hides the soft banner for the current page view.
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('region', { name: 'Ad blocker detected' })).not.toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith('adblock_soft_banner_dismissed');

    // Another focus recheck on the same page keeps it dismissed and does not escalate.
    fireEvent.focus(window);
    await waitFor(() => expect(detector).toHaveBeenCalledTimes(3));
    expect(screen.queryByRole('region', { name: 'Ad blocker detected' })).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(reloadPage).not.toHaveBeenCalled();
  });

  it('reloads when Check again is clicked from the soft banner', async () => {
    const reloadPage = vi.fn();
    detector.mockResolvedValue('blocked');

    renderOverlay(reloadPage);
    await screen.findByRole('region', { name: 'Ad blocker detected' });

    fireEvent.click(screen.getByRole('button', { name: 'Check again' }));
    expect(reloadPage).toHaveBeenCalledOnce();
  });

  it('escalates to a non-dismissible hard modal on a second blocked pathname in the same session', async () => {
    detector.mockResolvedValue('blocked');

    const tree = () => (
      <LanguageProvider>
        <div data-site-support-slot="true" />
        <ContentBlockerOverlay />
      </LanguageProvider>
    );

    const { rerender, unmount } = render(tree());
    await screen.findByRole('region', { name: 'Ad blocker detected' });
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    mockPathname = '/tools/encoding/base64';
    rerender(tree());

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));
    expect(trackEvent).toHaveBeenCalledWith('adblock_gate_shown');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('shows a non-dismissible modal on subsequent visits and ignores the old localStorage bypass', async () => {
    localStorage.setItem('cb_dismissed', String(Date.now()));
    seedGateCount(1);
    detector.mockResolvedValue('blocked');

    const { unmount } = renderOverlay();
    const dialog = await screen.findByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Ad blocker detected')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));
    expect(trackEvent).toHaveBeenCalledWith('adblock_gate_shown');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('resets the 24-hour counter back to Tier 1 once the window expires', async () => {
    seedGateCount(3, Date.now() - ADBLOCK_GATE_WINDOW_MS - 1000);
    detector.mockResolvedValue('blocked');

    renderOverlay();

    await screen.findByRole('region', { name: 'Ad blocker detected' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(ADBLOCK_GATE_STORAGE_KEY) ?? '{}')).toMatchObject({
      count: 1,
    });
  });

  it('resets the gate state when detection returns clear', async () => {
    seedGateCount(1);
    detector.mockResolvedValueOnce('blocked').mockResolvedValueOnce('clear');

    const { unmount } = renderOverlay();
    await screen.findByRole('dialog');
    expect(JSON.parse(localStorage.getItem(ADBLOCK_GATE_STORAGE_KEY) ?? '{}')).toMatchObject({
      count: 2,
    });
    unmount();

    mockPathname = '/tools/encoding/base64';
    renderOverlay();
    await waitFor(() => expect(detector).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(localStorage.getItem(ADBLOCK_GATE_STORAGE_KEY)).toBeNull();
  });

  it('reloads immediately when the user checks again from the hard modal after allowing ads', async () => {
    seedGateCount(1);
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
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.focus(window);

    await waitFor(() => expect(detector).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not disable the retry button with background checks while the hard gate is open', async () => {
    seedGateCount(1);
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
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('wraps keyboard focus between the modal buttons', async () => {
    seedGateCount(1);
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

  it('falls back to in-memory tracking when localStorage throws', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });
    detector.mockResolvedValue('blocked');

    const firstMount = renderOverlay();
    await screen.findByRole('region', { name: 'Ad blocker detected' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    firstMount.unmount();

    mockPathname = '/tools/encoding/base64';
    renderOverlay();
    await screen.findByRole('dialog');
  });
});
