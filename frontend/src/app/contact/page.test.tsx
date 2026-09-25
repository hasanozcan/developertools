// @vitest-environment jsdom

import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ContactPage from './page';

const { trackProductEventMock } = vi.hoisted(() => ({ trackProductEventMock: vi.fn() }));

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({ t: (key: string) => ({
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.sendMessage': 'Send Message',
    'contact.submitError': 'Message could not be sent. Email us directly:',
    'proInterest.contactPrompt': 'Which Pro features would help you?',
  })[key] || key }),
}));
vi.mock('@/lib/analytics', () => ({ trackProductEvent: trackProductEventMock }));
vi.mock('@/lib/googleAds', () => ({ trackGoogleAdsConversion: vi.fn() }));
vi.mock('@/components/common/Breadcrumb', () => ({ default: () => null }));
vi.mock('next/script', () => ({ default: () => null }));

describe('Pro interest contact flow', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/contact?topic=pro');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    trackProductEventMock.mockReset();
  });

  it('prefills a distinct Pro subject and counts interest only after a successful submission', async () => {
    render(<ContactPage />);

    await waitFor(() => expect(screen.getByLabelText('Subject')).toHaveValue('Pro interest'));
    expect(screen.getByText('Which Pro features would help you?')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'tester@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Saved workflows' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => expect(trackProductEventMock).toHaveBeenCalledWith('pro_interest_submitted'));
    expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }));
  });

  it('shows a direct-email fallback and keeps the message when delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 502 }));
    render(<ContactPage />);

    await waitFor(() => expect(screen.getByLabelText('Subject')).toHaveValue('Pro interest'));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'tester@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Saved workflows' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Message could not be sent');
    expect(within(alert).getByRole('link', { name: 'devstoolsapp@gmail.com' })).toHaveAttribute('href', 'mailto:devstoolsapp@gmail.com');
    expect(screen.getByLabelText('Message')).toHaveValue('Saved workflows');
    expect(trackProductEventMock).toHaveBeenCalledWith('contact_submit_failed', { status: 502 });
    expect(trackProductEventMock).not.toHaveBeenCalledWith('pro_interest_submitted');
  });
});
