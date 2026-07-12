import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CidrCalculatorTool from './CidrCalculatorTool';
import { LanguageProvider } from '@/context/LanguageContext';

vi.mock('@/components/common/CopyButton', () => ({
  default: () => null,
}));

describe('CidrCalculatorTool localization', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('uses the selected locale for controls, results, and validation feedback', async () => {
    localStorage.setItem('language', 'tr');
    render(
      <LanguageProvider>
        <CidrCalculatorTool />
      </LanguageProvider>,
    );

    const address = await screen.findByLabelText('IPv4 adresi');
    expect(screen.getByRole('heading', { name: 'Alt ağ sonucu' })).toBeInTheDocument();

    fireEvent.change(address, { target: { value: '999.1.1.1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Alt ağı hesapla' }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Kanonik bir IPv4 adresi ve geçerli bir /0–/32 prefix veya bitişik alt ağ maskesi girin.',
    );
  });
});
