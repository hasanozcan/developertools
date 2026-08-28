import { describe, it, expect } from 'vitest';
import { generateSystemdService } from './systemdServiceHardenedBuilder';

describe('systemdServiceHardenedBuilder', () => {
  it('generates hardened systemd unit file', () => {
    expect(generateSystemdService('web', '/app/bin')).toContain('NoNewPrivileges=true');
  });
});
