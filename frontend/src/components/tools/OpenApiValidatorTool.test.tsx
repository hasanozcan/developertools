import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import OpenApiValidatorTool from './OpenApiValidatorTool';

describe('OpenApiValidatorTool', () => {
  beforeEach(() => localStorage.clear());

  it('loads, validates, and filters the endpoint sample', () => {
    render(
      <LanguageProvider>
        <OpenApiValidatorTool />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Load Sample' }));
    fireEvent.click(screen.getByRole('button', { name: 'Validate and explore' }));

    expect(screen.getByRole('status')).toHaveTextContent('Structurally valid');
    expect(screen.getByText('/users/{id}')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search path, summary, ID, or tag'), {
      target: { value: 'createUser' },
    });
    expect(screen.getByText('createUser')).toBeInTheDocument();
    expect(screen.queryByText('getUser')).not.toBeInTheDocument();
  });
});
