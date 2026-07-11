import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PasswordGeneratorTool from './PasswordGeneratorTool';

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const labels: Record<string, string> = {
        'common.generate': 'Generate',
        'tool.passwordGenerator.strength': 'Strength',
        'tool.passwordGenerator.strong': 'Strong',
        'tool.passwordGenerator.good': 'Good',
        'tool.passwordGenerator.fair': 'Fair',
        'tool.passwordGenerator.weak': 'Weak',
      };
      return labels[key] || key;
    },
  }),
}));

vi.mock('@/components/common/CopyButton', () => ({
  default: () => null,
}));

describe('PasswordGeneratorTool entropy display', () => {
  it('keeps entropy tied to the generated password until regeneration', async () => {
    const { container } = render(<PasswordGeneratorTool />);

    await waitFor(() => expect(container.querySelector('code')?.textContent).toHaveLength(16));
    const initialPassword = container.querySelector('code')?.textContent;
    const initialEntropy = screen.getByText(/bits/).textContent;
    const lengthSlider = container.querySelector<HTMLInputElement>('input[type="range"][min="4"]');

    expect(lengthSlider).not.toBeNull();
    fireEvent.change(lengthSlider!, { target: { value: '4' } });

    expect(container.querySelector('code')?.textContent).toBe(initialPassword);
    expect(screen.getByText(/bits/).textContent).toBe(initialEntropy);

    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));

    expect(container.querySelector('code')?.textContent).toHaveLength(4);
    expect(screen.getByText(/bits/).textContent).not.toBe(initialEntropy);
  });
});
