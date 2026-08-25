export interface SystemdConfig {
  serviceName: string;
  description: string;
  execPath: string;
  user: string;
  calendarSchedule: string; // e.g. "*-*-* 04:00:00"
}

export function generateSystemdUnit(config: SystemdConfig): { serviceFile: string; timerFile: string } {
  const serviceFile = `[Unit]
Description=${config.description}
Wants=${config.serviceName}.timer

[Service]
Type=oneshot
User=${config.user || 'root'}
ExecStart=${config.execPath}

[Install]
WantedBy=multi-user.target`;

  const timerFile = `[Unit]
Description=Timer for ${config.description}
Requires=${config.serviceName}.service

[Timer]
Unit=${config.serviceName}.service
OnCalendar=${config.calendarSchedule || 'daily'}
Persistent=true

[Install]
WantedBy=timers.target`;

  return { serviceFile, timerFile };
}
