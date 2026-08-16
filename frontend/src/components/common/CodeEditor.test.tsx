import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import CodeEditor from './CodeEditor';

function ControlledEditor({
  initialValue = 'alpha',
  maxLength,
}: {
  initialValue?: string;
  maxLength?: number;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <LanguageProvider>
      <label htmlFor="test-editor">Input Lines</label>
      <CodeEditor
        id="test-editor"
        value={value}
        onChange={setValue}
        language="text"
        maxLength={maxLength}
      />
    </LanguageProvider>
  );
}

describe('CodeEditor', () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('associates an external visible label with the textarea', () => {
    render(<ControlledEditor />);

    expect(screen.getByLabelText('Input Lines')).toHaveValue('alpha');
  });

  it('offers an undo action after clearing content', () => {
    render(<ControlledEditor />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByLabelText('Input Lines')).toHaveValue('');
    expect(screen.getByRole('status')).toHaveTextContent('Content cleared.');

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(screen.getByLabelText('Input Lines')).toHaveValue('alpha');
  });

  it('limits oversized input and explains the boundary', () => {
    render(<ControlledEditor initialValue="" maxLength={5} />);

    fireEvent.change(screen.getByLabelText('Input Lines'), {
      target: { value: 'abcdef' },
    });

    expect(screen.getByLabelText('Input Lines')).toHaveValue('abcde');
    expect(screen.getByRole('status')).toHaveTextContent('Input is limited to 5 characters.');
  });

  it('shows a visible error when clipboard access fails', async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error('denied'));
    render(<ControlledEditor />);

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Copy failed. Check browser permissions.',
    );
  });
});
