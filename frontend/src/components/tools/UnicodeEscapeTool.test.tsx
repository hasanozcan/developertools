import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import UnicodeEscapeTool from './UnicodeEscapeTool';

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const labels: Record<string, string> = {
        'common.encode': 'Encode',
        'common.decode': 'Decode',
        'common.convert': 'Convert',
      };
      return labels[key] ?? key;
    },
  }),
}));

vi.mock('@/components/common/CodeEditor', () => ({
  default: ({
    value,
    onChange,
    readOnly,
  }: {
    value: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
  }) => (
    <textarea
      aria-label={readOnly ? 'Converted output' : 'Source input'}
      value={value}
      readOnly={readOnly}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
}));

describe('UnicodeEscapeTool', () => {
  it('round-trips literal escape text through the ASCII encode and decode controls', () => {
    render(<UnicodeEscapeTool />);
    const input = String.raw`\x41 \u0041 \u{1F680} 👋`;
    fireEvent.change(screen.getByLabelText('Source input'), { target: { value: input } });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Encode ASCII characters too' }));
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));
    const encoded = (screen.getByLabelText('Converted output') as HTMLTextAreaElement).value;
    expect(encoded).not.toBe(input);

    fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
    fireEvent.change(screen.getByLabelText('Source input'), { target: { value: encoded } });
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));
    expect(screen.getByLabelText('Converted output')).toHaveValue(input);
  });

  it('preserves whitespace-only input in both modes and encodes it when ASCII is enabled', () => {
    render(<UnicodeEscapeTool />);
    const whitespace = ' \t\n';
    fireEvent.change(screen.getByLabelText('Source input'), { target: { value: whitespace } });
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));
    expect(screen.getByLabelText('Converted output')).toHaveValue(whitespace);

    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));
    expect(screen.getByLabelText('Converted output')).toHaveValue(String.raw`\u0020\u0009\u000A`);

    fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));
    expect(screen.getByLabelText('Converted output')).toHaveValue(whitespace);
  });

  it('announces an invalid code point and recovers after a valid conversion', () => {
    render(<UnicodeEscapeTool />);
    fireEvent.click(screen.getByRole('button', { name: 'Decode' }));
    fireEvent.change(screen.getByLabelText('Source input'), {
      target: { value: String.raw`\u{110000}` },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));
    expect(screen.getByRole('alert')).toHaveTextContent(/code point/i);
    expect(screen.getByLabelText('Converted output')).toHaveValue('');

    fireEvent.change(screen.getByLabelText('Source input'), {
      target: { value: String.raw`\u0041` },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Convert' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Converted output')).toHaveValue('A');
  });
});
