// @vitest-environment jsdom

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
});
