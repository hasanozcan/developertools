import { secureRandomInt } from './passwordSecurity';

export function generateRandomizedCron(baseCron = '0 3 * * *', maxJitterSec = 300): string {
  const safeMax = Math.floor(maxJitterSec);
  const jitter = safeMax > 0 ? secureRandomInt(safeMax) : 0;
  return 'sleep ' + jitter + ' && /usr/local/bin/backup.sh';
}
