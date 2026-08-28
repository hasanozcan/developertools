export function generateSystemdService(serviceName = 'api-server', execPath = '/usr/bin/node /app/index.js', user = 'www-data'): string {
  return '[Unit]\nDescription=' + serviceName + ' Hardened Service\nAfter=network.target\n\n[Service]\nType=simple\nUser=' + user + '\nWorkingDirectory=/app\nExecStart=' + execPath + '\nRestart=on-failure\nRestartSec=5\n\n# Hardening Security Directives\nProtectSystem=strict\nProtectHome=true\nNoNewPrivileges=true\nPrivateTmp=true\n\n[Install]\nWantedBy=multi-user.target\n';
}
