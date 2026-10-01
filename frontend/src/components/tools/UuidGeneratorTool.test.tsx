import { Blob } from 'node:buffer';
import { webcrypto } from 'node:crypto';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import UuidGeneratorTool from './UuidGeneratorTool';
import UuidV7GeneratorTool from './UuidV7GeneratorTool';

const V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const writeText = vi.fn().mockResolvedValue(undefined);
const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

beforeAll(() => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
});

beforeEach(() => {
  vi.stubGlobal('crypto', webcrypto);
  writeText.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

afterAll(() => {
  if (clipboardDescriptor) Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
  else Reflect.deleteProperty(navigator, 'clipboard');
});

describe('UUID generator presets and exports', () => {
  it('keeps the general generator on v4 and can switch to v7', () => {
    render(
      <LanguageProvider initialLocale="en">
        <UuidGeneratorTool />
      </LanguageProvider>,
    );
    expect(screen.getByLabelText('Version:')).toHaveValue('v4');
    expect(
      (screen.getByRole('textbox', { name: 'Generated UUIDs' }) as HTMLTextAreaElement).value,
    ).toMatch(V4);
    expect(
      screen.queryByRole('link', { name: 'Inspect a UUID v7 timestamp' }),
    ).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Version:'), { target: { value: 'v7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    expect(
      (screen.getByRole('textbox', { name: 'Generated UUIDs' }) as HTMLTextAreaElement).value,
    ).toMatch(V7);
    expect(screen.getByRole('link', { name: 'Inspect a UUID v7 timestamp' })).toHaveAttribute(
      'href',
      '/tools/crypto/uuid-v7-timestamp-extractor',
    );
  });

  it('generates v7 initially and in batches, with secure randomness and the current timestamp', () => {
    const timestamp = 1_700_000_000_000;
    vi.spyOn(Date, 'now').mockReturnValue(timestamp);
    const randomness = vi.spyOn(webcrypto, 'getRandomValues');
    render(
      <LanguageProvider initialLocale="en">
        <UuidV7GeneratorTool />
      </LanguageProvider>,
    );
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(
      (screen.getByRole('textbox', { name: 'Generated UUIDs' }) as HTMLTextAreaElement).value,
    ).toMatch(V7);

    fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
    const ids = (
      screen.getByRole('textbox', { name: 'Generated UUIDs' }) as HTMLTextAreaElement
    ).value.split('\n');
    expect(ids).toHaveLength(3);
    expect(new Set(ids).size).toBe(3);
    for (const id of ids) {
      expect(id).toMatch(V7);
      expect(Number.parseInt(id.replaceAll('-', '').slice(0, 12), 16)).toBe(timestamp);
    }
    expect(randomness).toHaveBeenCalled();
  });

  it('copies and downloads the formatted v7 batch, then disables exports after clearing', async () => {
    const createObjectURL = vi.fn<typeof URL.createObjectURL>().mockReturnValue('blob:uuid-test');
    const revokeObjectURL = vi.fn();
    vi.stubGlobal('Blob', Blob);
    vi.stubGlobal(
      'URL',
      class extends URL {
        static createObjectURL = createObjectURL;
        static revokeObjectURL = revokeObjectURL;
      },
    );
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(
      <LanguageProvider initialLocale="en">
        <UuidV7GeneratorTool />
      </LanguageProvider>,
    );
    const original = (
      screen.getByRole('textbox', { name: 'Generated UUIDs' }) as HTMLTextAreaElement
    ).value;
    fireEvent.click(screen.getByRole('checkbox', { name: 'Uppercase' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Wrap in braces' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Include hyphens' }));
    const expected = `{${original.replaceAll('-', '').toUpperCase()}}`;
    expect(screen.getByRole('textbox', { name: 'Generated UUIDs' })).toHaveValue(expected);

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(expected));
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(click).toHaveBeenCalledTimes(1);
    const anchor = click.mock.instances[0] as HTMLAnchorElement;
    expect(anchor.download).toBe('uuid-v7-batch.txt');
    expect(await (createObjectURL.mock.calls[0][0] as unknown as Blob).text()).toBe(
      `${expected}\n`,
    );
    await waitFor(() => expect(revokeObjectURL).toHaveBeenCalledWith('blob:uuid-test'));

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByRole('button', { name: 'Download' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Copied!' })).toBeDisabled();
    expect(screen.queryByRole('textbox', { name: 'Generated UUIDs' })).not.toBeInTheDocument();
  });

  it('announces unavailable secure randomness instead of falling back to weak IDs', () => {
    vi.stubGlobal('crypto', {});
    render(
      <LanguageProvider initialLocale="en">
        <UuidV7GeneratorTool />
      </LanguageProvider>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Secure browser randomness is unavailable');
    expect(screen.getByRole('button', { name: 'Download' })).toBeDisabled();
  });

  it('localizes the timestamp extractor link and keeps its canonical category', () => {
    render(
      <LanguageProvider initialLocale="tr">
        <UuidV7GeneratorTool />
      </LanguageProvider>,
    );
    expect(screen.getByRole('link', { name: 'UUID v7 zaman damgasını incele' })).toHaveAttribute(
      'href',
      '/tr/tools/crypto/uuid-v7-timestamp-extractor',
    );
  });
});
