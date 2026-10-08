import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CurlRequestTool from './CurlRequestTool';

vi.mock('@/context/LanguageContext', async () => {
  const { enUi } = await import('@/translations/ui/en');
  return { useLanguage: () => ({ t: (key: string) => enUi[key] ?? key }) };
});

vi.mock('@/components/common/CodeEditor', () => ({
  default: ({
    value,
    onChange,
    ariaLabel,
    placeholder,
    readOnly,
  }: {
    value: string;
    onChange: (value: string) => void;
    ariaLabel?: string;
    placeholder?: string;
    readOnly?: boolean;
  }) => (
    <textarea
      aria-label={ariaLabel ?? placeholder}
      value={value}
      readOnly={readOnly}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function converter() {
  return within(screen.getByRole('region', { name: /Paste cURL/ }));
}

describe('CurlRequestTool conversion-first flow', () => {
  it('puts the converter before the retained request builder and converts the GET example locally', () => {
    const outbound = vi.fn();
    vi.stubGlobal('fetch', outbound);
    render(<CurlRequestTool />);
    const convertSection = screen.getByRole('region', { name: /Paste cURL/ });
    const builder = screen.getByRole('region', { name: 'Request builder' });
    expect(
      convertSection.compareDocumentPosition(builder) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(within(builder).getByLabelText('Method')).toHaveValue('POST');
    expect(within(builder).getByLabelText('HTTP(S) URL')).toHaveValue(
      'https://api.example.com/v1/items',
    );
    expect(within(builder).getByRole('button', { name: '+ Add header' })).toBeInTheDocument();
    expect(within(builder).getByRole('checkbox', { name: 'Follow redirects' })).toBeChecked();
    fireEvent.click(converter().getByRole('button', { name: /Load Sample: GET/ }));
    fireEvent.click(converter().getByRole('button', { name: 'Convert to Fetch' }));
    expect(
      (converter().getByRole('textbox', { name: 'Converted Fetch' }) as HTMLTextAreaElement).value,
    ).toContain('method: "GET"');
    expect(
      (converter().getByRole('textbox', { name: 'Converted Fetch' }) as HTMLTextAreaElement).value,
    ).toContain('https://api.example.com/v1/items?limit=10');
    expect(outbound).not.toHaveBeenCalled();
  });

  it('converts the JSON POST example, preserves redaction, and clears stale results on input or example changes', () => {
    render(<CurlRequestTool />);
    fireEvent.click(converter().getByRole('button', { name: /JSON POST/ }));
    fireEvent.click(converter().getByRole('button', { name: 'Convert to Fetch' }));
    const output = converter().getByRole('textbox', {
      name: 'Converted Fetch',
    }) as HTMLTextAreaElement;
    expect(output.value).toContain('method: "POST"');
    expect(output.value).toContain('application/json');
    expect(output.value).toContain('[REDACTED]');
    expect(output.value).not.toContain('example-secret');
    fireEvent.click(screen.getByRole('checkbox', { name: /Redact sensitive headers/ }));
    expect(output.value).toContain('example-secret');
    fireEvent.change(converter().getByRole('textbox', { name: 'Paste a cURL command...' }), {
      target: { value: "curl 'https://example.com/new'" },
    });
    expect(output).toHaveValue('');
    fireEvent.click(converter().getByRole('button', { name: 'Convert to Fetch' }));
    expect(output.value).toContain('https://example.com/new');
    fireEvent.click(converter().getByRole('button', { name: /Load Sample: GET/ }));
    expect(output).toHaveValue('');
  });

  it.each([
    'curl --form file=@payload.json https://example.com',
    'curl --data-binary @payload.json https://example.com',
    'curl https://example.com/$TOKEN',
    'curl https://one.example https://two.example',
    'curl https://example.com | tee output',
  ])('rejects %j, clears previous output and shows actionable parser guidance', (command) => {
    const outbound = vi.fn();
    vi.stubGlobal('fetch', outbound);
    render(<CurlRequestTool />);
    fireEvent.click(converter().getByRole('button', { name: 'Convert to Fetch' }));
    fireEvent.change(converter().getByRole('textbox', { name: 'Paste a cURL command...' }), {
      target: { value: command },
    });
    fireEvent.click(converter().getByRole('button', { name: 'Convert to Fetch' }));
    expect(converter().getByRole('alert')).toHaveTextContent('Cannot convert this command.');
    expect(converter().getByRole('alert')).toHaveTextContent('--form');
    expect(converter().getByRole('alert')).toHaveTextContent('one HTTP(S) URL');
    expect(converter().getByRole('textbox', { name: 'Converted Fetch' })).toHaveValue('');
    fireEvent.click(converter().getByRole('button', { name: /Load Sample: GET/ }));
    expect(converter().queryByRole('alert')).not.toBeInTheDocument();
    expect(outbound).not.toHaveBeenCalled();
  });
});
