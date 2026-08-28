export function lookupPort(port: number): { service: string; protocol: string; description: string } {
  const map: Record<number, { service: string; protocol: string; description: string }> = {
    22: { service: 'SSH', protocol: 'TCP', description: 'Secure Shell remote login' },
    80: { service: 'HTTP', protocol: 'TCP', description: 'Hypertext Transfer Protocol' },
    443: { service: 'HTTPS', protocol: 'TCP', description: 'HTTP Secure with TLS' },
    3306: { service: 'MySQL', protocol: 'TCP', description: 'MySQL database engine' },
    5432: { service: 'PostgreSQL', protocol: 'TCP', description: 'PostgreSQL relational database' },
    6379: { service: 'Redis', protocol: 'TCP', description: 'Redis in-memory key-value store' }
  };
  return map[port] || { service: 'Custom / Dynamic', protocol: 'TCP/UDP', description: 'User-assigned port' };
}
