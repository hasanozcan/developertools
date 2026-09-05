import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import CronParserTool from './CronParserTool';
import { LanguageProvider } from '@/context/LanguageContext';

describe('CronParserTool localization', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the schedule description in the selected locale', async () => {
    render(
      <LanguageProvider initialLocale="tr">
        <CronParserTool />
      </LanguageProvider>,
    );

    const input = await screen.findByPlaceholderText('* * * * *');
    fireEvent.change(input, { target: { value: '0 9 * * 1' } });

    const description = await screen.findByText(/Saat 0?9:00.*Pazartesi/);
    expect(description).not.toHaveTextContent(/At|Monday/);
  });
});
