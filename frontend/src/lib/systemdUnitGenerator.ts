export interface SystemdOptions {
  description: string;
  execStart: string;
  user?: string;
  workingDirectory?: string;
  restart?: 'always' | 'on-failure' | 'no';
  envVars?: Record<string, string>;
}

export function generateSystemdUnit(serviceName: string, options: SystemdOptions): string {
  const {
    description,
    execStart,
    user = 'www-data',
    workingDirectory = '/var/www/app',
    restart = 'always',
    envVars = {},
  } = options;

  const envLines = Object.entries(envVars)
    .map(([k, v]) => `Environment="${k}=${v}"`)
    .join('\n');

  return `[Unit]
Description=${description || serviceName}
After=network.target

[Service]
Type=simple
User=${user}
WorkingDirectory=${workingDirectory}
ExecStart=${execStart}
Restart=${restart}
RestartSec=5
${envLines ? envLines + '\n' : ''}
[Install]
WantedBy=multi-user.target`.trim();
}
