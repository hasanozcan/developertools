import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import ColorContrastCheckerTool from './ColorContrastCheckerTool';

describe('ColorContrastCheckerTool', () => {
  beforeEach(() => localStorage.clear());

  it('calculates WCAG results and updates after a color change', () => {
    render(
      <LanguageProvider>
        <ColorContrastCheckerTool />
      </LanguageProvider>,
    );

    fireEvent.change(screen.getByLabelText('Foreground color'), { target: { value: '#000000' } });
    expect(screen.getByText('21.00:1')).toBeInTheDocument();
    expect(screen.getByText('Normal text · AA').parentElement).toHaveTextContent('Pass');

    fireEvent.change(screen.getByLabelText('Foreground color'), { target: { value: '#777777' } });
    expect(screen.getByText('4.48:1')).toBeInTheDocument();
    expect(screen.getByText('Normal text · AA').parentElement).toHaveTextContent('Fail');
    expect(screen.getByText('Large text · AA').parentElement).toHaveTextContent('Pass');
  });
});
