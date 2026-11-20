import { describe, expect, it } from 'vitest';
import { resolveConflictMarkers } from './gitConflictMarkerCleaner';

describe('gitConflictMarkerCleaner', () => {
  it('resolves git conflicts with trailing newline', () => {
    const text = '<<<<<<< HEAD\nOurs\n=======\nTheirs\n>>>>>>> branch\n';
    expect(resolveConflictMarkers(text, 'ours')).toBe('Ours\n');
    expect(resolveConflictMarkers(text, 'theirs')).toBe('Theirs\n');
    expect(resolveConflictMarkers(text, 'both')).toBe('Ours\nTheirs\n');
  });

  it('resolves conflicts at end-of-string without trailing newline', () => {
    const sample =
      '<<<<<<< HEAD\nconst API_URL = "https://api.v2.devstools.app";\n=======\nconst API_URL = "https://api.devstools.app";\n>>>>>>> main';
    expect(resolveConflictMarkers(sample, 'ours')).toBe(
      'const API_URL = "https://api.v2.devstools.app";',
    );
    expect(resolveConflictMarkers(sample, 'theirs')).toBe(
      'const API_URL = "https://api.devstools.app";',
    );
  });

  it('handles CRLF and diff3 base conflict markers cleanly', () => {
    const diff3 =
      'before\r\n<<<<<<< HEAD\r\nours\r\n||||||| base\r\norig\r\n=======\r\ntheirs\r\n>>>>>>> feature\r\nafter';
    expect(resolveConflictMarkers(diff3, 'theirs')).toBe('before\r\ntheirs\r\nafter');
  });
});
