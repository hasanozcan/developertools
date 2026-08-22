import { describe, it, expect } from 'vitest';
import { generateChangelogMd } from './changelogGenerator';

describe('changelogGenerator', () => {
  it('generates markdown following Keep a Changelog format', () => {
    const md = generateChangelogMd({
      version: '1.5.0',
      date: '2026-08-22',
      added: ['New token calculator tool', 'Dark mode support'],
      fixed: ['Memory leak in regex engine'],
    });

    expect(md).toContain('## [1.5.0] - 2026-08-22');
    expect(md).toContain('### Added');
    expect(md).toContain('- New token calculator tool');
    expect(md).toContain('### Fixed');
  });
});
