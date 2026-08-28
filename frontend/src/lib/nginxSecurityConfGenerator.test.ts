import { describe, it, expect } from 'vitest';
import { generateNginxSecurityConf } from './nginxSecurityConfGenerator';

describe('nginxSecurityConfGenerator', () => {
  it('generates hardened Nginx config', () => {
    expect(generateNginxSecurityConf('devstools.app', 8000)).toContain('Strict-Transport-Security');
  });
});
