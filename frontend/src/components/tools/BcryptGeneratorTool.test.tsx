import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import BcryptGeneratorTool from './BcryptGeneratorTool';

describe('BcryptGeneratorTool', () => {
  beforeEach(() => localStorage.clear());

  it('generates a hash and verifies a matching password', async () => {
    render(
      <LanguageProvider>
        <BcryptGeneratorTool />
      </LanguageProvider>,
    );

    fireEvent.change(screen.getByLabelText('Cost factor'), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText('Test password to hash'), {
      target: { value: 'test-password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Generate bcrypt hash' }));

    const generatedOutput = screen.getByLabelText('Generated bcrypt hash') as HTMLTextAreaElement;
    await waitFor(() => expect(generatedOutput.value).toMatch(/^\$2[ab]\$08\$/));

    fireEvent.change(screen.getByLabelText('Candidate test password'), {
      target: { value: 'test-password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify password' }));

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('Password matches this hash'),
    );
  });
});
