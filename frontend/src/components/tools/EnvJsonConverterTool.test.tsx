import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import EnvJsonConverterTool from './EnvJsonConverterTool';

describe('EnvJsonConverterTool', () => {
  beforeEach(() => localStorage.clear());

  it('converts dotenv input to JSON and supports inferred primitives', () => {
    render(
      <LanguageProvider>
        <EnvJsonConverterTool />
      </LanguageProvider>,
    );

    fireEvent.change(screen.getByLabelText('.env input'), {
      target: { value: 'PORT=3000\nDEBUG=false' },
    });
    fireEvent.click(screen.getByLabelText('Infer booleans, numbers, and null'));
    fireEvent.click(screen.getByRole('button', { name: 'Convert to JSON' }));

    expect(screen.getByLabelText('JSON output')).toHaveValue(
      '{\n  "PORT": 3000,\n  "DEBUG": false\n}',
    );
  });
});
