import { describe, it, expect } from 'vitest';
import { resolveConflictMarkers } from './gitConflictMarkerCleaner';

describe('gitConflictMarkerCleaner', () => {
  it('resolves git conflicts', () => {
    const text = '<<<<<<< HEAD\nOurs\n=======\nTheirs\n>>>>>>> branch\n';
    expect(resolveConflictMarkers(text, 'ours')).toContain('Ours');
  });
});
