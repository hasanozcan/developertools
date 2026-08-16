import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import JsonDiffPatchTool from './JsonDiffPatchTool';

describe('JsonDiffPatchTool', () => {
  beforeEach(() => localStorage.clear());

  it('generates and applies a patch', () => {
    render(
      <LanguageProvider>
        <JsonDiffPatchTool />
      </LanguageProvider>,
    );

    fireEvent.change(screen.getByLabelText('Source JSON'), {
      target: { value: '{"name":"Ada","active":true}' },
    });
    fireEvent.change(screen.getByLabelText('Target JSON'), {
      target: { value: '{"name":"Grace"}' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Generate JSON Patch' }));

    expect((screen.getByLabelText('JSON Patch operations') as HTMLTextAreaElement).value).toContain(
      '"remove"',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Apply patch to source' }));
    expect(screen.getByLabelText('Patched result')).toHaveValue('{\n  "name": "Grace"\n}');
  });
});
