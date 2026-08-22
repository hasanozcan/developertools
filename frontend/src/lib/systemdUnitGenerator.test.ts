import { describe, it, expect } from 'vitest';
import { generateSystemdUnit } from './systemdUnitGenerator';

describe('systemdUnitGenerator', () => {
  it('generates Linux systemd .service unit file', () => {
    const unit = generateSystemdUnit('node-app', {
      description: 'Node.js Production Server',
      execStart: '/usr/bin/node /var/www/app/index.js',
      user: 'node',
      workingDirectory: '/var/www/app',
      envVars: { NODE_ENV: 'production', PORT: '3000' },
    });

    expect(unit).toContain('[Unit]');
    expect(unit).toContain('Description=Node.js Production Server');
    expect(unit).toContain('ExecStart=/usr/bin/node /var/www/app/index.js');
    expect(unit).toContain('Environment="NODE_ENV=production"');
  });
});
