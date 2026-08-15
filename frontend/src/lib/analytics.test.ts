import { beforeEach, describe, expect, it, vi } from 'vitest';

const { trackMock } = vi.hoisted(() => ({
  trackMock: vi.fn(),
}));

vi.mock('@vercel/analytics', () => ({
  track: trackMock,
}));

import {
  getToolAnalyticsContext,
  trackCurrentToolEvent,
  trackProductEvent,
  trackToolEvent,
} from './analytics';

describe('privacy-safe product analytics', () => {
  beforeEach(() => {
    trackMock.mockReset();
    window.history.replaceState({}, '', '/');
  });

  it('extracts only category and tool identifiers from a canonical tool route', () => {
    expect(getToolAnalyticsContext('/tools/json/json-formatter')).toEqual({
      category: 'json',
      tool: 'json-formatter',
    });
    expect(getToolAnalyticsContext('/contact')).toBeNull();
    expect(getToolAnalyticsContext('/tools/json/%E0%A4%A')).toBeNull();
  });

  it('sanitizes property keys and bounds string values', () => {
    trackProductEvent('contact_submitted', {
      invalidKey: 'ignored',
      source: 'contact'.repeat(20),
      valid_number: 2,
    });

    expect(trackMock).toHaveBeenCalledWith('contact_submitted', {
      source: 'contact'.repeat(20).slice(0, 100),
      valid_number: 2,
    });
  });

  it('prevents callers from overriding the tool context', () => {
    trackToolEvent('tool_opened', 'json-formatter', 'json', {
      category: 'wrong',
      tool: 'wrong',
    });

    expect(trackMock).toHaveBeenCalledWith('tool_opened', {
      category: 'json',
      tool: 'json-formatter',
    });
  });

  it('tracks copy actions only while on a tool route', () => {
    trackCurrentToolEvent('tool_copied');
    expect(trackMock).not.toHaveBeenCalled();

    window.history.replaceState({}, '', '/tools/encoding/base64');
    trackCurrentToolEvent('tool_copied');

    expect(trackMock).toHaveBeenCalledWith('tool_copied', {
      category: 'encoding',
      tool: 'base64',
    });
  });
});

