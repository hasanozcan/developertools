import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import JsonToZodTool from './JsonToZodTool';

describe('JsonToZodTool', () => {
  beforeEach(() => localStorage.clear());

  it('generates a named schema and inferred TypeScript type', () => {
    render(
      <LanguageProvider>
        <JsonToZodTool />
      </LanguageProvider>,
    );

    fireEvent.change(screen.getByLabelText('Root schema name'), {
      target: { value: 'User' },
    });
    fireEvent.change(screen.getByLabelText('JSON sample'), {
      target: { value: '{"id":1,"email":"dev@example.com"}' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Generate Zod schema' }));

    const output = (screen.getByLabelText('Zod schema output') as HTMLTextAreaElement).value;
    expect(output).toContain('export const UserSchema');
    expect(output).toContain('email: z.string().email()');
    expect(output).toContain('export type User');
  });
});
