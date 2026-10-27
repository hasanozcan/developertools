import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Md5HashTool from './Md5HashTool';

vi.mock('@/context/LanguageContext', () => ({ useLanguage: () => ({ t: (key: string) => key }) }));
vi.mock('@/components/common/CodeEditor', () => ({ default: () => <textarea /> }));
vi.mock('@/components/common/CopyButton', () => ({ default: () => null }));

describe('MD5 empty text', () => {
  it('generates the empty digest and respects uppercase', () => {
    render(<Md5HashTool />);
    fireEvent.click(screen.getByRole('button', { name: 'tool.md5Hash.generateHash' }));
    expect(screen.getByText('d41d8cd98f00b204e9800998ecf8427e')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('checkbox', { name: 'common.uppercase' }));
    expect(screen.getByText('D41D8CD98F00B204E9800998ECF8427E')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'tool.md5Hash.generateHash' }));
    expect(screen.getByText('D41D8CD98F00B204E9800998ECF8427E')).toBeInTheDocument();
  });
});
