import { describe, expect, it } from 'vitest';
import { generateSystemdUnit } from './systemdTimerGenerator';

describe('systemdTimerGenerator', () => {
  it('generates service and timer files', () => {
    const res = generateSystemdUnit({
      serviceName: 'backup',
      description: 'Nightly Database Backup',
      execPath: '/usr/local/bin/backup.sh',
      user: 'postgres',
      calendarSchedule: 'daily',
    });
    expect(res.serviceFile).toContain('ExecStart=/usr/local/bin/backup.sh');
    expect(res.timerFile).toContain('OnCalendar=daily');
  });
});
