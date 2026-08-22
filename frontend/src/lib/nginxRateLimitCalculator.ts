export interface NginxRateLimitConfig {
  zoneName: string;
  ratePerSec: number;
  burst: number;
  nodelay: boolean;
}

export function generateNginxRateLimitDirectives(config: NginxRateLimitConfig): string {
  const { zoneName, ratePerSec, burst, nodelay } = config;
  const zoneDef = `limit_req_zone $binary_remote_addr zone=${zoneName}:10m rate=${ratePerSec}r/s;`;
  const nodelayFlag = nodelay ? ' nodelay' : '';
  const locationDef = `limit_req zone=${zoneName} burst=${burst}${nodelayFlag};`;

  return `# Put this in http {} block:\n${zoneDef}\n\n# Put this in location {} or server {} block:\n${locationDef}`;
}